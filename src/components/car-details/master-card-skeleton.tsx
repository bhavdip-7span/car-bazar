export default function MasterCardSkeleton() {
  return (
    <div className="sticky top-[200px] border border-gray-300 rounded-lg p-6 animate-pulse">
      <div className="absolute top-2 right-2 h-6 w-16 rounded-lg bg-secondary-300"></div>

      <div className="mt-2 h-7 w-3/4 rounded bg-secondary-300"></div>

      <div className="mt-3 h-4 w-1/3 rounded bg-secondary-300"></div>

      <div className="flex gap-4 items-center mt-4">
        <div className="h-4 w-20 rounded bg-secondary-300"></div>
        <div className="h-1 w-1 rounded-full bg-secondary-300"></div>
        <div className="h-4 w-16 rounded bg-secondary-300"></div>
        <div className="h-1 w-1 rounded-full bg-secondary-300"></div>
        <div className="h-4 w-20 rounded bg-secondary-300"></div>
        <div className="h-1 w-1 rounded-full bg-secondary-300"></div>
        <div className="h-4 w-16 rounded bg-secondary-300"></div>
      </div>

      <div className="bg-secondary-100 p-4 mt-4 rounded-lg">
        <div className="h-7 w-40 rounded bg-secondary-300"></div>

        <div className="mt-3 h-4 w-32 rounded bg-secondary-300"></div>
      </div>

      <div className="mt-4 h-11 w-full rounded-lg bg-secondary-300"></div>
    </div>
  );
}
