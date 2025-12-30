import React, { useRef, useState, useEffect } from "react";
import Container from "../components/Container";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import { GoUnmute } from "react-icons/go";
import { GoMute } from "react-icons/go";
import { RiFullscreenFill } from "react-icons/ri";
import { RiFullscreenExitFill } from "react-icons/ri";
import { MotionDiv } from "../animations/motionPresets";

const Video = () => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [justStarted, setJustStarted] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => {
      setCurrentTime(video.currentTime);
      setProgress((video.currentTime / video.duration) * 100);
    };

    video.onloadedmetadata = () => setDuration(video.duration);
    video.ontimeupdate = updateTime;
    video.onplay = () => {
      setIsPlaying(true);
      setHasStarted(true);
      setJustStarted(true);
      setTimeout(() => setJustStarted(false), 100);
    };
    video.onpause = () => setIsPlaying(false);
    video.onended = () => setIsPlaying(false);
  }, []);

  const togglePlay = (e) => {
    e?.stopPropagation();
    const video = videoRef.current;
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };

  const handleVideoClick = (e) => {
    if (e.target === videoRef.current || e.target.tagName === "VIDEO") {
      togglePlay();
    }
  };

  const handleProgressClick = (e) => {
    e.stopPropagation();
    const video = videoRef.current;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    video.currentTime = pos * video.duration;
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    const video = videoRef.current;
    video.muted = !video.muted;
    setIsMuted(video.muted);
    setVolume(video.muted ? 0 : video.volume);
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = (e) => {
    e.stopPropagation();

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  };

  const formatTime = (seconds) => {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const isInitialState = !hasStarted && !isPlaying;

  const effectiveHover = isHovering && !justStarted;
  const showOverlayAndControls = effectiveHover || (!isPlaying && hasStarted);

  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div
      className="pt-14 pb-22"
      style={{
        backgroundImage: "url(/images/video-bg.png)",
        backgroundSize: "cover",
      }}
    >
      <Container className="flex flex-col items-center gap-10">
        <MotionDiv variant="slideXRight">
          <h2
            style={{ color: "var(--color-primary)" }}
            className="text-3xl font-semibold sm:text-4xl sm:font-bold text-center mx-auto w-[75%] sm:w-[55%] md:w-full"
          >
            تعرف أكثر على طريقة العمل مع ك. يوسف
          </h2>
        </MotionDiv>

        <MotionDiv variant="slideXLeft">
          <div
            ref={containerRef}
            className="relative w-full sm:w-145 md:w-160 rounded-2xl overflow-hidden cursor-pointer
             shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_30px_60px_rgba(0,0,0,0.8)]"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            style={{ border: "1px solid rgba(204, 204, 204, 0.2)" }}
          >
            <video
              ref={videoRef}
              src={
                isDesktop
                  ? "/images/original-video-expanded.mp4"
                  : "/images/original-video.MP4"
              }
              poster={
                isDesktop
                  ? "/images/original-poster-expanded.jpg"
                  : "/images/original-poster.jpg"
              }
              className="w-full h-auto block"
              onClick={handleVideoClick}
              playsInline
            />

            {isInitialState && (
              <button
                onClick={togglePlay}
                className="
              absolute top-1/2 left-1/2
              -translate-x-1/2 -translate-y-1/2
              w-[9%] max-w-24 min-w-14
              aspect-square
             text-white
              text-[clamp(2rem,5vw,3rem)]
              rounded-full
              flex items-center justify-center
              transition-all duration-300
              z-20
              pl-[0.8%]
              shadow-[0_12px_35px_rgba(217,252,35,0.45)]
              cursor-pointer
            "
                style={{ background: "var(--color-primary)" }}
              >
                <FaPlay
                  className="
                  text-2xl text-black
                  drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]
                "
                />
              </button>
            )}

            {!isInitialState && (
              <>
                {showOverlayAndControls && (
                  <div className="absolute inset-0 bg-black/40 pointer-events-none z-10 transition-opacity duration-300" />
                )}

                <button
                  onClick={togglePlay}
                  className={`absolute top-1/2 left-1/2
                  -translate-x-1/2 -translate-y-1/2
                  w-[9%] max-w-24 min-w-14
                  aspect-square
                 text-white
                  text-[clamp(2rem,5vw,3rem)]
                  rounded-full
                  flex items-center justify-center
                  transition-all duration-300
                  z-20
                  shadow-[0_12px_35px_rgba(217,252,35,0.45)]
                  ${
                    showOverlayAndControls ? "opacity-100" : "opacity-0"
                  } cursor-pointer`}
                  style={{ background: "var(--color-primary)" }}
                >
                  {isPlaying ? (
                    <FaPause
                      className="
                      text-2xl text-black
                      drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] 
                    "
                    />
                  ) : (
                    <FaPlay
                      className="
                      text-2xl text-black
                      drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] ml-[5%]
                    "
                    />
                  )}
                </button>

                <div
                  className={`absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/99 to-transparent p-3 md:p-4 flex items-center gap-3 md:gap-4 z-20 transition-opacity duration-300 ${
                    showOverlayAndControls ? "opacity-100" : "opacity-0"
                  }`}
                  dir="ltr"
                >
                  <span className="text-white text-xs md:text-sm font-medium cursor-default">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>

                  <div
                    onClick={handleProgressClick}
                    className="flex-1 h-2 bg-white/20 rounded-full cursor-pointer relative group"
                  >
                    <div
                      className="
                      absolute top-0 left-0 h-full rounded-full
                      transition-all duration-200
                    "
                      style={{
                        width: `${progress}%`,
                        background: `
                        linear-gradient(
                        90deg,
                        rgba(217, 252, 35, 0.7),
                        rgba(217, 252, 35, 1)
                      )
                    `,
                        boxShadow: "0 0 8px rgba(217, 252, 35, 0.6)",
                      }}
                    />

                    <div
                      className="
                      absolute top-1/2 -translate-y-1/2
                      w-3 h-3 md:w-4 md:h-4
                      rounded-full
                      -translate-x-1/2
                      transition-all duration-200
                      group-hover:scale-110
                    "
                      style={{
                        left: `${progress}%`,
                        background: "rgba(217, 252, 35, 1)",
                        boxShadow: `
                        0 0 10px rgba(217, 252, 35, 0.8),
                        0 0 20px rgba(217, 252, 35, 0.4)
                      `,
                      }}
                    />
                  </div>

                  <div onClick={toggleMute} className="text-2xl text-white">
                    {isMuted ? <GoMute /> : <GoUnmute />}
                  </div>

                  <div
                    onClick={toggleFullscreen}
                    className="text-white text-2xl"
                  >
                    {isFullScreen ? (
                      <RiFullscreenExitFill />
                    ) : (
                      <RiFullscreenFill />
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </MotionDiv>
      </Container>
    </div>
  );
};

export default Video;
