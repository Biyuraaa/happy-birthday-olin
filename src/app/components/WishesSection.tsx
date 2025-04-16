"use client";

import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { ChevronLeft, ChevronRight } from "lucide-react";

const wishes = [
  {
    name: "Andi",
    message:
      "Happy birthday Caroline! Semoga semua impianmu tercapai tahun ini!",
    relation: "Teman Kuliah",
  },
  {
    name: "Budi",
    message:
      "Selamat ulang tahun! Tetap jadi pribadi yang ceria dan menginspirasi ya!",
    relation: "Teman Kantor",
  },
  {
    name: "Cindy",
    message:
      "HBD Caroline! Kamu adalah teman terbaik yang pernah aku miliki. Semoga bahagia selalu!",
    relation: "Sahabat",
  },
  {
    name: "David",
    message:
      "Selamat bertambah usia! Semoga makin sukses dalam karir dan cintanya ya!",
    relation: "Sepupu",
  },
  {
    name: "Ella",
    message:
      "Happy birthday dear! Semoga tahun ini membawa lebih banyak kebahagiaan untukmu!",
    relation: "Teman SMA",
  },
];

export default function WishesSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const maxIndex = wishes.length - 1;

  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: false,
  });

  const goToNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToPrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  useEffect(() => {
    if (inView) {
      const interval = setInterval(() => {
        goToNext();
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [inView, currentIndex, isAnimating]);

  return (
    <div
      ref={ref}
      className={`w-full max-w-4xl mx-auto px-4 py-16 transition-all duration-1000 transform ${
        inView ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
      }`}
    >
      <h2 className="text-4xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
        Ucapan Dari Teman-Teman
      </h2>

      <div className="relative">
        <div className="relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-xl p-8 min-h-[250px]">
          {wishes.map((wish, index) => (
            <div
              key={index}
              className={`transition-all duration-500 absolute inset-0 p-8 ${
                index === currentIndex
                  ? "opacity-100 translate-x-0"
                  : index < currentIndex
                  ? "opacity-0 -translate-x-full"
                  : "opacity-0 translate-x-full"
              }`}
            >
              <div className="flex flex-col h-full justify-between">
                <div>
                  <p className="text-lg md:text-xl italic mb-6">
                    "{wish.message}"
                  </p>
                </div>
                <div>
                  <p className="text-right font-bold text-lg">- {wish.name}</p>
                  <p className="text-right text-gray-600 dark:text-gray-400">
                    {wish.relation}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation buttons */}
        <button
          className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-4 h-10 w-10 rounded-full bg-white dark:bg-gray-800 shadow-lg flex items-center justify-center hover:bg-pink-100 dark:hover:bg-gray-700 transition-colors"
          onClick={goToPrev}
        >
          <ChevronLeft className="h-6 w-6 text-pink-500" />
        </button>

        <button
          className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-4 h-10 w-10 rounded-full bg-white dark:bg-gray-800 shadow-lg flex items-center justify-center hover:bg-pink-100 dark:hover:bg-gray-700 transition-colors"
          onClick={goToNext}
        >
          <ChevronRight className="h-6 w-6 text-pink-500" />
        </button>

        {/* Dots indicator */}
        <div className="flex justify-center mt-6 space-x-2">
          {wishes.map((_, index) => (
            <button
              key={index}
              className={`h-3 w-3 rounded-full transition-colors ${
                index === currentIndex
                  ? "bg-pink-500"
                  : "bg-gray-300 dark:bg-gray-600"
              }`}
              onClick={() => {
                setIsAnimating(true);
                setCurrentIndex(index);
                setTimeout(() => setIsAnimating(false), 500);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
