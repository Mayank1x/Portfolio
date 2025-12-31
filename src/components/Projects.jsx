import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, ChevronLeft, ChevronRight, X, Info } from 'lucide-react';

const projects = [
    {
        id: "01",
        title: "DENTAL_VISION",
        subtitle: "AI DIAGNOSTICS",
        desc: "Deep learning–based system for detecting and classifying dental diseases from Panaromic X-ray images using YOLOv8, with a Flask interface for real-time inference.",
        tech: ["PYTHON", "YOLOv8", "FLASK", "CV"],
        status: "PUBLISHED",
        github: "https://github.com/Mayank1x/Dental-Disease-Detection-Classification-using-YOLO",
        live: "#",
        type: "AI / VISION",
        color: "#06b6d4", // Cyan
        img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop" // Optimized size
    },
    {
        id: "02",
        title: "AI Document Summarizer",
        subtitle: "RAG & RETRIEVAL",
        desc: "AI-powered document platform that performs automated summarization and conversational querying over PDFs and scanned documents using RAG, FAISS, and OCR.",
        tech: ["RAG", "FAISS", "OCR", "FLASK"],
        status: "ONLINE",
        github: "https://github.com/Mayank1x/AI-Document-Summarizer-And-Retrieval-System",
        live: "#",
        type: "AI / NLP",
        color: "#f59e0b", // Amber
        img: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: "03",
        title: "Personal Portfolio",
        subtitle: "THREE.JS INTERFACE",
        desc: "Personal portfolio website highlighting projects, skills, and professional experience. Acts as an online resume and project showcase with 3D elements.",
        tech: ["REACT", "THREE.JS", "FRAMER", "VITE"],
        status: "LIVE",
        github: "https://github.com/Mayank1x/Portfolio",
        live: "#",
        type: "FRONTEND",
        color: "#10b981", // Emerald
        img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: "04",
        title: "Password Vault",
        subtitle: "SECURE STORAGE",
        desc: "A secure password manager built with Next.js, MongoDB, and NextAuth, featuring client-side AES encryption and Google Authenticator–based 2FA.",
        tech: ["NEXT.JS", "MONGO", "AES", "AUTH"],
        status: "BETA",
        github: "https://github.com/Mayank1x/Password-Vault",
        live: "#",
        type: "SECURITY",
        color: "#8b5cf6", // Violet
        img: "https://images.unsplash.com/photo-1558494949-ef526b0042a0?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: "05",
        title: "Multiple Disease Prediction",
        subtitle: "ML HEALTHCARE",
        desc: "Machine learning web application for predicting multiple diseases using ensemble classification models, optimized with feature scaling and dimensionality reduction.",
        tech: ["PYTHON", "SKLEARN", "FLASK", "ML"],
        status: "PROTOTYPE",
        github: "https://github.com/Mayank1x/Multiple-Disease-Prediction",
        live: "#",
        type: "AI / HEALTH",
        color: "#f43f5e", // Rose
        img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop"
    }
];

