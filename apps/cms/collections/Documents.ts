import type { CollectionConfig } from 'payload'

import {
  createdByField,
  isAuthenticated,
  isOneOf,
  or,
  ownsCreatedBy,
  restrictPublish,
  setCreatedBy,
} from '../lib/access'

export const DOCUMENT_CATEGORIES = [
  { label: 'Annual Reports', value: 'annual-reports' },
  { label: 'Policies', value: 'policies' },
  { label: 'Guidelines', value: 'guidelines' },
  { label: 'Strategic Plans', value: 'strategic-plans' },
  { label: 'Tender Documents', value: 'tender-documents' },
  { label: 'Budget', value: 'budget' },
  { label: 'Manuals', value: 'manuals' },
]

export const Documents: CollectionConfig = {
  slug: 'documents',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'date', 'published', 'updatedAt'],
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
      ownsCreatedBy,
    ),
  },
  hooks: {
    beforeChange: [setCreatedBy, restrictPublish],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: DOCUMENT_CATEGORIES,
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
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'file',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Upload the document file (PDF, DOC, etc.).',
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