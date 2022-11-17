import React from "react";
import { Spacing } from "@design-system/foundation";

interface ImageProps {
  src: string;
  alt: string;
  width: keyof typeof Spacing;
  height: keyof typeof Spacing;
}

const Image: React.FC<ImageProps> = ({ src, alt, width, height }) => {
  const className = `dse-width-${width} dse-height-${height}`;
  return <img src={src} alt={alt} className={className} />;
};

Image.displayName = "Image";

export default Image;
