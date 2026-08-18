import type { CSSProperties } from 'react'
import type { Level } from '../types'

/** CSS custom property name for a level's accent color. */
export function levelColorVar(level: Level): string {
  return `var(--l${level})`
}

/** Inline style object that sets --level-color for a subtree. */
export function levelStyle(level: Level): CSSProperties {
  return { ['--level-color' as string]: levelColorVar(level) }
}
