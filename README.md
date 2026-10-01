# MidKnight Properties

A responsive luxury apartment website for Southampton, England.

## Production

This is the source repository connected to the existing Vercel project for
https://www.midknightproperties.co.uk/.

Vercel serves the committed `dist/` directory. `vercel.json` explicitly skips
installation and server-side builds and selects the static output directory.
This makes the deployed files the same files reviewed locally, without relying
on a framework being auto-detected from the original empty `index.html`.

**After editing source or assets, run `pnpm build` and commit the updated `dist/`
alongside your source changes.** Pushing `main` triggers the connected Vercel
deployment. The production branch remains `main`.

## Local development

Requires Node.js 22.13 or newer and pnpm 11.25.

```sh
pnpm install
pnpm dev
```

To produce and preview the production website:

```sh
pnpm build
pnpm preview
```

The build type-checks the application, bundles React and its styles with Vite,
and renders the complete initial page into static HTML. React hydrates that
markup to activate the gallery, accordions, navigation and stay planner.

## Updating the website

- Main page, stay planner and contact placeholders: `src/App.tsx`.
- Destination layout and interactive tabs: `src/components/DestinationGuide.tsx`.
- Southampton attractions, day trips and suggested itineraries: `src/content/southampton.ts`.
- Styling, animation and responsive layouts: `src/styles.css` and `src/destination.css`.
- Page metadata: `index.html`.
- Apartment photography and original brand icon: `public/images/`.
- Favicon: `public/favicon.svg`.
- Locally hosted fonts and their licences: `public/fonts/`.

Contact email, telephone and booking URL are intentionally displayed as
placeholders, as requested by the owner. Replace the three `contactDetails`
values when real details are available.

## Stay planner

The planner prepares a draft that visitors can review, copy or download. It
validates arrival/departure order and uses the current date in Europe/London.
It does not submit enquiries, store personal details, take payments, check live
availability or create reservations. Guests see these limits in the form.
Any guest count is a request for the host to confirm; the page does not assert
an unverified occupancy limit, price, exact address or booking policy.

A feature-detected browser tool can stage the same visible enquiry draft when
`document.modelContext` is available. It never sends a message or reserves dates.
The normal website does not require this experimental browser capability.

## Design and assets

The page uses the supplied apartment photographs and original green MidKnight
icon, with layered midnight forest and charcoal surfaces, warm ivory type, champagne accents, editorial typography, restrained reveals,
image transitions and a reduced-motion alternative. Photos have responsive
WebP sizes; fonts are served locally. Accessible Radix primitives support modal
focus handling, selects and accordions.

The dining photograph and apartment photograph were supplied by the owner.
Carlito is distributed under the SIL Open Font License. Latin Modern font files
are accompanied by their GUST/LPPL licence and provenance notices. The vendor
stylesheet includes its licence in `vendor/`.

The Southampton notebook links to the official destination guides used for its
copy: Visit Southampton Old Town, MDL Ocean Village Marina and SeaCity Museum.
No walking distances from the apartment are claimed.

## Destination and visual upgrade

The website includes eight Southampton experiences in three interest tabs,
New Forest, Winchester and Isle of Wight day-trip ideas, three suggested
itineraries and useful rail, cruise and ferry links. Destination facts were
checked against official tourism, council, attraction and transport sources on
1 October 2026. The source register is in `design/destination-sources.md`.
Itineraries are editorial suggestions, not included tours or promised access.

Three original AI-generated backgrounds create the destination atmosphere:
`marina-afterglow`, `woodland-morning` and `sunlit-stone-linen`. The marina and
woodland are clearly captioned as illustrations. They do not depict the rental
property, its views or a documented named attraction. The supplied property
photographs remain the hero and the complete apartment gallery.

The full generation prompts are preserved in `design/image-prompts.json`.
Each background has 640, 960 and 1600 pixel WebP variants. All are lazy-loaded;
the real apartment hero remains the priority image. New panels support keyboard
navigation, reduced-motion preferences and responsive layouts.
