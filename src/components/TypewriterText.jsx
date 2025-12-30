import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TypewriterText = ({ text, delay = 0, speed = 50, className, style, cursorColor = '#28C840', hideCursorOnComplete = false }) => {
    const [displayedText, setDisplayedText] = useState('');
    const [showCursor, setShowCursor] = useState(false);
    const [isTypingComplete, setIsTypingComplete] = useState(false);

    useEffect(() => {
        // Initial delay before starting
        const startTimeout = setTimeout(() => {
            setShowCursor(true);
            let currentIndex = 0;

            const typingInterval = setInterval(() => {
                if (currentIndex <= text.length) {
                    setDisplayedText(text.slice(0, currentIndex));
                    currentIndex++;
                } else {
                    clearInterval(typingInterval);
                    setIsTypingComplete(true);
                }
            }, speed);

            return () => clearInterval(typingInterval);
        }, delay);

        return () => clearTimeout(startTimeout);
    }, [text, delay, speed]);

    const shouldShowCursor = showCursor && (!isTypingComplete || !hideCursorOnComplete);

    return (
        <span className={className} style={{ display: 'inline-block', ...style }}>
            {displayedText}
            {shouldShowCursor && (
                <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                    style={{
                        display: 'inline-block',
                        width: '0.6em',
                        height: '1em',
                        backgroundColor: cursorColor,
                        verticalAlign: 'text-bottom',
                        marginLeft: '2px'
                    }}
                />
            )}
        </span>
    );
};

export default TypewriterText;