const ProjectModal = ({ project, onClose }) => {
    if (!project) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
                position: 'fixed', inset: 0, zIndex: 100,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)',
                padding: '2rem'
            }}
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                style={{
                    width: '100%', maxWidth: '800px',
                    background: '#0a0a0a',
                    border: `1px solid ${project.color}`,
                    borderRadius: '16px',
                    overflow: 'hidden',
                    position: 'relative',
                    boxShadow: `0 0 50px ${project.color}20`
                }}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute', top: '20px', right: '20px',
                        background: 'rgba(255,255,255,0.1)', border: 'none',
                        color: '#fff', padding: '8px', borderRadius: '50%',
                        cursor: 'pointer', zIndex: 10
                    }}
                >
                    <X size={20} />
                </button>

                <div style={{ display: 'flex', flexDirection: 'column', md: { flexDirection: 'row' } }}>
                    {/* Image Header */}
                    <div style={{
                        height: '250px',
                        background: `url(${project.img}) center/cover`,
                        position: 'relative',
                        borderBottom: '1px solid rgba(255,255,255,0.1)'
                    }}>
                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #0a0a0a, transparent)' }} />
                        <div style={{ position: 'absolute', bottom: '20px', left: '30px' }}>
                            <span style={{ color: project.color, fontFamily: 'monospace', fontWeight: 'bold' }}>
                                ID_{project.id} // {project.type}
                            </span>
                            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#fff', margin: 0, lineHeight: 1 }}>
                                {project.title}
                            </h2>
                        </div>
                    </div>

                    {/* Content */}
                    <div style={{ padding: '2rem 30px' }}>
                        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                            {project.tech.map((t, i) => (
                                <span key={i} style={{
                                    padding: '4px 12px', background: `${project.color}15`,
                                    border: `1px solid ${project.color}40`,
                                    color: project.color, borderRadius: '4px',
                                    fontSize: '0.8rem', fontWeight: 600, fontFamily: 'monospace'
                                }}>
                                    {t}
                                </span>
                            ))}
                        </div>

                        <h3 style={{ color: '#fff', marginBottom: '0.5rem', fontSize: '1.1rem' }}>Project Overview</h3>
                        <p style={{ color: '#ccc', lineHeight: '1.6', fontSize: '1rem', marginBottom: '2rem' }}>
                            {project.desc}
                        </p>

                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <a href={project.github} target="_blank" rel="noreferrer" style={{
                                flex: 1, padding: '12px', background: '#fff', color: '#000',
                                textAlign: 'center', borderRadius: '8px', fontWeight: 'bold',
                                textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
                            }}>
                                <Github size={18} /> View Code
                            </a>
                            <a href={project.live} target="_blank" rel="noreferrer" style={{
                                flex: 1, padding: '12px', background: `${project.color}20`,
                                border: `1px solid ${project.color}`, color: project.color,
                                textAlign: 'center', borderRadius: '8px', fontWeight: 'bold',
                                textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
                            }}>
                                <ExternalLink size={18} /> Live Demo
                            </a>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

