import { useState } from 'react'
import type { Formula } from '../types'
import { Math } from './Math'
import { slugify } from '../lib/slug'

interface FormulaCardProps {
  formula: Formula
  color: string
}

export function FormulaCard({ formula, color }: FormulaCardProps) {
  const [open, setOpen] = useState(false)
  const id = `formula-${slugify(formula.name)}`

  return (
    <div
      id={id}
      data-section
      className="formula-card"
      style={{ ['--formula-color' as string]: color }}
    >
      <div className="formula-head">
        <h4 className="formula-name">{formula.name}</h4>
        <div className="formula-tags">
          {formula.tags.map((t) => (
            <span className="formula-tag" key={t}>
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="formula-eq">
        <Math tex={formula.eq} />
      </div>

      <button
        className="formula-toggle"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        {open ? 'Hide details' : 'What it means'}
        <span className="chevron">{open ? '▾' : '▸'}</span>
      </button>

      {open && (
        <div className="formula-details">
          <div className="formula-detail">
            <span className="detail-label">What</span>
            <p>{formula.what}</p>
          </div>
          <div className="formula-detail">
            <span className="detail-label">When to use</span>
            <p>{formula.use}</p>
          </div>
          <div className="formula-detail">
            <span className="detail-label">How to interpret</span>
            <p>{formula.interpret}</p>
          </div>
        </div>
      )}
    </div>
  )
}
