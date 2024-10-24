// eslint-disable-next-line react/prop-types
const Images = ({ src, alt, width, height, className }) => {
    return <img 
        src={src} 
        alt={alt} 
        width={width} 
        height={height} 
        className={className}
    />;
};

export default Images;