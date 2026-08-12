import type { Block } from 'payload'

export const ParagraphBlock: Block = {
  slug: 'paragraph',
  labels: { singular: 'Paragraph', plural: 'Paragraphs' },
  fields: [
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
  ],
}