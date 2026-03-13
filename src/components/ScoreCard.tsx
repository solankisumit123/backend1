import { useEffect, useState } from "react";

interface ScoreCardProps {
  title: string;
  score: number;
  subtitle: string;
  color: string;
  delay?: number;
}

const ScoreCard = ({ title, score, subtitle, color, delay = 0 }: ScoreCardProps) => {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const step = Math.ceil(score / 30);
    const interval = setInterval(() => {
      start += step;
      if (start >= score) {
        setCurrent(score);
        clearInterval(interval);
      } else {
        setCurrent(start);
      }
    }, 30);
    return () => clearInterval(interval);
  }, [visible, score]);

  return (
    <div className={`comic-card ${visible ? "animate-pop-in" : "opacity-0"}`}>
      <h3 className="comic-heading text-lg md:text-xl text-foreground mb-3 uppercase">{title}</h3>
      <div className={`comic-score ${color}`}>{current}</div>
      <p className="text-sm text-muted-foreground font-bold mt-1 mb-3">{subtitle}</p>
      <div className="comic-progress-track">
        <div
          className="comic-progress-bar"
          style={{ width: visible ? `${score}%` : "0%" }}
        />
      </div>
    </div>
  );
};

export default ScoreCard;
