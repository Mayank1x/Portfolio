
import { motion } from "framer-motion";
import { Terminal, Layout, Server, Database, Atom, PenTool, Cloud, Brain, Code2, Coffee, Table2, Binary, Leaf, FileJson, Code, Palette } from 'lucide-react';

const technologies = [
    { name: "System Design", icon: <Layout /> },
    { name: "C++", icon: <Code2 /> },
    { name: "Java", icon: <Coffee /> },
    { name: "Data Structures & Algo", icon: <Binary /> },
    { name: "React", icon: <Atom /> },
    { name: "Flask", icon: <Server /> },
    { name: "Python", icon: <Terminal /> },
    { name: "SQL", icon: <Table2 /> },
    { name: "MongoDB", icon: <Leaf /> },
    { name: "JavaScript", icon: <FileJson /> },
    { name: "HTML", icon: <Code /> },
    { name: "CSS", icon: <Palette /> },
    { name: "Figma", icon: <PenTool /> },
    { name: "Google Cloud", icon: <Cloud /> },
    { name: "PostgreSQL", icon: <Database /> },
    { name: "RAG", icon: <Brain /> },
];

const TechMarquee = () => {
    return (
        <div style={{
            display: 'flex',
            overflow: 'hidden',
            width: '100%',
            maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
        }}>
            <motion.div
                style={{ display: 'flex', gap: '3rem', padding: '1rem' }}
                animate={{ x: "-50%" }}
                transition={{
                    duration: 150, // Normal/Balanced speed
                    ease: "linear",
                    repeat: Infinity
                }}
            >
                {[...technologies, ...technologies, ...technologies, ...technologies].map((tech, index) => (
                    <div key={index} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.8rem',
                        color: 'rgba(255,255,255,0.8)', // Proper text color (clean white/grey)
                        fontFamily: "'mononoki', monospace", // Consistent font
                        fontWeight: '500',
                        fontSize: '1.2rem', // Good size
                        whiteSpace: 'nowrap',
                        opacity: 1
                    }}>
                        <span style={{ color: '#3b82f6' }}>{tech.icon}</span> {/* Blue Icon */}
                        {tech.name}
                    </div>
                ))}
            </motion.div>
        </div>
    );
};

export default TechMarquee;
