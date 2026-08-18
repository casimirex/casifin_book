import type { Inline } from '../types'

/**
 * Renders a trusted, static inline HTML string (may contain
 * <strong>, <em>, <code>). Content comes from the bundled book data,
 * never from user input, so dangerouslySetInnerHTML is safe here.
 */
export function RichText({ text }: { text: Inline }) {
  return <span dangerouslySetInnerHTML={{ __html: text }} />
}
