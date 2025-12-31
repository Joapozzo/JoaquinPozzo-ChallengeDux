export default function UsersLoadingSkeleton() {
    return (
        <div className="flex flex-col gap-4 p-4">
            <div className="h-16 bg-gray-200 rounded animate-pulse" />
            <div className="h-12 bg-gray-200 rounded animate-pulse" />
            <div className="h-96 bg-gray-200 rounded animate-pulse" />
        </div>
    );
}