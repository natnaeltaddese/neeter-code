---
name: thesvg library usage
description: How to use thesvg npm package for brand SVG icons — imports, variants (default/mono/light/dark/wordmark), React rendering, and light/dark mode handling patterns
type: reference
---

## Package

`thesvg` (convenience wrapper for `@thesvg/icons`) — 3,800+ brand SVG icons, tree-shakeable.

## Import patterns

```ts
// Default import — full icon object
import github from "thesvg/github"
github.svg        // raw SVG string (default variant)
github.title      // "GitHub"
github.hex        // "181717"
github.variants   // { default: "<svg...>", mono: "<svg...>", wordmark: "<svg...>" }

// Named exports
import { svg, title, hex } from "thesvg/github"

// Barrel (all icons — large bundle, avoid)
import { github, vercel } from "thesvg"
```

## Variants

Not all icons have all variants. Common ones: `default`, `mono`, `light`, `dark`, `wordmark`. Always check `icon.variants` keys before using.

## React rendering

Use `dangerouslySetInnerHTML` for inline SVGs:

```tsx
<div
  className="h-5 [&>svg]:h-full [&>svg]:w-auto"
  dangerouslySetInnerHTML={{ __html: icon.variants.wordmark }}
/>
```

## Light/dark mode handling

Wordmark SVGs often have hardcoded fill colors. Three categories:

1. **Colored logos** (e.g. Google multicolor, Netflix red): Visible on both backgrounds, no special handling needed.

2. **White-filled logos** (e.g. OpenAI, Anthropic, GitHub, Vercel): Use CSS `invert` to flip for light mode:
   ```
   className="invert dark:invert-0"
   ```

3. **Mixed logos** (e.g. NVIDIA — white text + green icon): CSS invert distorts brand colors. Create a modified SVG for light mode by replacing white fills:
   ```ts
   const lightSvg = icon.variants.wordmark.replace(/fill:#fff/g, "fill:#1a1a1a")
   ```
   Then show/hide with `className="block dark:hidden"` / `className="hidden dark:block"`.

## Finding icons

```bash
# List all available icon names
ls node_modules/thesvg/dist/ | grep -E "\.js$" | sed 's/.js//'

# Check variants for a specific icon
node -e "const i = require('thesvg/github'); console.log(Object.keys(i.variants))"

# Find all icons with wordmark variant
node -e "const fs=require('fs'); fs.readdirSync('node_modules/thesvg/dist').filter(f=>f.endsWith('.js')&&!f.endsWith('.cjs')).forEach(f=>{try{const i=require('thesvg/'+f.replace('.js',''));if(i.variants?.wordmark)console.log(f.replace('.js',''))}catch{}})"
```

## CDN alternative

```html
<img src="https://thesvg.org/icons/github/default.svg" alt="GitHub" width="24" />
```

## Related packages

- `@thesvg/react` — typed React components
- `@thesvg/cli` — CLI tool
- `@thesvg/mcp-server` — MCP server (installed in this project)
