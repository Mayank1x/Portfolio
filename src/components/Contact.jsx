import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, Zap, Check, ArrowRight, Send, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import playKeystrokeSound from '../utils/SoundManager';

const Contact = () => {
    const [formState, setFormState] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('IDLE'); // IDLE, SENDING, SENT, ERROR

    const handleChange = (e) => {
        setFormState({ ...formState, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('SENDING');


        const SERVICE_ID = 'service_lv8shgm';
        const TEMPLATE_ID = 'template_uajaqab';
        const PUBLIC_KEY = '-FAudUt9ZNdD91V3B';

        const templateParams = {
            from_name: formState.name,
            name: formState.name,
            email: formState.email,
            message: formState.message,
        };

        emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
            .then((response) => {
                console.log('SUCCESS!', response.status, response.text);
                setStatus('SENT');
                setTimeout(() => {
                    setStatus('IDLE');
                    setFormState({ name: '', email: '', message: '' });
                }, 4000);
            }, (error) => {
                console.log('FAILED...', error);
                setStatus('ERROR');
                setTimeout(() => setStatus('IDLE'), 4000);
            });
    };

    return (
        <section
            id="contact"
            style={{
                minHeight: '100vh',
                width: '100%',
                padding: '4rem 5%',
                background: '#050505',
                color: 'var(--text-primary)',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden'
            }}
        >
            <div className="dark-grid" />

            <div style={{ maxWidth: '1200px', width: '100%', zIndex: 2, display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) minmax(450px, 1.2fr)', gap: '3rem', alignItems: 'center' }}>

                {/* Text Content */}
                <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                        <div style={{ width: '6px', height: '6px', background: '#28C840', borderRadius: '50%', boxShadow: '0 0 10px #28C840' }} />
                        <span style={{ fontFamily: "'Courier New', monospace", color: '#28C840', letterSpacing: '2px', fontSize: '0.85rem', fontWeight: 'bold' }}>
                            OPEN FOR WORK
                        </span>
                    </div>

                    <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 800, lineHeight: 1.1, marginBottom: '1.5rem', letterSpacing: '-2px', color: '#fff' }}>
                        Let's build the <br /> <span style={{ color: '#444' }}>future.</span>
                    </h2>

                    <p style={{ fontSize: '1rem', color: '#888', marginBottom: '2rem', maxWidth: '440px', lineHeight: '1.6' }}>
                        Got a vision? Let's turn it into reality. <br /> Send a signal and I'll get back to you.
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {[{ icon: Github, label: 'GitHub', href: 'https://github.com/Mayank1x' }, { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/mayank-rathore-5a6a45292/' }, { icon: Mail, label: 'Email', href: 'mailto:mayankrathore1608@gmail.com' }].map((link) => (
                            <a key={link.label} href={link.href} target="_blank" rel="noreferrer" className="social-link">
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <link.icon size={20} /> <span>{link.label}</span>
                                </div>
                                <ArrowRight size={18} className="arrow" style={{ opacity: 0.5 }} />
                            </a>
                        ))}
                    </div>
                </motion.div>

                {/* LASER CARD */}
                <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} style={{ position: 'relative' }}>
                    <div className="laser-box">
                        <div className="laser-beam" />
                        <div className="laser-content">
                            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                <div style={{ marginBottom: '0.5rem' }}>
                                    <h3 style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.5px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <Zap size={20} fill="white" /> Contact Me
                                    </h3>
                                </div>

                                {[{ name: 'name', label: 'Name', type: 'text' }, { name: 'email', label: 'Email', type: 'email' }].map((field) => (
                                    <div key={field.name} className="input-group">
                                        <input type={field.type} name={field.name} value={formState[field.name]} onChange={handleChange} required className="custom-input" placeholder=" " />
                                        <label className="input-label">{field.label}</label>
                                    </div>
                                ))}

                                <div className="input-group">
                                    <textarea name="message" value={formState.message} onChange={handleChange} required className="custom-input textarea" placeholder=" " />
                                    <label className="input-label">Message</label>
                                </div>

                                {/* PREMIUM BUTTON COMPONENT */}
                                <MagneticButton status={status} />

                            </form>
                        </div>
                    </div>
                </motion.div>
            </div>

            <style>{`
                .dark-grid { position: absolute; width: 100%; height: 100%; top: 0; left: 0; background-image: radial-gradient(#222 1px, transparent 1px); background-size: 40px 40px; opacity: 0.3; pointer-events: none; }
                .laser-box { position: relative; border-radius: 20px; background: #111; padding: 2px; overflow: hidden; }
                .laser-beam { position: absolute; inset: -50%; width: 200%; height: 200%; background: conic-gradient(from 0deg, transparent 70%, #fff 90%, transparent 100%); animation: spin 4s linear infinite; z-index: 0; }
                @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                .laser-content { background: #080808; border-radius: 19px; position: relative; z-index: 1; padding: 3rem; height: 100%; }
                .input-group { position: relative; }
                .custom-input { width: 100%; background: #111; border: 1px solid #333; border-radius: 8px; padding: 16px; font-size: 1rem; color: #fff; outline: none; transition: border-color 0.3s, background 0.3s; }
                .custom-input:focus { border-color: #fff; background: #1a1a1a; }
                .custom-input.textarea { min-height: 140px; resize: vertical; }
                .input-label { position: absolute; left: 16px; top: 16px; color: #777; pointer-events: none; transition: all 0.2s ease; font-size: 1rem; }
                .custom-input:focus ~ .input-label, .custom-input:not(:placeholder-shown) ~ .input-label { transform: translateY(-28px); font-size: 0.8rem; color: #fff; font-weight: bold; letter-spacing: 1px; }
                .social-link { display: flex; align-items: center; justify-content: space-between; padding: 1.2rem; border: 1px solid #222; border-radius: 12px; text-decoration: none; color: #888; transition: all 0.3s; background: rgba(255,255,255,0.01); }
                .social-link:hover { border-color: #555; color: #fff; background: rgba(255,255,255,0.05); }
                 .social-link:hover .arrow { opacity: 1 !important; transform: translateX(0) !important; }
                @media (max-width: 900px) { div[style*="gridTemplateColumns"] { grid-template-columns: 1fr !important; gap: 4rem !important; } .laser-content { padding: 2rem; } h2 { font-size: 3rem !important; } }
            `}</style>
        </section>
    );
};

