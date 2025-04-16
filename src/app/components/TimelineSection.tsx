"use client";

import { useRef, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { Heart, Calendar, MapPin, Clock, Star } from "lucide-react";

const timelineEvents = [
  {
    date: "5 Januari 2025",
    title: "Pertama Kali Bertemu",
    description:
      "Awal pertemuan kita yang tak terlupakan. Hari dimana takdir mempertemukan kita.",
    location: "Surabaya",
    icon: "star",
    color: "pink",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    date: "16 Januari 2025",
    title: "Pertama Kali Chatting",
    description:
      "Kita mulai saling mengenal lebih dekat. Obrolan yang tak ada habisnya.",
    location: "Instagram",
    icon: "phone",
    color: "purple",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    date: "4 Februari 2025",
    title: "Pertama Kali Kencan",
    description:
      "Hari pertama kita bertemu di Surabaya secara langsung. Momen yang penuh rasa gugup dan bahagia.",
    location: "Tunjungan Plaza",
    icon: "heart",
    color: "pink",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    date: "16 April 2025",
    title: "Ulang Tahun Spesial",
    description:
      "Merayakan hari spesialmu dengan penuh cinta. Hari yang penuh kebahagiaan dan kejutan.",
    location: "Our Special Place",
    icon: "calendar",
    color: "purple",
    image: "/placeholder.svg?height=200&width=300",
  },
];

export default function TimelineSection() {
  const lineRef = useRef<HTMLDivElement>(null);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  // Animate the line to grow as user scrolls
  useEffect(() => {
    if (inView && lineRef.current) {
      lineRef.current.style.height = "100%";
    } else if (lineRef.current) {
      lineRef.current.style.height = "0%";
    }
  }, [inView]);

  return (
    <div ref={ref} className="relative py-24 px-4 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-24 w-48 h-48 bg-pink-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-24 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl"></div>

        {/* Floating hearts */}
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-pink-400"
            initial={{
              scale: 0.5 + Math.random() * 0.5,
              x: Math.random() * 100 + "%",
              y: Math.random() * 100 + "%",
              opacity: 0,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0, 0.3, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 5 + Math.random() * 10,
              delay: Math.random() * 5,
              ease: "easeInOut",
            }}
          >
            <Heart
              fill={i % 2 === 0 ? "#f472b6" : "#d946ef"}
              size={6 + Math.random() * 14}
            />
          </motion.div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section title with decorative elements */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-5 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
            Perjalanan Cinta Kita
          </h2>

          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-pink-300"></div>
            <Heart className="h-6 w-6 text-pink-500 fill-pink-500" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-pink-300"></div>
          </div>

          <p className="text-gray-600 dark:text-gray-300 max-w-xl mx-auto italic">
            Setiap momen bersamamu membuat hidup ini semakin berarti dan penuh
            warna
          </p>
        </motion.div>

        {/* Timeline container */}
        <div className="relative">
          {/* Timeline line with animation */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5">
            <div
              ref={lineRef}
              className="w-full bg-gradient-to-b from-pink-500 via-purple-500 to-pink-500 h-0 rounded-full transition-all duration-1000 ease-in-out"
              style={{ boxShadow: "0 0 10px rgba(236, 72, 153, 0.5)" }}
            ></div>
          </div>

          {/* Timeline events */}
          <div className="relative">
            {timelineEvents.map((event, index) => (
              <TimelineEvent
                key={index}
                event={event}
                index={index}
                isLastItem={index === timelineEvents.length - 1}
              />
            ))}
          </div>
        </div>

        {/* Bottom decoration */}
        <motion.div
          className="mt-6 flex justify-center"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="relative">
            <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 opacity-30 blur-md"></div>
            <div className="relative bg-white dark:bg-gray-800 rounded-full p-3 border-2 border-pink-500 dark:border-purple-500">
              <Heart className="h-6 w-6 text-pink-600 fill-pink-600" />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function TimelineEvent({
  event,
  index,
  isLastItem,
}: {
  event: any;
  index: number;
  isLastItem: boolean;
}) {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: false,
  });

  const isEven = index % 2 === 0;

  const getIcon = () => {
    switch (event.icon) {
      case "heart":
        return <Heart className="h-full w-full" />;
      case "map":
        return <MapPin className="h-full w-full" />;
      case "calendar":
        return <Calendar className="h-full w-full" />;
      case "star":
        return <Star className="h-full w-full" />;
      default:
        return <Heart className="h-full w-full" />;
    }
  };

  const getColor = () => {
    return event.color === "pink"
      ? "from-pink-500 to-pink-600 dark:from-pink-600 dark:to-pink-700"
      : "from-purple-500 to-purple-600 dark:from-purple-600 dark:to-purple-700";
  };

  return (
    <div
      ref={ref}
      className={`mb-24 ${isLastItem ? "mb-0" : ""} md:flex items-center ${
        isEven ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      {/* Content card */}
      <motion.div
        className={`md:w-5/12 ${isEven ? "md:pr-10" : "md:pl-10"} mb-8 md:mb-0`}
        initial={{
          opacity: 0,
          x: isEven ? -50 : 50,
        }}
        animate={
          inView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? -50 : 50 }
        }
        transition={{
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <div className="bg-white dark:bg-gray-800/80 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
          {/* Image */}
          <div className="relative h-48 w-full overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/20 to-purple-500/20 z-10"></div>
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
            />
          </div>

          {/* Content */}
          <div className="p-6">
            <h3 className="text-2xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
              {event.title}
            </h3>

            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-1">
              <Clock className="w-4 h-4 mr-1" />
              <span>{event.date}</span>
            </div>

            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
              <MapPin className="w-4 h-4 mr-1" />
              <span>{event.location}</span>
            </div>

            <p className="text-gray-600 dark:text-gray-300">
              {event.description}
            </p>

            {/* Decorative element */}
            <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
              <div className="flex items-center text-pink-500">
                <Heart className="w-4 h-4 mr-2 fill-pink-500" />
                <span className="text-sm italic">
                  Kenangan indah yang tak terlupakan
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Center indicator */}
      <div className="md:w-2/12 flex justify-center">
        <motion.div
          className="relative"
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Glow effect */}
          <div className="absolute -inset-2.5 bg-gradient-to-r from-pink-500/60 to-purple-500/60 rounded-full blur-md"></div>

          {/* Icon circle */}
          <div
            className={`relative h-14 w-14 rounded-full bg-gradient-to-br ${getColor()} flex items-center justify-center z-10 border-4 border-white dark:border-gray-800 shadow-lg`}
          >
            <div className="text-white w-6 h-6">{getIcon()}</div>
          </div>

          {/* Pulsing effect */}
          <motion.div
            className="absolute inset-0 rounded-full bg-pink-500/30"
            animate={{ scale: [1, 1.8, 1], opacity: [0.7, 0, 0.7] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </motion.div>
      </div>

      {/* Empty space for alignment */}
      <div className="md:w-5/12">
        {/* Date display for opposite side */}
        <motion.div
          className={`hidden md:block ${
            isEven ? "text-left pl-10" : "text-right pr-10"
          }`}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 0.6 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 font-medium text-sm">
            {!isEven && <div className="flex-1"></div>}
            <Calendar className="w-4 h-4" />
            <span>{event.date}</span>
            {isEven && <div className="flex-1"></div>}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
