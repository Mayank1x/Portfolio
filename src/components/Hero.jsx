import { motion } from 'framer-motion';
import Terminal from './Terminal';
import InteractiveBackground from './InteractiveBackground';
import GlitchText from './GlitchText';
import HackerText from './HackerText';
import { ArrowDown } from 'lucide-react';

const Hero = () => {
    return (
        <section style={{
            height: '100vh',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Background Layer */}
            <InteractiveBackground />

            {/* Left Content with Readability Vignette */}
            <div
                style={{
                    flex: 1,
                    position: 'relative',
                    zIndex: 1,
                    pointerEvents: 'none',
                    userSelect: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    paddingLeft: '5%',
                    // Vignette Mask to fade out grid behind text for readability
                    background: 'radial-gradient(circle at left center, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 40%, transparent 80%)',
                    height: '100%'
                }}
                // Track mouse relative to this container for the lens effect
                onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    e.currentTarget.style.setProperty('--x', `${x}px`);
                    e.currentTarget.style.setProperty('--y', `${y}px`);
                }}
            >
                <style>
                    {`
                        .spotlight-container {
                            position: relative;
                            display: inline-block;
                        }
                        .spotlight-layer {
                            position: absolute;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 100%;
                            pointer-events: none;
                            /* Soft Gradient Mask for Realistic Flashlight */
                            mask-image: radial-gradient(circle 180px at var(--x, 50%) var(--y, 50%), black 10%, transparent 70%);
                            -webkit-mask-image: radial-gradient(circle 180px at var(--x, 50%) var(--y, 50%), black 10%, transparent 70%);
                            z-index: 10;
                        }
                    `}
                </style>
                <div style={{ pointerEvents: 'auto' }} className="spotlight-container">
                    {/* LAYER 1: Dimmed Base Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        {/* Much darker base color for contrast */}
                        <h2 style={{
                            fontSize: '1.2rem',
                            marginBottom: '1.5rem',
                            color: 'var(--spotlight-desc)',
                            letterSpacing: '3px',
                            fontWeight: 600,
                            fontFamily: "'Inter', sans-serif" // Clean sans-serif
                        }}>
                            JAVA // REACT // DEVELOPER
                        </h2>
                        <h1 style={{
                            fontSize: '5.5rem',
                            lineHeight: 0.95,
                            marginBottom: '2rem',
                            fontWeight: 800,
                            color: 'var(--spotlight-text-base)', // Almost blended with background
                            fontFamily: "'Inter', sans-serif",
                            letterSpacing: '-2px'
                        }}>
                            CRAFTING <br />
                            DIGITAL <br />
                            EXPERIENCES
                        </h1>
                        <p style={{
                            fontSize: '1.2rem',
                            maxWidth: '500px',
                            color: 'var(--spotlight-desc)',
                            lineHeight: 1.6,
                            fontFamily: "'Inter', sans-serif"
                        }}>
                            Specialize in high-performance backends and immersive frontends.
                        </p>
                    </motion.div>

                    {/* LAYER 2: Illuminated Content (Revealed by Cursor) */}
                    <div className="spotlight-layer" aria-hidden="true">
                        <h2 style={{
                            fontSize: '1.2rem',
                            marginBottom: '1.5rem',
                            color: 'var(--spotlight-text-reveal)',
                            letterSpacing: '3px',
                            fontWeight: 600,
                            fontFamily: "'Inter', sans-serif"
                        }}>
                            JAVA // REACT // DEVELOPER
                        </h2>
                        <h1 style={{
                            fontSize: '5.5rem',
                            lineHeight: 0.95,
                            marginBottom: '2rem',
                            fontWeight: 800,
                            color: 'var(--spotlight-text-reveal)',
                            fontFamily: "'Inter', sans-serif",
                            letterSpacing: '-2px'
                        }}>
                            CRAFTING <br />
                            DIGITAL <br />
                            EXPERIENCES
                        </h1>
                        <p style={{
                            fontSize: '1.2rem',
                            maxWidth: '500px',
                            color: 'var(--spotlight-desc-reveal)',
                            lineHeight: 1.6,
                            fontFamily: "'Inter', sans-serif"
                        }}>
                            Specialize in high-performance backends and immersive frontends.
                        </p>
                    </div>
                </div>
            </div>


            {/* Terminal Layer (Right Side) */}
            <div style={{
                position: 'absolute',
                top: '50%',
                right: '5%',
                transform: 'translateY(-50%)',
                zIndex: 2,
                width: '45%',
                maxWidth: '600px',
                pointerEvents: 'none' // Let clicks pass through container to Terminal's drag area
            }}>
                <div style={{ pointerEvents: 'auto' }}>
                    <Terminal />
                </div>
            </div>

            {/* Scroll Indicator: Minimal Mouse Animation */}
            <motion.div
                style={{
                    position: 'absolute',
                    bottom: '50px',
                    left: '50%',
                    x: '-50%', // Correct Framer Motion syntax for centering
                    zIndex: 10,
                    opacity: 0.5
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
            >
                <div style={{
                    width: '24px',
                    height: '40px',
                    border: '2px solid rgba(255, 255, 255, 0.4)',
                    borderRadius: '20px',
                    display: 'flex',
                    justifyContent: 'center',
                    paddingTop: '8px'
                }}>
                    <motion.div
                        style={{
                            width: '4px',
                            height: '4px',
                            backgroundColor: '#fff',
                            borderRadius: '50%'
                        }}
                        animate={{
                            y: [0, 12, 0],
                            opacity: [1, 0, 0] // Fade out as it moves down
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                </div>
            </motion.div>
        </section >
    );
};

export default Hero;
