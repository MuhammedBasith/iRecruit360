'use client'

import { useEffect } from 'react';
import confetti from 'canvas-confetti';

const Confetti = () => {
  useEffect(() => {
    // Configure the confetti settings
    const duration = 10 * 1000; // Duration of the confetti animation in milliseconds

    // Trigger the confetti animation
    confetti({
      particleCount: 1000,
      spread: 300,
      origin: { y: 0.6 },
    });

    // Stop the confetti after a certain duration
    setTimeout(() => {
      confetti.reset();
    }, duration);

  }, []); // Empty dependency array ensures this effect runs only once on component mount

  return null; // This component doesn't render anything visible
};

export default Confetti;
