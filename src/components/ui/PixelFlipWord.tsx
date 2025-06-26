"use client"
import React, { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Define the pixel patterns for all letters
const letterPatterns = {
  D: [
    [1, 1, 1, 0],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 1, 1, 0],
  ],
  E: [
    [1, 1, 1, 1],
    [1, 0, 0, 0],
    [1, 1, 1, 0],
    [1, 0, 0, 0],
    [1, 1, 1, 1],
  ],
  V: [
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [0, 1, 1, 0],
    [0, 1, 1, 0],
  ],
  T: [
    [1, 1, 1, 1],
    [0, 1, 1, 0],
    [0, 1, 1, 0],
    [0, 1, 1, 0],
    [0, 1, 1, 0],
  ],
  A: [
    [0, 1, 1, 0],
    [1, 0, 0, 1],
    [1, 1, 1, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
  ],
  Q: [
    [0, 1, 1, 0],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 0, 1, 1],
    [0, 1, 1, 1],
  ],
  U: [
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [0, 1, 1, 0],
  ],
  I: [
    [1, 1, 1, 1],
    [0, 1, 1, 0],
    [0, 1, 1, 0],
    [0, 1, 1, 0],
    [1, 1, 1, 1],
  ],
};

// Component to render a single pixel letter
const PixelLetter = ({ letter, delay = 0 }) => {
  const pattern = letterPatterns[letter.toUpperCase()];
  
  if (!pattern) return null;

  return (
    <motion.div
      className="grid grid-cols-4 gap-0"
      initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{
        delay: delay,
        duration: 0.3,
        ease: "easeOut"
      }}
    >
      {pattern.map((row, rowIndex) =>
        row.map((pixel, pixelIndex) => (
          <motion.div
            key={`${rowIndex}-${pixelIndex}`}
            className={`size-2 ${pixel ? "bg-[#333] dark:bg-white" : "bg-transparent"}`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              delay: delay + (rowIndex * 4 + pixelIndex) * 0.01,
              duration: 0.2,
              ease: "easeOut"
            }}
          />
        ))
      )}
    </motion.div>
  );
};

// Main flip words component with pixel letters
export const PixelFlipWords = ({
  words,
  duration = 3000,
  className = "",
}) => {
  const [currentWord, setCurrentWord] = useState(words[0]);
  const [isAnimating, setIsAnimating] = useState(false);

  const startAnimation = useCallback(() => {
    const word = words[words.indexOf(currentWord) + 1] || words[0];
    setCurrentWord(word);
    setIsAnimating(true);
  }, [currentWord, words]);

  useEffect(() => {
    if (!isAnimating) {
      setTimeout(() => {
        startAnimation();
      }, duration);
    }
  }, [isAnimating, duration, startAnimation]);

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <AnimatePresence
        onExitComplete={() => {
          setIsAnimating(false);
        }}
      >
        <motion.div
          key={currentWord}
          className="flex gap-4 items-center"
          initial={{
            opacity: 0,
            y: 10,
            scale: 0.8,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            y: -40,
            x: 40,
            filter: "blur(8px)",
            scale: 1.2,
            position: "absolute",
          }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 10,
          }}
        >
          {currentWord.split("").map((letter, letterIndex) => (
            <PixelLetter
              key={`${currentWord}-${letterIndex}`}
              letter={letter}
              delay={letterIndex * 0.1}
            />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

// Demo component
export default function PixelFlipWordsDemo() {
  const words = ["DEV", "TAQUI"];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-4">
            Pixel Style Animation
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Watch the words flip with pixel-perfect letters
          </p>
        </div>
        
        <div className="relative">
          <PixelFlipWords words={words} duration={3000} />
        </div>
        
        <div className="mt-8 text-sm text-gray-500 dark:text-gray-400">
          Words: {words.join(" → ")}
        </div>
      </div>
    </div>
  );
}