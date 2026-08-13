import type { Access, AccessResult, CollectionBeforeChangeHook, Field } from 'payload'

export const ROLES = [
  'super_admin',
  'administrator',
  'editor',
  'reporter',
  'translator',
] as const

export type Role = (typeof ROLES)[number]

export const MANAGER_ROLES: readonly Role[] = ['super_admin', 'administrator']

export const PUBLISHER_ROLES: readonly Role[] = ['super_admin', 'administrator', 'editor']

type MaybeUser = { id?: number; role?: string } | null | undefined

const isRole = (reqUser: unknown, roles: readonly Role[]): boolean => {
  const user = reqUser as MaybeUser
  return Boolean(user && user.role && (roles as readonly string[]).includes(user.role))
}

export const isAuthenticated: Access = ({ req }) => Boolean(req.user)

export const isOneOf =
  (...roles: readonly Role[]): Access =>
  ({ req }) =>
    isRole(req.user, roles)

export const or =
  (...checks: Access[]): Access =>
  async (args) => {
    for (const check of checks) {
      const result = await check(args)
      if (result) return result
    }
    return false
  }

export const and =
  (...checks: Access[]): Access =>
  async (args) => {
    let result: AccessResult = true
    for (const check of checks) {
      const r = await check(args)
      if (!r) return false
      if (r !== true) result = r
    }
    return result
  }

export const ownsCreatedBy: Access = ({ req }) => {
  const user = req.user as MaybeUser
  if (!user || user.id == null) return false
  return { createdBy: { equals: user.id } }
}

export const createdByField: Field = {
  name: 'createdBy',
  type: 'relationship',
  relationTo: 'users',
  admin: {
    position: 'sidebar',
    readOnly: true,
    hidden: true,
  },
}

export const setCreatedBy: CollectionBeforeChangeHook = ({ data, req, operation }) => {
  if (operation === 'create' && req.user) {
    return { ...data, createdBy: (req.user as { id?: number }).id }
  }
  return data
}

export const restrictPublish: CollectionBeforeChangeHook = ({ data, req }) => {
  if (!isRole(req.user, PUBLISHER_ROLES)) {
    return { ...data, published: false }
  }
  return data
}

export const restrictStatus: CollectionBeforeChangeHook = ({ data, req, operation }) => {
  if (operation === 'create') {
    return { ...data, status: data.status || 'draft' }
  }
  if (!isRole(req.user, PUBLISHER_ROLES)) {
    return { ...data, status: data.status === 'publish' ? 'pending' : data.status || 'draft' }
  }
  return data
}

export const setAuthor: CollectionBeforeChangeHook = ({ data, req, operation }) => {
  if (operation === 'create' && !data.author && req.user) {
    return { ...data, author: (req.user as { id?: number }).id }
  }
  return data
}