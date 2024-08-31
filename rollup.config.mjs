import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
import cleaner from "rollup-plugin-cleaner";
import external from "rollup-plugin-peer-deps-external";

const rollupConfig = [
  {
    input: "./src/index.ts",
    output: [
      {
        file: "dist/index.js",
        format: "cjs",
        sourcemap: true,
      },
      {
        file: "dist/index.es.js",
        format: "es",
        exports: "named",
        sourcemap: true,
      },
    ],
    plugins: [
      external(),
      resolve(),
      commonjs(),
      terser(),
      cleaner({
        targets: ["./dist/"],
      }),
      typescript(),
    ],
  },
];

export default rollupConfig;
