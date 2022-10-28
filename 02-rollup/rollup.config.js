import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import postcss from 'rollup-plugin-postcss'
import { terser } from "rollup-plugin-terser";


export default {
  input: "src/main.js", // 入口文件
  output: {
    file: "dist/bundle.cjs.js", // 打包后生成文件的位置及文件名
    format: "cjs", // 文件输入格式（commonjs规范）
    name: "bundle", // 包输入全局变量的名称
  },
  plugins: [
    // 使用插件
    typescript(),
    resolve(),
    commonjs(),
    babel({
      exclude: "node_modules/**", // 排除node_modules 只编译源代码
      babelHelpers: "bundled",
    }),
    postcss(),
    // terser()
  ],
  external: ["lodash"],
};
