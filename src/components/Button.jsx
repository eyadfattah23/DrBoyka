export default function Button({
  text,
  leftComponent,
  onClick,
  className = "",
  style = {},
  animateLeft = false, // "slide" أو "pulse" أو false
  animationDelay = 0, // delay بالثواني
  animationDuration = 3, // مدة الانيميشن الكاملة
}) {
  const getAnimation = () => {
    if (animateLeft === "slide") {
      return `slideLeftLoop ${animationDuration}s ease-in-out infinite`;
    } else if (animateLeft === "pulse") {
      return `pulseLoop ${animationDuration}s ease-in-out infinite`;
    }
    return "none";
  };

  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center gap-2.5 px-4 py-2 rounded-2xl cursor-pointer ${className}`}
      style={{ backgroundColor: "var(--color-primary)", ...style }}
    >
      <span>{text}</span>
      {leftComponent && (
        <span
          style={{
            display: "inline-flex",
            animation: getAnimation(),
            animationDelay: `${animationDelay}s`,
          }}
        >
          {leftComponent}
        </span>
      )}

      <style jsx>{`
        @keyframes slideLeftLoop {
          0%,
          33.3% {
            transform: translateX(0px);
            opacity: 1;
          }
          66.6% {
            transform: translateX(-8px);
            opacity: 0.7;
          }
          67% {
            transform: translateX(8px);
            opacity: 0;
          }
          100% {
            transform: translateX(0px);
            opacity: 1;
          }
        }

        @keyframes pulseLoop {
          0%,
          33.3% {
            transform: scale(1);
            opacity: 1;
          }
          66.6% {
            transform: scale(1.2);
            opacity: 0.7;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </button>
  );
}
