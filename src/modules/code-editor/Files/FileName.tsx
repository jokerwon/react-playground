import classnames from 'classnames'
import React, { useState } from 'react'

export interface FileNameProps {
  value: string
  actived: boolean
  onClick: () => void
}

const FileName: React.FC<FileNameProps> = (props) => {
  const { value, actived = false, onClick } = props

  const [name] = useState(value)

  return (
    <div className={classnames('relative inline-block text-[13px] cursor-pointer', actived ? 'cursor-text border-b-2 border-[#00D8FF] text-[#00D8FF]' : null)} onClick={onClick}>
      <span className="inline-block px-[10px] pt-[8px] pb-[6px] leading-5">{name}</span>
    </div>
  )
}

export default FileName
