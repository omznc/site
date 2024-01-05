import 'server-only'

const STRAPI_TOKEN = ''

export interface Project {
    id: number
    attributes: {
        createdAt: string
        updatedAt: string
        publishedAt: string
        title: string
        description: string
        technologies: string
        site?: string
        source?: string | null
        abstract?: string
        media?: {
            data?: {
                id: number
                attributes: {
                    url: string
                    width?: number
                    height?: number
                    placeholder?: string
                }
            }[]
        }
    }
}

export interface Experience {
    id: number
    attributes: {
        createdAt: string
        updatedAt: string
        publishedAt: string
        title: string
        position: string
        start_date: string
        end_date: string
        description: string
        link: string
    }
}

export interface ProjectsResponse {
    data: Project[]
    meta: {
        pagination: {
            page: number
            pageSize: number
            pageCount: number
            total: number
        }
    }
}

export interface ExperienceResponse {
    data: Experience[]
    meta: {
        pagination: {
            page: number
            pageSize: number
            pageCount: number
            total: number
        }
    }
}

export const getProjects = async () =>
    await fetch('https://strapi.omarzunic.com/api/projects?populate=*', {
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${STRAPI_TOKEN}`,
        },
        cache: 'force-cache',
        next: {
            tags: ['projects'],
        },
    })

export const getProject = async (id: string) =>
    await fetch(`https://strapi.omarzunic.com/api/projects/${id}?populate=*`, {
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${STRAPI_TOKEN}`,
        },
        cache: 'force-cache',
        next: {
            tags: ['projects'],
        },
    })

export const getProjectBySlug = async (slug: string) => {
    const projects = await getProjects()
    const json = await projects.json()
    return json.data.find(
        (project: Project) => titleToSlug(project.attributes.title) === slug
    )
}

export const getExperiences = async () =>
    await fetch('https://strapi.omarzunic.com/api/experiences', {
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${STRAPI_TOKEN}`,
        },
        cache: 'force-cache',
        next: {
            tags: ['experience'],
        },
    })

export const titleToSlug = (title: string) =>
    title
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/\//g, '-')
        .replace(/[^a-z0-9-]/g, '')
