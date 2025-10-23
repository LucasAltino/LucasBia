import { useRef, useState, useEffect } from "react";
import styles from "./Home.module.css";

function Card({ title, artist, audioSrc, imageSrc, onNext, onPrev }) {
    const audioRef = useRef(null);
    const progressRef = useRef(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    const togglePlay = () => {
        const audio = audioRef.current;
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        setIsPlaying(!isPlaying);
    };

    const formatTime = (sec) => {
        if (isNaN(sec)) return "0:00";
        const minutes = Math.floor(sec / 60);
        const seconds = Math.floor(sec % 60);
        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    };

    useEffect(() => {
        const audio = audioRef.current;
        const update = () => {
            setCurrentTime(audio.currentTime);
            setDuration(audio.duration);
            const percent = (audio.currentTime / audio.duration) * 100;
            progressRef.current.style.width = `${percent}%`;
        };

        audio.addEventListener("timeupdate", update);

        const tryAutoplay = async () => {
            try {
                await audio.play();
                setIsPlaying(true);
            } catch (err) {
                console.warn("Autoplay bloqueado pelo navegador:", err);
            }
        };

        audio.addEventListener("loadeddata", tryAutoplay);

        return () => {
            audio.removeEventListener("timeupdate", update);
            audio.removeEventListener("loadeddata", tryAutoplay);
        };
    }, [audioSrc]); // reinicia o player ao trocar de música

    return (
        <div className={styles.card}>
            <div
                className={styles.foto}
                style={{
                    backgroundImage: `url(${imageSrc})`,
                    backgroundRepeat: "no-repeat",
                }}
            ></div>
            <p className={styles.titulo}>{title}</p>
            <p className={styles.autor}>{artist}</p>

            <div className={styles.player}>
                <audio ref={audioRef} src={audioSrc} preload="metadata"></audio>

                <div
                    style={{
                        width: "100%",
                        background: "#C08B8B",
                        borderRadius: "2vw",
                    }}
                >
                    <div ref={progressRef} className={styles.progress}></div>
                </div>

                <div className={styles.time}>
                    <span>{formatTime(currentTime)}</span>
                    <span>-{formatTime(duration - currentTime)}</span>
                </div>

                <div className={styles.controls}>
                    {/* Voltar para o card anterior */}
                    <button onClick={onPrev} aria-label="Música anterior">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="36" height="36" fill="white">
                            <path d="M236.3 107.1C247.9 96 265 92.9 279.7 99.2C294.4 105.5 304 120 304 136V272.3L476.3 107.2C487.9 96 505 92.9 519.7 99.2C534.4 105.5 544 120 544 136V504C544 520 534.4 534.5 519.7 540.8C505 547.1 487.9 544 476.3 532.9L304 367.7V504C304 520 294.4 534.5 279.7 540.8C265 547.1 247.9 544 236.3 532.9L44.3 348.9C36.5 341.3 32 330.9 32 320C32 309.1 36.5 298.7 44.3 291.1L236.3 107.1z" />
                        </svg>
                    </button>

                    {/* Play / Pause */}
                    <button onClick={togglePlay} aria-label={isPlaying ? "Pausar" : "Tocar"}>
                        {isPlaying ? (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="36" height="36" fill="white">
                                <path d="M176 96C149.5 96 128 117.5 128 144V496C128 522.5 149.5 544 176 544H240C266.5 544 288 522.5 288 496V144C288 117.5 266.5 96 240 96H176zM400 96C373.5 96 352 117.5 352 144V496C352 522.5 373.5 544 400 544H464C490.5 544 512 522.5 512 496V144C512 117.5 490.5 96 464 96H400z" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="36" height="36" fill="white">
                                <path d="M187.2 100.9C174.8 94.1 159.8 94.4 147.6 101.6C135.4 108.8 128 121.9 128 136V504C128 518.1 135.5 531.2 147.6 538.4C159.7 545.6 174.8 545.9 187.2 539.1L523.2 355.1C536 348.1 544 334.6 544 320C544 305.4 536 291.9 523.2 284.9L187.2 100.9z" />
                            </svg>
                        )}
                    </button>

                    {/* Avançar para o próximo card */}
                    <button onClick={onNext} aria-label="Próxima música">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="36" height="36" fill="white">
                            <path d="M403.7 107.1C392.1 96 375 92.9 360.3 99.2C345.6 105.5 336 120 336 136V272.3L163.7 107.2C152.1 96 135 92.9 120.3 99.2C105.6 105.5 96 120 96 136V504C96 520 105.6 534.5 120.3 540.8C135 547.1 152.1 544 163.7 532.9L336 367.7V504C336 520 345.6 534.5 360.3 540.8C375 547.1 392.1 544 403.7 532.9L595.7 348.9C603.6 341.4 608 330.9 608 320C608 309.1 603.5 298.7 595.7 291.1L403.7 107.1z" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Card;
