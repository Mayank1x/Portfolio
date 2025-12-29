import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const GlitchText = ({ text, style }) => {
    // Only glitch occasionally
    const [isGlitching, setIsGlitching] = useState(false);

    useEffect(() => {
        const triggerGlitch = () => {
            if (Math.random() > 0.7) { // 30% chance to glitch per interval
                setIsGlitching(true);
                setTimeout(() => setIsGlitching(false), 200); // Short glitch duration
            }
        };

        const interval = setInterval(triggerGlitch, 3000); // Check every 3 seconds
        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{ position: 'relative', display: 'inline-block', ...style }}>
            {/* Base Text */}
            <span style={{ position: 'relative', zIndex: 1 }}>{text}</span>

            {/* Glitch Layer 1 (Red Shift) */}
            {isGlitching && (
                <span style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    zIndex: 0,
                    opacity: 0.8,
                    color: 'red',
                    transform: 'translate(-2px, 2px)',
                    clipPath: 'inset(10% 0 60% 0)'
                }}>
                    {text}
                </span>
            )}

            {/* Glitch Layer 2 (Blue Shift) */}
            {isGlitching && (
                <span style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    zIndex: 0,
                    opacity: 0.8,
                    color: 'cyan',
                    transform: 'translate(2px, -2px)',
                    clipPath: 'inset(60% 0 10% 0)'
                }}>
                    {text}
                </span>
            )}
        </div>
    );
};

export default GlitchText;
