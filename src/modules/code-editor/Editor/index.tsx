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
    editor.addCommand(monaco.KeyMod.Shift | monaco.KeyMod.Alt | monaco.KeyCode.KeyF, () => {
      editor.getAction('editor.action.formatDocument')?.run()
    })

    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      jsx: monaco.languages.typescript.JsxEmit.Preserve,
      esModuleInterop: true,
    })

    const ata = createATA((code, path) => {
      monaco.languages.typescript.typescriptDefaults.addExtraLib(code, `file://${path}`)
    })

    editor.onDidChangeModelContent(() => {
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
