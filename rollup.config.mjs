import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import terser from "@rollup/plugin-terser";
import cleaner from "rollup-plugin-cleaner";
import dts from "rollup-plugin-dts";
import external from "rollup-plugin-peer-deps-external";
import typescript from "rollup-plugin-typescript2";

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
      cleaner({
        targets: ["./dist/"],
      }),
      external(),
      nodeResolve(),
      commonjs(),
      terser({
        compress: {
          directives: false,
        },
      }),
      typescript({
        tsconfig: "./tsconfig.json",
        useTsconfigDeclarationDir: true,
      }),
      replace({
        preventAssignment: false,
        "process.env.NODE_ENV": '"development"',
      }),
    ],
  },
  {
    input: "./dist/dts/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "es" }],
    plugins: [dts()],
  },
];

export default rollupConfig;
