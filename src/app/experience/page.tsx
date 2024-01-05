import {
    LinkExternal,
    Paragraph,
    Subtitle,
    Title,
    TitleSecondary,
} from '@/components/Text'
import { ExperienceResponse, getExperiences } from '@/helpers/strapi'

export default async function Page() {
    const res = await getExperiences()

    if (res.status !== 200) {
        return (
            <div className="flex flex-col gap-8">
                <div>
                    <Title>{'experience'}</Title>
                    <Subtitle>things and stuff, stuff and things</Subtitle>
                </div>
                <div>
                    <TitleSecondary>
                        {'Failed to load experiences :('}
                    </TitleSecondary>
                </div>
            </div>
        )
    }

    const { data: experiences }: ExperienceResponse = await res.json()

    return (
        <div className="flex flex-col gap-8">
            <div>
                <Title>{'experience'}</Title>
                <Subtitle>things and stuff, stuff and things</Subtitle>
            </div>
            {experiences
                .sort(
                    (a, b) =>
                        new Date(b.attributes.start_date).getTime() -
                        new Date(a.attributes.start_date).getTime()
                )
                .map((experience) => {
                    const startDate = new Date(
                        experience.attributes.start_date
                    ).toLocaleString('default', {
                        month: 'short',
                        year: 'numeric',
                    })
                    const endDate = experience.attributes.end_date
                        ? new Date(
                              experience.attributes.end_date
                          ).toLocaleString('default', {
                              month: 'short',
                              year: 'numeric',
                          })
                        : null

                    return (
                        <div
                            key={`${
                                experience.id
                            }-${experience.attributes.position.replace(
                                '',
                                '-'
                            )} `}
                            className="flex flex-col gap-2"
                        >
                            <TitleSecondary>
                                <LinkExternal
                                    text={experience.attributes.title}
                                    href={experience.attributes.link ?? '#'}
                                />
                            </TitleSecondary>
                            <Subtitle>
                                {`${
                                    experience.attributes.position
                                } (${startDate} - ${endDate ?? 'present'})`}
                            </Subtitle>
                            <Paragraph>
                                {experience.attributes.description
                                    .split('\n')
                                    .map((line, index) => (
                                        <span
                                            key={`${experience.attributes.title}-${index}`}
                                            className={'block'}
                                        >
                                            {line}
                                        </span>
                                    ))}
                            </Paragraph>
                        </div>
                    )
                })}
        </div>
    )
}
