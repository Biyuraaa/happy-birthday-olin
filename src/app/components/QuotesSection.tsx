"use client";

import { useState, useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  ChevronLeft,
  ChevronRight,
  Quote,
  Star,
  Sparkles,
} from "lucide-react";
import { useMobile } from "@/app/hooks/use-mobile";

// Our collection of meaningful quotes
const quotes = [
  {
    text: "Love is not about how many days, months, or years you have been together. Love is about how much you love each other every single day.",
    author: "Our favorite quote",
    type: "quote",
    color: "pink",
  },
  {
    text: "And I'd choose you; in a hundred lifetimes, in a hundred worlds, in any version of reality, I'd find you and I'd choose you.",
    author: "The Chaos of Stars",
    type: "lyric",
    color: "purple",
  },
  {
    text: "In all the world, there is no heart for me like yours. In all the world, there is no love for you like mine.",
    author: "Maya Angelou",
    type: "quote",
    color: "rose",
  },
  {
    text: "I love you without knowing how, or when, or from where. I love you simply, without problems or pride.",
    author: "Pablo Neruda",
    type: "poem",
    color: "fuchsia",
  },
];

export default function QuotesSection() {
  const [currentQuote, setCurrentQuote] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: false,
  });
  const isMobile = useMobile();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Autoplay quotes
  useEffect(() => {
    if (!autoplay || !inView || isHovering) return;

    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [autoplay, inView, isHovering]);

  // Navigate to previous quote
  const prevQuote = () => {
    setAutoplay(false);
    setCurrentQuote((prev) => (prev - 1 + quotes.length) % quotes.length);
  };

  // Navigate to next quote
  const nextQuote = () => {
    setAutoplay(false);
    setCurrentQuote((prev) => (prev + 1) % quotes.length);
  };

  // Get badge text based on quote type
  const getTypeBadge = (type: string) => {
    switch (type) {
      case "lyric":
        return "Lirik Lagu";
      case "poem":
        return "Puisi";
      default:
        return "Quote";
    }
  };

  // Get color scheme based on quote color
  const getColorScheme = (color: string) => {
    switch (color) {
      case "purple":
        return {
          gradient: "from-purple-500 to-indigo-600",
          light: "text-purple-500",
          dark: "text-purple-400",
          fill: "#a855f7",
          bgLight: "from-purple-500/10 to-indigo-500/10",
          bgDark: "from-purple-800/30 to-indigo-800/30",
          border: "border-purple-200 dark:border-purple-800/30",
          line: "from-purple-300 to-indigo-300 dark:from-purple-600 dark:to-indigo-600",
        };
      case "rose":
        return {
          gradient: "from-rose-500 to-pink-600",
          light: "text-rose-500",
          dark: "text-rose-400",
          fill: "#f43f5e",
          bgLight: "from-rose-500/10 to-pink-500/10",
          bgDark: "from-rose-800/30 to-pink-800/30",
          border: "border-rose-200 dark:border-rose-800/30",
          line: "from-rose-300 to-pink-300 dark:from-rose-600 dark:to-pink-600",
        };
      case "fuchsia":
        return {
          gradient: "from-fuchsia-500 to-purple-600",
          light: "text-fuchsia-500",
          dark: "text-fuchsia-400",
          fill: "#d946ef",
          bgLight: "from-fuchsia-500/10 to-purple-500/10",
          bgDark: "from-fuchsia-800/30 to-purple-800/30",
          border: "border-fuchsia-200 dark:border-fuchsia-800/30",
          line: "from-fuchsia-300 to-purple-300 dark:from-fuchsia-600 dark:to-purple-600",
        };
      default:
        return {
          gradient: "from-pink-500 to-purple-600",
          light: "text-pink-500",
          dark: "text-pink-400",
          fill: "#ec4899",
          bgLight: "from-pink-500/10 to-purple-500/10",
          bgDark: "from-pink-800/30 to-purple-800/30",
          border: "border-pink-200 dark:border-pink-800/30",
          line: "from-pink-300 to-purple-300 dark:from-pink-600 dark:to-purple-600",
        };
    }
  };

  // Particle effect for canvas
  useEffect(() => {
    if (!canvasRef.current || !inView) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);

    // Create particles
    const particles: {
      x: number;
      y: number;
      size: number;
      color: string;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;
    }[] = [];

    // Function to create a new particle
    const createParticle = (x: number, y: number, color: string) => {
      // Use deterministic values for SSR compatibility
      const seed = Math.floor(Math.random() * 10000);
      const seededRandom1 = (Math.sin(seed) * 10000) % 1;
      const seededRandom2 = (Math.sin(seed + 1) * 10000) % 1;
      const seededRandom3 = (Math.sin(seed + 2) * 10000) % 1;

      particles.push({
        x,
        y,
        size: 1 + seededRandom1 * 3,
        color,
        vx: (seededRandom2 - 0.5) * 2,
        vy: (seededRandom3 - 0.5) * 2 - 1, // Bias upward
        life: 0,
        maxLife: 100 + seededRandom1 * 50,
      });
    };

    // Create initial particles
    const colors = ["#ec4899", "#d946ef", "#8b5cf6", "#f9a8d4", "#c084fc"];
    for (let i = 0; i < 50; i++) {
      const seed = i * 1000;
      const x = Math.sin(seed) * 10000;
      const seededRandom1 = x - Math.floor(x);

      const seed2 = i * 2000;
      const x2 = Math.sin(seed2) * 10000;
      const seededRandom2 = x2 - Math.floor(x2);

      createParticle(
        seededRandom1 * canvas.width,
        canvas.height - seededRandom2 * 100,
        colors[i % colors.length]
      );
    }

    // Animation loop
    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.life++;
        if (p.life >= p.maxLife) {
          particles.splice(i, 1);
          i--;
          continue;
        }

        // Calculate opacity based on life
        const opacity =
          p.life < 20
            ? p.life / 20
            : p.life > p.maxLife - 20
            ? (p.maxLife - p.life) / 20
            : 1;

        // Update position
        p.x += p.vx;
        p.y += p.vy;

        // Draw particle
        ctx.globalAlpha = opacity;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.1, Math.abs(p.size)), 0, Math.PI * 2);
        ctx.fill();
      }

      // Add new particles occasionally
      if (Math.random() < 0.1 && particles.length < 100) {
        const x = Math.random() * canvas.width;
        const y = canvas.height;
        createParticle(x, y, colors[Math.floor(Math.random() * colors.length)]);
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", updateCanvasSize);
      cancelAnimationFrame(animationId);
    };
  }, [inView]);

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

  // Get current quote color scheme
  const colorScheme = getColorScheme(quotes[currentQuote].color);

  return (
    <div ref={ref} className="relative w-full py-24 px-4 overflow-hidden">
      {/* Canvas for particle effects */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-0 opacity-40"
      />

      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-pink-500/20 blur-3xl"></div>
          <div className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-purple-500/20 blur-3xl"></div>
          <div className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-fuchsia-500/20 blur-2xl"></div>
          <div className="absolute bottom-1/3 left-1/4 w-64 h-64 rounded-full bg-rose-500/20 blur-2xl"></div>
        </div>

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

        {/* Background hearts */}
        <div className="absolute inset-0">
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

            const colors = [
              "#ec4899",
              "#d946ef",
              "#8b5cf6",
              "#f9a8d4",
              "#c084fc",
            ];
            const color = colors[i % colors.length];

            return (
              <motion.div
                key={i}
                className="absolute text-pink-400/5 dark:text-pink-400/10"
                initial={{
                  x: `${seededRandom1 * 100}%`,
                  y: `${seededRandom2 * 100}%`,
                  scale: 0.8 + seededRandom3 * 0.5,
                  rotate: seededRandom4 * 45,
                }}
                animate={
                  inView
                    ? {
                        y: [0, -15, 0],
                        opacity: [0.1, 0.2, 0.1],
                      }
                    : {}
                }
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 6 + seededRandom4 * 10,
                  delay: seededRandom1 * 5,
                }}
              >
                <Heart fill={color} size={10 + seededRandom2 * 30} />
              </motion.div>
            );
          })}
        </div>
      </div>

      <motion.div
        className="max-w-5xl mx-auto relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Section title */}
        <div className="text-center mb-16">
          <motion.div
            className="inline-block relative mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.div
              className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg blur opacity-25"
              animate={{
                opacity: [0.2, 0.3, 0.2],
              }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            />
            <h2 className="relative text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 drop-shadow-sm px-4">
              Quotes Favorit Kita
            </h2>
          </motion.div>

          <div className="flex items-center justify-center gap-4 mb-5">
            <motion.div
              className="h-px w-16 bg-gradient-to-r from-transparent to-pink-300"
              initial={{ width: 0 }}
              animate={inView ? { width: 64 } : { width: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              <Sparkles className="h-6 w-6 text-pink-500" />
            </motion.div>
            <motion.div
              className="h-px w-16 bg-gradient-to-l from-transparent to-pink-300"
              initial={{ width: 0 }}
              animate={inView ? { width: 64 } : { width: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </div>

          <motion.p
            className="text-gray-600 dark:text-gray-300 max-w-xl mx-auto text-lg"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Kata-kata yang menginspirasi dan menghangatkan hati kita berdua
          </motion.p>
        </div>

        {/* Quote slider */}
        <div className="relative">
          {/* Decorative elements */}
          <motion.div
            className={`absolute -inset-3 bg-gradient-to-r ${colorScheme.gradient} rounded-2xl blur-md opacity-20`}
            animate={{
              opacity: [0.15, 0.25, 0.15],
            }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
          />

          <motion.div
            className="relative overflow-hidden bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 dark:border-gray-700/50"
            initial={{ y: 20, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {/* Decorative pattern */}
            <div className="absolute inset-0 overflow-hidden opacity-5 dark:opacity-10 pointer-events-none">
              <div className="absolute inset-0">
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
                      className={colorScheme.light}
                      fill={colorScheme.fill}
                      size={10 + (i % 5) * 8}
                      style={{
                        position: "absolute",
                        top: `${seededRandom1 * 100}%`,
                        left: `${seededRandom2 * 100}%`,
                        transform: `rotate(${i * 20}deg)`,
                      }}
                    />
                  );
                })}
              </div>
            </div>

            <div className="relative p-8 md:p-12">
              {/* Large quote marks */}
              <Quote className="absolute top-8 left-8 h-16 w-16 text-pink-200 dark:text-pink-900/30 -rotate-180" />
              <Quote className="absolute bottom-8 right-8 h-16 w-16 text-pink-200 dark:text-pink-900/30" />

              {/* Quote content */}
              <div className="relative min-h-[16rem] flex flex-col items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentQuote}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="text-center"
                  >
                    {/* Quote type badge */}
                    <motion.div
                      className={`inline-block mb-6 px-4 py-1.5 rounded-full bg-gradient-to-r ${colorScheme.bgLight} dark:${colorScheme.bgDark} ${colorScheme.border}`}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <span
                        className={`text-sm font-medium ${colorScheme.light} dark:${colorScheme.dark}`}
                      >
                        {getTypeBadge(quotes[currentQuote].type)}
                      </span>
                    </motion.div>

                    {/* Quote text */}
                    <blockquote className="text-xl md:text-2xl italic font-serif text-gray-800 dark:text-gray-200 px-6 md:px-16 mb-8 leading-relaxed">
                      {quotes[currentQuote].text}
                    </blockquote>

                    {/* Decorative line */}
                    <motion.div
                      className={`h-0.5 w-16 bg-gradient-to-r ${colorScheme.line} mx-auto mb-4`}
                      initial={{ width: 0 }}
                      animate={{ width: "4rem" }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                    />

                    {/* Quote author */}
                    <motion.p
                      className={`font-medium ${colorScheme.light} dark:${colorScheme.dark}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      — {quotes[currentQuote].author}
                    </motion.p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation dots */}
              <div className="flex justify-center mt-8 gap-2">
                {quotes.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setAutoplay(false);
                      setCurrentQuote(i);
                    }}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === currentQuote
                        ? `bg-gradient-to-r ${colorScheme.gradient} w-8`
                        : "bg-gray-300 dark:bg-gray-600 hover:bg-pink-300 dark:hover:bg-pink-800 w-2"
                    }`}
                    aria-label={`Go to quote ${i + 1}`}
                  />
                ))}
              </div>

              {/* Navigation arrows */}
              <motion.button
                onClick={prevQuote}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 dark:bg-gray-700/90 backdrop-blur-sm flex items-center justify-center text-gray-500 dark:text-gray-300 hover:text-pink-500 dark:hover:text-pink-400 hover:bg-white dark:hover:bg-gray-700 shadow-md transition-all"
                whileHover={{ scale: 1.1, x: -2 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Previous quote"
              >
                <ChevronLeft className="h-6 w-6" />
              </motion.button>

              <motion.button
                onClick={nextQuote}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 dark:bg-gray-700/90 backdrop-blur-sm flex items-center justify-center text-gray-500 dark:text-gray-300 hover:text-pink-500 dark:hover:text-pink-400 hover:bg-white dark:hover:bg-gray-700 shadow-md transition-all"
                whileHover={{ scale: 1.1, x: 2 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Next quote"
              >
                <ChevronRight className="h-6 w-6" />
              </motion.button>
            </div>

            {/* Progress bar */}
            {autoplay && !isHovering && (
              <motion.div
                className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${colorScheme.gradient}`}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{
                  duration: 8,
                  ease: "linear",
                  repeat: 1,
                  repeatType: "loop",
                }}
                key={currentQuote}
              />
            )}
          </motion.div>
        </div>

        {/* Notes about the quotes */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Kata-kata indah yang selalu kita tukar saat bahagia maupun sedih
          </p>

          <div className="flex items-center justify-center space-x-3">
            <Star className="h-4 w-4 text-pink-400 fill-pink-400" />
            <motion.span
              className="text-pink-500 dark:text-pink-400 font-medium"
              animate={{
                opacity: [0.8, 1, 0.8],
              }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              Terinspirasi oleh cinta kita
            </motion.span>
            <Star className="h-4 w-4 text-pink-400 fill-pink-400" />
          </div>

          {/* Decorative hearts */}
          <div className="mt-8 flex justify-center gap-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  y: [0, -8, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2 + i * 0.5,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.2,
                }}
              >
                <Heart
                  className="text-pink-400"
                  fill="#f472b6"
                  size={12 + i * 2}
                  style={{ opacity: 0.8 + i * 0.05 }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
