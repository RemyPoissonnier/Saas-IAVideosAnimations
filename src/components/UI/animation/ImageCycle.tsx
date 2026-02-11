import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ImageCycleProps {
  images: string[];
  interval?: number;
}

const ImageCycle: React.FC<ImageCycleProps> = ({ images, interval = 1000 }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval]);

  return (
    <div className="relative w-80 h-80 overflow-hidden ">
      <AnimatePresence mode="wait">
        <motion.img
          key={index}
          src={images[index]}
          alt={`Frame ${index}`}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>
    </div>
  );
};

export default ImageCycle;
