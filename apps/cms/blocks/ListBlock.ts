import type { Block } from 'payload'

export const ListBlock: Block = {
  slug: 'list',
  labels: { singular: 'List', plural: 'Lists' },
  fields: [
    {
      name: 'kind',
      type: 'select',
      defaultValue: 'bulleted',
      options: [
        { label: 'Bulleted', value: 'bulleted' },
        { label: 'Numbered', value: 'numbered' },
      ],
    },
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'content',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}