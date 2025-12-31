import React, { useState, useEffect } from "react";

export default function TypeWriter({
  children,
  speed = 50, // سرعة الكتابة بالميلي ثانية
  delay = 0, // التأخير قبل البدء بالثواني
  className = "",
  style = {},
  onComplete = () => {}, // callback لما يخلص
}) {
  const [displayedText, setDisplayedText] = useState("");
  const [started, setStarted] = useState(false);
  const text = typeof children === "string" ? children : "";

  useEffect(() => {
    // الانتظار حسب الـ delay
    const delayTimeout = setTimeout(() => {
      setStarted(true);
    }, delay * 1000);

    return () => clearTimeout(delayTimeout);
  }, [delay]);

  useEffect(() => {
    if (!started || !text) return;

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= text.length) {
        setDisplayedText(text.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
        onComplete();
      }
    }, speed);

    return () => clearInterval(interval);
  }, [started, text, speed, onComplete]);

  return (
    <span className={className} style={style}>
      {displayedText}
      {started && displayedText.length < text.length && (
        <span className="animate-pulse">|</span>
      )}
    </span>
  );
}
