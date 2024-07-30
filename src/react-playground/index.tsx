import { Allotment } from 'allotment'
import Header from '../modules/header'
import CodeEditor from '../modules/code-editor'
import Preview from '../modules/preview'

import 'allotment/dist/style.css'

export default function ReactPlayground() {
  return (
    <div className="h-screen flex flex-col">
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
