"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useTransform, useSpring } from "framer-motion";
import { Heart } from "lucide-react";
import HeroSection from "@/app/components/HeroSection";
import LoveLetterSection from "@/app/components/LoveLetterSection";
import GallerySection from "@/app/components/GallerySection";
import VideoSection from "@/app/components/VideoSection";
import TimelineSection from "@/app/components/TimelineSection";
import GiftSection from "@/app/components/GiftSection";
import QuotesSection from "@/app/components/QuotesSection";
import OutroSection from "@/app/components/OutroSection";

export default function Home() {
  // Define all state hooks at the top
  const [scrollY, setScrollY] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);
  const [hasMounted, setHasMounted] = useState(false);
  const [visibleSections, setVisibleSections] = useState<boolean[]>(
    Array(9).fill(false)
  );

  // Smooth scrolling values with springs - define this AFTER all hooks
  const scrollYSpring = useSpring(scrollY, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Pre-calculate transform values
  const heroYTransform = useTransform(scrollYSpring, [0, 1000], [0, 500]);
  const heroOpacityTransform = useTransform(
    scrollYSpring,
    [0, viewportHeight * 0.5],
    [1, 0.2]
  );
  const loveLetterOpacityTransform = useTransform(
    scrollYSpring,
    [viewportHeight * 0.5, viewportHeight * 1.2],
    [0, 1]
  );

  // Create transform values for each section
  const sectionTransforms = Array.from({ length: 8 }, (_, index) => {
    const factor = [0.3, 0.2, 0.1, 0, -0.05, -0.1, -0.15, -0.2][index];
    return useTransform(scrollYSpring, [0, 5000], [0, 5000 * factor]);
  });

  // Move these transform hooks to the top level with other hooks
  // Add these right after the sectionTransforms array
  const gradientOpacityTransform = useTransform(
    scrollYSpring,
    [0, 3000],
    [0.5, 1]
  );
  const gradientScaleTransform = useTransform(
    scrollYSpring,
    [0, 3000],
    [1, 1.5]
  );
  const gradientXTransform = useTransform(scrollYSpring, [0, 3000], [0, -100]);

  // Define all refs next
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<Array<HTMLDivElement | null>>([]);

  // Initialize sectionsRef array
  useEffect(() => {
    sectionsRef.current = sectionsRef.current.slice(0, 9);
    while (sectionsRef.current.length < 9) {
      sectionsRef.current.push(null);
    }
  }, []);

  // Set hasMounted to true on component mount
  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Handle scroll and resize events
  useEffect(() => {
    if (!hasMounted) return;

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const handleResize = () => {
      setViewportHeight(window.innerHeight);
    };

    // Initial setup
    handleResize();
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [hasMounted]);

  // Check if sections are in view for transition effects
  useEffect(() => {
    if (!hasMounted) return;

    const checkVisibility = () => {
      const newVisibleSections = sectionsRef.current.map((section) => {
        if (!section) return false;

        const rect = section.getBoundingClientRect();
        // Consider section visible when at least half of it is in the viewport
        return (
          rect.top < viewportHeight * 0.75 &&
          rect.bottom > viewportHeight * 0.25
        );
      });

      setVisibleSections(newVisibleSections);
    };

    window.addEventListener("scroll", checkVisibility);
    checkVisibility(); // Check initially

    return () => window.removeEventListener("scroll", checkVisibility);
  }, [viewportHeight, hasMounted]);

  // Generate hearts with deterministic seed - but only on client-side rendering
  const hearts = hasMounted
    ? Array.from({ length: 40 }).map((_, i) => {
        // Use a seeded random number generator to guarantee consistency
        const seed = 123456 + i;
        const x = Math.sin(seed) * 10000;
        const seededRandom = x - Math.floor(x);

        const nextSeed = seed + 1;
        const x2 = Math.sin(nextSeed) * 10000;
        const seededRandom2 = x2 - Math.floor(x2);

        const nextSeed2 = nextSeed + 1;
        const x3 = Math.sin(nextSeed2) * 10000;
        const seededRandom3 = x3 - Math.floor(x3);

        const nextSeed3 = nextSeed2 + 1;
        const x4 = Math.sin(nextSeed3) * 10000;
        const seededRandom4 = x4 - Math.floor(x4);

        return {
          id: i,
          x: seededRandom * 100, // percentage across screen
          size: 10 + seededRandom2 * 25,
          speed: 0.5 + seededRandom3 * 1.5,
          opacity: 0.1 + seededRandom4 * 0.4,
          delay: seededRandom * 10,
        };
      })
    : [];

  // Only render client-side content after mounting
  if (!hasMounted) {
    return (
      <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-purple-900 via-pink-800 to-purple-900">
        <div className="relative w-full">
          {/* Static loading state or empty container */}
          <div className="h-screen flex items-center justify-center">
            <div className="text-white text-2xl">Loading...</div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-gradient-to-b from-purple-900 via-pink-800 to-purple-900"
    >
      {/* Parallax container */}
      <div className="relative w-full">
        {/* Floating hearts background */}
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
          {hearts.map((heart) => (
            <motion.div
              key={heart.id}
              className="absolute"
              initial={{
                x: `${heart.x}vw`,
                y: -50,
                opacity: 0,
              }}
              animate={{
                y: ["100vh", "-10vh"],
                opacity: [0, heart.opacity, heart.opacity, 0],
                scale: [0.8, 1, 1, 0.8],
              }}
              transition={{
                duration: 20 * heart.speed,
                repeat: Number.POSITIVE_INFINITY,
                delay: heart.delay,
                ease: "linear",
                times: [0, 0.1, 0.9, 1],
              }}
            >
              <Heart
                fill="#ff6b8b"
                className="text-pink-400"
                size={heart.size}
              />
            </motion.div>
          ))}
        </div>

        {/* Hero Section */}
        <motion.section
          ref={(el) => {
            sectionsRef.current[0] = el as HTMLDivElement;
          }}
          className="relative h-screen flex items-center justify-center overflow-hidden"
          style={{
            y: heroYTransform,
            opacity: heroOpacityTransform,
          }}
        >
          <HeroSection />
        </motion.section>

        {/* Love Letter Section */}
        <motion.section
          ref={(el) => {
            sectionsRef.current[1] = el as HTMLDivElement;
          }}
          className="relative min-h-screen flex items-center justify-center py-20"
          style={{
            y: sectionTransforms[0],
          }}
          animate={{
            opacity: visibleSections[1] ? 1 : 0.6,
            scale: visibleSections[1] ? 1 : 0.95,
          }}
          transition={{ duration: 0.8 }}
        >
          <LoveLetterSection />
        </motion.section>

        {/* Gallery Section */}
        <motion.section
          ref={(el) => {
            sectionsRef.current[2] = el as HTMLDivElement;
          }}
          className="relative min-h-screen flex items-center justify-center py-20"
          style={{
            y: sectionTransforms[1],
          }}
          animate={{
            opacity: visibleSections[2] ? 1 : 0.6,
            scale: visibleSections[2] ? 1 : 0.95,
          }}
          transition={{ duration: 0.8 }}
        >
          <GallerySection />
        </motion.section>

        {/* Video Section */}
        {/* <motion.section
          ref={(el) => {
            sectionsRef.current[3] = el as HTMLDivElement;
          }}
          className="relative min-h-screen flex items-center justify-center py-20"
          style={{
            y: sectionTransforms[2],
          }}
          animate={{
            opacity: visibleSections[3] ? 1 : 0.6,
            scale: visibleSections[3] ? 1 : 0.95,
          }}
          transition={{ duration: 0.8 }}
        >
          <VideoSection />
        </motion.section> */}

        {/* Timeline Section */}
        <motion.section
          ref={(el) => {
            sectionsRef.current[3] = el as HTMLDivElement;
          }}
          className="relative min-h-screen flex items-center justify-center py-20"
          style={{
            y: sectionTransforms[2],
          }}
          animate={{
            opacity: visibleSections[3] ? 1 : 0.6,
            scale: visibleSections[3] ? 1 : 0.95,
          }}
          transition={{ duration: 0.8 }}
        >
          <TimelineSection />
        </motion.section>

        {/* Gift Section */}
        <motion.section
          ref={(el) => {
            sectionsRef.current[4] = el as HTMLDivElement;
          }}
          className="relative min-h-screen flex items-center justify-center py-20"
          style={{
            y: sectionTransforms[3],
          }}
          animate={{
            opacity: visibleSections[4] ? 1 : 0.6,
            scale: visibleSections[4] ? 1 : 0.95,
          }}
          transition={{ duration: 0.8 }}
        >
          <GiftSection />
        </motion.section>

        {/* Quotes Section */}
        <motion.section
          ref={(el) => {
            sectionsRef.current[6] = el as HTMLDivElement;
          }}
          className="relative min-h-screen flex items-center justify-center py-20"
          style={{
            y: sectionTransforms[5],
          }}
          animate={{
            opacity: visibleSections[6] ? 1 : 0.6,
            scale: visibleSections[6] ? 1 : 0.95,
          }}
          transition={{ duration: 0.8 }}
        >
          <QuotesSection />
        </motion.section>

        {/* Outro Section */}
        <motion.section
          ref={(el) => {
            sectionsRef.current[7] = el as HTMLDivElement;
          }}
          className="relative min-h-screen flex items-center justify-center py-20"
          style={{
            y: sectionTransforms[6],
          }}
          animate={{
            opacity: visibleSections[7] ? 1 : 0.6,
            scale: visibleSections[7] ? 1 : 0.95,
          }}
          transition={{ duration: 0.8 }}
        >
          <OutroSection />
        </motion.section>
      </div>

      {/* Background gradient that moves subtly with scroll */}
      <motion.div
        className="fixed inset-0 z-[-1] bg-gradient-radial from-pink-500/10 to-transparent pointer-events-none"
        style={{
          opacity: gradientOpacityTransform,
          scale: gradientScaleTransform,
          x: gradientXTransform,
        }}
      />
    </main>
  );
}
