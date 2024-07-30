import { useContext } from 'react'
import { debounce } from 'lodash-es'
import { PlaygroundContext } from '../../context/PlaygroundContext'
import Editor from './Editor'
import Files from './Files'

export default function CodeEditor() {
  const { files, selectedFileName, setFiles } = useContext(PlaygroundContext)

  const file = files[selectedFileName]

  function onEditorChange(value?: string) {
    files[file.name].value = value!
    setFiles({ ...files })
  }

  return (
    <div className="flex flex-col h-full">
      <div>
        <Files />
      </div>
      <div className="flex-1">
        <Editor file={file} onChange={debounce(onEditorChange, 500)} />
      </div>
    </div>
  )
}
