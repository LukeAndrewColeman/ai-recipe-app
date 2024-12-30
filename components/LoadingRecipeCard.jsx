export default function LoadingRecipeCard() {
  return (
    <div className='card bg-base-100 shadow-xl animate-pulse'>
      <div className='card-body'>
        {/* Title */}
        <div className='h-8 bg-gray-200 rounded w-3/4 mb-4'></div>

        {/* Description */}
        <div className='space-y-2'>
          <div className='h-4 bg-gray-200 rounded w-full'></div>
          <div className='h-4 bg-gray-200 rounded w-5/6'></div>
        </div>

        {/* Mood Benefit */}
        <div className='h-4 bg-gray-200 rounded w-2/3 mt-2'></div>

        {/* Quick Facts */}
        <div className='flex gap-4 mt-2'>
          <div className='h-4 bg-gray-200 rounded w-24'></div>
          <div className='h-4 bg-gray-200 rounded w-24'></div>
        </div>

        {/* Button */}
        <div className='h-10 bg-gray-200 rounded w-32 mt-4'></div>
      </div>
    </div>
  );
}
