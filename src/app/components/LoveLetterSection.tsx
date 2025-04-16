"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, X, Mail, ChevronDown } from "lucide-react";
import Image from "next/image";

export default function LoveLetterSection() {
  const [hasMounted, setHasMounted] = useState(false);
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const message =
    "Terima kasih sudah menjadi bagian dari hidupku. Hari ini, aku ingin merayakan kehadiranmu yang luar biasa. Setiap momen bersamamu adalah hadiah terindah yang pernah aku terima. Senyummu selalu menerangi hariku, tawamu adalah musik favoritku, dan cintamu adalah kekuatan yang membuatku menjadi versi terbaik dari diriku. Di hari spesialmu ini, aku berharap kamu merasakan betapa berharganya dirimu bagiku. Selamat ulang tahun, sayangku. Semoga tahun ini membawa lebih banyak kebahagiaan, kesuksesan, dan petualangan untuk kita berdua. Aku mencintaimu dengan segenap hatiku. ❤️";

  // Only render client-side content after mounting
  if (!hasMounted) {
    return (
      <div className="relative min-h-screen w-full flex items-center justify-center px-6 py-20 overflow-hidden">
        <div className="relative z-10 max-w-4xl">
          <div className="relative bg-gradient-to-br from-white/90 to-white/80 dark:from-gray-800/90 dark:to-gray-900/80 p-8 md:p-12 rounded-2xl shadow-2xl border border-white/50 dark:border-purple-900/50 backdrop-blur-md h-[15rem]">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 px-4 drop-shadow-sm">
              Untuk Caroline Yang Tercinta
            </h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen w-full flex items-center justify-center px-6 py-20 overflow-hidden"
    >
      {/* Content */}
      <motion.div
        className="relative z-10 max-w-4xl"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Section Title */}
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-white mb-12 text-center drop-shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Surat Untuk Caroline
        </motion.h2>

        {/* Interactive Envelope */}
        <div className="relative mx-auto max-w-md">
          {/* Envelope glow effect */}
          <motion.div
            className="absolute -inset-2 bg-gradient-to-r from-pink-600 via-purple-600 to-pink-600 rounded-xl blur-md opacity-50"
            animate={{
              opacity: [0.4, 0.6, 0.4],
              scale: isEnvelopeOpen ? 1.05 : 1,
            }}
            transition={{
              opacity: { duration: 2, repeat: Number.POSITIVE_INFINITY },
              scale: { duration: 0.5 },
            }}
          />

          {/* Envelope */}
          <motion.div
            className={`relative bg-gradient-to-br from-pink-100 to-white dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-2xl overflow-hidden ${
              !isEnvelopeOpen ? "cursor-pointer" : ""
            }`}
            animate={{
              height: isEnvelopeOpen ? 420 : 300,
              scale: isEnvelopeOpen ? 1 : [0.98, 1.02, 0.98],
            }}
            transition={{
              height: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
              scale: {
                duration: 2,
                repeat: isEnvelopeOpen ? 0 : Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              },
            }}
            onClick={() => !isEnvelopeOpen && setIsEnvelopeOpen(true)}
            whileHover={!isEnvelopeOpen ? { scale: 1.03 } : {}}
            whileTap={!isEnvelopeOpen ? { scale: 0.98 } : {}}
          >
            {/* Envelope top flap */}
            <motion.div
              className="absolute top-0 left-0 w-full h-[150px] bg-gradient-to-br from-pink-200 to-pink-100 dark:from-gray-700 dark:to-gray-800 z-20"
              style={{
                originY: 0,
                transformStyle: "preserve-3d",
                boxShadow: "0 5px 15px -5px rgba(0,0,0,0.1)",
              }}
              initial={{ rotateX: 0 }}
              animate={{
                rotateX: isEnvelopeOpen ? -180 : 0,
                zIndex: isEnvelopeOpen ? 10 : 20,
              }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Decorative pattern on flap */}
              <div className="absolute inset-0 overflow-hidden opacity-30">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-pink-300/40 via-transparent to-transparent"></div>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Heart
                    key={i}
                    className="absolute text-pink-400"
                    style={{
                      top: `${20 + i * 15}%`,
                      left: `${10 + i * 20}%`,
                      transform: `rotate(${i * 20}deg)`,
                      opacity: 0.4,
                    }}
                    size={10 + i * 4}
                    fill="#f472b6"
                  />
                ))}
              </div>

              {/* Wax seal */}
              <motion.div
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 z-30"
                animate={{
                  scale: isEnvelopeOpen ? 0.9 : 1,
                  y: isEnvelopeOpen ? 10 : 0,
                }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-pink-600 to-pink-700 rounded-full flex items-center justify-center shadow-lg">
                  <Heart className="w-8 h-8 text-white" fill="white" />
                </div>
              </motion.div>
            </motion.div>

            {/* Envelope body */}
            <div className="relative w-full h-full bg-gradient-to-br from-pink-50 to-white dark:from-gray-800 dark:to-gray-900 pt-[150px] flex items-center justify-center">
              {/* Side flaps (decorative) */}
              <div className="absolute top-[150px] left-0 w-[30px] h-[calc(100%-150px)] bg-pink-100/50 dark:bg-gray-700/50 skew-y-[45deg] origin-top-left"></div>
              <div className="absolute top-[150px] right-0 w-[30px] h-[calc(100%-150px)] bg-pink-100/50 dark:bg-gray-700/50 skew-y-[-45deg] origin-top-right"></div>

              {/* Bottom flap (decorative) */}
              <div className="absolute bottom-0 left-0 w-full h-[30px] bg-pink-100/50 dark:bg-gray-700/50"></div>

              {/* Letter inside envelope */}
              <motion.div
                className={`relative w-[85%] h-[75%] bg-white dark:bg-gray-200 rounded-lg shadow-md flex flex-col items-center justify-center p-6 ${
                  isEnvelopeOpen ? "cursor-pointer" : "pointer-events-none"
                }`}
                initial={{ y: 100, opacity: 0, rotateX: 60 }}
                animate={{
                  y: isEnvelopeOpen ? 0 : 100,
                  opacity: isEnvelopeOpen ? 1 : 0,
                  rotateX: isEnvelopeOpen ? 0 : 60,
                  scale: isEnvelopeOpen ? [1, 1.03, 1] : 1,
                }}
                transition={{
                  y: { duration: 0.8, delay: 0.3 },
                  opacity: { duration: 0.5, delay: 0.4 },
                  rotateX: { duration: 0.8, delay: 0.3 },
                  scale: {
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: 1,
                  },
                }}
                onClick={() => isEnvelopeOpen && setIsModalOpen(true)}
                whileHover={isEnvelopeOpen ? { scale: 1.05 } : {}}
                whileTap={isEnvelopeOpen ? { scale: 0.98 } : {}}
              >
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <Heart
                      key={i}
                      className="absolute text-pink-400"
                      style={{
                        top: `${Math.sin(i * 1000) * 50 + 50}%`,
                        left: `${Math.cos(i * 1000) * 50 + 50}%`,
                        transform: `rotate(${i * 36}deg)`,
                      }}
                      size={10 + (i % 5) * 4}
                      fill="#f472b6"
                    />
                  ))}
                </div>

                <div className="text-center">
                  <h3 className="text-xl md:text-2xl font-serif font-bold text-pink-600 mb-4">
                    Untuk Caroline
                  </h3>
                  <div className="w-16 h-0.5 bg-pink-200 mx-auto mb-4"></div>
                  <p className="text-gray-600 mb-6">
                    Klik untuk membuka pesan spesial
                  </p>
                  <Mail className="w-12 h-12 text-pink-500 mx-auto mb-4" />
                  <motion.div
                    animate={{ y: [0, 5, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                  >
                    <ChevronDown className="w-6 h-6 text-pink-400 mx-auto" />
                  </motion.div>
                </div>
              </motion.div>

              {/* Envelope interior shadow */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-x-0 top-[150px] h-[20px] bg-gradient-to-b from-black/10 to-transparent"></div>
                <div className="absolute inset-y-0 left-0 w-[20px] bg-gradient-to-r from-black/10 to-transparent"></div>
                <div className="absolute inset-y-0 right-0 w-[20px] bg-gradient-to-l from-black/10 to-transparent"></div>
                <div className="absolute inset-x-0 bottom-0 h-[20px] bg-gradient-to-t from-black/10 to-transparent"></div>
              </div>
            </div>

            {/* Envelope hint text */}
            {!isEnvelopeOpen && (
              <motion.div
                className="absolute bottom-4 left-0 right-0 text-center text-pink-600 dark:text-pink-300 font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
              >
                Klik untuk membuka
              </motion.div>
            )}
          </motion.div>
        </div>
      </motion.div>

      {/* Message Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              className="relative max-w-2xl w-full max-h-[80vh] overflow-auto bg-white dark:bg-gray-900 rounded-2xl shadow-2xl"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 via-purple-600 to-pink-600 rounded-2xl blur-md opacity-50"></div>

              {/* Modal content */}
              <div className="relative bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-pink-200 dark:border-pink-900/30">
                {/* Modal header */}
                <div className="relative px-6 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white">
                  <h3 className="text-xl md:text-2xl font-bold">
                    Pesan Spesial Untuk Caroline
                  </h3>
                  <button
                    className="absolute right-4 top-4 text-white/80 hover:text-white transition-colors"
                    onClick={() => setIsModalOpen(false)}
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Modal body */}
                <div className="p-6 md:p-8">
                  {/* Decorative elements */}
                  <div className="absolute top-16 right-6 opacity-10">
                    <Heart className="w-32 h-32 text-pink-500" fill="#ec4899" />
                  </div>
                  <div className="absolute bottom-6 left-6 opacity-10 rotate-12">
                    <Heart className="w-24 h-24 text-pink-400" fill="#f472b6" />
                  </div>

                  {/* Message content */}
                  <div className="relative">
                    <p className="text-lg md:text-xl leading-relaxed font-medium text-gray-800 dark:text-gray-200 mb-6">
                      <span className="text-2xl font-serif">D</span>ear
                      Caroline,
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                      {message}
                    </p>
                    <div className="mt-8 text-right">
                      <p className="font-serif text-xl text-pink-600 dark:text-pink-400">
                        Dengan Cinta,
                      </p>
                      <p className="font-bold text-xl text-pink-700 dark:text-pink-300">
                        Bimo
                      </p>
                    </div>
                  </div>
                </div>

                {/* Modal footer */}
                <div className="px-6 py-4 bg-pink-50 dark:bg-gray-800/50 border-t border-pink-100 dark:border-gray-700 flex justify-end">
                  <button
                    className="px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full font-medium shadow-md hover:shadow-lg transition-shadow"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Tutup
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
