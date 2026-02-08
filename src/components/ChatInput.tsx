import { useLayoutEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface ChatInputProps {
  onSubmit: (text: string) => void;
  disabled?: boolean;
}

export default function ChatInput({ onSubmit, disabled }: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [text, setText] = useState('');

  useLayoutEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) {
      return;
    }

    const maxHeight = 280;
    textarea.style.height = 'auto';

    const nextHeight = Math.min(textarea.scrollHeight, maxHeight);
    textarea.style.height = `${nextHeight}px`;
    textarea.style.overflowY = textarea.scrollHeight > maxHeight ? 'auto' : 'hidden';
  }, [text]);

  const handleSubmit = () => {
    const trimmed = text.trim();
    if (trimmed && !disabled) {
      onSubmit(trimmed);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="chat-input-wrapper">
      <textarea
        ref={textareaRef}
        className="chat-input"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="在这里倾诉你的心声..."
        disabled={disabled}
        rows={4}
      />
      <motion.button
        className="chat-submit-btn"
        onClick={handleSubmit}
        disabled={disabled || !text.trim()}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        倾诉给映心
      </motion.button>
    </div>
  );
}
