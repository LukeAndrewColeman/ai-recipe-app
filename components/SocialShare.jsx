'use client';

import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  LinkedinShareButton,
  LinkedinIcon,
  RedditShareButton,
  RedditIcon,
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from 'react-share';

const SocialShare = ({ shareUrl }) => {
  // Ensure URL is properly formatted
  const formattedUrl = shareUrl.startsWith('http')
    ? shareUrl
    : `https://${shareUrl}`;

  // Add title and description for better sharing
  const shareTitle = 'Check out this post!';
  const shareDescription =
    'I found this amazing post I thought you might like.';

  return (
    <div className='container mx-auto px-4'>
      <p className='text-gray-800 font-bold mb-4'>
        If you liked this post, please share it with your friends!
      </p>
      <div className='flex gap-4'>
        <FacebookShareButton
          url={formattedUrl}
          quote={shareTitle}
          hashtag='#post'
        >
          <FacebookIcon size={32} round />
        </FacebookShareButton>
        <FacebookMessengerShareButton url={formattedUrl}>
          <FacebookMessengerIcon size={32} round />
        </FacebookMessengerShareButton>
        <WhatsappShareButton url={formattedUrl}>
          <WhatsappIcon size={32} round />
        </WhatsappShareButton>
        <TwitterShareButton
          url={formattedUrl}
          title={shareTitle}
          hashtags={['post', 'blog']}
        >
          <TwitterIcon size={32} round />
        </TwitterShareButton>
        <LinkedinShareButton url={formattedUrl}>
          <LinkedinIcon size={32} round />
        </LinkedinShareButton>
        <RedditShareButton url={formattedUrl}>
          <RedditIcon size={32} round />
        </RedditShareButton>
      </div>
    </div>
  );
};

export default SocialShare;
