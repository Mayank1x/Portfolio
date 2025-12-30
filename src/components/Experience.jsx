import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Calendar, ExternalLink, Zap, Terminal, ChevronRight, X, Lock, Unlock, ArrowUpRight, Award, BadgeCheck } from 'lucide-react';

const experiences = [
    {
        id: "01",
        role: "Backend Developer Intern",
        company: "Edusaint",
        link: "https://erp.edusaint.in/",
        period: "Oct '25 – Dec '25",
        type: "INTERNSHIP",
        desc: "Engineered REST APIs for a school ERP using Flask. Optimized database queries with ORM and integrated backend logic with frontend interfaces for distinct modules. Gained hands-on experience in full-stack development cycles.",
        tech: ["Flask", "Python", "SQL/ORM", "REST API"],
        achievements: [
            "Designed and implemented scalable RESTful API endpoints for the ERP system.",
            "Reduced database query latency by optimizing ORM relationships and indexing.",
            "Collaborated closely with the frontend team to ensure seamless data integration.",
            "Participated in code reviews and debugging sessions for critical modules."
        ]
    },
    {
        id: "02",
        role: "Co-Lead, Design Team",
        company: "E-Cell VIT Bhopal",
        link: "https://www.ecellvitbhopal.in/",
        period: "Feb '24 – Aug '25",
        type: "LEADERSHIP",
        desc: "Spearheaded design operations. Established visual identity systems and led a cross-functional team to deliver high-fidelity assets under strict deadlines.",
        tech: ["UI/UX", "Visual Identity", "Leadership", "Figma"],
        achievements: [
            "Led a team of designers to create cohesive branding for major college events.",
            "Developed and maintained the organization's official Design System.",
            "Streamlined the design-to-development handover process.",
            "Mentored junior designers in UI/UX best practices and tools."
        ]
    }
];

