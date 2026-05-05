# Fieldwise Form Tutor

Fieldwise Form Tutor is a small, static learning app that helps beginners practice common HTML form controls one step at a time. It is designed for people who may not know technical terms yet: every lesson explains where to click, what to type, and how to recover when something needs fixing.

The app runs entirely in the browser and is published with GitHub Pages from the `gh-pages` branch.

Live site: [https://artifexet.github.io/fieldwise-form-tutor/](https://artifexet.github.io/fieldwise-form-tutor/)

## Features

- Beginner-friendly lessons for text fields, textareas, email, phone, numbers, sliders, dates, times, checkboxes, switches, radio buttons, selects, file uploads, validation, demo captcha, passwords, URLs, search fields, color, month, week, `datetime-local`, and a larger multi-field form.
- Progress saved locally with `localStorage`.
- Default language selected from the browser language API, with a persistent manual PL/EN flag switch.
- Course data split into separate files so contributors can add, remove, or translate lessons without editing the app runtime.
- Accessible interaction basics: large touch targets, visible focus states, larger text mode, high contrast mode, keyboard-friendly controls, and drag-and-drop support for file lessons.
- No backend, build step, database, or external framework required.

## Project Structure

```text
docs/
  index.html
  styles.css
  script.js
  course-utils.js
  courses/
    index.js
    pl.js
    pl-extra.js
    en.js
```

Course content lives outside the main application script:

- `docs/courses/pl.js` contains the base Polish lessons.
- `docs/courses/pl-extra.js` contains extra Polish lessons.
- `docs/courses/en.js` contains English lessons.
- `docs/courses/index.js` wires course files into language catalogs.

## Local Preview

Because course files are loaded as JavaScript modules, preview the app through a local web server:

```bash
python3 -m http.server 4173 --directory docs
```

Then open:

```text
http://127.0.0.1:4173/
```

## Adding Lessons

1. Add or edit a lesson object in the relevant file under `docs/courses/`.
2. Keep the same `id` across languages when a lesson is translated.
3. Use clear beginner-facing copy: short prompts, direct labels, and helpful validation messages.
4. If you create a new course file, import it in `docs/courses/index.js` and add it to the right language catalog.
5. Run the local preview and complete the lesson manually before opening a pull request.

Each lesson is made of slides. The current slide types are:

- `intro` for explanation and preview.
- `exercise` for interactive practice.
- `summary` for the final recap.

## Browser Storage

The app uses `localStorage` for user-only preferences and progress:

- `fieldwise-progress-v1` stores lesson progress.
- `fieldwise-language` stores a manual language choice after the user changes it.
- `form-training-font-scale` stores text size.
- `form-training-high-contrast` stores contrast mode.

If `fieldwise-language` is not set, the app chooses the first supported language from `navigator.languages` or `navigator.language`.

## Deployment

This repository is ready for GitHub Pages. The published site is built from the contents of `docs/` and pushed to the `gh-pages` branch.

To deploy after changing the app:

```bash
git subtree push --prefix docs origin gh-pages
```

If this is the first deployment in a fresh fork, open the repository settings and set GitHub Pages to deploy from the `gh-pages` branch.

No build command is needed.