const ProjectCard = ({ project, isActive, onClick, onOpenDetails }) => {
    return (
        <div
            onClick={onClick}
            style={{
                width: '100%', height: '100%',
                position: 'relative',
                background: isActive ? 'rgba(10, 10, 15, 0.95)' : 'rgba(5, 5, 8, 0.85)',
                border: `1px solid ${isActive ? project.color : 'rgba(255,255,255,0.15)'}`,
                backdropFilter: 'blur(12px)',
                display: 'flex', flexDirection: 'column',
                clipPath: 'polygon(0 0, 100% 0, 100% 88%, 92% 100%, 0 100%)',
                boxShadow: isActive ? `0 0 50px ${project.color}40` : 'none',
                transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
                cursor: 'pointer',
                overflow: 'hidden'
            }}
        >
            {/* Brackets */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '24px', height: '24px', borderTop: `3px solid ${project.color}`, borderLeft: `3px solid ${project.color}`, zIndex: 2 }} />
            <div style={{ position: 'absolute', top: 0, right: 0, width: '24px', height: '24px', borderTop: `3px solid ${project.color}`, borderRight: `3px solid ${project.color}`, zIndex: 2 }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, width: '24px', height: '24px', borderBottom: `3px solid ${project.color}`, borderLeft: `3px solid ${project.color}`, zIndex: 2 }} />

            {/* Image */}
            <div style={{ height: '45%', position: 'relative', overflow: 'hidden', borderBottom: '1px solid rgba(255,255,255,0.15)' }}>
                <div style={{
                    position: 'absolute', inset: 0,
                    backgroundImage: `url(${project.img})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    opacity: isActive ? 1 : 0.6,
                    transition: 'opacity 0.4s',
                    filter: isActive ? 'none' : 'grayscale(100%) contrast(1.1)'
                }} />
                <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to bottom, transparent 20%, rgba(5,5,8,0.95) 100%)` }} />

                <div style={{
                    position: 'absolute', top: '12px', right: '12px',
                    background: 'rgba(0,0,0,0.85)', padding: '4px 10px',
                    border: `1px solid ${project.color}`, borderRadius: '4px',
                    color: project.color, fontSize: '0.7rem', fontFamily: 'monospace', fontWeight: 700,
                    boxShadow: `0 0 10px ${project.color}20`
                }}>
                    ID_{project.id}
                </div>
            </div>

            {/* Content */}
            <div style={{ flex: 1, padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <h3 style={{ fontSize: '0.75rem', color: project.color, fontFamily: 'monospace', letterSpacing: '1px', fontWeight: 600 }}>
                        {project.type}
                    </h3>
                    <div style={{ display: 'flex', gap: '4px' }}>
                        {[...Array(3)].map((_, i) => (
                            <div key={i} style={{ width: '4px', height: '4px', background: isActive ? project.color : '#444' }} />
                        ))}
                    </div>
                </div>

                <h2 style={{
                    fontSize: '1.8rem', fontWeight: 800, color: '#fff',
                    letterSpacing: '-0.5px', marginBottom: '0.4rem', lineHeight: '1.1',
                    textShadow: isActive ? `0 0 25px ${project.color}60` : 'none',
                    // Truncate title if too long
                    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
                }}>
                    {project.title}
                </h2>

                <p style={{
                    fontFamily: 'monospace', color: '#ccc', marginBottom: '1.2rem', fontSize: '0.8rem', lineHeight: '1.4',
                    display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis'
                }}>
                    &gt; {project.desc}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: 'auto' }}>
                    {project.tech.slice(0, 3).map((t, i) => ( // Show only first 3 tags
                        <span key={i} style={{
                            border: '1px solid rgba(255,255,255,0.2)',
                            color: '#eee', padding: '3px 9px', fontSize: '0.7rem',
                            fontFamily: 'monospace', borderRadius: '3px',
                            background: 'rgba(255,255,255,0.05)',
                            fontWeight: 500
                        }}>
                            {t}
                        </span>
                    ))}
                    {project.tech.length > 3 && (
                        <span style={{ color: '#888', fontSize: '0.7rem', alignSelf: 'center' }}>+{project.tech.length - 3}</span>
                    )}
                </div>

                <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.15)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', opacity: isActive ? 1 : 0.6 }}>
                    <div style={{ display: 'flex', gap: '0.8rem' }}>
                        <a href={project.github} onClick={(e) => e.stopPropagation()} target="_blank" rel="noreferrer" style={{
                            background: '#000', border: '1px solid #333', color: '#fff',
                            padding: '6px 12px', borderRadius: '4px', textDecoration: 'none',
                            fontSize: '0.7rem', fontFamily: 'monospace', fontWeight: 600,
                            display: 'flex', alignItems: 'center', gap: '6px'
                        }}>
                            <Github size={14} /> CODE
                        </a>
                        <a href={project.live} onClick={(e) => e.stopPropagation()} target="_blank" rel="noreferrer" style={{
                            background: '#000', border: `1px solid ${project.color}`, color: project.color,
                            padding: '6px 12px', borderRadius: '4px', textDecoration: 'none',
                            fontSize: '0.7rem', fontFamily: 'monospace', fontWeight: 600,
                            display: 'flex', alignItems: 'center', gap: '6px'
                        }}>
                            <ExternalLink size={14} /> LIVE
                        </a>
                    </div>

                    {/* More Details Button */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onOpenDetails();
                        }}
                        style={{
                            background: '#000', border: `1px solid ${project.color}`,
                            color: project.color, padding: '6px 12px', borderRadius: '4px',
                            cursor: 'pointer', fontSize: '0.7rem', fontFamily: 'monospace', fontWeight: 700,
                            display: 'flex', alignItems: 'center', gap: '4px'
                        }}
                    >
                        <Info size={12} /> DETAILS
                    </button>
                </div>
            </div>
        </div>
    )
}

