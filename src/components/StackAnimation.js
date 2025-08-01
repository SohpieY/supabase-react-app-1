import React, { useState, useEffect } from "react";
import './StackAnimation.css';

const images = [
    "images/artwork/AW1_apples_mainpage.png",
    "/images/artwork/AW2_thread_mainpage.png",
    "/images/artwork/AW4_Dog_mainpage.png",
    "/images/artwork/AW6_laying_mainpage.png",
    "/images/artwork/AW7_flowers_mainpage.png",
    "/images/artwork/AW9_tablecloth_print.png",
    "/images/artwork/AW13_cabinet_painting.png",
    "/images/artwork/AW12_fishes_mixedmedia.png"
]

const StackAnimation = () => {
    const [StackImages, setStackImages] = useState([]);
    const [ImageIndex, setImageIndex] = useState(0);

    useEffect(() => {
        if (ImageIndex < images.length) {
            const timer = setTimeout(() => {
                setStackImages((prev) => [...prev, images[ImageIndex]]);
                setImageIndex((prev) => prev + 1);
            }, 500) // Update the image array every 500ms.
        }
        else {
            const resetTimer = setTimeout(() => {
                setStackImages([]);
                setImageIndex(0);
            }, images.length * 400);
            return () => clearTimeout(resetTimer);
        }
    }, [ImageIndex]);

    return (
        <div className="stack">
            {StackImages.map((src, i) => {
                let angle = 0;
                if (i % 2 === 0) {
                    angle += 10;
                }
                else {
                    angle -= 40;
                }
                const offsetY = i * 10; // Stack offset 10px per image
                const style = {
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: `translate(-50%, -50%) translateY(${offsetY}px) rotate(${angle}deg)`,
                    opacity: 0,
                    animation: 'fadeIn 0.5s forwards',
                    transition: 'transform 0.3s ease, opacity 0.3s ease',
                };
                return <img key={i} src={src} alt={`stack-${i}`} style={style} />;
            })}
        </div>
    )
}

export default StackAnimation;