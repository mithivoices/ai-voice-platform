# 🎨 Mithivoices Design System — Essential UI Tokens

## Colors

### Primary Brand

| Token          | Value     | Usage                        |
| -------------- | --------- | ---------------------------- |
| Primary Blue   | `#2563EB` | Main CTA, links              |
| Primary Hover  | `#1D4ED8` | Button hover states          |
| Primary Active | `#1E40AF` | Button pressed states        |
| Primary Light  | `#DBEAFE` | Selected backgrounds, badges |

### Text

| Token      | Value     | Usage               |
| ---------- | --------- | ------------------- |
| Text Dark  | `#0F172A` | Headings            |
| Text Gray  | `#64748B` | Body text           |
| Text Light | `#94A3B8` | Muted, placeholders |

### Backgrounds

| Token              | Value     | Usage                 |
| ------------------ | --------- | --------------------- |
| Background Default | `#FFFFFF` | Cards, modals         |
| Background Light   | `#F8FAFC` | Page sections, inputs |
| Background Subtle  | `#EFF6FF` | Card hover states     |

### Borders & Dividers

| Token          | Value     | Usage                  |
| -------------- | --------- | ---------------------- |
| Border Default | `#E2E8F0` | Card borders, dividers |
| Border Focus   | `#2563EB` | Focus rings            |
| Border Subtle  | `#CBD5E1` | Light dividers         |

### Semantic Colors

| Token   | Value     | Usage               |
| ------- | --------- | ------------------- |
| Success | `#10B981` | Confirmations       |
| Warning | `#F59E0B` | Alerts              |
| Error   | `#EF4444` | Errors, destructive |
| Info    | `#3B82F6` | Informational       |

---

## Typography

### Font Family

```
Primary: Inter, system-ui, sans-serif
```

### Text Scale

| Element             | Size | Weight         |
| ------------------- | ---- | -------------- |
| Heading 1 (Hero)    | 32px | Bold (700)     |
| Heading 2 (Section) | 24px | Semibold (600) |
| Heading 3 (Card)    | 20px | Semibold (600) |
| Body                | 16px | Regular (400)  |
| Small Text          | 14px | Regular (400)  |
| Caption / Label     | 12px | Regular (400)  |

### Line Heights

- Headings: `1.2`
- Body: `1.6`
- Labels: `1.4`

---

## Spacing Scale

| Token       | Value |
| ----------- | ----- |
| XS          | 4px   |
| SM          | 8px   |
| MD          | 16px  |
| LG          | 24px  |
| XL          | 32px  |
| 2XL         | 48px  |
| Section Gap | 80px  |

---

## Border Radius

| Token   | Value  | Usage          |
| ------- | ------ | -------------- |
| Small   | 6px    | Inputs         |
| Default | 8px    | Buttons, cards |
| Large   | 12px   | Modals, panels |
| Pill    | 20px   | Badges, pills  |
| Full    | 9999px | Avatars        |

---

## Shadows (Subtle, SaaS-Safe)

```css
/* Small (Cards) */
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);

/* Default (Floating Panels) */
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

/* Large (Modals) */
box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
```

> ⚠️ Avoid heavy shadows — keep UI light and professional.

---

## Button Styles

### Primary Button

```css
background: #2563eb;
color: #ffffff;
height: 48px;
border-radius: 8px;
/* Hover */
background: #1d4ed8;
/* Active */
background: #1e40af;
```

### Secondary Button

```css
background: #f8fafc;
border: 1px solid #e2e8f0;
color: #2563eb;
```

### Disabled

```css
background: #e5e7eb;
color: #94a3b8;
cursor: not-allowed;
```

---

## Input & Form Controls

```css
background: #f8fafc;
border: 1px solid #e2e8f0;
border-radius: 8px;
/* Focus */
border: 2px solid #2563eb;
/* Placeholder */
color: #94a3b8;
```

---

## Animations & Motion

### Duration

| Token  | Value |
| ------ | ----- |
| Fast   | 200ms |
| Normal | 300ms |
| Slow   | 500ms |

### Easing

```css
transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
```

> ⚠️ No unnecessary animations — clarity > flash.

---

## Responsive Rules (Global)

- One-column layout on mobile
- Touch targets ≥ 44px
- No hover-only interactions
- Bottom sheets instead of dropdowns on mobile
- Sticky primary CTA on mobile
- Chat input fixed at bottom on mobile

---

## Design Principles

1. **Clean, calm, trustworthy**
2. **Privacy-first visual tone**
3. **Professional SaaS** (not flashy AI)
4. **Developer + creator friendly**
5. **Scales from MVP → enterprise**