const MagneticButton = ({ status }) => {
    const ref = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        const x = (clientX - (left + width / 2)) * 0.3; // Magnetic Strength
        const y = (clientY - (top + height / 2)) * 0.3;
        setPosition({ x, y });
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
        setIsHovered(false);
    };

    return (
        <motion.button
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            className="premium-btn"
            disabled={status !== 'IDLE'}
            whileTap={{ scale: 0.95 }}
            style={{
                position: 'relative',
                width: '100%',
                padding: '1.2rem',
                border: '1px solid rgba(255,255,255,0.1)',
                background: status === 'SENT' ? '#28C840' : status === 'ERROR' ? '#ff3333' : 'transparent',
                borderRadius: '12px',
                color: status === 'SENT' || status === 'ERROR' ? '#fff' : (isHovered ? '#000' : '#fff'),
                fontSize: '1rem',
                fontWeight: '800',
                letterSpacing: '1px',
                cursor: 'pointer',
                overflow: 'hidden',
                marginTop: '1rem',
                transition: 'border-color 0.3s, color 0.3s, background 0.3s'
            }}
        >
            {/* Liquid Fill Effect */}
            {status === 'IDLE' && (
                <motion.div
                    className="btn-fill"
                    initial={{ y: '100%' }}
                    animate={{ y: isHovered ? '0%' : '100%' }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    style={{
                        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                        background: '#fff', borderRadius: '10px', zIndex: 0
                    }}
                />
            )}

            <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                {status === 'IDLE' ? (
                    <>
                        <span className="btn-text">SEND MESSAGE</span>
                        <Send size={18} className="btn-icon" color={isHovered ? '#000' : '#fff'} />
                    </>
                ) : status === 'SENDING' ? (
                    <span>SENDING...</span>
                ) : status === 'ERROR' ? (
                    <>
                        <span>ERROR SENDING</span>
                        <AlertCircle size={20} />
                    </>
                ) : (
                    <>
                        <span>MESSAGE SENT</span>
                        <Check size={20} />
                    </>
                )}
            </div>

            <style>{`
                .premium-btn:hover { border-color: transparent; }
            `}</style>
        </motion.button>
    );
};

export default Contact;
