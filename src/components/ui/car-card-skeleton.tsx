export default function CarCardSkeleton() {
  return (
    <div className="w-64 rounded-xl overflow-hidden border border-secondary-300 animate-pulse h-96">
      <div className="w-full h-48 bg-gray-300" />

      <div className="mt-4 px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="h-6 w-32 bg-gray-300 rounded" />
          </div>

          <div className="h-6 w-20 bg-gray-300 rounded" />
        </div>

        <div className="mt-8 space-y-3">
          <div className="flex items-center gap-2">
            <div className="h-4 w-16 bg-gray-300 rounded" />
            <div className="h-4 w-2 bg-gray-300 rounded" />
            <div className="h-4 w-20 bg-gray-300 rounded" />
            <div className="h-4 w-2 bg-gray-300 rounded" />
            <div className="h-4 w-16 bg-gray-300 rounded" />
          </div>

          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gray-300 rounded-full" />
            <div className="h-4 w-40 bg-gray-300 rounded" />
          </div>
        </div>

        <div className="h-10 w-full bg-gray-300 rounded mt-4 mb-4" />
      </div>
    </div>
  );
}
