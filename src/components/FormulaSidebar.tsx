import type { RefObject } from 'react'
import type { FormulaCategory } from '../types'
import { searchFormulas } from '../lib/formulaSearch'
import { slugify } from '../lib/slug'

interface FormulaSidebarProps {
  categories: FormulaCategory[]
  searchQuery: string
  onSearchChange: (q: string) => void
  onNavigate: (id: string) => void
  inputRef?: RefObject<HTMLInputElement>
}

export function FormulaSidebar({
  categories,
  searchQuery,
  onSearchChange,
  onNavigate,
  inputRef,
}: FormulaSidebarProps) {
  const results = searchFormulas(categories, searchQuery)
  const searching = searchQuery.trim().length > 0

  return (
    <>
      <div className="sidebar-search">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search formulas…"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label="Search formulas"
          />
          {!searching && <span className="kbd">⌘K</span>}
        </div>
      </div>

      <nav className="toc" aria-label="Formula categories">
        {searching ? (
          results.length === 0 ? (
            <div className="toc-empty">No formulas match “{searchQuery}”.</div>
          ) : (
            results.map(({ formula, category }) => (
              <a
                key={`${category.cat}-${formula.name}`}
                href={`#formula-${slugify(formula.name)}`}
                className="toc-link"
                onClick={(e) => {
                  e.preventDefault()
                  onNavigate(`formula-${slugify(formula.name)}`)
                }}
              >
                <span className="num" style={{ color: category.color }}>
                  {category.icon}
                </span>
                <span>
                  {formula.name}
                  <span
                    style={{
                      display: 'block',
                      fontSize: '11px',
                      color: 'var(--text-faint)',
                      marginTop: '2px',
                      lineHeight: 1.4,
                    }}
                  >
                    {category.cat}
                  </span>
                </span>
              </a>
            ))
          )
        ) : (
          categories.map((category) => (
            <a
              key={category.cat}
              href={`#cat-${slugify(category.cat)}`}
              className="toc-link"
              onClick={(e) => {
                e.preventDefault()
                onNavigate(`cat-${slugify(category.cat)}`)
              }}
            >
              <span className="num">{category.icon}</span>
              <span>{category.cat}</span>
              <span className="count">{category.formulas.length}</span>
            </a>
          ))
        )}
      </nav>
    </>
  )
}
