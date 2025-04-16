"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { ChevronDown, Heart, Sparkles } from "lucide-react";
import { motion, useAnimation, useScroll, useTransform } from "framer-motion";

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const { scrollY } = useScroll();

  // Parallax effect values based on scroll
  const titleY = useTransform(scrollY, [0, 300], [0, -100]);
  const photoScale = useTransform(scrollY, [0, 300], [1, 0.8]);
  const photoOpacity = useTransform(scrollY, [0, 300], [1, 0.6]);
  const bgY = useTransform(scrollY, [0, 300], [0, 100]);

  // Generate deterministic particles for consistent rendering
  const generateParticles = () => {
    return Array.from({ length: 40 }).map((_, i) => {
      // Use deterministic seed based on index
      const seed = i * 1000;
      const x = Math.sin(seed) * 10000;
      const seededRandomX = x - Math.floor(x);

      const seedY = i * 2000;
      const y = Math.sin(seedY) * 10000;
      const seededRandomY = y - Math.floor(y);

      const seedSize = i * 3000;
      const s = Math.sin(seedSize) * 10000;
      const seededRandomSize = s - Math.floor(s);

      const seedDuration = i * 4000;
      const d = Math.sin(seedDuration) * 10000;
      const seededRandomDuration = d - Math.floor(d);

      const seedDelay = i * 5000;
      const dl = Math.sin(seedDelay) * 10000;
      const seededRandomDelay = dl - Math.floor(dl);

      return {
        id: i,
        x: seededRandomX * 100,
        y: seededRandomY * 100,
        size: 2 + seededRandomSize * 8,
        duration: 15 + seededRandomDuration * 30,
        delay: seededRandomDelay * 5,
      };
    });
  };

  // Generate deterministic hearts for consistent rendering
  const generateHearts = () => {
    return Array.from({ length: 30 }).map((_, i) => {
      const seed = i * 6000;
      const x = Math.sin(seed) * 10000;
      const seededRandomX = x - Math.floor(x);

      const seedY = i * 7000;
      const y = Math.sin(seedY) * 10000;
      const seededRandomY = y - Math.floor(y);

      const seedSize = i * 8000;
      const s = Math.sin(seedSize) * 10000;
      const seededRandomSize = s - Math.floor(s);

      const seedDuration = i * 9000;
      const d = Math.sin(seedDuration) * 10000;
      const seededRandomDuration = d - Math.floor(d);

      const seedDelay = i * 10000;
      const dl = Math.sin(seedDelay) * 10000;
      const seededRandomDelay = dl - Math.floor(dl);

      return {
        id: i,
        x: seededRandomX * 100,
        y: seededRandomY * 100,
        size: 12 + seededRandomSize * 40,
        duration: 18 + seededRandomDuration * 20,
        delay: seededRandomDelay * 10,
      };
    });
  };

  // Generate deterministic stars for consistent rendering
  const generateStars = () => {
    return Array.from({ length: 20 }).map((_, i) => {
      const seed = i * 11000;
      const x = Math.sin(seed) * 10000;
      const seededRandomX = x - Math.floor(x);

      const seedY = i * 12000;
      const y = Math.sin(seedY) * 10000;
      const seededRandomY = y - Math.floor(y);

      const seedWidth = i * 13000;
      const w = Math.sin(seedWidth) * 10000;
      const seededRandomWidth = w - Math.floor(w);

      const seedHeight = i * 14000;
      const h = Math.sin(seedHeight) * 10000;
      const seededRandomHeight = h - Math.floor(h);

      const seedDuration = i * 15000;
      const d = Math.sin(seedDuration) * 10000;
      const seededRandomDuration = d - Math.floor(d);

      const seedDelay = i * 16000;
      const dl = Math.sin(seedDelay) * 10000;
      const seededRandomDelay = dl - Math.floor(dl);

      return {
        id: i,
        x: 10 + seededRandomX * 80,
        y: 10 + seededRandomY * 80,
        width: 2 + seededRandomWidth * 3,
        height: 2 + seededRandomHeight * 3,
        color: i % 3 === 0 ? "#fff" : i % 3 === 1 ? "#f9a8d4" : "#d8b4fe",
        boxShadow:
          i % 3 === 0
            ? "0 0 10px 2px rgba(255,255,255,0.8)"
            : i % 3 === 1
            ? "0 0 10px 2px rgba(249,168,212,0.8)"
            : "0 0 10px 2px rgba(216,180,254,0.8)",
        duration: 2 + seededRandomDuration * 3,
        delay: seededRandomDelay * 5,
      };
    });
  };

  // Generate decorative elements around photo
  const generateDecorations = () => {
    return Array.from({ length: 5 }).map((_, i) => {
      return {
        id: i,
        top: `${20 + ((i * 60) % 100)}%`,
        left: `${(i * 60) % 100}%`,
        transform: `rotate(${i * 72}deg) translateX(${100 + i * 10}px)`,
        size: 20 + i * 5,
        rotateDuration: 20 + i * 2,
        scaleDuration: 2 + i,
      };
    });
  };

  useEffect(() => {
    setIsVisible(true);
    controls.start("visible");

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [controls]);

  // Create all particles with deterministic values
  const particles = generateParticles();
  const hearts = generateHearts();
  const stars = generateStars();
  const decorations = generateDecorations();

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-screen flex flex-col items-center justify-center text-center px-4 py-8 overflow-hidden"
    >
      {/* Animated particles background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: particle.size,
              height: particle.size,
              background:
                particle.id % 5 === 0
                  ? "radial-gradient(circle, rgba(244,114,182,0.8) 0%, rgba(244,114,182,0) 70%)"
                  : particle.id % 5 === 1
                  ? "radial-gradient(circle, rgba(236,72,153,0.8) 0%, rgba(236,72,153,0) 70%)"
                  : particle.id % 5 === 2
                  ? "radial-gradient(circle, rgba(192,132,252,0.8) 0%, rgba(192,132,252,0) 70%)"
                  : particle.id % 5 === 3
                  ? "radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)"
                  : "radial-gradient(circle, rgba(216,180,254,0.8) 0%, rgba(216,180,254,0) 70%)",
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, particle.id % 2 === 0 ? 15 : -15, 0],
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: particle.duration,
              repeat: Number.POSITIVE_INFINITY,
              delay: particle.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Animated floating hearts background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            className="absolute"
            style={{
              left: `${heart.x}%`,
              top: `${heart.y}%`,
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, heart.id % 2 === 0 ? 50 : -50, 0],
              rotate: [0, heart.id % 2 === 0 ? 180 : -180, 360],
              scale: [0, 1, 0],
              opacity: [0, 0.7, 0],
            }}
            transition={{
              duration: heart.duration,
              repeat: Number.POSITIVE_INFINITY,
              delay: heart.delay,
              ease: "easeInOut",
            }}
          >
            <Heart
              fill={
                heart.id % 4 === 0
                  ? "#ff6b8b"
                  : heart.id % 4 === 1
                  ? "#f472b6"
                  : heart.id % 4 === 2
                  ? "#c084fc"
                  : "#d8b4fe"
              }
              className={
                heart.id % 4 === 0
                  ? "text-pink-400"
                  : heart.id % 4 === 1
                  ? "text-pink-500"
                  : heart.id % 4 === 2
                  ? "text-purple-400"
                  : "text-purple-300"
              }
              size={heart.size}
            />
          </motion.div>
        ))}
      </div>

      {/* Background image with parallax effect */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          y: bgY,
          x: mousePosition.x * -30,
          transition: "transform 0.3s ease-out",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-pink-500/30 to-purple-900/70" />
        <div className="absolute inset-0 bg-gradient-to-b from-pink-500/50 to-purple-900/80 backdrop-blur-[2px]" />
      </motion.div>

      {/* Romantic light rays effect */}
      <div className="absolute inset-0 z-1 overflow-hidden opacity-40">
        <div className="absolute top-0 left-1/4 w-1/2 h-screen bg-gradient-to-b from-pink-300 to-transparent transform -rotate-45 origin-top blur-3xl"></div>
        <div className="absolute top-0 right-1/4 w-1/2 h-screen bg-gradient-to-b from-purple-300 to-transparent transform rotate-45 origin-top blur-3xl"></div>
      </div>

      {/* Decorative frame with glow effect */}
      <div className="absolute inset-8 md:inset-16 z-1 border-2 border-white/20 rounded-3xl pointer-events-none shadow-[0_0_40px_rgba(244,114,182,0.3)]">
        <div className="absolute inset-0 border-2 border-white/10 rounded-3xl m-2"></div>
      </div>

      {/* Content */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        }}
        transition={{ duration: 1 }}
        className="relative z-10 max-w-4xl px-4 md:px-0"
        style={{ y: titleY }}
      >
        {/* Decorative top hearts */}
        <motion.div
          variants={{
            hidden: { scale: 0.8, opacity: 0 },
            visible: { scale: 1, opacity: 1 },
          }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mb-6 flex justify-center gap-4"
        >
          <motion.div
            animate={{
              y: [0, -8, 0],
              rotate: [-5, 5, -5],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <Heart
              fill="#ff6b8b"
              className="text-pink-400 h-16 w-16 md:h-20 md:w-20 drop-shadow-[0_0_8px_rgba(244,114,182,0.8)]"
            />
          </motion.div>
          <motion.div
            animate={{
              y: [0, -10, 0],
              rotate: [5, -5, 5],
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: 3.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 0.5,
            }}
          >
            <Heart
              fill="#f472b6"
              className="text-pink-500 h-14 w-14 md:h-16 md:w-16 drop-shadow-[0_0_8px_rgba(236,72,153,0.8)]"
            />
          </motion.div>
          <motion.div
            animate={{
              y: [0, -6, 0],
              rotate: [-2, 8, -2],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 4.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 0.2,
            }}
          >
            <Heart
              fill="#c084fc"
              className="text-purple-400 h-12 w-12 md:h-14 md:w-14 drop-shadow-[0_0_8px_rgba(192,132,252,0.8)]"
            />
          </motion.div>
        </motion.div>

        {/* Title with enhanced styling */}
        <motion.h1
          className="text-4xl sm:text-5xl md:text-7xl font-bold text-white drop-shadow-lg mb-8 font-serif"
          variants={{
            hidden: { y: 20, opacity: 0 },
            visible: { y: 0, opacity: 1 },
          }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <motion.span
            className="inline-block relative"
            animate={{
              textShadow: [
                "0 0 5px rgba(255,255,255,0.5)",
                "0 0 20px rgba(255,255,255,0.8)",
                "0 0 5px rgba(255,255,255,0.5)",
              ],
            }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            Happy Birthday
            <motion.div
              className="absolute -right-12 -top-12 text-pink-300"
              animate={{ rotate: 360 }}
              transition={{
                duration: 20,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            >
              <Sparkles className="h-8 w-8 md:h-10 md:w-10 opacity-80" />
            </motion.div>
          </motion.span>
        </motion.h1>

        {/* Photo with enhanced styling */}
        <motion.div
          variants={{
            hidden: { scale: 0.8, opacity: 0 },
            visible: { scale: 1, opacity: 1 },
          }}
          transition={{ duration: 0.9, delay: 0.7 }}
          className="relative mb-8 max-w-xs sm:max-w-sm mx-auto"
          style={{ scale: photoScale, opacity: photoOpacity }}
        >
          {/* Outer glow */}
          <div className="absolute -inset-4 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full blur-xl opacity-60"></div>

          {/* Rotating gradient border */}
          <motion.div
            className="relative p-1.5 rounded-full overflow-hidden"
            style={{
              background:
                "linear-gradient(45deg, #f472b6, #c084fc, #f472b6, #c084fc)",
              backgroundSize: "300% 300%",
            }}
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          >
            {/* Inner white border */}
            <div className="bg-white p-1 rounded-full">
              {/* Actual photo */}
              <div className="relative rounded-full overflow-hidden w-64 h-64 sm:w-72 sm:h-72">
                <Image
                  src="/images/olin_2.jpg"
                  alt="Caroline"
                  fill
                  className="object-center"
                />

                {/* Subtle overlay for better text contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-pink-500/30 to-transparent"></div>
              </div>
            </div>
          </motion.div>

          {/* Decorative elements around photo */}
          {decorations.map((decoration) => (
            <motion.div
              key={`star-${decoration.id}`}
              className="absolute text-pink-300"
              style={{
                top: decoration.top,
                left: decoration.left,
                transform: decoration.transform,
              }}
              animate={{
                rotate: decoration.id % 2 === 0 ? 360 : -360,
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                rotate: {
                  duration: decoration.rotateDuration,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                },
                scale: {
                  duration: decoration.scaleDuration,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                },
                opacity: {
                  duration: decoration.scaleDuration,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                },
              }}
            >
              <svg
                width={decoration.size}
                height={decoration.size}
                viewBox="0 0 24 24"
                fill="currentColor"
                stroke="none"
              >
                <path d="M12 2L15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2z" />
              </svg>
            </motion.div>
          ))}
        </motion.div>

        {/* Name with enhanced animation */}
        <motion.h2
          className="text-4xl sm:text-5xl md:text-7xl font-extrabold mb-8 font-serif relative"
          variants={{
            hidden: { y: 20, opacity: 0 },
            visible: { y: 0, opacity: 1 },
          }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <span className="relative inline-block">
            {/* Text shadow for depth */}
            <span className="absolute inset-0 text-pink-600 blur-sm">
              Caroline Tanuwijaya 💖
            </span>

            {/* Main text with gradient */}
            <motion.span
              className="relative text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-pink-400 to-purple-500"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 8,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
              style={{
                backgroundSize: "200% auto",
                textShadow: "0 0 15px rgba(236, 72, 153, 0.6)",
              }}
            >
              Caroline Tanuwijaya 💖
            </motion.span>
          </span>
        </motion.h2>

        {/* Subtitle with more romantic flair */}
        <motion.p
          className="text-lg sm:text-xl md:text-2xl text-white font-medium mb-10 italic max-w-2xl mx-auto"
          variants={{
            hidden: { y: 20, opacity: 0 },
            visible: { y: 0, opacity: 1 },
          }}
          transition={{ duration: 0.8, delay: 1.1 }}
        >
          <span className="relative inline-block">
            <motion.span
              className="relative z-10"
              animate={{
                textShadow: [
                  "0 0 2px rgba(255,255,255,0.3)",
                  "0 0 8px rgba(255,255,255,0.6)",
                  "0 0 2px rgba(255,255,255,0.3)",
                ],
              }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            >
              Celebrating the most wonderful person in my life
            </motion.span>
            <span className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-pink-400/30 to-purple-400/30 -z-10 transform translate-y-1"></span>
          </span>
        </motion.p>

        {/* Scroll indicator with enhanced styling */}
        <motion.div
          variants={{
            hidden: { y: 20, opacity: 0 },
            visible: { y: 0, opacity: 1 },
          }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="relative z-10"
        >
          <motion.div
            className="inline-block px-6 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/30 mb-12 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 30px rgba(255,255,255,0.2)",
              backgroundColor: "rgba(255,255,255,0.15)",
            }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-base sm:text-lg md:text-xl text-white">
              Scroll untuk melihat kejutan 🎁
            </p>
          </motion.div>

          <motion.div
            className="mt-4"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            <ChevronDown className="h-8 w-8 sm:h-10 sm:w-10 text-white filter drop-shadow-xl mx-auto" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Romantic light rays */}
      <div className="absolute bottom-0 left-0 w-full h-1/3 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute bottom-0 left-1/4 w-1/2 h-full bg-gradient-to-t from-pink-500/30 to-transparent"
          animate={{
            opacity: [0.3, 0.7, 0.3],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-1/2 h-full bg-gradient-to-t from-purple-500/30 to-transparent"
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>

      {/* Twinkling stars effect */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        {stars.map((star) => (
          <motion.div
            key={`sparkle-${star.id}`}
            className="absolute rounded-full"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.width,
              height: star.height,
              backgroundColor: star.color,
              boxShadow: star.boxShadow,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: star.duration,
              repeat: Number.POSITIVE_INFINITY,
              delay: star.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
}
