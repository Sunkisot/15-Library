import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import postcss from "rollup-plugin-postcss";
import livereload from "rollup-plugin-livereload";
import alias from "@rollup/plugin-alias";
import serve from "rollup-plugin-serve";
// import dev from "rollup-plugin-dev";
import { terser } from "rollup-plugin-terser";
import vue from "rollup-plugin-vue";

const path = require("path");
const resolveDir = (dir) => path.join(__dirname, dir);

export default {
  input: "src/main.js", // 入口文件
  output: {
    file: "dist/bundle.cjs.js", // 打包后生成文件的位置及文件名
    format: "cjs", // 文件输入格式（commonjs规范）
    name: "bundle", // 包输入全局变量的名称
    sourcemap: true, // sourcemap
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
    postcss({
      // 把 css 插入到 style 中
      // inject: true,
      // 把 css 放到和js同一目录
      extract: true,
    }),
    alias({
      entries: [{ find: "@", replacement: resolveDir("src") }],
    }),
    livereload(),
    serve({
      open: true,
      port: 8888,
      contentBase: "",
    }),
    vue({
      // 动态注入css
      css: true,
      // 将模板显式转换为render函数
      compileTemplate: true,
    }),
    // dev({
    //   port: 8888,
    //   dirs: []
    // })
    // terser()
  ],
  external: ["lodash"],
};
