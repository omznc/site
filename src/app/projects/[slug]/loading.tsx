import { ImSpinner3 } from 'react-icons/im'

export default function Loading() {
    return (
        <div className="flex flex-col w-full h-full items-center justify-center">
            <ImSpinner3 className="animate-spin text-4xl" />
        </div>
    )
}
