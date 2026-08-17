import assert from "node:assert/strict";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(new URL(path, "http://localhost"), {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

async function htmlFor(path) {
  const response = await render(path);
  assert.equal(response.status, 200, `${path} should render successfully`);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  return response.text();
}

test("renders the finished French homepage without starter content", async () => {
  const html = await htmlFor("/");

  assert.match(html, /<html[^>]*lang="fr"/i);
  assert.match(html, /Une toiture saine\./);
  assert.match(html, /Des explications claires\./);
  assert.match(html, /Site de démonstration/);
  assert.doesNotMatch(html, /Your site is taking shape|react-loading-skeleton|codex-preview/i);
});

test("renders the dedicated compact quote journey", async () => {
  const html = await htmlFor("/devis");

  assert.match(html, /Une question à la fois\./);
  assert.match(html, /Quel est votre besoin \?/);
  assert.match(html, /Étape\s*(?:<!-- -->)?1(?:<!-- -->)?\s*sur 5/);
  assert.match(html, /Démo · non transmis/);
});

test("uses the requested service as the detail page and social preview", async () => {
  const html = await htmlFor("/prestations/reparation-fuite");

  assert.match(html, /Recherche de fuite &amp; réparation/);
  assert.match(html, /gutter-detail\.jpg/);
  assert.doesNotMatch(html, /property="og:image"[^>]*og\.png/i);
});

test("keeps the principal public routes server-rendered", async () => {
  const routes = [
    "/prestations",
    "/realisations",
    "/realisations/ardoise-munster",
    "/entreprise",
    "/urgence-toiture",
    "/contact",
    "/mentions-legales",
    "/confidentialite",
  ];

  const pages = await Promise.all(routes.map((route) => htmlFor(route)));
  for (const html of pages) {
    assert.match(html, /Martin/i);
    assert.doesNotMatch(html, /Your site is taking shape|react-loading-skeleton/i);
  }
});
