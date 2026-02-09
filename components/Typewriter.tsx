
import React, { useState, useEffect, useCallback } from 'react';

interface TypewriterProps {
  phrases: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseTime?: number;
}

const Typewriter: React.FC<TypewriterProps> = ({
  phrases,
  typingSpeed = 60,
  deletingSpeed = 30,
  pauseTime = 2500
}) => {
  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const tick = useCallback(() => {
    const i = index % phrases.length;
    const fullText = phrases[i];

    if (isDeleting) {
      setText(fullText.substring(0, text.length - 1));
    } else {
      setText(fullText.substring(0, text.length + 1));
    }

    if (!isDeleting && text === fullText) {
      setTimeout(() => setIsDeleting(true), pauseTime);
    } else if (isDeleting && text === '') {
      setIsDeleting(false);
      setIndex(index + 1);
    }
  }, [index, isDeleting, phrases, text, pauseTime]);

  useEffect(() => {
    const timer = setTimeout(tick, isDeleting ? deletingSpeed : typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, tick, typingSpeed, deletingSpeed]);

  return (
    <span className="inline-block text-indigo-400 font-mono tracking-tight drop-shadow-[0_0_10px_rgba(99,102,241,0.3)]">
      {text}
      <span className="ml-1 w-[2px] h-[1.1em] bg-indigo-500/80 inline-block align-middle animate-pulse"></span>
    </span>
  );
};

export default Typewriter;
