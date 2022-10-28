import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import postcss from "rollup-plugin-postcss";
import alias from "@rollup/plugin-alias";
import { terser } from "rollup-plugin-terser";
import vue from "rollup-plugin-vue";
import externals from "rollup-plugin-node-externals";
import autoprefixer from "autoprefixer";
import cssnano from "cssnano";
import strip from '@rollup/plugin-strip'

const path = require("path");
const resolveDir = (dir) => path.join(__dirname, dir);

export default {
  input: "src/main.js", // 入口文件
  output: [
    {
      file: "dist/bundle.cjs.js", // 打包后生成文件的位置及文件名
      format: "cjs", // 文件输入格式（commonjs规范）
      name: "bundle", // 包输入全局变量的名称
      sourcemap: false, // sourcemap
    },
    {
      file: "dist/bundle.esm.js", // 打包后生成文件的位置及文件名
      format: "esm", // 文件输入格式（commonjs规范）
      name: "bundle", // 包输入全局变量的名称
      sourcemap: false, // sourcemap
    },
  ],
  plugins: [
    // 使用插件
    typescript({
      // 导出类型声明文件
      outDir: "dist",
      declaration: true,
      declarationDir: "dist",
    }),
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
      // extract: 'css/index.css', // 抽离单独的 css 文件
      plugins: [autoprefixer(), cssnano()],
    }),
    alias({
      entries: [{ find: "@", replacement: resolveDir("src") }],
    }),
    strip(), // 删除 debugger 语句和函数。包括 assert.equal、console.log 等等。
    vue({
      // 动态注入css
      css: true,
      // 将模板显式转换为render函数
      compileTemplate: true,
    }),
    externals({
      devDeps: false, // devDependencies 类型的依赖就不用加到 externals 了。
    }),
    // terser(),
  ],
  external: ["lodash"],
};
