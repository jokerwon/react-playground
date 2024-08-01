import reactLogo from '@/assets/react.svg'
import ThemeSwitcher from '../../components/theme-switcher'

export default function Header() {
  return (
    <nav className="bg-[var(--rc-base-bg)] text-[var(--rc-base-color)] relative z-[999] flex justify-between items-center px-4 py-2 shadow">
      <h1 className="inline-flex place-items-center">
        <img src={reactLogo} />
        <span className="ml-2 text-xl font-semibold">React Playground</span>
      </h1>
      <ThemeSwitcher />
    </nav>
  )
}
