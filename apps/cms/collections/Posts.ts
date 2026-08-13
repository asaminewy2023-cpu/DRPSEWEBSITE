import type { CollectionConfig } from 'payload'

import { blocks } from '../blocks'
import {
  and,
  createdByField,
  isAuthenticated,
  isOneOf,
  or,
  ownsCreatedBy,
  restrictStatus,
  setAuthor,
  setCreatedBy,
} from '../lib/access'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'status', 'sticky', 'author', 'updatedAt'],
  },
  access: {
    read: ({ req }) => {
      if (req.user) return true
      return { status: { equals: 'publish' } }
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
    beforeChange: [setCreatedBy, setAuthor, restrictStatus],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'The main headline of the post.',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        position: 'sidebar',
        description: 'URL-friendly version of the title.',
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
      admin: {
        description: 'A short summary shown on blog archives.',
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
      name: 'category',
      type: 'relationship',
      relationTo: 'news-categories',
      required: true,
      admin: {
        description: 'Main group used to sort the post.',
      },
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      admin: {
        position: 'sidebar',
        description: 'The user who wrote the post.',
      },
    },
    {
      name: 'publishDate',
      type: 'date',
      admin: {
        position: 'sidebar',
        description: 'When the post is published or scheduled for publication.',
      },
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
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      required: true,
      options: [
        { label: 'Publish', value: 'publish' },
        { label: 'Draft', value: 'draft' },
        { label: 'Pending Review', value: 'pending' },
        { label: 'Trash', value: 'trash' },
      ],
      admin: {
        position: 'sidebar',
        description: 'Publication status of the post.',
      },
    },
    {
      name: 'sticky',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Pin the post to the top of the blog page.',
      },
    },
    {
      name: 'commentStatus',
      type: 'select',
      defaultValue: 'closed',
      options: [
        { label: 'Open', value: 'open' },
        { label: 'Closed', value: 'closed' },
      ],
      admin: {
        position: 'sidebar',
        description: 'Whether comments are open or closed for this post.',
      },
    },
    createdByField,
  ],
}
