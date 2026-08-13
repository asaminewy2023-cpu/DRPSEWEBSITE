import type { CollectionConfig } from 'payload'

import { isAuthenticated, isOneOf } from '../lib/access'

export const Subscribers: CollectionConfig = {
  slug: 'subscribers',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'subscribed', 'createdAt'],
    description: 'Email addresses subscribed to the site newsletter.',
  },
  access: {
    create: () => true,
    read: isAuthenticated,
    update: isOneOf('super_admin', 'administrator'),
    delete: isOneOf('super_admin', 'administrator'),
  },
  fields: [
    {
      name: 'email',
      type: 'email',
      required: true,
      unique: true,
    },
    {
      name: 'name',
      type: 'text',
      admin: {
        description: 'Optional subscriber name.',
      },
    },
    {
      name: 'subscribed',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Set to false for unsubscribed emails.',
        position: 'sidebar',
      },
    },
    {
      name: 'createdBy',
      type: 'relationship',
      relationTo: 'users',
      admin: {
        position: 'sidebar',
        readOnly: true,
        hidden: true,
      },
    },
  ],
}