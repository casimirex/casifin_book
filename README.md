# Financial OS — React Edition

A standalone **React + TypeScript + Vite** port of the Financial OS reference, split into two views behind a single top-level switcher:

1. **📚 Financial Operating System Blueprint** — a 61-chapter ERP / FinTech architecture guide, from the accounting core through money in motion, risk & control, to intelligence & platform.
2. **📊 Financial Formula Encyclopedia** — 147 finance, accounting, and banking formulas across 6 categories, each with a LaTeX equation and plain-English *what / when to use / how to interpret* notes.

This is the build-based companion to the single-file `index.html` at the repo root. Same content, re-architected as typed data + component renderers for a premium, responsive reading experience.

## Features

- **Two views, one app** — a segmented switcher toggles between the Blueprint e-book and the Formula Encyclopedia.
- **Self-contained math** — equations render with [KaTeX](https://katex.org/) (bundled, no CDN), so it works fully offline.
- **Dark / light theme** — persisted in `localStorage` (`fos-theme`).
- **Search** — chapter search in the Blueprint, formula search (name / tags / description) in the Encyclopedia. `Ctrl/Cmd+K` focuses search.
- **Scrollspy + reading progress** — the active section is highlighted in the sidebar and a progress bar tracks scroll position.
- **Responsive** — off-canvas sidebar on mobile, adaptive grids, and fluid typography from desktop to phone.

## Tech stack

- [React 18](https://react.dev/) + [TypeScript 5.6](https://www.typescriptlang.org/)
- [Vite 5](https://vitejs.dev/) (build + dev server)
- [KaTeX](https://katex.org/) for math rendering
- Google Fonts: Fraunces (display), Inter (body), JetBrains Mono (code)

## Getting started

```bash
# install dependencies
npm install

# start the dev server (hot reload)
npm run dev

# type-check and build for production (outputs to dist/)
npm run build

# preview the production build locally
npm run preview
```

## Project structure

```
casifin_book/
├── index.html              # Vite entry
├── src/
│   ├── main.tsx            # React root
│   ├── App.tsx             # shell: theme, view switcher, scrollspy, shortcuts
│   ├── types.ts            # content model (Book, Chapter, Block, Formula, …)
│   ├── data/
│   │   ├── book.ts         # the 61-chapter Blueprint (typed content)
│   │   └── formulas.ts     # 147 formulas across 6 categories
│   ├── components/
│   │   ├── Cover.tsx        # e-book cover + learning path
│   │   ├── Section.tsx      # chapter / level-divider renderer
│   │   ├── BlockRenderer.tsx# block-level content (callouts, tables, code, …)
│   │   ├── Sidebar.tsx      # Blueprint TOC + search
│   │   ├── FormulaContent.tsx / FormulaSidebar.tsx / FormulaCard.tsx
│   │   └── Math.tsx         # KaTeX wrapper
│   ├── lib/
│   │   ├── search.ts        # chapter search
│   │   ├── formulaSearch.ts # formula search
│   │   ├── level.ts         # per-level color helpers
│   │   └── slug.ts          # stable anchor IDs
│   └── styles/global.css    # design tokens + all component styles
├── tsconfig*.json
└── vite.config.ts
```

## Design system

The look is an editorial "niche" style: warm paper in light mode, deep navy in dark mode, a gold accent, and per-level color coding (L1 emerald, L2 blue, L3 amber, L4 violet). All tokens live as CSS custom properties in `src/styles/global.css` under `:root` and `:root[data-theme='dark']`.

## License

Personal / educational use.
