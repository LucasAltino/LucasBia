import { useState } from "react";
import styles from "./Home.module.css";
import Timer from "./Timer";
import Carousel from "./Carousel";
import Card from "./Card";

function Home() {
    const cards = [
        {
            title: "Aliança",
            artist: "Tribalistas",
            audioSrc: "/alianca.mp3",
            imageSrc: "/foto1.jpeg",
        },
        {
            title: "Lisboa",
            artist: "ANAVITÓRIA, Lenine",
            audioSrc: "/lisboa.mp3",
            imageSrc: "/foto2.jpeg",
        },
        {
            title: "Velha Infância",
            artist: "Tribalistas",
            audioSrc: "/velha.mp3",
            imageSrc: "/foto3.jpeg",
        },
        {
            title: "Partilhar",
            artist: "Rubel, ANAVITÓRIA",
            audioSrc: "/partilhar.mp3",
            imageSrc: "/foto4.jpeg",
        },
        {
            title: "BB",
            artist: "Tim Bernardes",
            audioSrc: "/BB.mp3",
            imageSrc: "/foto5.jpeg",
        },
        {
            title: "Um Amor Puro",
            artist: "Djavan",
            audioSrc: "/amorpuro.mp3",
            imageSrc: "/foto6.jpeg",
        },
    ];


    const [currentIndex, setCurrentIndex] = useState(0);

    const nextCard = () => {
        setCurrentIndex((prev) => (prev + 1) % cards.length);
    };

    const prevCard = () => {
        setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
    };

    const currentCard = cards[currentIndex];

    return (
        <div className={styles.principal}>
            <Card
                key={currentCard.title}
                title={currentCard.title}
                artist={currentCard.artist}
                audioSrc={currentCard.audioSrc}
                imageSrc={currentCard.imageSrc}
                onNext={nextCard}
                onPrev={prevCard}
            />

            <div className={styles.cardtempo}>
                <div className={styles.fotinha}>
                    <p>Sobre o casal</p>
                </div>
                <div className={styles.timer}>
                    <p className={styles.nome}>Lucas e Anna Beatriz</p>
                    <h3>Juntinhos há:</h3>
                    <Timer />
                </div>
            </div>

            <Carousel />
            
            <div className={styles.data}>
                <img src="/fotodata.png" alt=""/>
            </div>
        </div>
    );
}

export default Home;
