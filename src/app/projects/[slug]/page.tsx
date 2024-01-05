import {
    getProject,
    getProjectBySlug,
    Project,
    ProjectsResponse,
    titleToSlug,
    getProjects,
} from '@/helpers/strapi'
import { LinkExternal, Title } from '@/components/Text'
import * as md from 'markdown-it'
import Badge from '@/components/Badge'
import Client from '@/app/projects/[slug]/client'
import { redirect } from 'next/navigation'
import type { Metadata } from 'next'
import { metadata as defaultMetadata } from '@/app/layout'

const mdParser = md.default()
export default async function Page({
    params,
}: Readonly<{ params?: { slug?: string } }>) {
    if (!params?.slug) {
        return redirect('/projects')
    }

    const isLegacy = !isNaN(Number(params.slug))

    const res = isLegacy
        ? await getProject(params.slug)
        : await getProjectBySlug(params.slug)

    if (isLegacy && res.status !== 200) {
        return redirect('/projects')
    }

    if (isLegacy) {
        const { data: project }: { data: Project } = await res.json()
        return redirect(`/projects/${titleToSlug(project.attributes.title)}`)
    }

    const project = res

    // parse the description as markdown
    project.attributes.description = mdParser.render(
        project.attributes.description
    )

    return (
        <div className="flex flex-col w-full gap-8">
            <div className={`flex flex-col gap-4`}>
                {project.attributes.site ? (
                    <Title>
                        <LinkExternal
                            text={project.attributes.title}
                            href={project.attributes.site}
                        />
                    </Title>
                ) : (
                    <Title>{project.attributes.title}</Title>
                )}
                <div className="flex gap-4 flex-wrap cursor-default">
                    {project.attributes.technologies
                        .split(',')
                        .map((tech: string) => (
                            <Badge key={tech} title={tech} />
                        ))}
                </div>
                {project.attributes.source && (
                    <LinkExternal
                        text={'Source Code'}
                        href={project.attributes.source}
                    />
                )}
            </div>

            <div
                className="flex flex-col gap-4"
                dangerouslySetInnerHTML={{
                    __html: project.attributes.description,
                }}
            />

            <Client project={project} />
        </div>
    )
}

export async function generateStaticParams() {
    const res = await getProjects()

    if (res.status !== 200) {
        return []
    }

    const { data: projects }: ProjectsResponse = await res.json()

    return projects.map((project) => ({
        params: {
            slug: titleToSlug(project.attributes.title),
        },
    }))
}

type Props = {
    params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const isLegacy = !isNaN(Number(params.slug))

    const res = isLegacy
        ? await getProject(params.slug)
        : await getProjectBySlug(params.slug)

    if (isLegacy && res.status !== 200) {
        return {
            ...defaultMetadata,
            title: "Omar Zunic's Projects",
        }
    }

    let project: Project
    if (isLegacy) {
        const { data: projectData }: { data: Project } = await res.json()
        project = projectData
    } else {
        project = res
    }

    return {
        ...defaultMetadata,
        title: `${project.attributes.title} - Omar Zunic's Projects`,
        description: project.attributes.abstract,
        openGraph: {
            title: `${project.attributes.title} - Omar Zunic's Projects`,
            description: project.attributes.abstract,
            images: project.attributes.media?.data?.[0]?.attributes?.url
                ? [
                      `https://strapi.omarzunic.com${project.attributes.media?.data?.[0]?.attributes?.url}`,
                  ]
                : undefined,
        },
        keywords: [
            ...(defaultMetadata.keywords as string[]),
            project.attributes.title,
            ...project.attributes.technologies.split(','),
        ],
    }
}
