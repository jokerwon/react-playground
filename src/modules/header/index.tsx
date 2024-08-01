import ThemeSwitcher from '../../components/theme-switcher'
import Share from '../../components/share'

import reactLogo from '@/assets/react.svg'
import Donwload from '../../components/download'

export default function Header() {
  return (
    <nav className="bg-[var(--rc-base-bg)] text-[var(--rc-base-color)] relative z-[999] flex justify-between items-center px-4 py-2 shadow">
      <h1 className="inline-flex place-items-center">
        <img src={reactLogo} />
        <span className="ml-2 text-xl font-semibold">React Playground</span>
      </h1>
      <div className="flex items-center text-lg">
        <Donwload className="mr-2" />
        <Share className="mr-2" />
        <ThemeSwitcher />
      </div>
    </nav>
  )
}
