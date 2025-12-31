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
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            {/* Background Layer */}
            <InteractiveBackground />

            {/* Main Content Container */}
            <div style={{
                display: 'flex',
                width: '100%',
                maxWidth: '1400px',
                padding: '0 5%',
                alignItems: 'center',
                justifyContent: 'space-between',
                zIndex: 2,
                height: '100%',
                marginTop: '40px' // Offset for Navbar
            }}>
                {/* Left Content */}
                <div
                    style={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        // Vignette Mask to fade out grid behind text for readability
                        // Moved to a wrapping div for better layering if needed, or kept here.
                        // Removing background gradient from here as it might separate the sections weirdly in grid.
                        // Text shadow is sufficient.
                    }}
                >
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 style={{
                            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
                            marginBottom: '1rem',
                            color: '#28C840',
                            letterSpacing: '2px',
                            fontWeight: 600,
                            fontFamily: "'Courier New', monospace"
                        }}>
                            $ whoami
                        </h2>
                        <h1 style={{
                            fontSize: 'clamp(3.5rem, 6vw, 6rem)', // Responsive Clamp
                            lineHeight: 1,
                            marginBottom: '1rem',
                            fontWeight: 800,
                            fontFamily: "'Inter', sans-serif",
                            letterSpacing: '-3px',
                            background: 'linear-gradient(180deg, #FFFFFF 0%, #E0E0E0 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            filter: 'drop-shadow(0 0 25px rgba(255,255,255,0.15))',
                            display: 'flex',
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
                            fontSize: 'clamp(1.2rem, 3vw, 2rem)', // Responsive Clamp
                            marginBottom: '2rem',
                            color: '#ccc',
                            fontWeight: 300,
                            letterSpacing: '4px',
                            textTransform: 'uppercase',
                            fontFamily: "'Inter', sans-serif",
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                            whiteSpace: 'nowrap'
                        }}>
                            <span style={{ width: '30px', height: '1px', background: '#888' }} />
                            <TypewriterText
                                text="Full Stack Developer"
                                speed={40}
                                delay={2000}
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
                                width: 'fit-content',
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

                {/* Terminal Layer (Right Side) - standard flex item now */}
                <div style={{
                    flex: 1,
                    display: 'flex',
                    justifyContent: 'center', // Centers terminal in its half
                    alignItems: 'center',
                    maxWidth: '600px', // Max constraint
                    width: '100%',
                    // On smaller screens, allow it to shrink
                }}>
                    <Terminal />
                </div>
            </div>

            {/* Scroll Indicator: Minimal Mouse Animation */}
            <motion.div
                style={{
                    position: 'absolute',
                    bottom: '50px',
                    left: '50%',
                    x: '-50%',
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
