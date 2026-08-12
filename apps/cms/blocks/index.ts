import type { Block } from 'payload'

import { CtaBlock } from './CtaBlock'
import { HeadingBlock } from './HeadingBlock'
import { HeroBlock } from './HeroBlock'
import { ImageBlock } from './ImageBlock'
import { ListBlock } from './ListBlock'
import { ParagraphBlock } from './ParagraphBlock'
import { QuoteBlock } from './QuoteBlock'

export const blocks: Block[] = [
  ParagraphBlock,
  HeadingBlock,
  HeroBlock,
  ImageBlock,
  ListBlock,
  QuoteBlock,
  CtaBlock,
]

export { CtaBlock } from './CtaBlock'
export { HeadingBlock } from './HeadingBlock'
export { HeroBlock } from './HeroBlock'
export { ImageBlock } from './ImageBlock'
export { ListBlock } from './ListBlock'
export { ParagraphBlock } from './ParagraphBlock'
export { QuoteBlock } from './QuoteBlock'