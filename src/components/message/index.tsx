import { useEffect, useState } from 'react'
import classNames from 'classnames'

import './index.css'

export interface MessageProps {
  type: 'error' | 'warn'
  content: string
}

export default function Message(props: MessageProps) {
  const { type, content } = props
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(!!content)
  }, [content])

  return (
    visible && (
      <div className={classNames('rp-message__wrapper', type)}>
        <pre dangerouslySetInnerHTML={{ __html: content }}></pre>
        <button className="rp-message__dismiss" onClick={() => setVisible(false)}>
          ✕
        </button>
      </div>
    )
  )
}
