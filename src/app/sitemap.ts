import { MetadataRoute } from 'next'
import { getProjects, ProjectsResponse, titleToSlug } from '@/helpers/strapi'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const res = await getProjects()

    const { data: projects }: ProjectsResponse = await res.json()

    return [
        {
            url: 'https://omarzunic.com',
            lastModified: new Date(),
        },
        {
            url: 'https://omarzunic.com/contact',
            lastModified: new Date(),
        },
        {
            url: 'https://omarzunic.com/experience',
            lastModified: new Date(),
        },
        {
            url: 'https://omarzunic.com/projects',
            lastModified: new Date(),
        },
        ...projects.map((project) => ({
            url: `https://omarzunic.com/projects/${titleToSlug(
                project.attributes.title
            )}`,
            lastModified: new Date(project.attributes.updatedAt),
        })),
    ]
}
