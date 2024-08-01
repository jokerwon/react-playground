import { useContext } from 'react'
import { Allotment } from 'allotment'
import classNames from 'classnames'
import Header from '../modules/header'
import CodeEditor from '../modules/code-editor'
import Preview from '../modules/preview'
import { PlaygroundContext } from '../context/PlaygroundContext'

import 'allotment/dist/style.css'
import './index.css'

export default function ReactPlayground() {
  const { theme } = useContext(PlaygroundContext)
  return (
    <div className={classNames('h-screen flex flex-col', theme)}>
      <Header />
      <main className="flex-1">
        <Allotment defaultSizes={[100, 100]}>
          <Allotment.Pane minSize={500}>
            <CodeEditor />
          </Allotment.Pane>
          <Allotment.Pane minSize={0}>
            <Preview />
          </Allotment.Pane>
        </Allotment>
      </main>
    </div>
  )
}
