import { Subtitle, Title, TitleSecondary } from '@/components/Text'
import Link from 'next/link'
import Badge from '@/components/Badge'
import type { Metadata } from 'next'
import { metadata as defaultMetadata } from '@/app/layout'
import { getProjects, ProjectsResponse, titleToSlug } from '@/helpers/strapi'
import Image from 'next/image'

export default async function Page() {
    const res = await getProjects()

    if (res.status !== 200) {
        return (
            <div className="flex flex-col gap-8">
                <div>
                    <Title>{'projects'}</Title>
                    <Subtitle>{"some of the things I've worked on"}</Subtitle>
                </div>
                <div>
                    <TitleSecondary>
                        {'Failed to load projects :('}
                    </TitleSecondary>
                </div>
            </div>
        )
    }

    const { data: projects }: ProjectsResponse = await res.json()

    return (
        <div className="flex flex-col gap-8">
            <div>
                <Title>{'projects'}</Title>
                <Subtitle>{"some of the things I've worked on"}</Subtitle>
            </div>

            <div className="flex flex-col gap-8">
                {projects.map((project) => (
                    <Link
                        href={`/projects/${titleToSlug(
                            project.attributes.title
                        )}`}
                        passHref={true}
                        className={'group flex gap-4 cursor-pointer'}
                        key={project.id}
                    >
                        {project.attributes.media?.data?.[0]?.attributes
                            ?.url && (
                            <Image
                                src={`https://strapi.omarzunic.com${project.attributes.media?.data?.[0]?.attributes?.url}`}
                                alt={project.attributes.title}
                                width={200}
                                height={200}
                                className={
                                    'hidden md:block object-center rounded-md w-0 -ml-10 scale-50 group-hover:scale-100 group-hover:ml-0 overflow-hidden group-hover:w-52 h-32 object-cover transition-all border-[1px] dark:border-white border-black border-opacity-10 dark:border-opacity-10 duration-300'
                                }
                            />
                        )}

                        <div
                            key={project.id}
                            className="flex flex-col gap-2 md:ml-5 md:group-hover:ml-0 transition-all"
                        >
                            <TitleSecondary>
                                {project.attributes.title}
                            </TitleSecondary>
                            <Subtitle>
                                {project.attributes.abstract ||
                                    'Click to learn more'}
                            </Subtitle>
                            <div className="flex gap-2 flex-wrap">
                                {project.attributes.technologies
                                    .split(',')
                                    .map((tech) => (
                                        <Badge title={tech} key={tech} />
                                    ))}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export async function generateMetadata(): Promise<Metadata> {
    const res = await getProjects()

    if (res.status !== 200) {
        return {
            ...defaultMetadata,
            title: 'Projects - Omar Žunić',
            description: 'A list of projects I have worked on',
        }
    }

    const { data: projects }: ProjectsResponse = await res.json()

    return {
        ...defaultMetadata,
        title: 'Projects - Omar Žunić',
        description: `${
            projects.length
        } projects I have worked on, like ${projects
            .map((project) => project.attributes.title)
            .join(', ')}`,
        keywords: [
            ...(defaultMetadata.keywords as string[]),
            ...projects.map((project) => project.attributes.title),
            ...projects
                .map((project) => project.attributes.technologies.split(','))
                .flat(),
        ],
    }
}
