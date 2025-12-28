export default function Loader() {
  return (
    <>
      <style>{`
        .container {
          width: 200px;
          height: 200px;
          filter: url("#goo");
          animation: rotate-move 2s ease-in-out infinite;
        }

        .dot {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          position: absolute;
          inset: 0;
          margin: auto;
        }

        .dot-3 {
          background-color: rgba(217, 252, 35, 1);
          animation: dot-3-move 2s ease infinite, index 6s ease infinite;
        }

        .dot-2 {
          background-color: rgba(120, 255, 60, 1);
          animation: dot-2-move 2s ease infinite, index 6s -4s ease infinite;
        }

        .dot-1 {
          background-color: rgba(170, 255, 40, 1);
          animation: dot-1-move 2s ease infinite, index 6s -2s ease infinite;
        }

        @keyframes dot-3-move {
          20% { transform: scale(1); }
          45% { transform: translateY(-18px) scale(.45); }
          60% { transform: translateY(-90px) scale(.45); }
          80% { transform: translateY(-90px) scale(.45); }
          100% { transform: translateY(0) scale(1); }
        }

        @keyframes dot-2-move {
          20% { transform: scale(1); }
          45% { transform: translate(-16px, 12px) scale(.45); }
          60% { transform: translate(-80px, 60px) scale(.45); }
          80% { transform: translate(-80px, 60px) scale(.45); }
          100% { transform: translateY(0) scale(1); }
        }

        @keyframes dot-1-move {
          20% { transform: scale(1); }
          45% { transform: translate(16px, 12px) scale(.45); }
          60% { transform: translate(80px, 60px) scale(.45); }
          80% { transform: translate(80px, 60px) scale(.45); }
          100% { transform: translateY(0) scale(1); }
        }

        @keyframes rotate-move {
          55% { transform:  rotate(0deg); }
          80% { transform: rotate(360deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes index {
          0%, 100% { z-index: 3; }
          33.3% { z-index: 2; }
          66.6% { z-index: 1; }
        }
      `}</style>

      <div className="container mx-auto mt-16">
        <div className="dot dot-1"></div>
        <div className="dot dot-2"></div>
        <div className="dot dot-3"></div>
      </div>

      {/* SVG filter */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        style={{ position: "absolute", width: 0, height: 0 }}
      >
        <defs>
          <filter id="goo">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="10"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 21 -7"
            />
          </filter>
        </defs>
      </svg>
    </>
  );
}
