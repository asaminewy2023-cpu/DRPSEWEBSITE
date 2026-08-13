import type { CollectionConfig } from 'payload'

import { isOneOf } from '../lib/access'

export const Comments: CollectionConfig = {
  slug: 'comments',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'post', 'approved', 'createdAt'],
  },
  access: {
    read: ({ req }) => {
      if (req.user) return true
      return { approved: { equals: true } }
    },
    create: () => true,
    update: isOneOf('super_admin', 'administrator', 'editor'),
    delete: isOneOf('super_admin', 'administrator'),
  },
  fields: [
    {
      name: 'post',
      type: 'relationship',
      relationTo: 'posts',
      required: true,
      index: true,
    },
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
    },
    {
      name: 'content',
      type: 'textarea',
      required: true,
    },
    {
      name: 'approved',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Publicly visible comments must be approved.',
      },
    },
  ],
}