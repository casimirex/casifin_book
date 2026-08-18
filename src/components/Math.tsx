import katex from 'katex'
import 'katex/dist/katex.min.css'

interface MathProps {
  tex: string
  display?: boolean
}

export function Math({ tex, display = true }: MathProps) {
  const html = katex.renderToString(tex, {
    throwOnError: false,
    displayMode: display,
  })
  return (
    <span
      className={display ? 'math math-display' : 'math math-inline'}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