const Experience = () => {
    const [activeId, setActiveId] = useState(experiences[0].id);
    const [modalOpen, setModalOpen] = useState(false);
    const activeExp = experiences.find(e => e.id === activeId);

    // Close modal on escape key
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') setModalOpen(false);
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, []);

    // Badge Styles
    const getBadgeStyle = (type) => {
        if (type === 'INTERNSHIP') return {
            background: 'rgba(0, 200, 255, 0.1)',
            border: '1px solid rgba(0, 200, 255, 0.3)',
            color: '#00c8ff',
            icon: <BadgeCheck size={12} />
        };
        return {
            background: 'rgba(255, 200, 0, 0.1)',
            border: '1px solid rgba(255, 200, 0, 0.3)',
            color: '#ffc800',
            icon: <Award size={12} />
        };
    };

    return (
        <section
            id="experience"
            style={{
                minHeight: '100vh',
                width: '100%',
                padding: '8rem 5%',
                background: '#0a0a0a',
                color: '#fff',
                position: 'relative',
                overflow: 'hidden',
                perspective: '1000px' // Kept for Z-axis effects, but no rotation
            }}
        >

            {/* Ambient Background Animation */}
            <motion.div
                animate={{
                    opacity: [0.3, 0.5, 0.3],
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                style={{
                    position: 'absolute',
                    top: '-20%', left: '10%', width: '60vw', height: '60vw',
                    background: 'radial-gradient(circle, rgba(50, 50, 100, 0.15) 0%, transparent 70%)',
                    filter: 'blur(80px)',
                    zIndex: 0,
                    pointerEvents: 'none'
                }}
            />
            <motion.div
                animate={{
                    opacity: [0.2, 0.4, 0.2],
                    scale: [1, 1.2, 1],
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear", delay: 2 }}
                style={{
                    position: 'absolute',
                    bottom: '-10%', right: '-10%', width: '50vw', height: '50vw',
                    background: 'radial-gradient(circle, rgba(100, 50, 100, 0.1) 0%, transparent 70%)',
                    filter: 'blur(80px)',
                    zIndex: 0,
                    pointerEvents: 'none'
                }}
            />

            {/* Grid Pattern - Static or Slow Drift */}
            <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                style={{
                    position: 'absolute',
                    top: '-10%', left: '-10%', width: '120%', height: '120%',
                    backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
                    backgroundSize: '30px 30px',
                    opacity: 0.5,
                    pointerEvents: 'none',
                    zIndex: 1,
                }}
            />

            <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 20 }}>

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{ marginBottom: '4rem', display: 'flex', alignItems: 'center', gap: '1rem' }}
                >
                    <Terminal size={40} strokeWidth={1.5} />
                    <div>
                        <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, letterSpacing: '-2px', margin: 0, lineHeight: 1, fontFamily: "'Inter', sans-serif" }}>
                            WORK EXPERIENCE
                        </h2>
                    </div>
                </motion.div>

                {/* Main Content Grid */}
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'minmax(250px, 1fr) 2fr',
                        gap: '4rem',
                        alignItems: 'start',
                    }}
                >

                    {/* LEFT PANEL: Navigation */}
                    <div className="nav-panel" style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                        {experiences.map((exp, index) => {
                            const isActive = activeId === exp.id;
                            const badgeStyle = getBadgeStyle(exp.type);

                            return (
                                <motion.div
                                    key={exp.id}
                                    className="cursor-target"
                                    onClick={() => setActiveId(exp.id)}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    animate={{
                                        backgroundColor: isActive ? 'rgba(255,255,255,0.08)' : 'transparent',
                                        borderColor: isActive ? 'rgba(255,255,255,0.5)' : '#333'
                                    }}
                                    style={{
                                        cursor: 'pointer',
                                        padding: '1.5rem',
                                        border: '1px solid transparent',
                                        borderRadius: '8px',
                                        position: 'relative',
                                        transition: 'background-color 0.3s',
                                        backdropFilter: isActive ? 'blur(10px)' : 'none'
                                    }}
                                    whileHover={{
                                        x: 10,
                                        backgroundColor: 'rgba(255,255,255,0.05)',
                                        boxShadow: '0 0 20px rgba(255,255,255,0.05)',
                                        borderColor: 'rgba(255,255,255,0.3)'
                                    }}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="active-nav-glow"
                                            style={{
                                                position: 'absolute', inset: 0, borderRadius: '8px',
                                                boxShadow: '0 0 20px rgba(255,255,255,0.1)',
                                                zIndex: -1
                                            }}
                                        />
                                    )}

                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
                                        <span style={{ fontSize: '0.75rem', fontFamily: "'Courier New', monospace", opacity: 0.5 }}>
                                            0{exp.id}
                                        </span>
                                        <span style={{
                                            fontSize: '0.7rem',
                                            ...badgeStyle,
                                            padding: '4px 10px',
                                            borderRadius: '100px',
                                            fontWeight: '600',
                                            letterSpacing: '0.5px',
                                            fontFamily: "'Inter', sans-serif",
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '4px'
                                        }}>
                                            {badgeStyle.icon}
                                            {exp.type}
                                        </span>
                                    </div>
                                    <h4 style={{ fontSize: '1.1rem', fontWeight: 'bold', margin: 0, fontFamily: "'Inter', sans-serif", color: isActive ? '#fff' : '#aaa' }}>
                                        {exp.company}
                                    </h4>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* RIGHT PANEL: Viewer with Levitation */}
                    <div className="viewer-panel" style={{ perspective: '1000px' }}>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeId}
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -10, scale: 0.95, transition: { duration: 0.2 } }}
                                transition={{ duration: 0.4 }}
                                style={{
                                    position: 'relative',
                                    height: '100%',
                                }}
                            >
                                {/* WHITE GLOW - High Visibility */}
                                <motion.div
                                    animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.1, 1] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                    style={{
                                        position: 'absolute',
                                        inset: '-60px', // Massive spill for visibility
                                        zIndex: 0,
                                        borderRadius: '40px',
                                        background: 'radial-gradient(circle, rgba(255, 255, 255, 0.5) 0%, transparent 60%)', // Pure White Glow
                                        filter: 'blur(50px)',
                                    }}
                                />

                                {/* Glass Surface - Child Layer */}
                                <div style={{
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    background: 'rgba(10,10,10,0.95)', // Solid dark backing to pop against the glow
                                    backdropFilter: 'blur(20px)',
                                    borderRadius: '16px',
                                    padding: '3.5rem',
                                    position: 'relative',
                                    zIndex: 1,
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
                                }}>

                                    {/* LEVITATION ANIMATION WRAPPER */}
                                    <motion.div
                                        animate={{ y: [0, -8, 0] }}
                                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                        style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                                    >
                                        {/* Active Badge (Top Right) */}
                                        <div style={{
                                            position: 'absolute', top: '2rem', right: '2rem',
                                            display: 'flex', alignItems: 'center', gap: '6px',
                                            fontSize: '0.8rem', color: '#666', fontFamily: "'Courier New', monospace"
                                        }}>
                                            <div style={{ width: 6, height: 6, background: '#0f0', borderRadius: '50%', boxShadow: '0 0 8px #0f0' }} />
                                            ACTIVE_SESSION
                                        </div>

                                        {/* Header Area */}
                                        <div style={{ marginBottom: '2.5rem' }}>
                                            <h3 style={{ fontSize: '2.8rem', fontWeight: 800, margin: '0 0 0.5rem 0', fontFamily: "'Inter', sans-serif", letterSpacing: '-1px' }}>{activeExp.role}</h3>

                                            <a
                                                href={activeExp.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="cursor-target"
                                                style={{
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    gap: '0.5rem',
                                                    textDecoration: 'none',
                                                    cursor: 'none'
                                                }}
                                            >
                                                <span style={{ fontSize: '1.2rem', color: '#aaa', fontFamily: "'Inter', sans-serif" }}>@ {activeExp.company}</span>
                                                <ArrowUpRight size={18} color="#fff" />
                                            </a>

                                            <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                <span style={{
                                                    background: 'rgba(255,255,255,0.1)',
                                                    padding: '6px 12px',
                                                    borderRadius: '6px',
                                                    fontSize: '0.9rem',
                                                    fontFamily: "'Courier New', monospace",
                                                    color: '#ddd'
                                                }}>
                                                    {activeExp.period}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Body Content */}
                                        <div style={{ flex: 1 }}>
                                            <p style={{
                                                fontSize: '1.1rem',
                                                lineHeight: '1.8',
                                                color: '#ccc',
                                                marginBottom: '3rem',
                                                maxWidth: '92%',
                                                fontFamily: "'Inter', sans-serif",
                                            }}>
                                                {activeExp.desc}
                                            </p>

                                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem', marginBottom: '4rem' }}>
                                                {activeExp.tech.map((t, i) => (
                                                    <motion.div
                                                        key={i}
                                                        whileHover={{ y: -5, backgroundColor: 'rgba(255,255,255,0.1)' }}
                                                        style={{
                                                            padding: '0.5rem 1rem',
                                                            border: '1px solid rgba(255,255,255,0.15)',
                                                            borderRadius: '8px',
                                                            color: '#ddd',
                                                            fontSize: '0.85rem',
                                                            background: 'transparent',
                                                            fontFamily: "'Inter', sans-serif",
                                                            cursor: 'default'
                                                        }}
                                                    >
                                                        {t}
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Footer Action */}
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem' }}>
                                            <motion.button
                                                onClick={() => setModalOpen(true)}
                                                className="cursor-target"
                                                whileHover={{ x: 5, color: '#fff' }}
                                                style={{
                                                    background: 'transparent',
                                                    border: 'none',
                                                    color: '#aaa',
                                                    padding: 0,
                                                    fontFamily: "'Inter', sans-serif",
                                                    fontSize: '0.95rem',
                                                    fontWeight: 600,
                                                    cursor: 'pointer',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '0.8rem',
                                                    outline: 'none',
                                                    transition: 'color 0.2s'
                                                }}
                                            >
                                                View Full Report
                                                <div style={{ background: '#fff', color: '#000', borderRadius: '50%', padding: '4px', display: 'flex' }}>
                                                    <ChevronRight size={14} />
                                                </div>
                                            </motion.button>
                                        </div>

                                    </motion.div> {/* End Levitation Wrapper */}
                                </div> {/* End Glass Surface */}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* MODAL OVERLAY */}
            <AnimatePresence>
                {modalOpen && activeExp && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setModalOpen(false)}
                        style={{
                            position: 'fixed',
                            top: 0, left: 0, right: 0, bottom: 0,
                            background: 'rgba(0,0,0,0.85)',
                            backdropFilter: 'blur(15px)',
                            zIndex: 1000,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '2rem'
                        }}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            style={{
                                width: '100%',
                                maxWidth: '800px',
                                background: '#0a0a0a',
                                border: '1px solid #222',
                                borderRadius: '16px',
                                overflow: 'hidden',
                                boxShadow: '0 40px 80px rgba(0,0,0,0.8)'
                            }}
                        >
                            {/* Modal Header */}
                            <div style={{
                                padding: '1.5rem 2rem',
                                borderBottom: '1px solid #222',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                background: '#111'
                            }}>
                                <div style={{ fontWeight: '600', fontSize: '1rem', fontFamily: "'Inter', sans-serif", color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Briefcase size={16} color="#666" />
                                    Detailed Experience Report
                                </div>
                                <motion.button
                                    onClick={() => setModalOpen(false)}
                                    whileHover={{ scale: 1.1, rotate: 90 }}
                                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#666' }}
                                >
                                    <X size={20} />
                                </motion.button>
                            </div>

                            {/* Modal Body */}
                            <div style={{ padding: '3rem', maxHeight: '70vh', overflowY: 'auto' }}>
                                <div style={{ marginBottom: '2rem' }}>
                                    <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.5rem', fontFamily: "'Courier New', monospace" }}>ROLE</div>
                                    <h2 style={{ fontSize: '2rem', margin: 0, color: '#fff', fontFamily: "'Inter', sans-serif", fontWeight: 700 }}>{activeExp.role}</h2>
                                </div>

                                <div style={{ marginBottom: '3rem' }}>
                                    <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.5rem', fontFamily: "'Courier New', monospace" }}>KEY ACHIEVEMENTS</div>
                                    <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                        {activeExp.achievements?.map((item, idx) => (
                                            <li key={idx} style={{ display: 'flex', gap: '1rem', fontSize: '1.05rem', lineHeight: '1.6', color: '#ccc', fontFamily: "'Inter', sans-serif" }}>
                                                <div style={{ minWidth: '6px', height: '6px', marginTop: '10px', background: '#333', borderRadius: '50%' }} />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
                @media (max-width: 768px) {
                    div[style*="gridTemplateColumns"] {
                        grid-template-columns: 1fr !important;
                    }
                    .nav-panel {
                        flex-direction: row !important;
                        overflow-x: auto;
                        padding-bottom: 1rem;
                    }
                }
            `}</style>
        </section >
    );
};

export default Experience;
