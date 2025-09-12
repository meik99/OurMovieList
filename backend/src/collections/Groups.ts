import { downvote, upvote } from '@/endpoints/groups'
import { User } from '@/payload-types'
import type { CollectionConfig } from 'payload'

export const Groups: CollectionConfig = {
    slug: 'groups',
    access: {
        read: () => true,
        create: ({ req: { user }, data }) => {
            if (!user) return false
            if(user.id && user.id.toString() === "1") return true // Allow admin user to create groups

            if (data) {
                // Ensure the user creating the group is set as the admin
                data.admin = user
            }

            return true
        },
        update: async ({ req: { user, payload }, id }) => {
            if (!user) return false
            if(user.id && user.id.toString() === "1") return true // Allow admin user to create groups

            const group = await payload.findByID({
                collection: 'groups',
                id: id as string,
                disableErrors: true,
            })

            const groupAdmin = group?.admin as User

            return groupAdmin && groupAdmin.id === user.id
        },
        delete: async ({ req: { user, payload }, id }) => {
            if (!user) return false
            if(user.id && user.id.toString() === "1") return true // Allow admin user to create groups

            const group = await payload.findByID({
                collection: 'groups',
                id: id as string,
                disableErrors: true,
            })

            const groupAdmin = group?.admin as User

            return groupAdmin && groupAdmin.id === user.id
        },
    },
    endpoints: [
        {
            path: '/:id/upvote/:imdbId',
            method: 'post',
            handler: upvote
        },
        {
            path: '/:id/downvote/:imdbId',
            method: 'post',
            handler: downvote
        }
    ],
    fields: [
        {
            name: 'name',
            type: 'text',
            required: true,
        },
        {
            name: "admin",
            type: "relationship",
            relationTo: "users",
            required: true,
        },
        {
            name: "friends",
            type: "relationship",
            relationTo: "users",
            hasMany: true,
            unique: true,
        },
        {
            name: 'movies',
            type: 'array',
            fields: [
                {
                    name: 'imdbId',
                    type: 'text',
                },
                {
                    name: "upvotes",
                    type: "relationship",
                    relationTo: "users",
                    hasMany: true,
                    unique: true,
                },

                {
                    name: "downvotes",
                    type: "relationship",
                    relationTo: "users",
                    hasMany: true,
                    unique: true,
                }
            ]
        },
    ]
}
