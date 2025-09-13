import type { CollectionConfig } from 'payload'
import { PayloadRequest } from 'payload/types'

const INVITE_CODE = process.env.INVITE_CODE || ''

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  access: {
    create: async ({ req }: { req: PayloadRequest }) => {
      const inviteCode = (await req.json()).inviteCode      
      return inviteCode === INVITE_CODE
    },
  },
  auth: true,
  fields: [
    // Email added by default
    {
      name: 'inviteCode',
      type: 'text',      
    },
  ],
}
