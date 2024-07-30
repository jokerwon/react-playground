import reactLogo from '@/assets/react.svg'

export default function Header() {
  return (
    <nav className="relative z-[999] flex justify-between items-center px-4 py-2 shadow">
      <h1 className="inline-flex place-items-center">
        <img src={reactLogo} />
        <span>React Playground</span>
      </h1>
    </nav>
  )
}
