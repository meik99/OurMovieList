import { PayloadRequest } from "payload"

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

    if (upvotes.includes(user.id)) {
        movie.upvotes = upvotes.filter(uid => uid !== user.id)
    } else {
        movie.upvotes = [...upvotes, user.id]
        movie.downvotes = downvotes.filter(uid => uid !== user.id)
    }

    await req.payload.update({
        collection: "groups",
        id: groupId,
        data: {
            movies
        }
    })

    return Response.json({ message: 'Upvote successful' }, { status: 200 })
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

    if (downvotes.includes(user.id)) {
        movie.downvotes = downvotes.filter(uid => uid !== user.id)
    } else {
        movie.downvotes = [...downvotes, user.id]
        movie.upvotes = upvotes.filter(uid => uid !== user.id)
    }

    await req.payload.update({
        collection: "groups",
        id: groupId,
        data: {
            movies
        }
    })

    return Response.json({ message: 'Downvote successful' }, { status: 200 })
}

