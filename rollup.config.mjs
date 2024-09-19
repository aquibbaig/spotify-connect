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
      terser(),
      typescript({
        tsconfig: "./tsconfig.json",
        useTsconfigDeclarationDir: true,
      }),
      replace({
        preventAssignment: false,
        "process.env.NODE_ENV": '"development"',
      }),
    ],
    /**
     * When you build a library that should use host's runtime, in your case react and react-dom, you have to externalize them.
     * remove react and react-dom from dependencies and put them into devDependencies and peerDependencies instead.
     * devDependencies signal that you use react for development locally,
     * and peerDependencies signal that for production, react will be provided by the host app.
     */
    external: ["react", "react-dom"],
  },
  {
    input: "./dist/dts/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "es" }],
    plugins: [dts()],
  },
];

export default rollupConfig;
