import type { CSSProperties } from 'react'
import type { Block, CalloutVariant, ExampleBlock, TableData } from '../types'
import { RichText } from './RichText'

const CALLOUT_META: Record<CalloutVariant, { icon: string; color: string }> = {
  default: { icon: '💡', color: 'var(--accent)' },
  note: { icon: '📘', color: 'var(--l2)' },
  pro: { icon: '⭐', color: 'var(--accent)' },
  warn: { icon: '⚠️', color: 'var(--l3)' },
  concept: { icon: '🧠', color: 'var(--l4)' },
}

function Table({ table }: { table: TableData }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            {table.columns.map((col, i) => (
              <th key={i} className={col.align === 'right' ? 'align-right' : undefined}>
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, ri) => (
            <tr key={ri}>
              {row.map((cell, ci) => (
                <td
                  key={ci}
                  className={table.columns[ci]?.align === 'right' ? 'align-right' : undefined}
                >
                  <RichText text={cell} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function ExampleBlockView({ block }: { block: ExampleBlock }) {
  switch (block.type) {
    case 'paragraph':
      return (
        <div className="block block-paragraph">
          <RichText text={block.text} />
        </div>
      )
    case 'table':
      return (
        <div className="block">
          <Table table={block.table} />
        </div>
      )
    case 'code':
      return (
        <div className="block">
          <CodeBlock text={block.text} />
        </div>
      )
    case 'result':
      return (
        <div className="example-result">
          <RichText text={block.text} />
        </div>
      )
  }
}

function CodeBlock({ text }: { text: string }) {
  return (
    <div className="code-block">
      <div className="code-lang">
        <span>plaintext</span>
      </div>
      <pre>
        <code>{text}</code>
      </pre>
    </div>
  )
}

export function BlockRenderer({ block }: { block: Block }) {
  switch (block.type) {
    case 'paragraph':
      return (
        <div className="block block-paragraph">
          <RichText text={block.text} />
        </div>
      )
    case 'heading':
      return <h3 className="block block-heading">{block.text}</h3>
    case 'list':
      return (
        <ul className="block block-list">
          {block.items.map((item, i) => (
            <li key={i}>
              <RichText text={item} />
            </li>
          ))}
        </ul>
      )
    case 'featureGrid':
      return (
        <div className="block feature-grid">
          {block.items.map((item, i) => (
            <div className="feature-card" key={i}>
              <div className="fc-title">{item.title}</div>
              <div className="fc-text">
                <RichText text={item.text} />
              </div>
            </div>
          ))}
        </div>
      )
    case 'callout': {
      const meta = CALLOUT_META[block.variant]
      const style = { ['--callout-color' as string]: meta.color } as CSSProperties
      return (
        <div className="block callout" style={style}>
          <div className="callout-icon">{meta.icon}</div>
          <div className="callout-body">
            <div className="callout-title">{block.title}</div>
            {block.paragraphs.map((p, i) => (
              <p key={i}>
                <RichText text={p} />
              </p>
            ))}
          </div>
        </div>
      )
    }
    case 'usecase':
      return (
        <div className="block usecase">
          <RichText text={block.text} />
        </div>
      )
    case 'example':
      return (
        <div className="block example">
          <div className="example-head">
            <span className="example-icon">{block.icon}</span>
            <span className="example-title">{block.title}</span>
          </div>
          <div className="example-body">
            {block.blocks.map((b, i) => (
              <ExampleBlockView key={i} block={b} />
            ))}
          </div>
        </div>
      )
    case 'code':
      return (
        <div className="block">
          <CodeBlock text={block.text} />
        </div>
      )
    case 'table':
      return (
        <div className="block">
          <Table table={block.table} />
        </div>
      )
    case 'quote':
      return (
        <blockquote className="block block-quote">
          <p>
            <RichText text={block.text} />
          </p>
        </blockquote>
      )
    case 'highlight':
      return (
        <div className="block block-highlight">
          <RichText text={block.text} />
        </div>
      )
  }
}
