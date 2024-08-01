import classnames from 'classnames'
import React, { MouseEventHandler, useEffect, useRef, useState } from 'react'

export interface FileNameProps {
  value: string
  actived: boolean
  creating: boolean
  readonly: boolean
  onClick: () => void
  onEditComplete: (name: string) => void
  onRemove: MouseEventHandler
}

const FileName: React.FC<FileNameProps> = (props) => {
  const { value, actived = false, creating, readonly, onClick, onEditComplete, onRemove } = props

  const [name, setFileName] = useState(value)
  const [editing, setEditing] = useState(creating)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleDoubleClick = () => {
    setEditing(true)
    setTimeout(() => {
      inputRef?.current?.focus()
    }, 0)
  }

  const handleInputBlur = () => {
    setEditing(false)
    onEditComplete?.(name)
  }

  useEffect(() => {
    if (creating) {
      inputRef.current?.focus()
    }
  }, [creating])

  return (
    <div className={classnames('relative inline-block text-[13px] cursor-pointer', actived ? 'cursor-text border-b-2 border-[#00D8FF] text-[#00D8FF]' : null)} onClick={onClick}>
      {editing ? (
        <input ref={inputRef} value={name} className="w-[80px] h-full px-[10px] outline-none border-none" onChange={(e) => setFileName(e.target.value)} onBlur={handleInputBlur} />
      ) : (
        <>
          <span className="inline-block px-[10px] pt-[8px] pb-[6px] leading-5" onDoubleClick={!readonly ? handleDoubleClick : () => {}}>
            {name}
          </span>
          {!readonly && (
            <span className="inline-flex h-full items-center cursor-pointer" onClick={onRemove}>
              <svg width="12" height="12" viewBox="0 0 24 24" className="mt-0.5">
                <line stroke="#999" x1="18" y1="6" x2="6" y2="18"></line>
                <line stroke="#999" x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </span>
          )}
        </>
      )}
    </div>
  )
}

export default FileName
