import type { FormulaCategory } from '../types'
import { FormulaCard } from './FormulaCard'
import { slugify } from '../lib/slug'

interface FormulaContentProps {
  categories: FormulaCategory[]
}

export function FormulaContent({ categories }: FormulaContentProps) {
  return (
    <article className="formula-book">
      <header className="formula-hero">
        <p className="formula-eyebrow">The Reference Library</p>
        <h1 className="formula-title">
          Financial Formula <em>Encyclopedia</em>
        </h1>
        <p className="formula-lead">
          {categories.reduce((n, c) => n + c.formulas.length, 0)} formulas across{' '}
          {categories.length} categories — every equation a finance builder
          needs, with plain-English meaning, when to use it, and how to read the
          result.
        </p>
      </header>

      {categories.map((category) => (
        <section
          key={category.cat}
          id={`cat-${slugify(category.cat)}`}
          data-section
          className="formula-category"
        >
          <div
            className="formula-category-head"
            style={{ ['--formula-color' as string]: category.color }}
          >
            <span className="formula-category-icon">{category.icon}</span>
            <div>
              <h2 className="formula-category-title">{category.cat}</h2>
              <p className="formula-category-count">
                {category.formulas.length} formulas
              </p>
            </div>
          </div>

          <div className="formula-grid">
            {category.formulas.map((formula) => (
              <FormulaCard
                key={formula.name}
                formula={formula}
                color={category.color}
              />
            ))}
          </div>
        </section>
      ))}
    </article>
  )
}
