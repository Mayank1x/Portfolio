import { useEffect, useState } from 'react';
import { motion, useMotionValue } from 'framer-motion';

const CustomCursor = () => {
    // Use MotionValues for lag-free updates (bypasses React render cycle)
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const updateMousePosition = (e) => {
            // Update the MotionValues directly
            cursorX.set(e.clientX - 6);
            cursorY.set(e.clientY - 6);
        };

        const handleMouseOver = (e) => {
            const tag = e.target.tagName;
            if (['A', 'BUTTON', 'INPUT', 'TEXTAREA', 'H1', 'H2', 'SPAN', 'P'].includes(tag) || e.target.style.cursor === 'pointer') {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', updateMousePosition);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, []);

    return (
        <>
            <style>{`
        body { cursor: none; }
        a, button, input { cursor: none; }
      `}</style>
            <motion.div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '12px',
                    height: '12px',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    zIndex: 9999,
                    mixBlendMode: 'normal',
                    boxShadow: '0 0 15px 2px rgba(255, 255, 255, 0.5)',
                    x: cursorX, // Bind directly to MotionValue
                    y: cursorY,
                }}
                animate={{
                    scale: isHovering ? 1.5 : 1,
                    opacity: isHovering ? 0.8 : 1
                }}
                transition={{
                    // Separate transitions: Instant position, springy scale
                    scale: { type: 'spring', stiffness: 800, damping: 35 },
                    opacity: { duration: 0.2 },
                    default: { duration: 0 } // IMPORTANT: Position updates are instant (0 duration)
                }}
            />
        </>
    );
};

export default CustomCursor;
