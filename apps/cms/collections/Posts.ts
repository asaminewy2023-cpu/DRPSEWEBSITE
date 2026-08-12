import type { CollectionConfig } from 'payload'

import { blocks } from '../blocks'
import {
  and,
  createdByField,
  isAuthenticated,
  isOneOf,
  or,
  ownsCreatedBy,
  restrictPublish,
  setCreatedBy,
} from '../lib/access'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'author', 'published', 'updatedAt'],
  },
  access: {
    read: ({ req }) => {
      if (req.user) return true
      return { published: { equals: true } }
    },
    create: isAuthenticated,
    update: or(
      isOneOf('super_admin', 'administrator', 'editor'),
      ownsCreatedBy,
    ),
    delete: or(
      isOneOf('super_admin', 'administrator'),
      and(isOneOf('editor'), ownsCreatedBy),
    ),
  },
  hooks: {
    beforeChange: [setCreatedBy, restrictPublish],
  },
  fields: [
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
    {
      name: 'blocks',
      type: 'blocks',
      blocks,
      admin: {
        description: 'Gutenberg-style blocks. Overrides rich text when present.',
      },
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'news-categories',
      required: true,
    },
    {
      name: 'author',
      type: 'text',
      required: true,
    },
    {
      name: 'date',
      type: 'text',
      required: true,
      admin: {
        description: 'Display date, e.g. "July 30, 2026"',
      },
    },
    {
      name: 'imageUrl',
      type: 'text',
    },
    {
      name: 'thumbnail',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Featured image shown on the blog list and social cards.',
      },
    },
    {
      name: 'published',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar' },
    },
    createdByField,
  ],
}