"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X, Heart, Calendar, MapPin, MessageCircle } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { motion, AnimatePresence } from "framer-motion";

const images = [
  {
    src: "/placeholder.svg?height=400&width=600",
    alt: "Memory 1",
    caption: "Pertemuan pertama kita",
    date: "Januari 5, 2025",
    location: "Surabaya",
    note: "Kamu adalah bintang di langitku, yang selalu bersinar terang. Setiap detik bersamamu adalah kenangan yang tak terlupakan.",
  },
  {
    src: "/images/sawah.jpg",
    alt: "Memory 2",
    caption: "Pergi ke Sawah",
    date: "Januari 31, 2025",
    location: "Lamongan",
    note: "Kamu adalah matahariku, yang selalu bersinar di setiap langkahku. Memorimu seperti hamparan sawah yang indah tak berujung.",
  },
  {
    src: "/images/ngedate.jpg",
    alt: "Memory 3",
    caption: "Pertama kali nge-date",
    date: "Februari 4, 2025",
    location: "Tunjungan Plaza",
    note: "Kamu adalah bintang di langitku, yang selalu bersinar terang. Tiap tatapanmu membuatku jatuh cinta lagi dan lagi.",
  },
  {
    src: "/images/imnottrash.jpg",
    alt: "Memory 4",
    caption: "Pertama kali im not trash",
    date: "Februari 11, 2025",
    location: "Galaxy Mall",
    note: "Kamu adalah pelangi dalam hidupku, yang selalu memberi warna pada hariku. Tawamu adalah melodi terindah yang pernah kudengar.",
  },
  {
    src: "/images/gereja.jpg",
    alt: "Memory 5",
    caption: "Kita ke gereja bareng",
    date: "Februari 16, 2025",
    location: "Pakuwon City Mall",
    note: "Kamu adalah cahaya dalam hidupku, yang selalu menerangi jalanku. Bersyukur kepada Tuhan telah mempertemukan kita.",
  },
  {
    src: "/images/kodam.jpg",
    alt: "Memory 6",
    caption: "Kita ke kodam setelah nonton",
    date: "Maret 2, 2025",
    location: "Pasar Malam Kodam Brawijaya",
    note: "Kamu adalah lagu dalam hidupku, yang selalu mengalun indah di telingaku. Bersamamu, setiap tempat terasa seperti surga.",
  },
  {
    src: "/images/danau.jpg",
    alt: "Memory 7",
    caption: "Kita ke danau bareng",
    date: "Maret 13, 2025",
    location: "Universitas Airlangga",
    note: "Cintaku padamu sedalam danau, seluas langit, dan setinggi gunung. Setiap momen bersamamu adalah momen yang berharga.",
  },
  {
    src: "/images/masak.jpg",
    alt: "Memory 8",
    caption: "Kita masak bareng",
    date: "Maret 16, 2025",
    location: "Surabaya",
    note: "Kamu adalah bumbu dalam hidupku, yang selalu memberi rasa pada setiap hariku. Bersamamu, hidupku terasa lebih berwarna.",
  },
  {
    src: "/images/nonton_2.jpg",
    alt: "Memory 9",
    caption: "Kita nonton lagi",
    date: "Maret 18, 2025",
    location: "Surabaya",
    note: "Kamu adalah sahabat terbaikku, yang selalu ada di sampingku. Bersamamu, aku merasa lengkap.",
  },
];

