import type { CollectionAfterChangeHook, CollectionConfig } from 'payload'

import { isOneOf } from '../lib/access'

const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL

const sendNotification: CollectionAfterChangeHook = async ({
  doc,
  operation,
  req,
}) => {
  if (operation !== 'create') return doc
  if (!CONTACT_TO_EMAIL) {
    req.payload.logger.warn(
      'CONTACT_TO_EMAIL not set; contact message stored but not emailed.',
    )
    return doc
  }

  try {
    await req.payload.sendEmail({
      to: CONTACT_TO_EMAIL,
      subject: `New contact message: ${doc.subject}`,
      text: [
        `Name: ${doc.name}`,
        `Email: ${doc.email}`,
        `Subject: ${doc.subject}`,
        '',
        doc.message,
      ].join('\n'),
    })
    req.payload.logger.info(`Contact message email sent to ${CONTACT_TO_EMAIL}`)
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    req.payload.logger.error(`Failed to send contact email: ${message}`)
  }

  return doc
}

export const ContactMessages: CollectionConfig = {
  slug: 'contact-messages',
  hooks: {
    afterChange: [sendNotification],
  },
  admin: {
    useAsTitle: 'subject',
    defaultColumns: ['name', 'email', 'subject', 'read', 'createdAt'],
  },
  access: {
    create: () => true,
    read: ({ req }) => Boolean(req.user),
    update: isOneOf('super_admin', 'administrator', 'editor'),
    delete: isOneOf('super_admin', 'administrator'),
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'subject',
      type: 'text',
      required: true,
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
    },
    {
      name: 'read',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar' },
    },
  ],
}