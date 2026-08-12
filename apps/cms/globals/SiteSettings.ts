import type { GlobalConfig } from 'payload'

import { isOneOf } from '../lib/access'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  admin: {
    group: 'Site',
    description: 'Site-wide branding, navigation, contact and meta settings used across the website.',
  },
  access: {
    read: () => true,
    update: isOneOf('super_admin', 'administrator'),
  },
  fields: [
    {
      type: 'group',
      name: 'branding',
      label: 'Branding',
      fields: [
        {
          name: 'siteName',
          type: 'text',
          required: true,
          defaultValue: 'South Ethiopia Regional State',
          admin: {
            description: 'Short name used in the footer brand block.',
          },
        },
        {
          name: 'siteSubtitle',
          type: 'text',
          defaultValue: 'Deputy Regional President',
          admin: {
            description: 'Short subtitle shown next to the site name.',
          },
        },
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Site logo. Falls back to the bundled /logo-modified.png when empty.',
          },
        },
      ],
    },
    {
      name: 'organizationTitle',
      type: 'group',
      label: 'Organization Title (Header)',
      admin: {
        description: 'The two-line title rendered in the header. Leave empty to keep the default.',
      },
      fields: [
        {
          name: 'line1',
          type: 'text',
          defaultValue: 'Deputy Regional President of the',
        },
        {
          name: 'line2',
          type: 'text',
          defaultValue: 'South Ethiopia Regional State',
        },
      ],
    },
    {
      name: 'meta',
      type: 'group',
      label: 'Default Metadata',
      fields: [
        {
          name: 'titleTemplate',
          type: 'text',
          defaultValue: '%s | Deputy Regional President of the South Ethiopia Regional State',
          admin: {
            description: 'Next.js metadata.title.template. "%s" is replaced by the page title.',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          admin: {
            description: 'Default SEO description used when a page does not define its own.',
          },
        },
      ],
    },
    {
      type: 'group',
      name: 'footer',
      label: 'Footer',
      fields: [
        {
          name: 'description',
          type: 'textarea',
          admin: {
            description: 'About text shown in the footer.',
          },
        },
        {
          name: 'copyright',
          type: 'text',
          admin: {
            description: 'Copyright holder, e.g. "South Ethiopia Regional State".',
          },
        },
        {
          name: 'developedBy',
          type: 'text',
          admin: {
            description: 'Small credit line shown under the copyright.',
          },
        },
      ],
    },
    {
      type: 'group',
      name: 'contact',
      label: 'Contact & Office Hours',
      fields: [
        {
          name: 'emergencyHotline',
          type: 'text',
          defaultValue: 'Emergency Hotline: 911',
        },
        {
          name: 'email',
          type: 'email',
          defaultValue: 'emergency@southethiopia.gov.et',
        },
        {
          name: 'address',
          type: 'text',
          defaultValue: 'Regional HQ: Hawassa, Ethiopia',
        },
        {
          name: 'officeHours',
          type: 'text',
          defaultValue: 'Office Hours: Mon-Fri 8:00-17:00',
        },
      ],
    },
    {
      name: 'navLinks',
      type: 'array',
      label: 'Main Navigation Links',
      admin: {
        description: 'Links rendered in the header navigation. Overrides the built-in links when provided.',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'href',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'socialLinks',
      type: 'array',
      label: 'Social Media Links',
      admin: {
        description: 'Links shown in the footer.',
      },
      fields: [
        {
          name: 'label',
          type: 'select',
          required: true,
          options: [
            { label: 'Facebook', value: 'Facebook' },
            { label: 'Twitter / X', value: 'Twitter' },
            { label: 'YouTube', value: 'YouTube' },
            { label: 'Telegram', value: 'Telegram' },
            { label: 'Other', value: 'Other' },
          ],
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}