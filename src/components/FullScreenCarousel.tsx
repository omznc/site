'use client'

import { useEffect, useRef } from 'react'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import Image from 'next/image'

export default function FullScreenCarousel({
    images,
    imageId,
    setImageId,
    setCarouselOpen,
}: {
    images?: {
        id: string
        url: string
        placeholder?: string
    }[]
    imageId: string
    setImageId: (_: string) => void
    setCarouselOpen: (_: boolean) => void
}) {
    const setOnLoad = () => {
        setImageId(visibleImages[buffer]?.id)
    }

    useEffect(() => {
        // Set the currently selected image to the center image when the component mounts
        setOnLoad()
    }, [setOnLoad])

    const handleArrowLeft = () => {
        const newIndex = (index - 1 + numImages) % numImages
        setOnChange(newIndex)
    }

    const handleArrowRight = () => {
        const newIndex = (index + 1) % numImages
        setOnChange(newIndex)
    }

    useKeybind('ArrowLeft', handleArrowLeft)
    useKeybind('ArrowRight', handleArrowRight)
    useKeybind('Escape', () => setCarouselOpen(false))

    if (!images) {
        return null
    }

    const index = images.findIndex((image) => image.id === imageId)
    const numImages = images.length
    const numVisibleImages = images.length >= 9 ? 9 : images.length
    const buffer = Math.floor(numVisibleImages / 2)

    const visibleImages = Array.from({ length: numVisibleImages }, (_, i) => {
        const offset = i - buffer
        let circularIndex = (index + offset) % numImages
        if (circularIndex < 0) {
            circularIndex += numImages
        }
        return images[circularIndex]
    })

    const setOnChange = (id: number) => {
        setImageId(images[id].id)
    }

    return (
        <div
            className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-90 p-8 z-50 flex animate-fade-in justify-center items-center"
            onClick={() => setCarouselOpen(false)}
        >
            <div className="flex flex-col h-full w-full justify-between items-center gap-4">
                <div
                    className="flex flex-col  justify-between overflow-hidden h-3/4 items-center gap-4"
                    onClick={(e) => e.stopPropagation()}
                >
                    <Image
                        src={visibleImages[buffer].url}
                        alt={'Image'}
                        width={500}
                        height={500}
                        className="object-contain h-full w-full"
                        blurDataURL={visibleImages[buffer].placeholder}
                        placeholder={visibleImages[buffer] ? 'blur' : undefined}
                    />
                </div>
                <div className="flex flex-row h-1/6 w-full justify-center items-center gap-0 snap snap-x snap-mandatory overflow-visible">
                    <FaArrowLeft
                        className="w-8 h-8 mr-8 text-white opacity-50 cursor-pointer transition-all hover:opacity-100"
                        onClick={(e) => {
                            e.stopPropagation()
                            handleArrowLeft()
                        }}
                    />
                    {visibleImages.map((image) => (
                        <div
                            key={image.id}
                            className={`overflow-hidden object-cover h-[150px] w-[150px] justify-center items-center flex brightness-75 cursor-pointer transition-all hover:brightness-100 ${
                                image.id === imageId
                                    ? ''
                                    : 'saturate-0 brightness-50 hover:saturate-100 hover:brightness-100'
                            }
							${image.id === visibleImages[0].id ? 'rounded-l-lg' : ''}
							${image.id === visibleImages[visibleImages.length - 1].id ? 'rounded-r-lg' : ''}
							`}
                            onClick={(e) => {
                                e.stopPropagation()
                                setImageId(image.id)
                            }}
                        >
                            <Image
                                src={image.url}
                                alt={'Image'}
                                width={100}
                                height={100}
                                className="h-full w-full bg-white dark:bg-black bg-opacity-70 object-cover"
                                blurDataURL={image.placeholder}
                                placeholder={
                                    image.placeholder ? 'blur' : undefined
                                }
                            />
                        </div>
                    ))}
                    <FaArrowRight
                        className="w-8 h-8 ml-8 text-white opacity-50 cursor-pointer transition-all hover:opacity-100"
                        onClick={(e) => {
                            e.stopPropagation()
                            handleArrowRight()
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

const useKeybind = (
    keys: string | string[],
    callback: (_: KeyboardEvent) => void,
    ctrlPressed: boolean = false
) => {
    const callbackRef = useRef<(_: KeyboardEvent) => void>(callback)

    useEffect(() => {
        callbackRef.current = callback
    }, [callback])

    useEffect(() => {
        const keysArray = Array.isArray(keys) ? keys : [keys]

        function handleKeyPress(e: KeyboardEvent) {
            const isKeyMatch = keysArray.includes(e.key)
            const isCtrlMatch = ctrlPressed ? e.ctrlKey : !e.ctrlKey

            if (isKeyMatch && isCtrlMatch) {
                callbackRef.current(e)
            }
        }

        window.addEventListener('keydown', handleKeyPress)

        return () => {
            window.removeEventListener('keydown', handleKeyPress)
        }
    }, [keys, ctrlPressed])
}
