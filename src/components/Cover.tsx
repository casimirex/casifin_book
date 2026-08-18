import type { Book } from '../types'
import { RichText } from './RichText'
import { levelColorVar } from '../lib/level'

const META_ICONS: Record<string, string> = {
  calendar: '📅',
  clock: '⏱️',
  layers: '🧭',
}

function splitTitle(title: string): { head: string; tail: string } {
  const idx = title.lastIndexOf(' ')
  if (idx === -1) return { head: title, tail: '' }
  return { head: title.slice(0, idx), tail: title.slice(idx + 1) }
}

export function Cover({ book }: { book: Book }) {
  const { head, tail } = splitTitle(book.title)

  return (
    <section className="cover">
      <div className="cover-eyebrow">{book.eyebrow}</div>
      <h1 className="cover-title">
        {head}{' '}
        {tail && <span className="accent-word">{tail}</span>}
      </h1>
      <p className="cover-lead">
        <RichText text={book.lead} />
      </p>

      <div className="cover-meta">
        {book.meta.map((m, i) => (
          <span className="meta-chip" key={i}>
            <span className="chip-icon">{META_ICONS[m.icon] ?? '•'}</span>
            {m.label}
          </span>
        ))}
      </div>

      <div className="learning-path">
        {book.learningPath.map((step) => (
          <div
            className="path-step"
            key={step.level}
            style={{ ['--step-color' as string]: levelColorVar(step.level) }}
          >
            <div className="step-num">{step.num}</div>
            <div className="step-title">{step.title}</div>
            <div className="step-desc">{step.desc}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
