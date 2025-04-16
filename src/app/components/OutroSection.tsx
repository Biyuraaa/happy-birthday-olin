"use client";

import { useRef, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ArrowUp, Star, Sparkles } from "lucide-react";

export default function OutroSection() {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: false,
  });

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Create firework/sparkle animation
  useEffect(() => {
    if (!inView || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions to match window
    const updateSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    updateSize();
    window.addEventListener("resize", updateSize);

    // Create particles
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      alpha: number;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = `hsl(${Math.random() * 50 + 330}, 100%, 70%)`;
        this.alpha = 1;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.alpha -= 0.01;
      }

      draw() {
        if (!ctx) return;
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Store particles
    let particles: Particle[] = [];

    // Create random hearts at random positions
    const createParticles = () => {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height * 0.5;

      for (let i = 0; i < 20; i++) {
        particles.push(new Particle(x, y));
      }
    };

    // Animation loop
    const animate = () => {
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        if (particles[i].alpha <= 0) {
          particles.splice(i, 1);
          i--;
        }
      }

      // Create new particles randomly
      if (Math.random() < 0.1) {
        createParticles();
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", updateSize);
    };
  }, [inView]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      ref={ref}
      className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 py-20 overflow-hidden"
    >
      {/* Sparkle animation canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />

      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-40 h-40 bg-pink-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-20 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl"></div>

        {/* Floating hearts */}
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{
              x: `${Math.random() * 100}%`,
              y: `${Math.random() * 100}%`,
              opacity: 0,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0, 0.3, 0],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 8 + Math.random() * 12,
              delay: Math.random() * 5,
              ease: "easeInOut",
            }}
          >
            <Heart
              className="text-pink-400 fill-pink-400"
              opacity={0.2}
              size={10 + Math.random() * 20}
            />
          </motion.div>
        ))}
      </div>

      <motion.div
        className="max-w-4xl mx-auto text-center relative z-10"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1 }}
      >
        {/* Header with decorative elements */}
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : { scale: 0 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 15,
            delay: 0.3,
          }}
          className="relative mb-8 inline-block"
        >
          <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-pink-500/20 to-purple-500/20 blur-md animate-pulse"></div>
          <div className="relative bg-gradient-to-r from-pink-500 to-purple-600 p-4 rounded-full">
            <Heart className="h-12 w-12 text-white" fill="white" />
          </div>
        </motion.div>

        {/* Main message */}
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 drop-shadow-sm"
          initial={{ y: 50, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          Aku Mencintaimu, Caroline
        </motion.h2>

        <div className="relative">
          <motion.div
            className="absolute -inset-2 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl blur-md"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          ></motion.div>

          <motion.div
            className="relative bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm p-8 rounded-xl border border-pink-100 dark:border-purple-900/30 shadow-lg"
            initial={{ y: 30, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
          >
            <p className="text-xl md:text-2xl mb-6 leading-relaxed font-medium text-gray-700 dark:text-gray-200">
              Aku harap hari ini membuatmu tersenyum. Terima kasih telah menjadi
              bagian terindah dalam hidupku.
            </p>

            <div className="flex justify-center mb-6">
              <div className="flex items-center">
                <Sparkles className="h-5 w-5 text-pink-400 mr-1" />
                <span className="text-2xl md:text-3xl font-serif italic text-pink-600 dark:text-pink-400">
                  Aku mencintaimu selalu
                </span>
                <Sparkles className="h-5 w-5 text-pink-400 ml-1" />
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <motion.button
                onClick={scrollToTop}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full shadow-md hover:shadow-lg transition-all"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <ArrowUp className="h-5 w-5" />
                <span>Back to Top</span>
              </motion.button>

              <motion.button
                onClick={() => window.location.reload()}
                className="px-6 py-3 border-2 border-pink-500 text-pink-500 rounded-full shadow-sm hover:bg-pink-50 dark:hover:bg-pink-900/20 hover:shadow-md transition-all"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Play Again</span>
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Signature/footer section */}
        <motion.div
          className="mt-16 relative"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <div className="mb-6 flex justify-center gap-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  y: [0, -10, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.2,
                  repeat: Infinity,
                  repeatDelay: 1,
                }}
              >
                <Star
                  fill={i % 2 === 0 ? "#ec4899" : "#d946ef"}
                  className="h-6 w-6 text-pink-500"
                />
              </motion.div>
            ))}
          </div>

          <p className="text-gray-600 dark:text-gray-300 font-medium">
            Made with{" "}
            <Heart className="inline h-4 w-4 text-pink-500 fill-pink-500 animate-pulse" />{" "}
            for Caroline Tanuwijaya
          </p>

          <div className="mt-3 text-sm text-gray-500 dark:text-gray-400 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
            <span>Happy Birthday 2025</span>
            <span className="hidden sm:inline">•</span>
            <span>With all my love, Bimo</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
