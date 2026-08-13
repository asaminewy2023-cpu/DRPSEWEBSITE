import { Announcements } from './Announcements'
import { Comments } from './Comments'
import { ContactMessages } from './ContactMessages'
import { Documents } from './Documents'
import { Events } from './Events'
import { GalleryItems } from './GalleryItems'
import { Media } from './Media'
import { NewsCategories } from './NewsCategories'
import { Pages } from './Pages'
import { Posts } from './Posts'
import { PressReleases } from './PressReleases'
import { Programs } from './Programs'
import { PublicNotices } from './PublicNotices'
import { Shorts } from './Shorts'
import { Subscribers } from './Subscribers'
import { SuccessStories } from './SuccessStories'
import { Tags } from './Tags'
import { Users } from './Users'

import { revalidateAfterChange } from '../lib/revalidate'

const baseCollections = [
  Users,
  Media,
  NewsCategories,
  Tags,
  Pages,
  Posts,
  Announcements,
  PressReleases,
  SuccessStories,
  PublicNotices,
  Programs,
  GalleryItems,
  Shorts,
  Subscribers,
  Comments,
  ContactMessages,
  Documents,
  Events,
]

const IGNORE_REVALIDATE = new Set(['users', 'media'])

export const collections = baseCollections.map((collection) => {
  if (IGNORE_REVALIDATE.has(collection.slug)) return collection
  return {
    ...collection,
    hooks: {
      ...collection.hooks,
      afterChange: [...(collection.hooks?.afterChange ?? []), revalidateAfterChange],
    },
  }
})