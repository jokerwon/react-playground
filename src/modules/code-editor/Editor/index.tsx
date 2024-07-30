import MonacoEditor, { EditorProps, OnMount } from '@monaco-editor/react'
import { editor } from 'monaco-editor'
import { createATA } from './ata'

export interface EditorFile {
  name: string
  value: string
  language: string
}

interface Props {
  file: EditorFile
  onChange?: EditorProps['onChange']
  options?: editor.IStandaloneEditorConstructionOptions
}

export default function Editor(props: Props) {
  const { file, onChange, options } = props

  const onEditorMount: OnMount = (editor, monaco) => {
    // 监听按键
    editor.addCommand(monaco.KeyMod.Shift | monaco.KeyMod.Alt | monaco.KeyCode.KeyF, () => {
      // 执行格式化命令
      editor.getAction('editor.action.formatDocument')?.run()
    })

    // 设置 tsconfig.json
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      jsx: monaco.languages.typescript.JsxEmit.Preserve,
      esModuleInterop: true,
    })

    // 初始化 ATA
    const ata = createATA((code, path) => {
      monaco.languages.typescript.typescriptDefaults.addExtraLib(code, `file://${path}`)
    })

    // 监听文件内容变化
    editor.onDidChangeModelContent(() => {
      // 内容变化时解析依赖的类型并自动下载
      ata(editor.getValue())
    })

    ata(editor.getValue())
  }

  return (
    <MonacoEditor
      height="100%"
      path={file.name}
      language={file.language}
      value={file.value}
      options={{
        fontSize: 14,
        scrollBeyondLastLine: false, // 到最后一行后是否可以继续滚动
        minimap: {
          enabled: false, // 关闭缩略图
        },
        scrollbar: {
          verticalScrollbarSize: 6,
          horizontalScrollbarSize: 6,
        },
        ...(options || {}),
      }}
      onChange={onChange}
      onMount={onEditorMount}
    />
  )
}
