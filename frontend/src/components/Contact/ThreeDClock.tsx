import React, { useState, useEffect } from "react";
import "./ThreeDClock.css";

const DIGIT_BARS = [
  ['end', 'top'],
  ['side', 'top', 'left'],
  ['side', 'top', 'right'],
  ['middle'],
  ['side', 'bottom', 'left'],
  ['side', 'bottom', 'right'],
  ['end', 'bottom']
];

const DIGIT_MAP: Record<string, number[]> = {
  '0': [1, 1, 1, 0, 1, 1, 1],
  '1': [0, 0, 1, 0, 0, 1, 0],
  '2': [1, 0, 1, 1, 1, 0, 1],
  '3': [1, 0, 1, 1, 0, 1, 1],
  '4': [0, 1, 1, 1, 0, 1, 0],
  '5': [1, 1, 0, 1, 0, 1, 1],
  '6': [1, 1, 0, 1, 1, 1, 1],
  '7': [1, 0, 1, 0, 0, 1, 0],
  '8': [1, 1, 1, 1, 1, 1, 1],
  '9': [1, 1, 1, 1, 0, 1, 1],
};

const Digit: React.FC<{ digit: string }> = ({ digit }) => {
  const activePattern = DIGIT_MAP[digit] || DIGIT_MAP['0'];
  return (
    <div className="metty-digit">
      {DIGIT_BARS.map((classes, i) => (
        <span 
          key={i} 
          className={classes.join(" ")} 
          style={{ opacity: activePattern[i] ? 1 : 0.02 }} 
        />
      ))}
    </div>
  );
};

const ClockDigits: React.FC<{ h: string; m: string; s: string; p: string }> = ({ h, m, s, p }) => (
  <div className="metty-digits-group">
    <div className="metty-digit-pair">
      <Digit digit={h[0]} />
      <Digit digit={h[1]} />
    </div>
    <div className="metty-colon-dots" />
    <div className="metty-digit-pair">
      <Digit digit={m[0]} />
      <Digit digit={m[1]} />
    </div>
    <div className="metty-colon-dots" />
    <div className="metty-digit-pair" style={{ position: "relative" }}>
      <Digit digit={s[0]} />
      <Digit digit={s[1]} />
      <div className="metty-ampm">{p}</div>
    </div>
  </div>
);

const ThreeDClock: React.FC = () => {
  const [time, setTime] = useState({ h: "00", m: "00", s: "00", p: "AM" });

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const fmt = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true
      });
      const parts = fmt.formatToParts(now);
      let h = "00", m = "00", s = "00", p = "AM";
      parts.forEach(px => {
        if (px.type === "hour") h = px.value.padStart(2, "0");
        if (px.type === "minute") m = px.value.padStart(2, "0");
        if (px.type === "second") s = px.value.padStart(2, "0");
        if (px.type === "dayPeriod") p = px.value;
      });
      setTime({ h, m, s, p });
    };
    update();
    const tid = setInterval(update, 1000);
    return () => clearInterval(tid);
  }, []);

  return (
    <div className="metty-wrapper">
      <div className="metty-camera-wrapper">
        <div className="metty-clock-main">
          <ClockDigits {...time} />
        </div>
      </div>
    </div>
  );
};

export default ThreeDClock;
