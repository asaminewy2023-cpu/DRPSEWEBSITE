import type { GlobalConfig } from 'payload'

import { isOneOf } from '../lib/access'

export const Settings: GlobalConfig = {
  slug: 'settings',
  label: 'Settings',
  admin: {
    group: 'Site',
    description: 'General, writing, reading, media and permalink settings for the site.',
  },
  access: {
    read: () => true,
    update: isOneOf('super_admin', 'administrator'),
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'General',
          fields: [
            {
              name: 'siteTagline',
              type: 'text',
              defaultValue: 'Inspiring stories of impact and achievement',
              admin: {
                description: 'Short tagline shown in page headers.',
              },
            },
            {
              name: 'defaultLanguage',
              type: 'select',
              defaultValue: 'en',
              options: [
                { label: 'English', value: 'en' },
                { label: 'Amharic', value: 'am' },
              ],
              admin: {
                description: 'Default language for the website.',
              },
            },
            {
              name: 'timezone',
              type: 'text',
              defaultValue: 'Africa/Addis_Ababa',
              admin: {
                description: 'IANA timezone used for date handling.',
              },
            },
          ],
        },
        {
          label: 'Writing',
          fields: [
            {
              name: 'defaultAuthor',
              type: 'text',
              defaultValue: 'Regional Communications Bureau',
              admin: {
                description: 'Default author applied to new posts when none is set.',
              },
            },
            {
              name: 'defaultCategory',
              type: 'relationship',
              relationTo: 'news-categories',
              admin: {
                description: 'Default category applied to new posts when none is set.',
              },
            },
            {
              name: 'defaultExcerptLength',
              type: 'number',
              defaultValue: 160,
              admin: {
                description: 'Maximum characters for auto-generated excerpts.',
              },
            },
          ],
        },
        {
          label: 'Reading',
          fields: [
            {
              name: 'postsPerPage',
              type: 'number',
              defaultValue: 9,
              admin: {
                description: 'Number of articles shown on the blog and news pages.',
              },
            },
            {
              name: 'showLatestArticles',
              type: 'checkbox',
              defaultValue: true,
              admin: {
                description: 'Show the Latest Articles section on the News page.',
              },
            },
            {
              name: 'showRelatedPosts',
              type: 'checkbox',
              defaultValue: true,
              admin: {
                description: 'Show related posts at the bottom of an article.',
              },
            },
          ],
        },
        {
          label: 'Discussion',
          fields: [
            {
              name: 'enableComments',
              type: 'checkbox',
              defaultValue: false,
              admin: {
                description: 'Allow visitors to comment on articles.',
              },
            },
            {
              name: 'commentModeration',
              type: 'checkbox',
              defaultValue: true,
              admin: {
                description: 'Require admin approval before a comment is published.',
              },
            },
          ],
        },
        {
          label: 'Media',
          fields: [
            {
              name: 'listImageSize',
              type: 'select',
              defaultValue: 'card',
              options: [
                { label: 'Card (768×432)', value: 'card' },
                { label: 'Thumbnail (400×300)', value: 'thumbnail' },
                { label: 'Original', value: 'original' },
              ],
              admin: {
                description: 'Image size used on article cards and lists.',
              },
            },
            {
              name: 'cardAspectRatio',
              type: 'select',
              defaultValue: '16/9',
              options: [
                { label: '16:9', value: '16/9' },
                { label: '4:3', value: '4/3' },
                { label: '1:1', value: '1/1' },
              ],
              admin: {
                description: 'Aspect ratio for card images.',
              },
            },
          ],
        },
        {
          label: 'Permalinks',
          fields: [
            {
              name: 'postBase',
              type: 'text',
              defaultValue: '/blog',
              admin: {
                description: 'URL prefix for articles, e.g. "/blog".',
              },
            },
            {
              name: 'successStoryBase',
              type: 'text',
              defaultValue: '/success-stories',
              admin: {
                description: 'URL prefix for success stories.',
              },
            },
            {
              name: 'useTrailingSlash',
              type: 'checkbox',
              defaultValue: false,
              admin: {
                description: 'Append a trailing slash to permalinks.',
              },
            },
          ],
        },
      ],
    },
  ],
}
