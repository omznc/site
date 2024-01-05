'use client'

import Image from 'next/image'
import { ReactNode, useState } from 'react'
import FullScreenCarousel from '@/components/FullScreenCarousel'
import { Project } from '@/helpers/strapi'

export default function Client({ project }: { project: Project }) {
    const [carouselOpen, setCarouselOpen] = useState(false)
    const [imageId, setImageId] = useState('')
    return (
        <Gallery>
            {project.attributes.media?.data?.map((media) => (
                <Image
                    key={media.id}
                    src={`https://strapi.omarzunic.com${media.attributes.url}`}
                    alt={project.attributes.title}
                    width={media.attributes?.width || 1920}
                    height={media.attributes?.height || 1080}
                    className={`w-full rounded-lg max-h-[300px]  max-w-[500px] object-cover hover:opacity-80 transition-all cursor-pointer border-[1px] dark:border-white border-black border-opacity-10 dark:border-opacity-10`}
                    onClick={() => {
                        setImageId(media.id.toString())
                        setCarouselOpen(true)
                    }}
                    blurDataURL={media.attributes.placeholder}
                    placeholder={
                        media.attributes.placeholder ? 'blur' : undefined
                    }
                />
            ))}
            {carouselOpen && (
                <FullScreenCarousel
                    images={project.attributes.media?.data?.map((media) => ({
                        id: media.id.toString(),
                        url: `https://strapi.omarzunic.com${media.attributes.url}`,
                        placeholder: media.attributes.placeholder,
                    }))}
                    imageId={imageId}
                    setImageId={setImageId}
                    setCarouselOpen={setCarouselOpen}
                />
            )}
        </Gallery>
    )
}

function Gallery({ children }: { children: ReactNode }) {
    return (
        <div className={`flex flex-row flex-shrink flex-wrap gap-2`}>
            {children}
        </div>
    )
}
