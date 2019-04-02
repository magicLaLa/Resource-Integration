# Webpack4搭建项目环境

## 初始化项目

```bash
npm init -y
```

## 安装 Webpack4 及 相关插件

```bash
npm i webpack webpack-cli -D
npm install webpack-merge --save-dev
npm install webpack-dev-server --save-dev
npm install --save-dev clean-webpack-plugin
```

## 安装 bebel

```bash
npm install --save-dev babel-loader @babel/core
npm install @babel/preset-env --save-dev
```

## 本地IP

```bash
npm install my-local-ip --save-dev
```

## vue 相关

```bash
npm install --save vue
npm install --save-dev vue-loader vue-template-compiler
```

## 样式相关

```bash
npm install --save-dev css-loader style-loader
npm i postcss-loader autoprefixer -D
```

## 文件相关

```
npm install --save-dev file-loader url-loader
npm install --save-dev svg-sprite-loader
```