export default function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [hoveredImage, setHoveredImage] = useState<number | null>(null);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  // Auto rotate through images in lightbox
  const [autoRotate, setAutoRotate] = useState(false);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (autoRotate && selectedImage !== null) {
      intervalId = setInterval(() => {
        setSelectedImage((prev) =>
          prev === null ? null : (prev + 1) % images.length
        );
      }, 5000);
    }

    return () => clearInterval(intervalId);
  }, [autoRotate, selectedImage]);

  // Particles for decoration
  const particles = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    size: 4 + Math.random() * 8,
    duration: 15 + Math.random() * 15,
    delay: Math.random() * 5,
  }));

  return (
    <div ref={ref} className="relative w-full py-20 px-4 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-pink-50/30 to-purple-100/30 dark:from-pink-900/10 dark:to-purple-900/10"></div>

      {/* Background particles */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: particle.size,
              height: particle.size,
              background:
                particle.id % 2 === 0
                  ? "radial-gradient(circle, rgba(244,114,182,0.4) 0%, rgba(244,114,182,0) 70%)"
                  : "radial-gradient(circle, rgba(192,132,252,0.4) 0%, rgba(192,132,252,0) 70%)",
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, particle.id % 2 === 0 ? 15 : -15, 0],
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.7, 0.2],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Decorative header */}
        <div className="text-center mb-16">
          <motion.div
            className="inline-block"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
              Kenangan Indah Kita
            </h2>
            <div className="flex items-center justify-center gap-4 mb-3">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-pink-300"></div>
              <Heart className="h-6 w-6 text-pink-400 fill-pink-400" />
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-pink-300"></div>
            </div>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-center italic">
              Setiap momen bersamamu adalah hadiah terindah yang bisa kuimpikan
            </p>
          </motion.div>
        </div>

        {/* Gallery grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {images.map((image, index) => (
            <motion.div
              key={index}
              className="transform"
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{
                duration: 0.7,
                delay: index * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              onHoverStart={() => setHoveredImage(index)}
              onHoverEnd={() => setHoveredImage(null)}
            >
              <div
                className="relative overflow-hidden rounded-xl shadow-lg cursor-pointer group"
                onClick={() => setSelectedImage(index)}
              >
                {/* Card glow effect */}
                <div
                  className={`absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl opacity-0 group-hover:opacity-70 blur transition-opacity duration-500 z-0 ${
                    hoveredImage === index ? "animate-pulse" : ""
                  }`}
                ></div>

                {/* Polaroid-style frame */}
                <div className="relative bg-white dark:bg-gray-800 p-3 rounded-xl shadow-inner z-10 transform group-hover:scale-[0.98] transition-transform duration-500">
                  {/* Image container with fixed aspect ratio */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg mb-4">
                    <Image
                      src={image.src || "/placeholder.svg"}
                      alt={image.alt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent transition-opacity duration-500 opacity-0 group-hover:opacity-100"></div>

                    {/* Floating hearts on hover */}
                    <AnimatePresence>
                      {hoveredImage === index && (
                        <>
                          {[...Array(5)].map((_, i) => (
                            <motion.div
                              key={`heart-${i}`}
                              className="absolute"
                              initial={{
                                opacity: 0,
                                scale: 0,
                                x: Math.random() * 100 - 50 + "%",
                                y: 100 + "%",
                              }}
                              animate={{
                                opacity: [0, 1, 0],
                                scale: [0, 1, 0.5],
                                y: ["100%", "0%", "-100%"],
                                x: `calc(${Math.random() * 100 - 50}% + ${
                                  Math.sin(i) * 50
                                }px)`,
                              }}
                              exit={{ opacity: 0 }}
                              transition={{
                                duration: 2 + Math.random(),
                                delay: i * 0.2,
                                ease: "easeOut",
                              }}
                            >
                              <Heart
                                fill={i % 2 === 0 ? "#f472b6" : "#c084fc"}
                                className="h-6 w-6"
                              />
                            </motion.div>
                          ))}
                        </>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Caption & metadata */}
                  <div className="px-1">
                    <h3 className="font-medium text-gray-800 dark:text-white text-lg mb-1">
                      {image.caption}
                    </h3>
                    <div className="flex items-center gap-1 text-pink-500 dark:text-pink-400 text-sm mb-0.5">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>{image.date}</span>
                    </div>
                    <div className="flex items-center gap-1 text-purple-500 dark:text-purple-400 text-sm">
                      <MapPin className="h-3.5 w-3.5" />
                      <span>{image.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Enhanced Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Backdrop with blur */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>

            {/* Close button */}
            <motion.button
              className="absolute top-4 right-4 z-10 text-white hover:text-pink-400 transition-colors"
              onClick={() => setSelectedImage(null)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <X className="h-8 w-8" />
            </motion.button>

            {/* Auto-rotate toggle */}
            <motion.button
              className={`absolute top-4 left-4 z-10 px-3 py-1.5 rounded-full text-sm ${
                autoRotate ? "bg-pink-500 text-white" : "bg-white/20 text-white"
              }`}
              onClick={() => setAutoRotate(!autoRotate)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {autoRotate ? "Auto-Play On" : "Auto-Play Off"}
            </motion.button>

            {/* Content */}
            <motion.div
              className="relative max-w-5xl w-full p-4 flex flex-col md:flex-row gap-6 z-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4 }}
            >
              {/* Image container */}
              <div className="flex-1 relative">
                <div className="absolute -inset-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl blur-md opacity-60"></div>
                <div className="relative bg-black rounded-xl overflow-hidden">
                  <div className="relative aspect-[4/3] w-full">
                    <Image
                      src={images[selectedImage].src || "/placeholder.svg"}
                      alt={images[selectedImage].alt}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>

              {/* Details panel */}
              <div className="md:w-80 bg-white/10 backdrop-blur-md p-6 rounded-xl text-white">
                <motion.h3
                  className="text-2xl font-serif mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-300"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {images[selectedImage].caption}
                </motion.h3>

                <motion.div
                  className="mb-6 h-0.5 bg-gradient-to-r from-pink-500/50 to-purple-500/50"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                ></motion.div>

                <motion.div
                  className="space-y-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-pink-400" />
                    <span>{images[selectedImage].date}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-pink-400" />
                    <span>{images[selectedImage].location}</span>
                  </div>

                  <div className="pt-3">
                    <div className="flex items-start gap-3">
                      <MessageCircle className="h-5 w-5 text-pink-400 mt-1" />
                      <p className="italic">{images[selectedImage].note}</p>
                    </div>
                  </div>
                </motion.div>

                {/* Hearts animation at bottom */}
                <div className="mt-8 flex justify-center">
                  <div className="relative h-12 w-24">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={`float-heart-${i}`}
                        className="absolute left-1/2"
                        animate={{
                          y: ["100%", "-100%"],
                          x: `calc(-50% + ${Math.sin(i) * 20}px)`,
                          opacity: [0, 1, 0],
                          scale: [0.5, 1, 0.5],
                        }}
                        transition={{
                          duration: 2.5 + i * 0.5,
                          repeat: Infinity,
                          delay: i * 0.4,
                          ease: "easeOut",
                        }}
                      >
                        <Heart
                          fill={i % 2 === 0 ? "#f472b6" : "#c084fc"}
                          className="h-4 w-4"
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Navigation arrows */}
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 text-white hover:bg-pink-500/70 transition-colors"
                onClick={() =>
                  setSelectedImage(
                    (selectedImage - 1 + images.length) % images.length
                  )
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 text-white hover:bg-pink-500/70 transition-colors"
                onClick={() =>
                  setSelectedImage((selectedImage + 1) % images.length)
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
