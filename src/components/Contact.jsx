import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, Twitter } from 'lucide-react';

const Contact = () => {
    return (
        <section id="contact" style={{
            minHeight: '80vh',
            width: '100%',
            padding: '8rem 5%',
            background: 'var(--bg-primary)',
            color: 'var(--text-primary)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            transition: 'background 0.3s, color 0.3s'
        }}>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                style={{ maxWidth: '800px' }}
            >
                <h2 style={{ fontSize: '4rem', marginBottom: '2rem', fontWeight: 900 }}>
                    LET'S WORK TOGETHER
                </h2>
                <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '4rem', lineHeight: '1.6' }}>
                    I am currently available for freelance projects and open to full-time opportunities.
                    If you are looking for a developer who understands both the algorithms and the aesthetics,
                    let's chat.
                </p>

                <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', marginBottom: '4rem' }}>
                    <a href="mailto:hello@example.com" style={{
                        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', color: 'var(--text-primary)',
                        padding: '2rem', border: '1px solid var(--accent-color)', borderRadius: '8px', minWidth: '150px'
                    }}>
                        <Mail size={40} />
                        <span>Email</span>
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noreferrer" style={{
                        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', color: 'var(--text-primary)',
                        padding: '2rem', border: '1px solid var(--accent-color)', borderRadius: '8px', minWidth: '150px'
                    }}>
                        <Linkedin size={40} />
                        <span>LinkedIn</span>
                    </a>
                    <a href="https://github.com" target="_blank" rel="noreferrer" style={{
                        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', color: 'var(--text-primary)',
                        padding: '2rem', border: '1px solid var(--accent-color)', borderRadius: '8px', minWidth: '150px'
                    }}>
                        <Github size={40} />
                        <span>GitHub</span>
                    </a>
                </div>

                <footer style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                    © 2025 Portfolio. Built with React & Three.js.
                </footer>
            </motion.div>
        </section>
    );
};

export default Contact;
