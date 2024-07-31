import { useCallback, useContext, useEffect, useState } from 'react'
// import Editor from '../code-editor/Editor'
import { PlaygroundContext } from '../../context/PlaygroundContext'
import { compile } from './compiler'
import iframeRaw from './iframe.html?raw'
import { IMPORT_MAP_FILE_NAME } from '../../files'

export default function Preview() {
  const { files } = useContext(PlaygroundContext)
  const [compiledCode, setCompiledCode] = useState('')

  const getIFrameURL = useCallback(() => {
    const res = iframeRaw
      // 把 import-map.json 的内容填充进去
      .replace('<script type="importmap"></script>', `<script type="importmap">${files[IMPORT_MAP_FILE_NAME].value}</script>`)
      .replace('<script type="module" id="appSrc"></script>', `<script type="module" id="appSrc">${compiledCode}</script>`)
    return URL.createObjectURL(new Blob([res], { type: 'text/html' }))
  }, [compiledCode, files])

  const [iframeURL, setIframeURL] = useState(getIFrameURL())

  useEffect(() => {
    const res = compile(files)
    setCompiledCode(res)
  }, [files])

  useEffect(() => {
    setIframeURL(getIFrameURL())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files[IMPORT_MAP_FILE_NAME].value, compiledCode])

  return (
    <div className="h-full">
      <iframe
        src={iframeURL}
        style={{
          width: '100%',
          height: '100%',
          padding: 0,
          border: 'none',
        }}
      />
      {/* <Editor
        file={{
          name: 'dist.js',
          value: compiledCode,
          language: 'javascript',
        }}
      /> */}
    </div>
  )
}
