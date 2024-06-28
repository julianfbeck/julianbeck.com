import React from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

interface ImageSliderProps {
  images: string[];
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
  return (
    <div className="mb-20">
      <Slide duration={2000} transitionDuration={300}>
        {images.map((image, index) => (
          <div
            key={index}
            className="each-slide-effect h-96 flex items-center justify-center"
          >
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-contain"
              loading="lazy"
              decoding="async"
            />
            <a href={image} className="sr-only"></a>
          </div>
        ))}
      </Slide>
    </div>
  );
};

export default ImageSlider;
