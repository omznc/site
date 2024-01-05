import { revalidatePath, revalidateTag } from 'next/cache'

const isAuthorized = (request: Request) => {
    // Do some authorization here
    return true
}

// A Strapi webhook will call this endpoint.
export async function POST(request: Request) {
    if (isAuthorized(request)) {
        revalidateAll()
        return new Response('Hello World!', { status: 200 })
    }
    return new Response('Unauthorized', { status: 401 })
}

const revalidateAll = () => {
    revalidatePath('/projects')
    revalidateTag('projects')
    revalidatePath('/experience')
    revalidateTag('experience')
    revalidatePath('/sitemap.xml')
}
