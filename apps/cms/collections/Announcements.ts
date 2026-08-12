import type { CollectionConfig } from 'payload'

import { blocks } from '../blocks'
import {
  and,
  createdByField,
  isAuthenticated,
  isOneOf,
  or,
  ownsCreatedBy,
  setCreatedBy,
} from '../lib/access'

export const Announcements: CollectionConfig = {
  slug: 'announcements',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'date', 'pinned', 'updatedAt'],
  },
  access: {
    read: () => true,
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
    beforeChange: [setCreatedBy],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'date',
      type: 'text',
      required: true,
      admin: {
        description: 'Display date, e.g. "July 25, 2026"',
      },
    },
    {
      name: 'category',
      type: 'text',
      required: true,
    },
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Optional featured image for the announcement.',
      },
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
      name: 'pinned',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar' },
    },
    createdByField,
  ],
}