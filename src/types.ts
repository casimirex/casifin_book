/**
 * Content model for the Financial Operating System Blueprint e-book.
 *
 * Inline text fields are trusted, static HTML strings (may contain
 * <strong>, <em>, <code>) rendered through the <RichText /> component.
 */

export type Level = 1 | 2 | 3 | 4

export type Inline = string

export type CalloutVariant = 'default' | 'note' | 'pro' | 'warn' | 'concept'

export interface TableColumn {
  label: string
  align?: 'left' | 'right'
}

export interface TableData {
  columns: TableColumn[]
  rows: Inline[][]
}

export type ExampleBlock =
  | { type: 'paragraph'; text: Inline }
  | { type: 'table'; table: TableData }
  | { type: 'code'; text: string }
  | { type: 'result'; text: Inline }

export type Block =
  | { type: 'paragraph'; text: Inline }
  | { type: 'heading'; text: string }
  | { type: 'list'; items: Inline[] }
  | { type: 'featureGrid'; items: { title: string; text: Inline }[] }
  | { type: 'callout'; variant: CalloutVariant; title: string; paragraphs: Inline[] }
  | { type: 'usecase'; text: Inline }
  | { type: 'example'; icon: string; title: string; blocks: ExampleBlock[] }
  | { type: 'code'; text: string }
  | { type: 'table'; table: TableData }
  | { type: 'quote'; text: Inline }
  | { type: 'highlight'; text: Inline }

export interface Chapter {
  kind: 'chapter'
  id: string
  level: Level
  /** Display number, e.g. 1..61. Omitted for intro/conclusion. */
  number?: number
  title: string
  blocks: Block[]
}

export interface LevelDivider {
  kind: 'divider'
  id: string
  level: Level
  kicker: string
  title: string
  text: string
}

export type Section = Chapter | LevelDivider

export interface LearningPathStep {
  level: Level
  num: string
  title: string
  desc: string
}

export interface Book {
  eyebrow: string
  title: string
  lead: Inline
  meta: { label: string; icon: string }[]
  learningPath: LearningPathStep[]
  sections: Section[]
  footer: Inline
}

export interface TocEntry {
  id: string
  level: Level
  number?: number
  title: string
  children: { id: string; title: string }[]
}

/* ---------- Formula Encyclopedia ---------- */

export interface Formula {
  name: string
  /** LaTeX source, rendered with KaTeX. */
  eq: string
  tags: string[]
  what: string
  use: string
  interpret: string
}

export interface FormulaCategory {
  cat: string
  icon: string
  color: string
  formulas: Formula[]
}
