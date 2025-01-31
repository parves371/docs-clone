This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

Here's a comprehensive documentation for your Tiptap font size extension:

```typescript
import { Extension } from "@tiptap/react";
import "@tiptap/extension-text-style";

declare module "@tiptap/react" {
  interface Commands<ReturnType> {
    fontSize: {
      /**
       * Set the font size
       */
      setFontSize: (fontSize: string) => ReturnType;
      /**
       * Unset the font size
       */
      unsetFontSize: () => ReturnType;
    };
  }
}

export const FontSizeExtension = Extension.create({
  name: "fontSize",
  addOptions() {
    return {
      types: ["textStyle"],
    };
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontSize: {
            default: null,
            parseHTML: (element) => element.style.fontSize,
            renderHTML: (attributes) => {
              if (!attributes.fontSize) {
                return {};
              }

              return {
                style: `font-size: ${attributes.fontSize}`,
              };
            },
          },
        },
      },
    ];
  },
  addCommands() {
    return {
      setFontSize:
        (fontSize: string) =>
        ({ chain }) => {
          return chain().setMark("textStyle", { fontSize }).run();
        },
      unsetFontSize:
        () =>
        ({ chain }) => {
          return chain()
            .setMark("textStyle", { fontSize: null })
            .removeEmptyTextStyle()
            .run();
        },
    };
  },
});
```

2. Create a new file `font-size-extension.ts` and add the extension code provided below.

## Usage

### Basic Setup

```typescript
import { Editor } from "@tiptap/core";
import { FontSize } from "./font-size-extension";

const editor = new Editor({
  extensions: [
    // Other extensions...
    FontSize,
  ],
});
```

### In Your Component

```tsx
// React example
function EditorControls() {
  return (
    <div>
      <button onClick={() => editor.commands.setFontSize(16)}>
        Medium Text
      </button>
      <button onClick={() => editor.commands.setFontSize(24)}>
        Large Text
      </button>
      <button onClick={() => editor.commands.unsetFontSize()}>
        Reset Size
      </button>
    </div>
  );
}
```

## API Reference

### Commands

| Command         | Parameters | Description                  |
| --------------- | ---------- | ---------------------------- |
| `setFontSize`   | `string`   | Sets font size in pixels     |
| `unsetFontSize` | -          | Removes font size formatting |

## Examples

### Setting Font Size

```typescript
// Set text to 16px
editor.commands.setFontSize(16);

// Set text to 24px
editor.commands.setFontSize(24);
```

### Clearing Font Size

```typescript
editor.commands.unsetFontSize();
```

### UI Integration

```tsx
// React dropdown example
function FontSizePicker() {
  const sizes = [12, 14, 16, 18, 24, 32];

  return (
    <select onChange={(e) => editor.commands.setFontSize(e.target.value)}>
      <option value="">Select Size</option>
      {sizes.map((size) => (
        <option key={size} value={size}>
          {size}px
        </option>
      ))}
    </select>
  );
}
```

## Customization

### Using Different Units

Modify the extension code to use `em` instead of pixels:

```typescript
// In the addGlobalAttributes section
renderHTML: (attributes) => {
  if (!attributes.fontSize) return {};
  return { style: `font-size: ${attributes.fontSize}em` };
};

// In commands (now accepts decimals)
editor.commands.setFontSize(1.2); // 1.2em
```

### Multiple Unit Support

```typescript
// Modify the command to accept strings
setFontSize: (size: string) =>
  ({ chain }) => {
    return chain().setMark("textStyle", { fontSize: size }).run();
  };

// Usage:
editor.commands.setFontSize("16px");
editor.commands.setFontSize("1.2rem");
editor.commands.setFontSize("120%");
```

## TypeScript Support

The extension includes full type declarations. You'll get:

- Autocomplete for commands
- Type checking for font size values
- Hover documentation in IDEs
