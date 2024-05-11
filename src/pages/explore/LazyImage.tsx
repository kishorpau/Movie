interface LazyProps {
  src: string;
  alt: string;
  style?: React.CSSProperties;
  className: string;
}

const LazyImage = ({ src, alt, style, className }: LazyProps) => {
  return <img src={src} alt={alt} style={style} className={className} />;
};

export default LazyImage;
