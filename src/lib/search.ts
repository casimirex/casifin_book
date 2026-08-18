import type { Block, Book, Chapter } from '../types'

/** Strip inline HTML tags to plain text for search indexing. */
function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
}

function blockText(block: Block): string {
  switch (block.type) {
    case 'paragraph':
    case 'usecase':
    case 'quote':
    case 'highlight':
      return stripHtml(block.text)
    case 'heading':
      return block.text
    case 'list':
      return block.items.map(stripHtml).join(' ')
    case 'featureGrid':
      return block.items.map((i) => `${i.title} ${stripHtml(i.text)}`).join(' ')
    case 'callout':
      return `${block.title} ${block.paragraphs.map(stripHtml).join(' ')}`
    case 'example':
      return `${block.title} ${block.blocks
        .map((b) => {
          if (b.type === 'table') {
            return b.table.rows.flat().map(stripHtml).join(' ')
          }
          if (b.type === 'code') return b.text
          return stripHtml(b.text)
        })
        .join(' ')}`
    case 'code':
      return block.text
    case 'table':
      return block.table.rows.flat().map(stripHtml).join(' ')
  }
}

function chapterText(chapter: Chapter): string {
  return `${chapter.title} ${chapter.blocks.map(blockText).join(' ')}`
}

export interface SearchResult {
  id: string
  number?: number
  level: Chapter['level']
  title: string
  snippet: string
}

export function searchBook(book: Book, query: string): SearchResult[] {
  const q = query.trim().toLowerCase()
  if (!q) return []

  const results: SearchResult[] = []
  for (const section of book.sections) {
    if (section.kind !== 'chapter') continue
    const text = chapterText(section)
    if (!text.toLowerCase().includes(q)) continue

    const idx = text.toLowerCase().indexOf(q)
    const start = Math.max(0, idx - 40)
    const end = Math.min(text.length, idx + q.length + 60)
    const snippet =
      (start > 0 ? '…' : '') + text.slice(start, end).trim() + (end < text.length ? '…' : '')

    results.push({
      id: section.id,
      number: section.number,
      level: section.level,
      title: section.title,
      snippet,
    })
  }
  return results
}
