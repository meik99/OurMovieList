import { downvote, findMyGroups, upvote } from '@/endpoints/groups'
import { User } from '@/payload-types'
import type { CollectionConfig } from 'payload'

export const Groups: CollectionConfig = {
    slug: 'groups',
    access: {
        read: ({ req: { user } }) => {
            if (!user) return false
            if (user.id && user.id.toString() === "1") return true // Allow admin user to read all groups

            return {
                or: [
                    { 'admin.id': { equals: user.id.toString() } },
                    { 'friends.id': { contains: user.id.toString() } }
                ]
            }
        },
        create: ({ req: { user }, data }) => {
            if (!user) return false            

            if (data) {
                // Ensure the user creating the group is set as the admin
                data.admin = user
            }

            return true
        },
        update: ({ req: { user } }) => {
            if (!user) return false
            if (user.id && user.id.toString() === "1") return true // Allow admin user to read all groups

            return { 'admin.id': { equals: user.id.toString() } }
        },
        update: async ({ req: { user } }) => {
            if (!user) return false
            if (user.id && user.id.toString() === "1") return true // Allow admin user to read all groups

            return { 'admin.id': { equals: user.id.toString() } }
        },
    },
    endpoints: [
        {
            path: '/findMyGroups',
            method: 'get',
            handler: findMyGroups
        },
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
