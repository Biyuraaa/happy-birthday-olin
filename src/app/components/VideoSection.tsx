"use client";

import { useRef, useState, useEffect } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Heart,
  Rewind,
  FastForward,
} from "lucide-react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

export default function VideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: false,
  });

  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current;

      const handleTimeUpdate = () => {
        setCurrentTime(video.currentTime);
        setProgress((video.currentTime / video.duration) * 100);
      };

      const handleLoadedMetadata = () => {
        setDuration(video.duration);
      };

      video.addEventListener("timeupdate", handleTimeUpdate);
      video.addEventListener("loadedmetadata", handleLoadedMetadata);

      return () => {
        video.removeEventListener("timeupdate", handleTimeUpdate);
        video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      };
    }
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (progressRef.current && videoRef.current) {
      const progressBar = progressRef.current;
      const rect = progressBar.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      const seekTime = pos * videoRef.current.duration;

      videoRef.current.currentTime = seekTime;
      setProgress(pos * 100);
    }
  };

  const skipForward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.min(
        videoRef.current.duration,
        videoRef.current.currentTime + 10
      );
    }
  };

  const skipBackward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.max(
        0,
        videoRef.current.currentTime - 10
      );
    }
  };

  return (
    <div ref={ref} className="relative py-20 w-full">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 rounded-full bg-gradient-to-r from-pink-500/10 to-purple-500/10 blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 blur-3xl"></div>
      </div>

      <motion.div
        className="relative z-10 max-w-4xl mx-auto px-4"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Title with decorative elements */}
        <div className="relative mb-12 text-center">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 drop-shadow-sm"
            initial={{ opacity: 0, y: -20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Special Video For You
          </motion.h2>
          <div className="flex items-center justify-center mt-3 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-pink-300"></div>
            <Heart className="h-5 w-5 mx-3 text-pink-400 fill-pink-400" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-pink-300"></div>
          </div>
          <p className="text-gray-600 dark:text-gray-300 max-w-lg mx-auto italic text-sm md:text-base">
            Watch this special memory I've created just for you
          </p>
        </div>

        {/* Video player with enhanced styling */}
        <motion.div
          className="relative rounded-2xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(236,72,153,0.3)]"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={
            inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }
          }
          transition={{ duration: 0.7, delay: 0.3 }}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Gradient border */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl z-0"></div>

          <div className="relative z-10 bg-black rounded-2xl overflow-hidden">
            {/* Video container */}
            <div className="aspect-video bg-black relative">
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                poster="/placeholder.svg?height=720&width=1280"
                onEnded={() => setIsPlaying(false)}
              >
                <source src="#" type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              {/* Center play button overlay */}
              {!isPlaying && (
                <div
                  className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm cursor-pointer"
                  onClick={togglePlay}
                >
                  <motion.div
                    className="h-20 w-20 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <Play className="h-10 w-10 text-white fill-white" />
                  </motion.div>
                </div>
              )}

              {/* Floating hearts animation when playing */}
              {isPlaying && (
                <div className="absolute inset-0 pointer-events-none">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute"
                      style={{
                        bottom: "-20px",
                        left: `${10 + i * 8}%`,
                      }}
                      animate={{
                        y: [0, -100 - i * 20],
                        x: [0, (i % 2 === 0 ? 30 : -30) * Math.random()],
                        opacity: [0, 0.7, 0],
                        scale: [0, 1, 0.5],
                      }}
                      transition={{
                        duration: 4 + i,
                        repeat: Infinity,
                        delay: i * 2,
                        ease: "easeOut",
                      }}
                    >
                      <Heart
                        className="text-pink-400"
                        fill={i % 2 === 0 ? "#f472b6" : "#e879f9"}
                        size={10 + (i % 3) * 8}
                      />
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Video controls overlay that appears on hover */}
              <motion.div
                className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent px-4 py-3 flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: isHovering || !isPlaying ? 1 : 0,
                  y: isHovering || !isPlaying ? 0 : 20,
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Progress bar */}
                <div
                  ref={progressRef}
                  className="w-full h-1.5 bg-white/20 rounded-full mb-2 cursor-pointer relative overflow-hidden"
                  onClick={seek}
                >
                  <div
                    className="h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full absolute top-0 left-0"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>

                {/* Controls row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <motion.button
                      className="text-white/90 hover:text-white focus:outline-none"
                      onClick={togglePlay}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {isPlaying ? (
                        <Pause className="h-5 w-5" />
                      ) : (
                        <Play className="h-5 w-5" />
                      )}
                    </motion.button>

                    <motion.button
                      className="text-white/90 hover:text-white focus:outline-none"
                      onClick={skipBackward}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Rewind className="h-5 w-5" />
                    </motion.button>

                    <motion.button
                      className="text-white/90 hover:text-white focus:outline-none"
                      onClick={skipForward}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FastForward className="h-5 w-5" />
                    </motion.button>

                    <span className="text-white/80 text-sm">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <p className="text-white/80 text-sm font-medium hidden sm:block">
                      Birthday Message for You ❤️
                    </p>

                    <motion.button
                      className="text-white/90 hover:text-white focus:outline-none"
                      onClick={toggleMute}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {isMuted ? (
                        <VolumeX className="h-5 w-5" />
                      ) : (
                        <Volume2 className="h-5 w-5" />
                      )}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Caption below video */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <p className="text-gray-600 dark:text-gray-300 mb-2">
            A special moment captured for us to cherish forever
          </p>
          <div className="flex items-center justify-center">
            <Heart className="h-5 w-5 text-pink-500 fill-pink-500 mx-1 animate-pulse" />
            <span className="text-pink-600 dark:text-pink-400 font-medium">
              From Me to You with Love
            </span>
            <Heart className="h-5 w-5 text-pink-500 fill-pink-500 mx-1 animate-pulse" />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