const Projects = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [rotation, setRotation] = useState(0);
    const [lastScrollTime, setLastScrollTime] = useState(0);
    const [selectedProject, setSelectedProject] = useState(null); // Modal state

    const rotateTo = (index) => {
        const diff = index - activeIndex;
        let efficientDiff = diff;
        const len = projects.length;
        if (diff > len / 2) efficientDiff -= len;
        else if (diff < -len / 2) efficientDiff += len;

        setRotation(prev => prev - (efficientDiff * (360 / len)));
        setActiveIndex(index);
    };

    const handleNext = useCallback(() => {
        const nextIndex = (activeIndex + 1) % projects.length;
        rotateTo(nextIndex);
    }, [activeIndex]);

    const handlePrev = useCallback(() => {
        const prevIndex = (activeIndex - 1 + projects.length) % projects.length;
        rotateTo(prevIndex);
    }, [activeIndex]);

    useEffect(() => {
        const handleWheel = (e) => {
            if (selectedProject) return; // Disable scroll when modal is open
            const now = Date.now();
            if (now - lastScrollTime < 500) return;

            if (Math.abs(e.deltaX) > 20) {
                if (e.deltaX > 0) handleNext();
                else handlePrev();
                setLastScrollTime(now);
            }
        };

        const container = document.getElementById('projects-container');
        if (container) container.addEventListener('wheel', handleWheel, { passive: true });
        return () => { if (container) container.removeEventListener('wheel', handleWheel); }
    }, [handleNext, handlePrev, lastScrollTime, selectedProject]);

    return (
        <section
            id="projects-container"
            style={{
                height: '100vh', width: '100%',
                background: '#030303',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                perspective: '1500px',
            }}
        >
            <AnimatePresence>
                {selectedProject && (
                    <ProjectModal
                        project={selectedProject}
                        onClose={() => setSelectedProject(null)}
                    />
                )}
            </AnimatePresence>

            {/* Grid Floor */}
            <div style={{
                position: 'absolute', bottom: '-40%', left: '-50%', width: '200%', height: '100%',
                background: 'linear-gradient(transparent 0%, rgba(59, 130, 246, 0.1) 100%)',
                transform: 'rotateX(80deg)',
                backgroundImage: `
                    linear-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255, 255, 255, 0.08) 1px, transparent 1px)
                `,
                backgroundSize: '50px 50px',
                zIndex: 0,
                pointerEvents: 'none',
                opacity: 0.6
            }} />

            {/* Header */}
            <div style={{ zIndex: 10, textAlign: 'center', marginBottom: '5rem', pointerEvents: 'none', position: 'relative' }}>
                <h1 style={{
                    fontSize: 'clamp(3rem, 5vw, 5rem)',
                    color: '#fff',
                    fontWeight: 900,
                    letterSpacing: '-2px',
                    margin: 0,
                    textShadow: '0 0 40px rgba(255,255,255,0.2)'
                }}>
                    PROJECT_DECK
                </h1>
            </div>

            {/* Carousel */}
            <div style={{
                position: 'relative',
                width: '500px', height: '400px',
                transformStyle: 'preserve-3d',
                transition: 'transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)',
                transform: `rotateY(${rotation}deg)`,
                marginBottom: '5rem',
                willChange: 'transform' // Performance hint
            }}>
                {projects.map((project, index) => {
                    const angle = index * (360 / projects.length);
                    const radius = 500;

                    return (
                        <div
                            key={project.id}
                            style={{
                                position: 'absolute',
                                width: '100%', height: '100%',
                                left: 0, top: 0,
                                transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                                transformStyle: 'preserve-3d',
                                backfaceVisibility: 'visible',
                            }}
                        >
                            <ProjectCard
                                project={project}
                                isActive={index === activeIndex}
                                onClick={() => rotateTo(index)}
                                onOpenDetails={() => setSelectedProject(project)}
                            />
                        </div>
                    );
                })}
            </div>

            {/* Controls */}
            <div style={{ zIndex: 20, display: 'flex', gap: '2rem', alignItems: 'center' }}>
                <button onClick={handlePrev} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', padding: '1rem', borderRadius: '50%', cursor: 'pointer', transition: 'all 0.2s' }}>
                    <ChevronLeft />
                </button>
                <div style={{ width: '80px', height: '3px', background: '#333', borderRadius: '2px', overflow: 'hidden' }}>
                    <motion.div
                        animate={{ width: `${((activeIndex + 1) / projects.length) * 100}%` }}
                        style={{ height: '100%', background: '#fff', boxShadow: '0 0 10px white' }}
                    />
                </div>
                <button onClick={handleNext} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', padding: '1rem', borderRadius: '50%', cursor: 'pointer', transition: 'all 0.2s' }}>
                    <ChevronRight />
                </button>
            </div>

            {/* Vignette */}
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(circle at center, transparent 30%, #030303 90%)', zIndex: 5 }} />

        </section>
    );
};

export default Projects;
