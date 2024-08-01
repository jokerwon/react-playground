import { useContext, useEffect, useState } from 'react'
import { PlaygroundContext } from '../../../context/PlaygroundContext'
import { ENTRY_FILE_NAME, READONLY_FILES } from '../../../files'
import FileName from './FileName'

import './index.css'

export default function Files() {
  const { files, selectedFileName, setSelectedFileName, updateFileName, addFile, removeFile } = useContext(PlaygroundContext)
  const [tabs, setTabs] = useState([''])
  const [creating, setCreating] = useState(false)

  useEffect(() => {
    setTabs(Object.keys(files))
  }, [files])

  const handleEditComplete = (old: string, fresh: string) => {
    updateFileName(old, fresh)
    setSelectedFileName(fresh)
  }

  const handleAddFile = () => {
    const newFileName = 'Comp' + Math.random().toString().slice(2, 6) + '.tsx'
    addFile(newFileName)
    setSelectedFileName(newFileName)
    setCreating(true)
  }

  const handleRemove = (name: string) => {
    removeFile(name)
    setSelectedFileName(ENTRY_FILE_NAME)
  }

  return (
    <div className="bg-[var(--rc-base-bg)] text-[var(--rc-base-color)] tabs relative flex h-[38px] overflow-y-hidden overflow-x-auto whitespace-nowrap">
      {tabs.map((item, index, arr) => (
        <FileName
          value={item}
          readonly={READONLY_FILES.includes(item)}
          creating={creating && index === arr.length - 1}
          actived={selectedFileName === item}
          key={item + index}
          onClick={() => setSelectedFileName(item)}
          onEditComplete={(name) => handleEditComplete(item, name)}
          onRemove={(e) => {
            e.stopPropagation()
            confirm('Are you sure to delete this file?') && handleRemove(item)
          }}
        />
      ))}
      <div className="h-full inline-flex items-center ml-1 px-1 text-lg cursor-pointer select-none" onClick={handleAddFile}>
        <span className='mb-[3px]'>+</span>
      </div>
    </div>
  )
}
