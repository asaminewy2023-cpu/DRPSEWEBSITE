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

export const Events: CollectionConfig = {
  slug: 'events',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'type', 'date', 'location', 'updatedAt'],
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
      name: 'type',
      type: 'select',
      required: true,
      defaultValue: 'Conferences',
      options: [
        { label: 'Conferences', value: 'Conferences' },
        { label: 'Workshops', value: 'Workshops' },
        { label: 'Meetings', value: 'Meetings' },
        { label: 'Summits', value: 'Summits' },
        { label: 'Seminars', value: 'Seminars' },
        { label: 'Public Consultations', value: 'Public Consultations' },
      ],
    },
    {
      name: 'date',
      type: 'text',
      required: true,
      admin: {
        description: 'Display date, e.g. "Aug 15, 2026"',
      },
    },
    {
      name: 'location',
      type: 'text',
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Optional featured image for the event.',
      },
    },
    {
      name: 'content',
      type: 'richText',
    },
    {
      name: 'blocks',
      type: 'blocks',
      blocks,
      admin: {
        description: 'Gutenberg-style blocks. Overrides rich text when present.',
      },
    },
    createdByField,
  ],
}