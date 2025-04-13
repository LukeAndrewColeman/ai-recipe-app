import Link from 'next/link';

const Footer = () => {
  return (
    <footer className='footer footer-center py-8 bg-[#1B3C6F] text-white'>
      <div>
        <p>SmartRecipe AI - All rights reserved © {new Date().getFullYear()}</p>
        <div className='flex items-center gap-2'>
          <p>Made by</p>
          <Link
            className='underline'
            href='https://portfolio.lukeacoleman.com'
            target='_blank'
          >
            Luke A Coleman
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
