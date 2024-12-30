export default function LoadingOverlay() {
  return (
    <div className='fixed left-0 top-0 w-full h-full bg-neutral/50 backdrop-blur-sm flex items-center justify-center z-50'>
      <div className='bg-base-100 p-8 rounded-lg shadow-xl text-center border border-primary/20'>
        <div className='loading loading-spinner loading-lg mb-4 text-primary'></div>
        <p className='text-lg font-semibold text-neutral'>
          Generating your perfect recipes...
        </p>
        <p className='text-sm text-neutral/70 mt-2'>
          This may take a few moments
        </p>
      </div>
    </div>
  );
}
