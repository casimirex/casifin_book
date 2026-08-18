import type { RefObject } from 'react'
import type { Book } from '../types'
import { LEVEL_META } from '../data/book'
import { levelColorVar } from '../lib/level'
import { searchBook } from '../lib/search'

interface SidebarProps {
  book: Book
  activeId: string
  searchQuery: string
  onSearchChange: (q: string) => void
  onNavigate: (id: string) => void
  inputRef?: RefObject<HTMLInputElement>
}

export function Sidebar({
  book,
  activeId,
  searchQuery,
  onSearchChange,
  onNavigate,
  inputRef,
}: SidebarProps) {
  const results = searchBook(book, searchQuery)
  const searching = searchQuery.trim().length > 0

  return (
    <>
      <div className="sidebar-search">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search chapters…"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label="Search chapters"
          />
          {!searching && <span className="kbd">⌘K</span>}
        </div>
      </div>

      <nav className="toc" aria-label="Table of contents">
        {searching ? (
          results.length === 0 ? (
            <div className="toc-empty">No chapters match “{searchQuery}”.</div>
          ) : (
            results.map((r) => (
              <a
                key={r.id}
                href={`#${r.id}`}
                className="toc-link"
                onClick={(e) => {
                  e.preventDefault()
                  onNavigate(r.id)
                }}
              >
                <span className="num">{r.number ?? '·'}</span>
                <span>
                  {r.title}
                  <span
                    style={{
                      display: 'block',
                      fontSize: '11px',
                      color: 'var(--text-faint)',
                      marginTop: '2px',
                      lineHeight: 1.4,
                    }}
                  >
                    {r.snippet}
                  </span>
                </span>
              </a>
            ))
          )
        ) : (
          book.sections.map((section) => {
            if (section.kind === 'divider') {
              return (
                <div className="toc-level" key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="toc-level-head"
                    onClick={(e) => {
                      e.preventDefault()
                      onNavigate(section.id)
                    }}
                  >
                    <span
                      className="dot"
                      style={{ background: levelColorVar(section.level) }}
                    />
                    {LEVEL_META[section.level].label}
                  </a>
                </div>
              )
            }
            return (
              <a
                key={section.id}
                href={`#${section.id}`}
                className={`toc-link${activeId === section.id ? ' active' : ''}`}
                onClick={(e) => {
                  e.preventDefault()
                  onNavigate(section.id)
                }}
              >
                <span className="num">{section.number ?? '·'}</span>
                <span>{section.title}</span>
              </a>
            )
          })
        )}
      </nav>
    </>
  )
}
