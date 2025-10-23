import { useState, useEffect } from "react";
import styles from "./Carousel.module.css";

function Carousel() {
    const images = [
        "/foto3.jpeg",
        "/foto1.jpeg",
        "/foto2.jpeg",
        "/foto4.jpeg",
        "/foto5.jpeg",
        "/foto6.jpeg",
        "/foto7.jpeg",
        "/foto8.jpeg",

    ];

    const [index, setIndex] = useState(0);

    // Muda a imagem a cada 5s
    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % images.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <div className={styles.carousel}>
            <img
                src={images[index]}
                alt={`Slide ${index + 1}`}
                className={styles.image}
            />
            <div className={styles.dots}>
                {images.map((_, i) => (
                    <span
                        key={i}
                        className={`${styles.dot} ${i === index ? styles.active : ""}`}
                    />
                ))}
            </div>
        </div>
    );
}

export default Carousel;
