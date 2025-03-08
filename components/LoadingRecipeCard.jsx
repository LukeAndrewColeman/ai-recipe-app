export default function LoadingRecipeCard() {
  return (
    <div className='card bg-base-100 shadow-xl py-8'>
      <div className='card-body flex flex-col items-center justify-center gap-4'>
        <div className='relative w-16 h-16'>
          {/* Outer ring */}
          <div className='absolute w-full h-full border-4 border-primary opacity-20 rounded-full'></div>
          {/* Spinning ring */}
          <div className='absolute w-full h-full border-4 border-primary border-t-transparent rounded-full animate-[spin_1.2s_linear_infinite]'></div>
        </div>
        <p className='text-primary animate-pulse'>Generating recipe...</p>
      </div>
    </div>
  );
}
