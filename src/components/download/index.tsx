import { useContext } from 'react'
import classNames from 'classnames'
import { downloadFiles } from '../../utils'
import { PlaygroundContext } from '../../context/PlaygroundContext'

interface Props {
  className?: string
}

export default function Donwload({ className }: Props) {
  const { files } = useContext(PlaygroundContext)

  return (
    <span
      className={classNames('inline-flex items-center cursor-pointer p-1', className)}
      onClick={async () => {
        try {
          confirm('Are you sure you want to download all files?') && (await downloadFiles(files))
        } catch (error) {
          alert('Download failed!')
        }
      }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 32 32">
        <path fill="currentColor" d="M26 24v4H6v-4H4v4a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2v-4zm0-10l-1.41-1.41L17 20.17V2h-2v18.17l-7.59-7.58L6 14l10 10l10-10z" />
      </svg>
    </span>
  )
}
