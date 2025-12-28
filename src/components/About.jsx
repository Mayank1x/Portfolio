import { motion } from 'framer-motion';
import { Code, Database, Server, Layers, Cpu, Globe } from 'lucide-react';

const skills = [
    {
        category: "Core & Algorithms",
        icon: <Cpu size={32} />,
        title: "Java & DSA",
        desc: "Solved 500+ problems on LeetCode. Expert in Graphs, DP, and Trees.",
        tech: ["Java", "OOP", "System Design"]
    },
    {
        category: "Frontend Engineering",
        icon: <Globe size={32} />,
        title: "Modern Web",
        desc: "Building pixel-perfect, responsive applications with focus on animations.",
        tech: ["React", "Vite", "Three.js", "Framer Motion"]
    },
    {
        category: "Backend & Systems",
        icon: <Server size={32} />,
        title: "Robust Backends",
        desc: "Scalable API design and heavy-lifting logic implementation.",
        tech: ["Spring Boot", "REST APIs", "PostgreSQL"]
    }
];

const About = () => {
    return (
        <section id="about" style={{
            minHeight: '100vh',
            width: '100%',
            padding: '8rem 5%',
            background: '#000',
            color: '#fff',
            position: 'relative'
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
                    borderBottom: '1px solid #333',
                    paddingBottom: '1rem',
                    display: 'inline-block'
                }}>
                    TECHNICAL ARSENAL
                </h2>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '2rem'
                }}>
                    {skills.map((skill, index) => (
                        <motion.div
                            key={index}
                            initial={{ y: 50, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ delay: index * 0.2, duration: 0.5 }}
                            whileHover={{
                                y: -10,
                                backgroundColor: '#111',
                                boxShadow: '0 10px 30px rgba(255,255,255,0.05)'
                            }}
                            style={{
                                padding: '2rem',
                                border: '1px solid #222',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                transition: 'background-color 0.3s'
                            }}
                        >
                            <div style={{ marginBottom: '1.5rem', color: '#888' }}>
                                {skill.icon}
                            </div>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{skill.title}</h3>
                            <p style={{ color: '#888', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                                {skill.desc}
                            </p>
                            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                {skill.tech.map((t, i) => (
                                    <span key={i} style={{
                                        fontSize: '0.8rem',
                                        padding: '0.2rem 0.6rem',
                                        border: '1px solid #444',
                                        borderRadius: '100px',
                                        color: '#ccc'
                                    }}>
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
};

export default About;
