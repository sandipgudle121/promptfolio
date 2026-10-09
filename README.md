# Promptography

A simple, static site that catalogs trending AI image-generation prompts. The prompts can be used with Gemini, ChatGPT, and other compatible tools. No backend or build step — just HTML, CSS, and vanilla JS, so it hosts for free on GitHub Pages.

## Host it on GitHub Pages (free)

1. Create a new repository on GitHub (e.g. `promptography`).
2. Upload these files to the repository root: `index.html`, `styles.css`, `script.js`, `prompts-data.js`, `README.md`.
   - Easiest way: on the repo page, click **Add file → Upload files**, drag in all the files, and commit.
3. Go to the repo's **Settings → Pages**.
4. Under **Build and deployment → Source**, choose **Deploy from a branch**.
5. Under **Branch**, choose `main` and folder `/ (root)`, then **Save**.
6. Wait a minute, then refresh the Pages settings tab — it will show your live URL, something like:
   `https://<your-username>.github.io/promptography/`

That's it — no build tools, no npm install, nothing else to configure.

## Add or edit prompts

All content lives in `prompts-data.js`. Prompts are displayed together in one catalog and can be filtered by category. Add each new prompt object directly to the `PROMPT_DATA` array:

```js
{
  title: "Short name for the prompt",
  tag: "Short label, e.g. Studio portrait",
  category: "Portrait",    // used by the category filter
  badge: "New",            // optional: "New" or "Popular"
  image: "assets/samples/example.jpg", // optional: sample image shown on the card
  text: "The full prompt text a person will copy."
}
```

Add or update a prompt in `prompts-data.js`. The page rebuilds the layout, category filters, and search index automatically from this file — no HTML editing needed.

## Add sample images

Place a sample image in `assets/samples/`, then add its relative path in the prompt's optional `image` field. For example: `image: "assets/samples/birthday-poster.jpg"`. Supported web formats such as JPG, PNG, and WebP work well. If the field is omitted or the image cannot load, Promptfolio uses its generated preview instead.

## Contributing prompts

Suggestions and pull requests are welcome. Read [CONTRIBUTING.md](CONTRIBUTING.md) for the quality guidelines and use the prompt-submission issue template to suggest a new entry.

## Notes

- This project isn't affiliated with Google or OpenAI.
- Everything runs client-side — the "Copy prompt" button uses the browser clipboard API with a manual-copy fallback for older browsers.
