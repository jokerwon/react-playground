# React Playground

## Features

- [x] 代码编辑
- [x] 本地编译
- [x] 实时预览
- [x] 多文件切换
- [x] 导入远程模块
- [x] 导入本地模块
- [x] 分享链接
- [x] 打包下载
- [x] 主题切换

## Dependencies

- vite
- react/react-dom
- @babel/standalone
  编译
- @monaco-editor/react
  编辑器
- @typescript/ata
  自动解析依赖并下载 dts
- allotment
  自动分屏
- fflate
  字符压缩
- file-saver
  文件保存
- jszip
  打包 zip

## Schema

- [importmap](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/script/type/importmap)
  远程模块引入
- [blob](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob)
- [URL.createObjectURL](https://developer.mozilla.org/zh-CN/docs/Web/API/URL/createObjectURL_static)
  将编译后的模块保存到内存中，并生成对应的 URL
- [iframe](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/iframe)
  实现实时预览
- 分享
  将 `files` 信息序列化后压缩保存到 `URL` 的 `hash` 中
- 下载
  将 `files` 中的内容序列化后压缩保存到 `zip` 中，并使用 `file-saver` 下载
- 使用 Web Worker 提升编译性能

## Summary

- 用 @monaco-editor/react 实现了网页版 typescript 编辑器，并且实现了自动类型导入
- 通过 @babel/standalone 实现了文件编译，并且写了一个 babel 插件实现了 import 的 source 的修改
- 通过 blob url 来内联引入其他模块的代码，通过 import maps 来引入 react、react-dom 等第三方包的代码
- 通过 iframe 实现了预览功能，并且通过 postMessage 和父窗口通信来显示代码运行时的错误
- 基于 css 变量 + context 实现了主题切换功能
- 通过 fflate + btoa 实现了文件内容的编码、解码，可以通过链接分享代码
- 通过 Performance 分析性能问题，并通过 Web Worker 拆分编译逻辑到 worker 线程来进行性能优化，消除了 long lask
