import { useState, useRef, useEffect } from "react";

import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  RotateCcw,
} from "lucide-react";

export default function ToolkitVideoWalkthrough() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const [videoError, setVideoError] = useState(false);

  /* PLAY / PAUSE */
  const handlePlayPause = async () => {
    if (!videoRef.current) return;

    try {
      if (videoRef.current.paused) {
        await videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    } catch (error) {
      console.warn("Playback failed:", error);
    }
  };

  /* MUTE */
  const handleMuteUnmute = () => {
    if (!videoRef.current) return;

    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  /* RESTART */
  const handleRestart = async () => {
    if (!videoRef.current) return;

    videoRef.current.currentTime = 0;

    try {
      await videoRef.current.play();
    } catch (error) {
      console.warn(error);
    }
  };

  /* FULLSCREEN */
  const handleFullscreen = () => {
    if (!videoRef.current) return;

    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  /* SCRUB */
  const handleScrub = (value: number) => {
    if (!videoRef.current || duration === 0) return;

    const targetTime = (value / 100) * duration;

    videoRef.current.currentTime = targetTime;
    setProgress(value);
  };

  /* TIME FORMAT */
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);

    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  /* VIDEO EVENTS */
  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    const updateTime = () => {
      const cur = video.currentTime;
      const dur = video.duration || 0;

      setCurrentTime(cur);

      if (dur > 0) {
        setProgress((cur / dur) * 100);
      }
    };

    const onLoaded = () => {
      setDuration(video.duration || 0);
    };

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    video.addEventListener("timeupdate", updateTime);
    video.addEventListener("loadedmetadata", onLoaded);
    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);

    return () => {
      video.removeEventListener("timeupdate", updateTime);
      video.removeEventListener("loadedmetadata", onLoaded);
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
    };
  }, []);

  return (
    <div
      id="toolkit-video-walkthrough"
      className="glass-panel p-5 rounded-2xl relative overflow-hidden text-white border border-brand-cyan/20 bg-brand-slate/40"
    >
      {/* GLOW */}
      <div className="absolute -top-12 -left-12 w-64 h-64 bg-brand-cyan/10 rounded-full blur-2xl pointer-events-none" />

      {/* HEADER */}
      <div className="flex items-center justify-between mb-4">

        <div className="flex items-center gap-2">

          <span className="flex h-2 w-2 relative">

            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-cyan opacity-75"></span>

            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-cyan"></span>

          </span>

          <span className="text-xs font-mono text-brand-cyan font-bold uppercase tracking-wider">
            Walkthrough Demo Video
          </span>

        </div>

        <span className="text-[10px] font-mono text-gray-400 bg-white/5 px-2 py-0.5 rounded">
          Learn how to use Toolkit
        </span>

      </div>

      {/* VIDEO CONTAINER */}
      <div className="relative group rounded-xl overflow-hidden bg-black aspect-video border border-white/5 shadow-2xl">

        {/* VIDEO */}
        {!videoError ? (
          <video
            id="walkthrough-video-element"
            ref={videoRef}
            className="w-full h-full object-cover"
            poster="/walkthrough-thumbnail.png"
            playsInline
            preload="metadata"
            onClick={handlePlayPause}
            onError={() => setVideoError(true)}
          >

            <source
              src="/walkthrough-video.mp4"
              type="video/mp4"
            />

          </video>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-brand-dark text-center p-6">

            <div>

              <p className="text-sm text-white font-semibold">
                Video failed to load
              </p>

              <p className="text-xs text-gray-400 mt-1">
                Check video path inside /public folder
              </p>

            </div>

          </div>
        )}

        {/* PLAY OVERLAY */}
        {!isPlaying && !videoError && (
          <div
            onClick={handlePlayPause}
            className="absolute inset-0 bg-brand-dark/50 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all hover:bg-brand-dark/40"
          >

            <div className="w-16 h-16 rounded-full bg-brand-cyan/20 border border-brand-cyan/50 flex items-center justify-center text-brand-cyan transition-all group-hover:scale-110 shadow-[0_0_30px_rgba(34,211,238,0.35)]">

              <Play className="w-7 h-7 fill-current ml-1" />

            </div>

            <div className="text-center px-4">

              <span className="text-xs font-mono text-white tracking-widest uppercase block">
                Play Walkthrough Video
              </span>

              <span className="text-[10px] text-gray-300 block mt-1">
                See toolkit files & prompts live
              </span>

            </div>

          </div>
        )}

        {/* CONTROLS */}
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black via-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col gap-2">

          {/* PROGRESS */}
          <div className="flex items-center gap-2">

            <span className="text-[10px] font-mono text-gray-400">
              {formatTime(currentTime)}
            </span>

            <input
              id="video-scrub-input"
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={(e) =>
                handleScrub(parseFloat(e.target.value))
              }
              className="flex-1 accent-brand-cyan h-1 bg-white/20 rounded-lg appearance-none cursor-pointer"
            />

            <span className="text-[10px] font-mono text-gray-400">
              {formatTime(duration || 0)}
            </span>

          </div>

          {/* CONTROL ROW */}
          <div className="flex items-center justify-between">

            <div className="flex items-center gap-3">

              <button
                onClick={handlePlayPause}
                className="text-white hover:text-brand-cyan transition-colors"
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4" />
                ) : (
                  <Play className="w-4 h-4 fill-current" />
                )}
              </button>

              <button
                onClick={handleRestart}
                className="text-white hover:text-brand-cyan transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={handleMuteUnmute}
                className="text-white hover:text-brand-cyan transition-colors"
              >
                {isMuted ? (
                  <VolumeX className="w-4 h-4" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </button>

            </div>

            <div className="flex items-center gap-2">

              <span className="text-[10px] uppercase font-mono bg-brand-cyan/20 text-brand-cyan px-2 py-0.5 rounded font-bold">
                1080p HD
              </span>

              <button
                onClick={handleFullscreen}
                className="text-white hover:text-brand-cyan transition-colors"
              >
                <Maximize className="w-4 h-4" />
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}