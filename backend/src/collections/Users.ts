import type { CollectionConfig, PayloadRequest } from 'payload'

const INVITE_CODE = process.env.INVITE_CODE || ''

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  access: {
    create: async ({ req }: { req: PayloadRequest }) => {
      if (!req) return false

      const reqBody = typeof req.json === 'function' ? await req.json() : req.body;
      
      const inviteCode = reqBody.inviteCode      
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
