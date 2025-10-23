import { useEffect, useState } from "react";
import styles from "./Timer.module.css";

function computeComponentsSince(startDate, now) {
    // clonamos para não alterar o original
    const temp = new Date(startDate.getTime());

    // anos
    let years = now.getFullYear() - temp.getFullYear();
    // ajusta se ainda não completou o aniversário deste ano
    temp.setFullYear(temp.getFullYear() + years);
    if (temp > now) {
        years--;
        temp.setFullYear(temp.getFullYear() - 1);
    }

    // meses
    let months = now.getMonth() - temp.getMonth();
    if (months < 0) months += 12;
    temp.setMonth(temp.getMonth() + months);
    if (temp > now) {
        months--;
        temp.setMonth(temp.getMonth() - 1);
    }

    // dias restantes (até agora) — calcula total de dias entre temp e now
    const msPerDay = 1000 * 60 * 60 * 24;
    let diffMs = now.getTime() - temp.getTime();
    let totalDays = Math.floor(diffMs / msPerDay);

    // semanas e dias
    const weeks = Math.floor(totalDays / 7);
    const days = totalDays % 7;

    // subtrai os dias já considerados do temp para calcular horas/minutos corretamente
    temp.setDate(temp.getDate() + totalDays);

    // horas
    diffMs = now.getTime() - temp.getTime();
    const msPerHour = 1000 * 60 * 60;
    const hours = Math.floor(diffMs / msPerHour);

    // minutos
    diffMs = diffMs - hours * msPerHour;
    const msPerMin = 1000 * 60;
    const minutes = Math.floor(diffMs / msPerMin);

    return { years, months, weeks, days, hours, minutes };
}

export default function Timer() {
    // Data inicial: 26 de agosto de 2025 (mês é 7 porque Date conta 0..11)
    const startDate = new Date(2025, 7, 26, 0, 0, 0);

    const [components, setComponents] = useState({
        years: 0,
        months: 0,
        weeks: 0,
        days: 0,
        hours: 0,
        minutes: 0,
    });

    useEffect(() => {
        const tick = () => {
            const now = new Date();
            const comp = computeComponentsSince(startDate, now);
            setComponents(comp);
        };

        tick();
        const id = setInterval(tick, 1000);
        return () => clearInterval(id);
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.item}>
                <span className={styles.numero}>{components.years}</span>
                <p className={styles.label}>anos</p>
            </div>

            <div className={styles.item}>
                <span className={styles.numero}>{components.months}</span>
                <p className={styles.label}>meses</p>
            </div>

            <div className={styles.item}>
                <span className={styles.numero}>{components.weeks}</span>
                <p className={styles.label}>semanas</p>
            </div>

            <div className={styles.item}>
                <span className={styles.numero}>{components.days}</span>
                <p className={styles.label}>dias</p>
            </div>

            <div className={styles.item}>
                <span className={styles.numero}>{components.hours}</span>
                <p className={styles.label}>horas</p>
            </div>

            <div className={styles.item}>
                <span className={styles.numero}>{components.minutes}</span>
                <p className={styles.label}>minutos</p>
            </div>
        </div>
    );
}
