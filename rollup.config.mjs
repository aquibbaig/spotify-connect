import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
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
      nodeResolve(),
      commonjs(),
      terser({
        compress: {
          directives: false,
        },
      }),
      cleaner({
        targets: ["./dist/"],
      }),
      typescript(),
      replace({
        preventAssignment: false,
        "process.env.NODE_ENV": '"development"',
      }),
    ],
  },
];

export default rollupConfig;
