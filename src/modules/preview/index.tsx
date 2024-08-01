import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { debounce } from 'lodash-es'
// import Editor from '../code-editor/Editor'
import { PlaygroundContext } from '../../context/PlaygroundContext'
import CompilerWorker from './compiler.worker?worker'
import iframeRaw from './iframe.html?raw'
import { IMPORT_MAP_FILE_NAME } from '../../files'
import Message from '../../components/message'

interface MessageData {
  data: {
    type: string
    message: string
  }
}

export default function Preview() {
  const { files } = useContext(PlaygroundContext)
  const [compiledCode, setCompiledCode] = useState('')
  const [error, setError] = useState('')
  const compilerWorkerRef = useRef<Worker>()

  const getIFrameURL = useCallback(() => {
    const res = iframeRaw
      // 把 import-map.json 的内容填充进去
      .replace('<script type="importmap"></script>', `<script type="importmap">${files[IMPORT_MAP_FILE_NAME].value}</script>`)
      .replace('<script type="module" id="appSrc"></script>', `<script type="module" id="appSrc">${compiledCode}</script>`)
    return URL.createObjectURL(new Blob([res], { type: 'text/html' }))
  }, [compiledCode, files])

  const [iframeURL, setIframeURL] = useState(getIFrameURL())

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(
    debounce(() => {
      // 重新编译时先清楚错误信息
      setError('')
      compilerWorkerRef.current?.postMessage({
        type: 'COMPILE',
        data: files,
      })
    }, 500),
    [files]
  )

  useEffect(() => {
    if (compilerWorkerRef.current) return
    compilerWorkerRef.current = new CompilerWorker()
    compilerWorkerRef.current.addEventListener('message', ({ data }) => {
      if (data?.type === 'COMPILED_CODE') {
        setCompiledCode(data.data)
        return
      }
      if (data?.type === 'ERROR') {
        setError(data.error)
        return
      }
    })
  }, [])

  useEffect(() => {
    setIframeURL(getIFrameURL())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files[IMPORT_MAP_FILE_NAME].value, compiledCode])

  const handleMessage = useCallback((msg: MessageData) => {
    const { type, message } = msg.data
    if (type === 'ERROR') {
      setError(message)
    }
  }, [])

  useEffect(() => {
    window.addEventListener('message', handleMessage)
    return () => {
      window.removeEventListener('message', handleMessage)
    }
  }, [handleMessage])

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
      <Message type="error" content={error} />
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
