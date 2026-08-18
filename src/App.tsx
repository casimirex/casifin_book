import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { book } from './data/book'
import { formulaCategories } from './data/formulas'
import { Cover } from './components/Cover'
import { Section } from './components/Section'
import { Sidebar } from './components/Sidebar'
import { FormulaSidebar } from './components/FormulaSidebar'
import { FormulaContent } from './components/FormulaContent'
import { RichText } from './components/RichText'

type Theme = 'light' | 'dark'
type View = 'blueprint' | 'formulas'

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'light'
  const stored = window.localStorage.getItem('fos-theme')
  if (stored === 'light' || stored === 'dark') return stored
  return 'light'
}

export default function App() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)
  const [view, setView] = useState<View>('blueprint')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeId, setActiveId] = useState('intro')
  const [progress, setProgress] = useState(0)
  const searchRef = useRef<HTMLInputElement>(null)

  // Apply theme to <html>
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    window.localStorage.setItem('fos-theme', theme)
  }, [theme])

  // Scrollspy + reading progress
  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const doc = document.documentElement
        const max = doc.scrollHeight - window.innerHeight
        setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0)

        const sections = Array.from(
          document.querySelectorAll<HTMLElement>('[data-section]'),
        )
        let current = sections[0]?.id ?? 'intro'
        for (const s of sections) {
          if (s.getBoundingClientRect().top <= 140) current = s.id
        }
        setActiveId(current)
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  // Keyboard shortcuts
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        searchRef.current?.focus()
      } else if (e.key === 'Escape') {
        if (searchQuery) setSearchQuery('')
        else setSidebarOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [searchQuery])

  const navigate = useCallback((id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setSidebarOpen(false)
  }, [])

  const switchView = useCallback((next: View) => {
    setView(next)
    setSearchQuery('')
    setSidebarOpen(false)
    window.scrollTo({ top: 0 })
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === 'light' ? 'dark' : 'light'))
  }, [])

  const sections = useMemo(() => book.sections, [])

  return (
    <div className="app">
      <div className="progress-track" aria-hidden="true">
        <div className="progress-fill" style={{ width: `${progress * 100}%` }} />
      </div>

      <header className="topbar">
        <button
          className="icon-btn menu-toggle"
          onClick={() => setSidebarOpen((o) => !o)}
          aria-label="Toggle table of contents"
        >
          ☰
        </button>
        <div className="topbar-brand">
          <span className="brand-mark">⚖️</span>
          <span>Financial OS</span>
        </div>

        <div className="view-switch" role="tablist" aria-label="View">
          <button
            role="tab"
            aria-selected={view === 'blueprint'}
            className={view === 'blueprint' ? 'active' : ''}
            onClick={() => switchView('blueprint')}
          >
            Blueprint
          </button>
          <button
            role="tab"
            aria-selected={view === 'formulas'}
            className={view === 'formulas' ? 'active' : ''}
            onClick={() => switchView('formulas')}
          >
            Formulas
          </button>
        </div>

        <div className="topbar-spacer" />
        <button
          className="icon-btn"
          onClick={() => searchRef.current?.focus()}
          aria-label="Search"
          title="Search (Ctrl+K)"
        >
          🔍
        </button>
        <button
          className="icon-btn"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          title="Toggle theme"
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </header>

      <div className="layout">
        <div
          className={`sidebar-overlay${sidebarOpen ? ' show' : ''}`}
          onClick={() => setSidebarOpen(false)}
        />
        <aside className={`sidebar${sidebarOpen ? ' open' : ''}`}>
          {view === 'blueprint' ? (
            <Sidebar
              book={book}
              activeId={activeId}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onNavigate={navigate}
              inputRef={searchRef}
            />
          ) : (
            <FormulaSidebar
              categories={formulaCategories}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onNavigate={navigate}
              inputRef={searchRef}
            />
          )}
        </aside>

        <main className="content">
          {view === 'blueprint' ? (
            <article className="book">
              <div data-section id="cover">
                <Cover book={book} />
              </div>

              {sections.map((section) => (
                <Section key={section.id} section={section} />
              ))}

              <footer className="book-footer">
                <div className="footer-mark">⚖️</div>
                <p>
                  <RichText text={book.footer} />
                </p>
              </footer>
            </article>
          ) : (
            <FormulaContent categories={formulaCategories} />
          )}
        </main>
      </div>
    </div>
  )
}
