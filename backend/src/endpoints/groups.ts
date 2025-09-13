import { User } from "@/payload-types"
import { PayloadRequest } from "payload"

export const findMyGroups = async (req: PayloadRequest) => {
    const { user, payload } = req

    if (!user) {
        return Response.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const groups = await payload.find({
        collection: "groups",
        where: {
            or: [
                { "friends.email": { contains: user.email } },
                { "admin.id": { equals: user.id } }
            ]
        }
    })

    return Response.json(groups, { status: 200 })
}

export const upvote = async (req: PayloadRequest) => {
    const { user, routeParams } = req

    if (!user) {
        return Response.json({ message: 'Unauthorized' }, { status: 401 })
    }

    if (!routeParams || !routeParams.id || !routeParams.imdbId) {
        return Response.json({ message: 'Bad Request' }, { status: 400 })
    }

    const groupId = routeParams.id as string
    const imdbId = routeParams.imdbId as string
    const group = await req.payload.findByID({
        collection: "groups",
        id: groupId
    });

    if (!group) {
        return Response.json({ message: 'Group not found' }, { status: 404 })
    }

    const movies = group.movies || []
    const movie = movies.find(m => m.imdbId === imdbId)

    if (!movie) {
        return Response.json({ message: 'Movie not found in group' }, { status: 404 })
    }

    const upvotes = movie.upvotes || []
    const downvotes = movie.downvotes || []

    if (upvotes.find(upvote => (upvote as User).id === user.id)) {
        movie.upvotes = upvotes.filter(upvote => (upvote as User).id !== user.id)
    } else {
        movie.upvotes = [...upvotes, user]
        movie.downvotes = downvotes.filter(downvote => (downvote as User).id !== user.id)
    }

    await req.payload.update({
        collection: "groups",
        id: groupId,
        data: {
            movies
        }
    })

    return Response.json(movie, { status: 200 })
}


export const downvote = async (req: PayloadRequest) => {
    const { user, routeParams } = req

    if (!user) {
        return Response.json({ message: 'Unauthorized' }, { status: 401 })
    }

    if (!routeParams || !routeParams.id || !routeParams.imdbId) {
        return Response.json({ message: 'Bad Request' }, { status: 400 })
    }

    const groupId = routeParams.id as string
    const imdbId = routeParams.imdbId as string
    const group = await req.payload.findByID({
        collection: "groups",
        id: groupId
    });

    if (!group) {
        return Response.json({ message: 'Group not found' }, { status: 404 })
    }

    const movies = group.movies || []
    const movie = movies.find(m => m.imdbId === imdbId)

    if (!movie) {
        return Response.json({ message: 'Movie not found in group' }, { status: 404 })
    }

    const upvotes = movie.upvotes || []
    const downvotes = movie.downvotes || []

    if (downvotes.find(downvote => (downvote as User).id === user.id)) {
        movie.downvotes = downvotes.filter(downvote => (downvote as User).id !== user.id)
    } else {
        movie.downvotes = [...downvotes, user]
        movie.upvotes = upvotes.filter(upvote => (upvote as User).id !== user.id)
    }

    await req.payload.update({
        collection: "groups",
        id: groupId,
        data: {
            movies
        }
    })

    return Response.json(movie, { status: 200 })
}

