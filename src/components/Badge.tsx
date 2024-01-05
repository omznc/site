export default function Badge({ title }: Readonly<{ title: string }>) {
    return (
        <span className="rounded-lg bg-neutral-200 dark:bg-neutral-800 gradient-parent px-2 py-1 text-sm">
            <div className="gradient" />
            {title}
        </span>
    )
}
