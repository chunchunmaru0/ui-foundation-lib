import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import terser from "@rollup/plugin-terser";
import pkg from "./package.json" assert { type: "json" };
import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";
import sizes from "rollup-plugin-sizes";
import { visualizer } from "rollup-plugin-visualizer";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import PeerDepsExternalPlugin from "rollup-plugin-peer-deps-external";
import progress from "rollup-plugin-progress";

export default [
  {
    input: "src/index.ts",
    output: [
      { file: pkg.main, format: "cjs", sourcemap: true },
      {
        format: "esm",
        dir: "dist",
        preserveModules: true,
        preserveModulesRoot: "src",
        sourcemap: true,
        // exports: "named", // Specify the exports option here
      },
    ],
    plugins: [
      typescript({ tsconfig: "./tsconfig.json" }),
      resolve(),
      PeerDepsExternalPlugin(),
      commonjs(),
      terser(),
      postcss({
        autoModules: true,
        plugins: [tailwindcss, autoprefixer],
        extract: "index.css",
        sourceMap: true,
      }),
      progress({ clearLine: true }),
      sizes(),
      visualizer(),
    ],
    external: Object.keys(pkg.peerDependencies),
    onwarn: (warning, warn) => {
      //   if (warning.code === "UNUSED_EXTERNAL_IMPORT") return;
      warn(warning);
    },
  },
  {
    input: "tailwind.config.ts",
    output: [
      { file: "dist/tailwind.config.js", format: "esm", sourcemap: true },
    ],
    plugins: [typescript()],
  },
];
