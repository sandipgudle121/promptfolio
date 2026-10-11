# Promptfolio

Promptfolio is a static catalog of copy-ready AI image-generation and photo-editing prompts. It uses plain HTML, CSS, and JavaScript and can be hosted for free with GitHub Pages.

## Deploy with GitHub Pages

1. Keep the project files and folders in the repository root, including `index.html`, `prompts-data.js`, `script.js`, `styles.css`, `prompts/`, `assets/`, `robots.txt`, and `sitemap.xml`.
2. In the repository, open **Settings → Pages**.
3. Under **Build and deployment**, select **Deploy from a branch**, choose `main` and `/(root)`, then save.
4. Open the published site URL and confirm the homepage and prompt detail pages load.

The repository is configured for `https://sandipgudle121.github.io/promptfolio/`. If the owner or repository name changes, update canonical links, social metadata, `robots.txt`, and `sitemap.xml` to match the new URL.

## Add or edit a prompt

Prompt data lives in `prompts-data.js`. Each item needs a title, tag, category, and prompt text. An image and `Featured` badge are optional:

```js
{
  title: "Short name for the prompt",
  tag: "Studio portrait",
  category: "Portrait",
  badge: "Featured",
  image: "assets/samples/example.jpg",
  text: "The complete prompt text a person will copy."
}
```

Available categories are `Portrait`, `Product`, `Illustration`, `3D`, `Travel`, `Photo Editing`, `Graphic Design`, `Architecture`, and `Document`. Use the closest existing category so filters stay useful.

`Featured` is an editorial curation label, not a popularity metric. The catalog is maintained by hand; it does not track live trends. Avoid implying that prompts are trending or popular based on analytics the site does not collect.

The homepage contains a static summary list for visitors and crawlers when JavaScript is unavailable. Keep that list current when adding or renaming prompts.

## Add a prompt detail page

Detail pages are hand-authored in `prompts/` and contain an introduction, the complete prompt, usage guidance, related links, and page-specific metadata. Only add `seoSlug` to a catalog item when its matching page exists, and keep the page's prompt text aligned with `prompts-data.js`.

Each detail page needs:

- A unique title, description, and canonical URL.
- Matching Open Graph and Twitter titles/descriptions, a unique absolute social image URL, and `og:url`.
- Its canonical URL in `sitemap.xml`.
- Relevant internal links and useful instructions beyond just repeating the prompt.

Run the consistency check before publishing:

```powershell
powershell -ExecutionPolicy Bypass -File scripts/check-seo.ps1
```

GitHub Actions runs the same check on pushes and pull requests.

## Add sample images

Put sample images in `assets/samples/`, then set the prompt's `image` path to the file. Use optimized web images where possible. When no image is supplied, Promptfolio generates a lightweight abstract preview.

## Contributing

Prompt suggestions and pull requests are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md) and the prompt-submission issue template for quality and testing guidelines.

## Notes

- Promptfolio is not affiliated with Google or OpenAI.
- Search, category filters, theme selection, and prompt copying run in the browser; there is no backend.
- `Featured` reflects manual editorial selection. It is not computed from visitor behavior.
