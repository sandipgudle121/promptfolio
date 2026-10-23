# Contributing to Promptfolio

Thanks for helping improve the catalog. You can suggest a prompt through the **Prompt submission** GitHub issue template, or submit a pull request.

## Prompt guidelines

- Submit an original, useful image-generation prompt that has been tested in the named model.
- Use a concise title and one of the existing categories: `Portrait`, `Product`, `Illustration`, `3D`, `Travel`, `Photo Editing`, `Graphic Design`, `Architecture`, or `Document`.
- Write complete instructions, including the intended subject, composition, lighting, material, or style where useful.
- Do not submit harmful, deceptive, copyrighted, private, or personal-data-focused content.
- Avoid prompts that imitate living artists or recognizable copyrighted franchises. Describe visual qualities instead.

## Pull requests

1. Add the prompt to the catalog in `js/prompts-data.js`.
2. Include `title`, `tag`, `category`, and `text`. `badge` is optional; use `Featured` only for hand-selected entries.
3. Update the homepage's static summary list in `index.html` when adding or renaming a prompt.
4. Keep the prompt wording clear and check that the site still loads in a browser.
5. In the pull request description, say which model you tested and what the prompt is intended to create.
6. Run `powershell -ExecutionPolicy Bypass -File scripts/check-seo.ps1` before submitting.

By contributing, you agree that your submission may be published under this repository's license.
