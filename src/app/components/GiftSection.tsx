"use client";

import { useState, useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { Gift, Heart, X, Sparkles, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function GiftSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [isBoxOpen, setIsBoxOpen] = useState(false);
  const [showGlitter, setShowGlitter] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: false,
  });
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Function to trigger confetti
  const triggerConfetti = () => {
    if (typeof window === "undefined") return;

    // Dynamically import confetti to avoid SSR issues
    import("canvas-confetti").then((confetti) => {
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      const randomInRange = (min: number, max: number) => {
        return Math.random() * (max - min) + min;
      };

      const interval: any = setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        // since particles fall down, start a bit higher than random
        confetti.default({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          colors: ["#ec4899", "#d946ef", "#8b5cf6", "#f9a8d4", "#c084fc"],
        });
        confetti.default({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          colors: ["#ec4899", "#d946ef", "#8b5cf6", "#f9a8d4", "#c084fc"],
        });
      }, 250);
    });
  };

  // Function to create glitter effect
  useEffect(() => {
    if (!showGlitter || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions
    const updateCanvasSize = () => {
      const container = canvas.parentElement;
      if (container) {
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
      }
    };
    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);

    // Create glitter particles
    const particles: {
      x: number;
      y: number;
      size: number;
      color: string;
      vx: number;
      vy: number;
      alpha: number;
      alphaSpeed: number;
    }[] = [];

    for (let i = 0; i < 100; i++) {
      // Use deterministic values based on index for SSR compatibility
      const seed = i * 1000;
      const x = Math.sin(seed) * 10000;
      const seededRandom1 = x - Math.floor(x);

      const seed2 = i * 2000;
      const x2 = Math.sin(seed2) * 10000;
      const seededRandom2 = x2 - Math.floor(x2);

      const seed3 = i * 3000;
      const x3 = Math.sin(seed3) * 10000;
      const seededRandom3 = x3 - Math.floor(x3);

      const colors = [
        "#ec4899",
        "#d946ef",
        "#8b5cf6",
        "#f9a8d4",
        "#c084fc",
        "#ffffff",
      ];

      particles.push({
        x: seededRandom1 * canvas.width,
        y: seededRandom2 * canvas.height,
        size: 1 + seededRandom3 * 3,
        color: colors[Math.floor(seededRandom1 * colors.length)],
        vx: (seededRandom2 - 0.5) * 0.5,
        vy: (seededRandom3 - 0.5) * 0.5,
        alpha: 0.1 + seededRandom1 * 0.9,
        alphaSpeed: 0.005 + seededRandom2 * 0.01,
      });
    }

    // Animation loop
    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Update position
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off edges
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Pulsate alpha
        p.alpha += p.alphaSpeed;
        if (p.alpha > 1 || p.alpha < 0.1) p.alphaSpeed *= -1;
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", updateCanvasSize);
      cancelAnimationFrame(animationId);
    };
  }, [showGlitter]);

  const handleOpenGift = () => {
    if (!isOpen) {
      setIsBoxOpen(true);
      setShowGlitter(true);

      setTimeout(() => {
        setIsOpen(true);
        triggerConfetti();
      }, 1500);
    }
  };

  const handleCloseGift = () => {
    setIsOpen(false);
    setTimeout(() => {
      setIsBoxOpen(false);
      setShowGlitter(false);
    }, 500);
  };

  // Generate deterministic stars for background
  const generateStars = () => {
    return Array.from({ length: 30 }).map((_, i) => {
      const seed = i * 11000;
      const x = Math.sin(seed) * 10000;
      const seededRandomX = x - Math.floor(x);

      const seedY = i * 12000;
      const y = Math.sin(seedY) * 10000;
      const seededRandomY = y - Math.floor(y);

      const seedSize = i * 13000;
      const s = Math.sin(seedSize) * 10000;
      const seededRandomSize = s - Math.floor(s);

      const seedDuration = i * 14000;
      const d = Math.sin(seedDuration) * 10000;
      const seededRandomDuration = d - Math.floor(d);

      return {
        id: i,
        x: seededRandomX * 100,
        y: seededRandomY * 100,
        size: 1 + seededRandomSize * 3,
        duration: 1 + seededRandomDuration * 2,
        delay: i * 0.1,
      };
    });
  };

  const stars = generateStars();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative w-full py-24 px-4 overflow-hidden"
    >
      {/* Glitter canvas overlay */}
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 pointer-events-none z-10 transition-opacity duration-1000 ${
          showGlitter ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-radial from-pink-500/5 via-purple-500/5 to-transparent"></div>

        {/* Decorative circles */}
        <div className="absolute top-1/4 -left-20 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-3/4 left-1/3 w-40 h-40 bg-pink-300/10 rounded-full blur-2xl"></div>
        <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-purple-300/10 rounded-full blur-2xl"></div>

        {/* Twinkling stars */}
        {stars.map((star) => (
          <motion.div
            key={`star-${star.id}`}
            className="absolute rounded-full bg-white"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.size,
              height: star.size,
              boxShadow: "0 0 4px 1px rgba(255, 255, 255, 0.6)",
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: star.duration,
              repeat: Number.POSITIVE_INFINITY,
              delay: star.delay,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Floating hearts that appear when gift is opened */}
        <AnimatePresence>
          {isOpen && (
            <>
              {Array.from({ length: 20 }).map((_, i) => {
                // Use deterministic values based on index
                const seed = i * 1000;
                const x = Math.sin(seed) * 10000;
                const seededRandom1 = x - Math.floor(x);

                const seed2 = i * 2000;
                const x2 = Math.sin(seed2) * 10000;
                const seededRandom2 = x2 - Math.floor(x2);

                const seed3 = i * 3000;
                const x3 = Math.sin(seed3) * 10000;
                const seededRandom3 = x3 - Math.floor(x3);

                const seed4 = i * 4000;
                const x4 = Math.sin(seed4) * 10000;
                const seededRandom4 = x4 - Math.floor(x4);

                return (
                  <motion.div
                    key={i}
                    initial={{
                      y: "100%",
                      x: `${seededRandom1 * 100}%`,
                      opacity: 0,
                      scale: 0,
                    }}
                    animate={{
                      y: `-${100 + seededRandom2 * 50}%`,
                      opacity: [0, 0.8, 0],
                      scale: [0, 1, 0.5],
                      rotate: seededRandom3 * 360,
                    }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{
                      duration: 5 + seededRandom4 * 5,
                      ease: "easeOut",
                      delay: seededRandom1 * 2,
                    }}
                    className="absolute text-pink-400"
                  >
                    <Heart
                      fill={
                        i % 3 === 0
                          ? "#f472b6"
                          : i % 3 === 1
                          ? "#d946ef"
                          : "#c084fc"
                      }
                      size={8 + seededRandom2 * 16}
                    />
                  </motion.div>
                );
              })}
            </>
          )}
        </AnimatePresence>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
            Hadiah Spesial Untukmu
          </h2>

          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-pink-300"></div>
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              <Gift className="h-6 w-6 text-pink-500" />
            </motion.div>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-pink-300"></div>
          </div>

          <p className="text-gray-600 dark:text-gray-300 max-w-lg mx-auto text-lg">
            Sebuah kado kecil yang kuharap dapat menghangatkan hatimu dan
            membawa senyuman di wajahmu
          </p>
        </motion.div>

        {/* Gift box container */}
        <div className="relative mx-auto w-full max-w-xs md:max-w-sm">
          {/* Gift platform with shadow */}
          <motion.div
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[80%] h-4 bg-black/10 dark:bg-white/10 rounded-full blur-md"
            animate={{
              width: isBoxOpen ? "90%" : "80%",
              opacity: isBoxOpen ? 0.3 : 0.2,
            }}
            transition={{ duration: 0.8 }}
          />

          {/* Gift box */}
          <div
            className="relative mx-auto"
            style={{ width: "220px", height: "220px" }}
          >
            <motion.div
              className="absolute w-full h-full"
              animate={{
                scale: isBoxOpen ? 0.9 : 1,
                y: isBoxOpen ? -30 : 0,
                rotate: isBoxOpen ? [0, -2, 2, 0] : 0,
              }}
              transition={{
                duration: 0.8,
                type: "spring",
                stiffness: 200,
                damping: 15,
                rotate: {
                  duration: 0.3,
                  delay: 0.8,
                  times: [0, 0.3, 0.7, 1],
                },
              }}
            >
              {/* Box bottom */}
              <motion.div
                className="absolute bottom-0 w-full h-[72%] rounded-lg shadow-xl overflow-hidden"
                style={{
                  boxShadow: "0 10px 25px -5px rgba(236, 72, 153, 0.4)",
                }}
              >
                {/* Box background with gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-pink-500 to-pink-600">
                  {/* Box pattern overlay */}
                  <div
                    className="absolute inset-0 opacity-30"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)",
                    }}
                  />
                </div>

                {/* Box decorations */}
                <div className="absolute inset-0 overflow-hidden">
                  {Array.from({ length: 12 }).map((_, i) => {
                    // Use deterministic values based on index
                    const seed = i * 1000;
                    const x = Math.sin(seed) * 10000;
                    const seededRandom1 = x - Math.floor(x);

                    const seed2 = i * 2000;
                    const x2 = Math.sin(seed2) * 10000;
                    const seededRandom2 = x2 - Math.floor(x2);

                    return (
                      <motion.div
                        key={i}
                        className="absolute bg-white/10 rounded-full"
                        style={{
                          width: 10 + seededRandom1 * 20,
                          height: 10 + seededRandom1 * 20,
                          top: `${seededRandom2 * 100}%`,
                          left: `${seededRandom1 * 100}%`,
                        }}
                        animate={{
                          opacity: [0.5, 0.8, 0.5],
                        }}
                        transition={{
                          duration: 2 + seededRandom2 * 2,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                          delay: i * 0.2,
                        }}
                      />
                    );
                  })}
                </div>

                {/* Box vertical ribbon */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-12 h-full bg-gradient-to-b from-purple-500 to-purple-600">
                  {/* Ribbon shine effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    initial={{ x: -100 }}
                    animate={{ x: 100 }}
                    transition={{
                      duration: 1.5,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                      repeatDelay: 1,
                    }}
                  />
                </div>

                {/* Box horizontal ribbon */}
                <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-full h-12 bg-gradient-to-r from-purple-500 to-purple-600">
                  {/* Ribbon shine effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-b from-transparent via-white/30 to-transparent"
                    initial={{ y: -50 }}
                    animate={{ y: 50 }}
                    transition={{
                      duration: 1.5,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                      repeatDelay: 1,
                      delay: 0.5,
                    }}
                  />
                </div>

                {/* Box edge highlights */}
                <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-b from-white/30 to-transparent"></div>
                <div className="absolute inset-y-0 left-0 w-2 bg-gradient-to-r from-white/30 to-transparent"></div>
                <div className="absolute inset-y-0 right-0 w-2 bg-gradient-to-l from-white/30 to-transparent"></div>
                <div className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-t from-black/20 to-transparent"></div>
              </motion.div>

              {/* Box lid */}
              <motion.div
                className="absolute top-0 w-full h-[30%] rounded-t-lg shadow-lg origin-bottom overflow-hidden"
                animate={{
                  rotateX: isBoxOpen ? -180 : 0,
                  y: isBoxOpen ? -20 : 0,
                  opacity: isBoxOpen ? 0.9 : 1,
                }}
                style={{
                  transformStyle: "preserve-3d",
                  backfaceVisibility: "hidden",
                  boxShadow: "0 -5px 15px -5px rgba(0,0,0,0.1)",
                }}
                transition={{
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {/* Lid background with gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-pink-400 to-pink-500">
                  {/* Lid pattern overlay */}
                  <div
                    className="absolute inset-0 opacity-30"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)",
                    }}
                  />
                </div>

                {/* Lid edge highlights */}
                <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-b from-white/30 to-transparent"></div>
                <div className="absolute inset-y-0 left-0 w-2 bg-gradient-to-r from-white/30 to-transparent"></div>
                <div className="absolute inset-y-0 right-0 w-2 bg-gradient-to-l from-white/30 to-transparent"></div>
                <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-t from-black/10 to-transparent"></div>
              </motion.div>

              {/* Box ribbon knot */}
              <motion.div
                className="absolute top-[30%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
                animate={{
                  y: isBoxOpen ? -40 : "-50%",
                  scale: isBoxOpen ? 1.1 : 1,
                  rotate: isBoxOpen ? [0, -10, 10, 0] : 0,
                }}
                transition={{
                  duration: 0.8,
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                  rotate: {
                    duration: 0.5,
                    delay: 0.8,
                    times: [0, 0.3, 0.7, 1],
                  },
                }}
              >
                <div className="w-24 h-24">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                    {/* Ribbon knot shine */}
                    <div className="absolute top-1 left-1 w-6 h-6 bg-white/30 rounded-full blur-[1px]"></div>

                    <motion.div
                      animate={{
                        rotate: isBoxOpen ? 360 : 0,
                        scale: isBoxOpen ? [1, 1.2, 1] : 1,
                      }}
                      transition={{
                        rotate: { duration: 1.2, ease: "easeInOut" },
                        scale: {
                          duration: 0.5,
                          times: [0, 0.5, 1],
                          delay: 0.8,
                        },
                      }}
                    >
                      <Gift className="h-12 w-12 text-white drop-shadow-md" />
                    </motion.div>
                  </div>
                </div>

                {/* Ribbon ends */}
                <motion.div
                  className="absolute top-1/2 left-1/2 w-8 h-20 bg-purple-500"
                  style={{
                    transformOrigin: "top center",
                    transform: "translate(-50%, 0%) rotate(-30deg)",
                    borderRadius: "0 0 4px 4px",
                  }}
                  animate={{
                    rotate: isBoxOpen ? [-30, -40, -30] : -30,
                    scaleY: isBoxOpen ? [1, 1.1, 1] : 1,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: 0.8,
                    times: [0, 0.5, 1],
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-purple-400 to-purple-600"></div>
                </motion.div>

                <motion.div
                  className="absolute top-1/2 left-1/2 w-8 h-20 bg-purple-500"
                  style={{
                    transformOrigin: "top center",
                    transform: "translate(-50%, 0%) rotate(30deg)",
                    borderRadius: "0 0 4px 4px",
                  }}
                  animate={{
                    rotate: isBoxOpen ? [30, 40, 30] : 30,
                    scaleY: isBoxOpen ? [1, 1.1, 1] : 1,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: 0.8,
                    times: [0, 0.5, 1],
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-purple-400 to-purple-600"></div>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Gift box content */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center z-20"
                  initial={{ opacity: 0, scale: 0.5, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.5, y: 20 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <motion.div
                    className="absolute w-[150%] h-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-2xl"
                    initial={{ y: 20 }}
                    animate={{ y: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                    }}
                    style={{
                      boxShadow: "0 20px 50px -10px rgba(236, 72, 153, 0.5)",
                    }}
                  >
                    {/* Decorative background */}
                    <div className="absolute inset-0 overflow-hidden rounded-2xl opacity-10">
                      <div className="absolute inset-0 bg-gradient-radial from-pink-300 to-transparent"></div>
                      {Array.from({ length: 20 }).map((_, i) => {
                        // Use deterministic values based on index
                        const seed = i * 1000;
                        const x = Math.sin(seed) * 10000;
                        const seededRandom1 = x - Math.floor(x);

                        const seed2 = i * 2000;
                        const x2 = Math.sin(seed2) * 10000;
                        const seededRandom2 = x2 - Math.floor(x2);

                        return (
                          <Heart
                            key={i}
                            className="absolute text-pink-400"
                            style={{
                              top: `${seededRandom1 * 100}%`,
                              left: `${seededRandom2 * 100}%`,
                              transform: `rotate(${i * 20}deg)`,
                              opacity: 0.5,
                            }}
                            size={8 + (i % 5) * 3}
                            fill="#f472b6"
                          />
                        );
                      })}
                    </div>

                    {/* Close button */}
                    <motion.button
                      onClick={handleCloseGift}
                      className="absolute -top-3 -right-3 bg-white dark:bg-gray-700 rounded-full p-1.5 shadow-lg text-gray-400 hover:text-pink-500 transition-colors z-10"
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <X className="h-5 w-5" />
                    </motion.button>

                    {/* Poem content */}
                    <div className="relative z-10 h-full w-full flex flex-col items-center justify-center pt-2 pb-4">
                      <motion.div
                        className="mb-4 w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center shadow-md"
                        animate={{
                          scale: [1, 1.1, 1],
                          rotate: [0, 5, 0, -5, 0],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                        }}
                      >
                        <Sparkles className="h-6 w-6 text-white" />
                      </motion.div>

                      <motion.h3
                        className="text-2xl md:text-3xl font-serif font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        Puisi Untukmu
                      </motion.h3>

                      <div className="w-20 h-1 bg-gradient-to-r from-pink-300 to-purple-300 rounded-full mb-6"></div>

                      <div className="max-h-[250px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-pink-300 dark:scrollbar-thumb-pink-800 scrollbar-track-transparent">
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.8, delay: 0.3 }}
                        >
                          <p className="italic text-gray-700 dark:text-gray-300 text-center leading-relaxed text-lg">
                            Dalam setiap detak jantungku,
                            <br />
                            Ada namamu yang selalu terukir.
                            <br />
                            Dalam setiap langkah hidupku,
                            <br />
                            Ada bayangmu yang selalu mengiringi.
                            <br />
                            <br />
                            Senyummu adalah matahari pagiku,
                            <br />
                            Tawamu adalah musik paling merdu.
                            <br />
                            Cintamu adalah pelita hatiku,
                            <br />
                            Yang menerangi setiap sudut gelapku.
                            <br />
                            <br />
                            Selamat ulang tahun, cintaku.
                            <br />
                            Semoga kebahagiaanmu tak pernah pudar,
                            <br />
                            Seperti cintaku yang tak akan pernah padam.
                          </p>
                        </motion.div>
                      </div>

                      <motion.div
                        className="mt-6 flex items-center justify-center gap-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                      >
                        <Star className="h-4 w-4 text-pink-400 fill-pink-400" />
                        <span className="text-pink-500 dark:text-pink-300 font-medium">
                          Dengan segenap cinta
                        </span>
                        <Star className="h-4 w-4 text-pink-400 fill-pink-400" />
                      </motion.div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Instructional text and button */}
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {!isOpen && (
              <motion.button
                className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform transition-all duration-300 flex items-center justify-center mx-auto"
                onClick={handleOpenGift}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 25px -5px rgba(236, 72, 153, 0.4)",
                }}
                whileTap={{ scale: 0.95 }}
                disabled={isBoxOpen}
              >
                <Gift className="h-5 w-5 mr-2" />
                <span className="font-medium">Buka Hadiahmu</span>
              </motion.button>
            )}

            {isOpen && (
              <motion.p
                className="text-gray-600 dark:text-gray-300 italic text-base max-w-xs mx-auto"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Hadiah kecil ini mungkin sederhana, tapi cintaku padamu tak
                terbatas{" "}
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                  className="inline-block"
                >
                  ❤️
                </motion.span>
              </motion.p>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
