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
            artist: "Rubel",
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
        {
            title: "Levo Comigo",
            artist: "Restart",
            audioSrc: "/levocomigo.mp3",
            imageSrc: "/foto7.jpeg",
        },
        {
            title: "Não Quero Dinheiro",
            artist: "Tim Maia",
            audioSrc: "/queroamar.mp3",
            imageSrc: "/foto9.jpeg",
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
                <p>26 / 08 / 2025</p>
            </div>

            <div className={styles.carta}>
                <p>Desde que te encontrei, Deus tem me ensinado de forma cada vez mais profunda sobre o amor, aquele amor que acalma, que inspira, que faz o coração bater mais forte só de pensar em você.

                    Amor, existe algo em você que me cativa de um jeito único, algo que não sei explicar, mas que me faz me apaixonar mais e mais a cada dia. É como se tudo em mim encontrasse paz quando estou com você. A vida, desde então, ficou mais bonita, até poque como já disse nosso querido amigo Rubel, “A vida é boa, mas é muito melhor com você”.</p>
                <p style={{margin:0, marginLeft:"21%"}}>Do seu eterno namorado,</p>
                <p>Lucas Altino</p>
            </div>
        </div>
    );
}

export default Home;
