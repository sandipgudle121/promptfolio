# Promptography

A simple, static site that catalogs trending AI image-generation prompts for Gemini and ChatGPT. No backend, no build step — just HTML, CSS, and vanilla JS, so it hosts for free on GitHub Pages.

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

All content lives in `prompts-data.js`. Gemini and ChatGPT each have one object in the `PROMPT_DATA` array:

```js
{
  id: "gemini",              // used internally, keep it lowercase-with-dashes
  name: "Gemini",            // shown as the section heading
  maker: "Google · Nano Banana",
  accent: "#8AB4F8",         // section accent color
  accent2: "#C58AF9",
  blurb: "One line describing what this model is good at.",
  prompts: [
    {
      title: "Short name for the prompt",
      tag: "Category, e.g. Portrait",
      text: "The full prompt text a person will copy."
    }
    // add as many prompt objects as you like
  ]
}
```

Edit the matching model object to add or update prompts. The page rebuilds the layout, filter pills, and search index automatically from this file — no HTML editing needed.

## Notes

- Model names are used only to describe which tool a prompt is written for; this project isn't affiliated with Google or OpenAI.
- Everything runs client-side — the "Copy prompt" button uses the browser clipboard API with a manual-copy fallback for older browsers.
