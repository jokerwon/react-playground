import typescript from 'typescript'
import { setupTypeAcquisition } from '@typescript/ata'

/**
 * @typescript/ata is a dependency for downloading *.d.ts files corresponding to a Node.js source file. Relies on API's provided by jsdelivr.
 * @param onDownloadFile
 * @returns
 */
export function createATA(onDownloadFile: (code: string, path: string) => void) {
  const ata = setupTypeAcquisition({
    projectName: 'my-ata',
    typescript,
    logger: console,
    delegate: {
      receivedFile(code, path) {
        // console.log('自动下载的包', path)
        onDownloadFile(code, path)
      },
    },
  })

  return ata
}
