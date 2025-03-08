import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='min-h-[60vh] flex items-center justify-center'>
      <div className='text-center space-y-6 p-8'>
        <h1 className='text-6xl font-bold text-primary'>404</h1>
        <h2 className='text-2xl font-semibold text-neutral'>Page Not Found</h2>
        <p className='text-neutral/70 max-w-md mx-auto'>
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <div className='mt-8'>
          <Link href='/' className='btn btn-primary'>
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
