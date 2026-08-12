import type { CollectionConfig } from 'payload'

import {
  and,
  createdByField,
  isAuthenticated,
  isOneOf,
  or,
  ownsCreatedBy,
  setCreatedBy,
} from '../lib/access'

export const GalleryItems: CollectionConfig = {
  slug: 'gallery-items',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'date', 'updatedAt'],
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
        description: 'Display date, e.g. "July 2026"',
      },
    },
    {
      name: 'imageUrl',
      type: 'text',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Uploaded image from the Media library (preferred over imageUrl).',
      },
    },
    createdByField,
  ],
}