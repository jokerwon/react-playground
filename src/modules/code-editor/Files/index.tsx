import { useContext, useEffect, useState } from 'react'
import { PlaygroundContext } from '../../../context/PlaygroundContext'
import FileName from './FileName'

import './index.css'

export default function Files() {
  const { files, selectedFileName, setSelectedFileName } = useContext(PlaygroundContext)
  const [tabs, setTabs] = useState([''])

  useEffect(() => {
    setTabs(Object.keys(files))
  }, [files])

  return (
    <div className="tabs relative flex h-[38px] overflow-y-hidden overflow-x-auto border-b border-[#ddd] text-[#444] whitespace-nowrap">
      {tabs.map((item, index) => (
        <FileName value={item} actived={selectedFileName === item} key={item + index} onClick={() => setSelectedFileName(item)} />
      ))}
    </div>
  )
}
