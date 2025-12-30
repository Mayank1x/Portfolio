import { motion } from 'framer-motion';
import TechMarquee from './TechMarquee';
import Globe3D from './Globe3D';
import MagneticButton from './MagneticButton';
import { Mail, MapPin, Zap, Crown, Award, Figma, Trophy } from 'lucide-react';

const Card = ({ children, className, style, delay = 0 }) => (
    <motion.div
        className={`${className} cursor-target`} // Applied target cursor globally to cards
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.6 }}
        style={{
            background: 'linear-gradient(145deg, rgba(15,15,15,0.95) 0%, rgba(5,5,5,0.98) 100%)', // Darker, cleaner gradient
            border: '1px solid rgba(255,255,255,0.08)', // Slightly more visible border
            borderRadius: '24px',
            padding: '2.5rem 2rem', // Increased top/bottom padding
            position: 'relative',
            overflow: 'hidden',
            backdropFilter: 'blur(20px)', // Enhanced blur
            boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
            ...style
        }}
        whileHover={{
            borderColor: '#3b82f6', // Blue border on hover
            boxShadow: '0 20px 50px -10px rgba(59, 130, 246, 0.15)', // Blue shadow
            translateY: -5,
            transition: { duration: 0.2 } // Instant feedback, no 0.6s delay
        }}
    >
        {children}
    </motion.div>
);

import { useRef } from 'react';

