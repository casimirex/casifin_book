import type { Formula, FormulaCategory } from '../types'

export interface FormulaSearchResult {
  formula: Formula
  category: FormulaCategory
}

export function searchFormulas(
  categories: FormulaCategory[],
  query: string,
): FormulaSearchResult[] {
  const q = query.trim().toLowerCase()
  if (!q) return []

  const results: FormulaSearchResult[] = []
  for (const category of categories) {
    for (const formula of category.formulas) {
      const haystack = [
        formula.name,
        formula.what,
        formula.use,
        formula.interpret,
        ...formula.tags,
      ]
        .join(' ')
        .toLowerCase()
      if (haystack.includes(q)) {
        results.push({ formula, category })
      }
    }
  }
  return results
}
