import { motion } from 'framer-motion';
import Terminal from './Terminal';
import InteractiveBackground from './InteractiveBackground';
import GlitchText from './GlitchText';
import HackerText from './HackerText';
import TypewriterText from './TypewriterText';
import { ArrowDown, Download } from 'lucide-react';
import MagneticButton from './MagneticButton';

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
            >
                <div style={{ pointerEvents: 'auto' }}>
                    {/* LAYER 1: Base Content (Bright & Visible by Default) */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 style={{
                            fontSize: '1.2rem',
                            marginBottom: '1rem',
                            color: '#28C840', // Bright Green
                            letterSpacing: '2px',
                            fontWeight: 600,
                            fontFamily: "'Courier New', monospace"
                        }}>
                            $ whoami
                        </h2>
                        <h1 style={{
                            fontSize: '6rem',
                            lineHeight: 1,
                            marginBottom: '1rem',
                            fontWeight: 800,
                            fontFamily: "'Inter', sans-serif",
                            letterSpacing: '-3px',
                            background: 'linear-gradient(180deg, #FFFFFF 0%, #E0E0E0 100%)', // Bright
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            filter: 'drop-shadow(0 0 25px rgba(255,255,255,0.15))', // Enhanced Glow
                            display: 'flex', // Enable flex for typewriter alignment
                            flexDirection: 'column'
                        }}>
                            <TypewriterText
                                text="MAYANK"
                                speed={80}
                                delay={500}
                                cursorColor="#ffffff"
                                hideCursorOnComplete={true}
                                style={{ WebkitTextFillColor: '#fff' }}
                            />
                            <TypewriterText
                                text="RATHORE"
                                speed={80}
                                delay={1200}
                                cursorColor="#ffffff"
                                hideCursorOnComplete={true}
                                style={{ WebkitTextFillColor: '#fff' }}
                            />
                        </h1>
                        <h3 style={{
                            fontSize: '2rem',
                            marginBottom: '2rem',
                            color: '#ccc', // Bright Grey
                            fontWeight: 300,
                            letterSpacing: '4px',
                            textTransform: 'uppercase',
                            fontFamily: "'Inter', sans-serif",
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem'
                        }}>
                            <span style={{ width: '30px', height: '1px', background: '#888' }} />
                            <TypewriterText
                                text="Full Stack Developer"
                                speed={40}
                                delay={2000} // Starts after Name roughly finishes
                                cursorColor="#28C840"
                            />
                        </h3>
                        <p style={{
                            fontSize: '1.1rem',
                            maxWidth: '500px',
                            color: '#bbb',
                            marginBottom: '2.5rem',
                            lineHeight: '1.6',
                            fontFamily: "'Inter', sans-serif",
                            fontWeight: 400
                        }}>
                            Turning ideas into scalable, production-ready web applications. <br />
                            Specialized in high-performance backends.
                        </p>

                        <MagneticButton
                            href="/Mayank_Rathore_Resume_December.pdf"
                            download="Mayank_Rathore_Resume.pdf"
                            strength={0.5}
                            style={{
                                marginTop: '2rem',
                                padding: '0.8rem 1.5rem',
                                border: '1px solid rgba(255,255,255,0.3)',
                                background: 'rgba(255,255,255,0.05)',
                                color: '#fff',
                                fontFamily: "'Courier New', monospace",
                                fontSize: '1rem',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                width: 'fit-content', // Limit width for magnetic effect to work well
                                textDecoration: 'none'
                            }}
                            whileHover={{
                                backgroundColor: '#ffffff',
                                color: '#000000',
                                borderColor: '#ffffff',
                                scale: 1.05
                            }}
                        >
                            <Download size={18} />
                            DOWNLOAD RESUME
                        </MagneticButton>
                    </motion.div>
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
        </section>
    );
};

export default Hero;
