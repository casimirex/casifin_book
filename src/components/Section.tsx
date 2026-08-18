import type { Section as SectionType } from '../types'
import { LEVEL_META } from '../data/book'
import { levelStyle } from '../lib/level'
import { BlockRenderer } from './BlockRenderer'
import { RichText } from './RichText'

export function Section({ section }: { section: SectionType }) {
  if (section.kind === 'divider') {
    return (
      <section
        id={section.id}
        data-section
        className="level-divider"
        style={levelStyle(section.level)}
      >
        <div className="divider-kicker">{section.kicker}</div>
        <h2 className="divider-title">{section.title}</h2>
        <p className="divider-text">
          <RichText text={section.text} />
        </p>
      </section>
    )
  }

  return (
    <section
      id={section.id}
      data-section
      className="chapter"
      style={levelStyle(section.level)}
    >
      <header className="chapter-head">
        {section.number !== undefined && (
          <div className="chapter-num">{String(section.number).padStart(2, '0')}</div>
        )}
        <div>
          <h2 className="chapter-title">{section.title}</h2>
          <span className="chapter-level-tag">{LEVEL_META[section.level].label}</span>
        </div>
      </header>
      <div className="chapter-body">
        {section.blocks.map((block, i) => (
          <BlockRenderer key={i} block={block} />
        ))}
      </div>
    </section>
  )
}
