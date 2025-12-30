import { motion } from 'framer-motion';
import { Github, ExternalLink, Code2 } from 'lucide-react';

const projects = [
    {
        title: "Algorithmic Visualizer",
        desc: "Interactive visualization of sorting and pathfinding algorithms (Dijkstra, A*). Built to demonstrate complex DSA concepts.",
        tech: ["Java", "Swing", "Algorithms"],
        github: "#",
        live: "#",
        featured: true
    },
    {
        title: "E-Commerce Microservices",
        desc: "A scalable backend system for an online store. Handles high-concurrency orders using message queues.",
        tech: ["Spring Boot", "Kafka", "Docker", "PostgreSQL"],
        github: "#",
        live: "#",
        featured: true
    },
    {
        title: "Portfolio 2025",
        desc: "The 3D interactive site you are looking at right now. Showcasing modern frontend performance.",
        tech: ["React", "Three.js", "Framer Motion"],
        github: "#",
        live: "#",
        featured: false
    }
];

const Projects = () => {
    return (
        <section id="projects" style={{
            minHeight: '100vh',
            width: '100%',
            padding: '8rem 5%',
            background: 'var(--bg-secondary)', // Use secondary background
            color: 'var(--text-primary)',
            transition: 'background 0.3s, color 0.3s'
        }}>
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
            >
                <h2 style={{
                    fontSize: '3rem',
                    marginBottom: '4rem',
                    borderBottom: '1px solid var(--accent-color)',
                    paddingBottom: '1rem',
                    display: 'inline-block'
                }}>
                    SELECTED WORKS
                </h2>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '3rem'
                }}>
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            className="cursor-target" // Enable Target Cursor Lock-on
                            whileHover={{ y: -10 }}
                            style={{
                                background: 'var(--bg-primary)',
                                border: '1px solid var(--accent-color)',
                                borderRadius: '8px',
                                overflow: 'hidden',
                                display: 'flex',
                                flexDirection: 'column'
                            }}
                        >
                            {/* Fake Project Thumbnail Area */}
                            <div style={{
                                height: '200px',
                                background: 'var(--accent-color)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderBottom: '1px solid var(--accent-color)'
                            }}>
                                <Code2 size={48} color="var(--text-secondary)" />
                            </div>

                            <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>{project.title}</h3>
                                <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: '1.6', flex: 1 }}>
                                    {project.desc}
                                </p>

                                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
                                    {project.tech.map((t, i) => (
                                        <span key={i} style={{
                                            fontSize: '0.75rem',
                                            textTransform: 'uppercase',
                                            letterSpacing: '1px',
                                            color: 'var(--text-secondary)'
                                        }}>
                                            {t}
                                        </span>
                                    ))}
                                </div>

                                <div style={{ display: 'flex', gap: '1.5rem', marginTop: 'auto' }}>
                                    <a href={project.github} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)', fontSize: '0.9rem' }}>
                                        <Github size={18} /> Code
                                    </a>
                                    <a href={project.live} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)', fontSize: '0.9rem' }}>
                                        <ExternalLink size={18} /> Live Demo
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
};

export default Projects;
