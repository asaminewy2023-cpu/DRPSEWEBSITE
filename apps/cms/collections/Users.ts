import type { CollectionConfig } from 'payload'

import { isOneOf } from '../lib/access'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['name', 'email', 'role', 'active', 'updatedAt'],
  },
  access: {
    read: ({ req }) => {
      if (!req.user) return false
      if (req.user.role === 'super_admin') return true
      return { id: { equals: req.user.id } }
    },
    create: isOneOf('super_admin'),
    update: isOneOf('super_admin'),
    delete: isOneOf('super_admin'),
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'reporter',
      options: [
        { label: 'Super Admin', value: 'super_admin' },
        { label: 'Administrator', value: 'administrator' },
        { label: 'Editor', value: 'editor' },
        { label: 'Reporter', value: 'reporter' },
        { label: 'Translator', value: 'translator' },
      ],
    },
    {
      name: 'active',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
}