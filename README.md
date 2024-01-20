This is a Foundation UI Library project for React Application by @chunchunmaru
Built in isolation with Storybook and bundled with rollup!

## What is it?

React UI Component Library built with [@shadcn/ui](https://ui.shadcn.com/) component. A custom component library that helps you setup how you want.
Initially Bootstrapped with `npx create-next-app@latest`.
Uses Tailwind for styling, you can extend the `tailwind.config.js` as well to suit on your project
To add component simply do:

```js
npx shadcn-ui@latest add button
```

And Customize to your liking. More on their [docs](https://ui.shadcn.com/docs/)

- Use storybook to develop and test in isolation.
- Bundled with rollup with both `cjs` and `esm`
- Extend tailwind config on your library

## Development

- To run storybook on development, App will run on [http://localhost:6006](http://localhost:6006):

```bash
npm run storybook
```

- To build storybook as static site and host:

```bash
build-storybook
```

- To export your build have it as a publish ready package:

```bash
npm run build:lib
```

**Exported build files for the library will be in `./dist` folder**

If you are creating/updating docs on `.mdx` files, it will also update the latest date thanks to `husky` and `lint-staged`.

I have created a **Custom Script** that will insert the `last modified date` of the documentation, making it helpful to track the last modified changes.

- Bash Script is inside `.husky/last-updated`

## Installation

Import Component, Hooks, Utils, Styles and many more by simply importing.

```bash
npm i @chunchunmaru0/ui-foundation-lib
```

```js
//Importing

import { Button } from "@chunchunmaru0/ui-foundation-lib";
export default function Home() {
  return <Button variant={"default"}>My Custom Button</Button>;
}
```

### Configuring Tailwind Import / Styles

```css
/* globals.css */
/* Import compiled postcss from Tailwind */
@import "ui-foundation-lib/dist/index.css";

@tailwind base;
@tailwind components;
@tailwind utilities;
```
I think the import also works if you import directly on your `layout.tsx`.
---
According to tailwind [docs]() this should work, but it's throwing me an error when importing tw config.

```
@config "\ui-foundation-lib\dist\tailwind.config.js";

```
So I found another hacky-way using JS Spreader `...`, to apply custom config on your tailwind.

```js
//tailwind.config.ts
import type { Config } from "tailwindcss";
import foundation_config from "ui-foundation-lib/dist/tailwind.config";
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    ...foundation_config.theme, // spreading whatever is inside the object here of theme
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      ...foundation_config.theme.extend // You cannot overwrite the config here, TS/Linter will scold you
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;

```
So yeah, if anyone figured out a way to configure the `tailwind.config.ts`, please kindly open a PR. Thanks.

## Peer Dependencies

Since, this project is React Component Library, `react` and `react-dom` are installed as `peerDependencies`, so these will be installed on the consumer application always and we can exclude it from our build on `rollup.config.mjs`.

I've `next` as `peerDependencies` since I'm planning to make reusable component that can be used on `nextJS` application like `next/navigation` and other **server component** and **server actions**.

I've left `app` dir as it is, just incase someone one to develop it that way. But I'm planning on chaning the `scripts`.

## Bundling with Roll Up

Decided to take rollup since, this is mainly for a library, there are various `rollup-plugins` used to suit the needs of mine.
Along with the "standard" / "required" plugin to complie/build, I have added 
```
      progress({ clearLine: true }),
      sizes(),
      visualizer(),
```

to see the build progress, sizes and later visualize the bundle.

Furthermore, According to my research if we want "named" import such as
```js
import { Button } from "@chunchunmaru0/ui-foundation-lib/dist/component/Button"
```
so that we don't need to import entire package just for button and to reduce the bundle size when importing,
we need to have explicitly write the input path on our `rollup.config.mjs` to produce such output.