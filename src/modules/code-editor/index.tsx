import Editor from './Editor'
import Files from './Files'

export default function CodeEditor() {
  const file = {
    name: 'a.tsx',
    value: 'const a = <div>guang</div>',
    language: 'typescript',
  }

  function onEditorChange(...args: any[]) {
    console.log(...args)
  }

  return (
    <div className="flex flex-col h-full">
      <div>
        <Files />
      </div>
      <div className="flex-1">
        <Editor file={file} onChange={onEditorChange} />
      </div>
    </div>
  )
}
