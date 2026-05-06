import { optimizeImage } from '../../lib/imageOptimization';

const OptimizedImage = ({
  src,
  alt,
  renderedWidth,
  renderedHeight,
  className = '',
  loading = 'lazy',
  priority = false,
  ...props
}) => {

  const dprWidth = renderedWidth ? renderedWidth * 2 : null;
  const dprHeight = renderedHeight ? renderedHeight * 2 : null;

  const optimizedUrl = optimizeImage(src, {
    width: dprWidth,
    height: dprHeight,
    quality: priority ? 90 : 'auto',
    format: 'webp'
  });

  return (
    <img
      src={optimizedUrl}
      alt={alt}
      width={renderedWidth}
      height={renderedHeight}
      className={className}
      loading={priority ? 'eager' : loading}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
      {...props}
    />
  );
};

export default OptimizedImage;
