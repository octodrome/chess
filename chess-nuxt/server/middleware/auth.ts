export default defineEventHandler(async (event) => {
    const url = getRequestURL(event)
    const headers = getRequestHeaders(event)
    const isAuthRoute = url.pathname.includes('auth')

    if (isAuthRoute && !headers.authorization) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Auth header is missing',
        })
    }
})
