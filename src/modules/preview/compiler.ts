import { transform } from '@babel/standalone'
import type { PluginObj } from '@babel/core'
import { File, Files } from '../../context/PlaygroundContext'
import { ENTRY_FILE_NAME } from '../../files'

function customResolver(files: Files): PluginObj {
  return {
    visitor: {
      ImportDeclaration(path) {
        const modulePath = path.node.source.value
        // 本地模块
        if (modulePath.startsWith('.')) {
          const file = getModuleFile(files, modulePath)
          if (!file) return

          if (file.name.endsWith('.css')) {
            path.node.source.value = css2Js(file)
          } else if (file.name.endsWith('.json')) {
            path.node.source.value = json2Js(file)
          } else {
            // ts 文件需要编译
            path.node.source.value = URL.createObjectURL(
              new Blob([babelTransform(file.name, file.value, files)], {
                type: 'application/javascript',
              })
            )
          }
        }
      },
    },
  }
}

// 添加 React 的自动导入
export const beforeTransformCode = (filename: string, code: string) => {
  let _code = code
  const regexReact = /import\s+React\s+/g
  if ((filename.endsWith('.jsx') || filename.endsWith('.tsx')) && !regexReact.test(code)) {
    _code = `import React from 'react';\n${code}`
  }
  return _code
}

export const babelTransform = (filename: string, code: string, files: Files) => {
  const _code = beforeTransformCode(filename, code)
  let result = ''
  try {
    result = transform(_code, {
      filename,
      presets: ['react', 'typescript'],
      plugins: [customResolver(files)],
      retainLines: true,
    }).code!
  } catch (e) {
    console.error('编译出错', e)
  }
  return result
}

export const compile = (files: Files) => {
  const main = files[ENTRY_FILE_NAME]
  return babelTransform(ENTRY_FILE_NAME, main.value, files)
}

function getModuleFile(files: Files, modulePath: string) {
  let moduleName = modulePath.split('./').pop() || ''
  // import xx from './xx' => xx.ts
  if (!moduleName.includes('.')) {
    const realModuleName = Object.keys(files)
      .filter((key) => {
        return key.endsWith('.ts') || key.endsWith('.tsx') || key.endsWith('.js') || key.endsWith('.jsx')
      })
      .find((key) => {
        return key.split('.').includes(moduleName)
      })
    if (realModuleName) {
      moduleName = realModuleName
    }
  }
  return files[moduleName]
}

function css2Js(file: File): string {
  const randomId = new Date().getTime()
  // 创建一个 style 标签，把内容填进去，然后插入到 head 中
  const js = `
(() => {
    const stylesheet = document.createElement('style')
    stylesheet.setAttribute('id', 'style_${randomId}_${file.name}')
    document.head.appendChild(stylesheet)

    const styles = document.createTextNode(\`${file.value}\`)
    stylesheet.innerHTML = ''
    stylesheet.appendChild(styles)
})()
  `
  return URL.createObjectURL(new Blob([js], { type: 'application/javascript' }))
}

function json2Js(file: File): string {
  const json = `export default ${file.value}`
  return URL.createObjectURL(new Blob([json], { type: 'application/javascript' }))
}
