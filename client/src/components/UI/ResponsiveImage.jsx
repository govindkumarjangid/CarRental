const ResponsiveImage = ({
  src,
  mobileSrc,
  alt,
  className = '',
  width,
  height,
  priority = false,
  ...props
}) => {
  return (
    <picture>
      {mobileSrc && (
        <source
          media="(max-width: 768px)"
          srcSet={mobileSrc}
        />
      )}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        {...props}
      />
    </picture>
  );
};

export default ResponsiveImage;