const About = () => {
    const globeRef = useRef();

    const handleLocationClick = () => {
        if (globeRef.current) {
            globeRef.current.focusOn([20, 78]); // Focus on India
        }
    };

    return (
        <section id="about" style={{
            minHeight: '100vh',
            padding: '8rem 5%',
            background: 'var(--bg-primary)',
            color: 'var(--text-primary)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            position: 'relative'
        }}>
            {/* Background Gradient Spot */}
            <div style={{
                position: 'absolute',
                top: '20%',
                right: '10%',
                width: '500px',
                height: '500px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(40, 200, 64, 0.05) 0%, transparent 70%)',
                zIndex: 0,
                pointerEvents: 'none'
            }} />

            <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    style={{ marginBottom: '4rem' }}
                >
                    <span style={{
                        fontFamily: "'mononoki', monospace",
                        color: '#3b82f6', // Bright Blue
                        display: 'block',
                        marginBottom: '1rem',
                        letterSpacing: '2px'
                    }}>// EXPLORE MY WORLD</span>
                    <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, lineHeight: 1.1 }}>
                        Architecting <br /> <span style={{ color: 'var(--text-secondary)' }}>Digital Ecosystems.</span>
                    </h2>
                </motion.div>

                {/* BENTO GRID */}
                <div className="bento-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(12, 1fr)',
                    gridAutoRows: 'minmax(200px, auto)',
                    gap: '1.5rem',
                }}>

                    {/* 1. BIO CARD (Large, spans 8 cols) */}
                    <Card style={{ gridColumn: 'span 8', gridRow: 'span 2', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem' }}>
                                <div style={{
                                    width: '80px',
                                    height: '80px',
                                    borderRadius: '20px',
                                    background: 'linear-gradient(145deg, rgba(30,30,30,1), rgba(10,10,10,1))',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginRight: '1.5rem',
                                    boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}>
                                    {/* Placeholder visual */}
                                    <div style={{
                                        width: '100%',
                                        height: '100%',
                                        background: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.1), transparent 70%)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.3)', textAlign: 'center' }}>Photo<br />Here</span>
                                    </div>
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '1.8rem', margin: 0, fontWeight: 700 }}>Mayank Rathore</h3>
                                    <span style={{
                                        color: 'rgba(255,255,255,0.5)',
                                        fontSize: '0.95rem',
                                        letterSpacing: '1px',
                                        fontFamily: "'mononoki', monospace"
                                    }}>CS Student</span>
                                </div>            </div>

                            <p style={{ fontSize: '1.15rem', lineHeight: '1.9', color: '#ccc', maxWidth: '98%', letterSpacing: '0.02em' }}>
                                I’m a computer science student interested in how software systems are designed, structured, and maintained over time. I enjoy working close to the fundamentals, understanding how data flows through applications and how design decisions impact scalability and reliability.
                                <br /><br />
                                I approach development with a focus on clarity and correctness, preferring simple, well structured solutions that are easy to reason about and evolve.
                                <br /><br />
                                Currently focused on strengthening my understanding of backend systems, data handling, and applied computer science fundamentals.
                            </p>
                        </div>
                        <div style={{ marginTop: '2.5rem', display: 'flex', gap: '1rem' }}>
                            <MagneticButton href="#contact" strength={0.2} style={{
                                background: 'transparent',
                                color: '#fff',
                                border: '1px solid rgba(59, 130, 246, 0.5)',
                                padding: '1rem 3rem',
                                borderRadius: '50px',
                                fontWeight: '600',
                                letterSpacing: '2px',
                                boxShadow: '0 0 20px rgba(59, 130, 246, 0.1)',
                                textDecoration: 'none',
                                fontSize: '0.9rem',
                                textTransform: 'uppercase',
                                backdropFilter: 'blur(5px)'
                            }}>
                                Explore My Work
                            </MagneticButton>
                        </div>
                    </Card>

                    {/* 2. GLOBE / LOCATION (Square, spans 4 cols) */}
                    <Card delay={0.2} style={{ gridColumn: 'span 4', gridRow: 'span 2', background: '#050505', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '300px' }}>
                        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Globe3D ref={globeRef} phase={5.9} />
                        </div>
                        <div
                            onClick={handleLocationClick}
                            className="cursor-target" // Enable Target Cursor
                            style={{
                                position: 'absolute',
                                bottom: '20px',
                                left: '20px',
                                background: 'rgba(0,0,0,0.6)',
                                backdropFilter: 'blur(5px)',
                                padding: '0.5rem 1rem',
                                borderRadius: '50px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                border: '1px solid rgba(255,255,255,0.1)',
                                cursor: 'pointer',
                                zIndex: 10
                            }}>
                            <MapPin size={16} color="#3b82f6" />
                            <span style={{ fontFamily: "'mononoki', monospace", fontSize: '0.9rem', color: '#fff', letterSpacing: '1px' }}>India (Remote)</span>
                        </div>
                    </Card>

                    {/* 3. EXPERIENCE / LEADERSHIP (Spans 6 cols) */}
                    <Card delay={0.3} style={{
                        gridColumn: 'span 6',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        background: 'linear-gradient(145deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.01) 100%)', // Faded / Ghost style
                        border: '1px solid rgba(255,255,255,0.05)'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem', color: '#ffbd2e', opacity: 0.8 }}>
                            <Crown size={20} />
                            <span style={{ fontFamily: "'mononoki', monospace", letterSpacing: '1px' }}>LEADERSHIP</span>
                        </div>
                        <h4 style={{ fontSize: '1.3rem', marginBottom: '0.8rem' }}>Co-Lead, Design Team @ E-Cell</h4>
                        <p style={{ color: '#888', fontSize: '0.95rem', lineHeight: '1.6' }}>
                            Co-led design systems and workflows, ensuring consistency across multi-team deliverables.
                        </p>
                    </Card>

                    {/* 4. ACHIEVEMENTS (Spans 6 cols) */}
                    <Card delay={0.35} style={{ gridColumn: 'span 6', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem', color: '#ffbd2e' }}>
                            <Trophy size={20} />
                            <span style={{ fontFamily: "'mononoki', monospace", letterSpacing: '1px' }}>ACHIEVEMENTS</span>
                        </div>

                        <div style={{ marginBottom: '1.2rem' }}>
                            <h4 style={{ fontSize: '1.1rem', marginBottom: '0.2rem', color: '#fff' }}>Reliance Foundation Undergraduate Scholar</h4>
                            <p style={{ color: '#aaa', fontSize: '0.9rem' }}>
                                Reliance Foundation Undergraduate Scholarship (2023).
                            </p>
                        </div>

                        <div>
                            <h4 style={{ fontSize: '1.1rem', marginBottom: '0.2rem', color: '#fff' }}>State Rank Holder</h4>
                            <p style={{ color: '#aaa', fontSize: '0.9rem' }}>
                                Roll Ball State Level – National School Games (SGFI).
                            </p>
                        </div>
                    </Card>

                    {/* 5. TECH MARQUEE (Wide, spans 8 cols) */}
                    <Card delay={0.4} style={{ gridColumn: 'span 12', display: 'flex', alignItems: 'center', padding: '0', minHeight: '120px' }}>
                        <div style={{
                            position: 'absolute',
                            left: '30px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            zIndex: 10,
                            background: 'rgba(0,0,0,0.4)', // Darker, cleaner
                            color: '#3b82f6', // Blue Text
                            border: '1px solid rgba(59, 130, 246, 0.3)', // Subtle Blue Border
                            padding: '0.4rem 1rem',
                            borderRadius: '50px',
                            fontWeight: '600',
                            fontSize: '0.8rem',
                            backdropFilter: 'blur(4px)',
                            letterSpacing: '1px'
                        }}>
                            TECH STACK
                        </div>
                        <TechMarquee />
                    </Card>

                </div>

                {/* Mobile Responsive Adjustment Styles */}
                <style>{`
                    @media (max-width: 1024px) {
                        .bento-grid > div { grid-column: span 6 !important; }
                        div[style*="gridColumn: 'span 12'"] { grid-column: span 12 !important; }
                    }
                    @media (max-width: 768px) {
                        .bento-grid { display: flex !important; flexDirection: column; }
                        .bento-grid > div { width: 100%; margin-bottom: 1rem; }
                    }
                `}</style>
            </div >
        </section >
    );
};

export default About;
