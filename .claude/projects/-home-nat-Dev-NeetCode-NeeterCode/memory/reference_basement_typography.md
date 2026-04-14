---
name: Basement.studio Typography System
description: Comprehensive typography rules derived from basement.studio — tight tracking, compressed leading, uniform weight, responsive type scale. Use as a reference when building any frontend component that needs editorial-quality typography.
type: reference
---

# Basement.studio Typography System

Reference for achieving high-end, editorial typography in frontend components. Derived from analyzing basement.studio's production CSS.

## Core Philosophy

**"Dense, tight, and systematic."** Hierarchy is established through **size and spacing**, not weight contrast. Large text gets progressively tighter tracking and more compressed line-heights. Body text gets breathing room.

## Font Setup

- **Primary**: Geist (variable font, weight 100-900)
- **Mono**: Geist Mono (variable font, weight 100-900)
- Enable `font-feature-settings: "ss01"` globally for alternate glyph forms
- Apply `-webkit-font-smoothing: antialiased` and `-moz-osx-font-smoothing: grayscale` on body
- Set `text-wrap: balance` on all `<p>` tags for even line breaks
- Use metric-override fallback fonts with `size-adjust` to minimize CLS

## Letter-Spacing Rules

Larger text = tighter tracking. Desktop headings get tighter than mobile.

| Level | Mobile | Desktop (lg:) |
|-------|--------|---------------|
| h0 (6rem+) | `-0.04em` | `-0.04em` |
| h1 (4-5rem) | `-0.03em` | `-0.04em` |
| h2 (2-2.5rem) | `-0.03em` | `-0.04em` |
| h3 (1.25-1.5rem) | `-0.03em` | `-0.03em` |
| h4 (0.9-1.25rem) | `-0.02em` | `-0.02em` |
| p (body) | `0` | `0` |
| Overlines/labels | `+0.15em` to `+0.2em` | same |

**Quick Tailwind mapping:**
- Giant headings: `tracking-[-0.04em]` or `tracking-[-0.045em]`
- Large headings: `tracking-[-0.03em]`, desktop `lg:tracking-[-0.04em]`
- Small headings: `tracking-[-0.02em]`
- Body: `tracking-[-0.01em]` (slight) or `tracking-normal`
- Overlines: `tracking-[0.18em]` to `tracking-[0.2em]`

## Line-Height Rules

Headings have line-height ratios **at or below 1.0** (text overlaps its line box). Body text uses ~1.3-1.6 for readability.

| Level | Line-Height Ratio |
|-------|------------------|
| h0 (display) | **0.85 – 0.90** |
| h1 | **0.88 – 0.92** |
| h2 | **0.95 – 1.00** |
| h3 | **1.00** |
| h4 | **1.00 – 1.07** |
| p (body) | **1.23 – 1.65** |

**Quick Tailwind mapping:**
- Display/h0: `leading-[0.88]`
- h1: `leading-[0.92]`
- h2: `leading-[0.95]`
- h3/h4: `leading-none` (1.0)
- Body: `leading-[1.6]` or `leading-[1.65]`

## Font-Weight Rules

Nearly everything uses **semibold (600)**. Hierarchy comes from size, not weight.

- All headings: `font-semibold` (600) or `font-bold` (700)
- Body copy: `font-semibold` (600) — even body is semibold
- Long-form/blog: `font-medium` (500) — slightly lighter for extended reading
- Labels/overlines: `font-medium` (500)

## Responsive Type Scale

Mobile sizes are roughly **half** of desktop. Each level has distinct mobile/desktop sizes.

| Level | Mobile | Desktop |
|-------|--------|---------|
| h0 | 2.875rem (46px) | 6.125rem (98px) |
| h1 | 2.1875rem (35px) | 4.75rem (76px) |
| h2 | 1.5rem (24px) | 2.375rem (38px) |
| h3 | 1.25rem (20px) | 1.5rem (24px) |
| h4 | 0.9375rem (15px) | 1.25rem (20px) |
| p | 0.75rem (12px) | 0.8125rem (13px) |

**Example Tailwind heading pattern:**
```
text-[2.75rem] leading-[0.92] tracking-[-0.03em]
sm:text-[3.5rem]
lg:text-[4.25rem] lg:tracking-[-0.04em]
```

## Structural Labels (Overlines)

Small uppercase labels used as section markers:
```
font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-primary
```

## Utility Patterns

- `text-balance` on `<p>` — balanced line wrapping
- `text-pretty` — prettier line breaks
- `font-variant-numeric: tabular-nums` — for numeric content
- `select-none` — on decorative text elements
- `text-shadow: 0 0 10px rgba(...)` — subtle glow effects on key text

## Complete Hero Heading Example

```tsx
<h1 className={cn(
  "font-heading font-bold text-foreground",
  "text-[2.75rem] leading-[0.92] tracking-[-0.03em]",
  "sm:text-[3.5rem]",
  "lg:text-[4.25rem] lg:tracking-[-0.04em]",
)}>
```

## Complete Body Text Example

```tsx
<p className="max-w-[34ch] text-[0.9375rem] leading-[1.6] tracking-[-0.01em] text-muted-foreground text-balance">
```

## Complete Overline Example

```tsx
<span className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-primary">
```
