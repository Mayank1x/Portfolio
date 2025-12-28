import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const Terminal = () => {
    const [input, setInput] = useState('');
    const [history, setHistory] = useState([
        { type: 'system', content: 'Welcome to MayankOS v1.0.0' },
        { type: 'system', content: 'Type "help" to see available commands.' },
    ]);

    const containerRef = useRef(null);
    const inputRef = useRef(null);
    const cardRef = useRef(null);

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [history]);

    useEffect(() => {
        const focusInput = () => {
            if (document.activeElement !== inputRef.current) {
                inputRef.current?.focus({ preventScroll: true });
            }
        };
        focusInput();
        const handleClick = () => focusInput();
        const container = containerRef.current;
        if (container) container.addEventListener('click', handleClick);
        return () => { if (container) container.removeEventListener('click', handleClick); };
    }, []);

    // Subtle 3D Tilt Logic
    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Calculate rotation (Max 5 degrees for subtlety)
        const rotateY = ((x / rect.width) - 0.5) * 8;
        const rotateX = ((y / rect.height) - 0.5) * -8;

        cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    };

    const handleMouseLeave = () => {
        if (cardRef.current) {
            // Reset position
            cardRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        }
    };

    const handleCommand = (cmd) => {
        const cleanCmd = cmd.trim().toLowerCase();
        const newHistory = [...history, { type: 'user', content: cmd }];
        let output = '';

        switch (true) {
            case cleanCmd === 'help':
                output = `Available commands:
  ls          - List sections
  cd [dir]    - Go to section
  whoami      - My Profile
  skills      - Tech Stack
  contact     - Socials
  clear       - Clear`;
                break;
            case cleanCmd === 'ls': output = 'about/    projects/    contact/'; break;
            case cleanCmd.startsWith('cd '):
                const target = cleanCmd.split(' ')[1];
                if (['about', 'projects', 'contact'].includes(target)) {
                    output = `Navigating to ${target}...`;
                    document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' });
                } else if (target === '..') output = 'At root.';
                else output = `cd: no such dir: ${target}`;
                break;
            case cleanCmd === 'whoami': output = 'Mayank | Java Developer'; break;
            case cleanCmd === 'skills': output = 'Java, React, DSA, Spring'; break;
            case cleanCmd === 'contact': output = 'hello@example.com'; break;
            case cleanCmd === 'date': output = new Date().toString(); break;
            case cleanCmd === 'clear': setHistory([]); return;
            case cleanCmd === '': output = ''; break;
            default: output = `Not found: ${cmd}`;
        }
        if (output) newHistory.push({ type: 'system', content: output });
        setHistory(newHistory);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') { handleCommand(input); setInput(''); }
    };

    return (
        <div style={{
            width: '100%',
            maxWidth: '600px',
            height: '400px', // slightly taller for 3D room
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <motion.div
                // Motion Props for Physics
                drag
                dragConstraints={{ left: -300, right: 300, top: -200, bottom: 200 }}
                whileDrag={{ scale: 1.02, cursor: 'grabbing' }}
                dragElastic={0.1}

                style={{
                    width: '100%',
                    height: '100%',
                    background: 'rgba(5, 5, 5, 0.85)', // Increased opacity for visibility
                    backdropFilter: 'blur(8px)',       // Reduced blur for performance
                    WebkitBackdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: '12px',
                    fontFamily: "'Courier New', Courier, monospace",
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)', // Standard clean shadow
                    overflow: 'hidden',
                    position: 'relative',
                    cursor: 'grab'
                }}
            >
                {/* Header with Grab Area */}
                <div style={{
                    padding: '12px 16px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#FF5F57' }}></div>
                        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#FEBC2E' }}></div>
                        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#28C840' }}></div>
                    </div>
                    <div style={{ flex: 1, textAlign: 'center', color: '#666', fontSize: '0.8rem', fontWeight: '600', letterSpacing: '0.5px' }}>
                        mayank @ dev
                    </div>
                </div>

                {/* Body */}
                <div
                    ref={containerRef}
                    style={{
                        flex: 1,
                        padding: '16px',
                        overflowY: 'auto',
                        color: '#ddd',
                        fontSize: '0.95rem',
                        lineHeight: '1.6',
                        scrollBehavior: 'auto',
                        transform: 'translateZ(0px)' // Keeps text flat on plane
                    }}>
                    {history.map((line, i) => (
                        <div key={i} style={{
                            marginBottom: '6px',
                            whiteSpace: 'pre-wrap',
                            color: line.type === 'user' ? '#fff' : '#aaa',
                            textShadow: line.type === 'user' ? '0 0 10px rgba(255,255,255,0.2)' : 'none'
                        }}>
                            {line.type === 'user' && <span style={{ color: '#28C840', marginRight: '10px' }}>➜</span>}
                            {line.content}
                        </div>
                    ))}

                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <span style={{ color: '#28C840', marginRight: '10px' }}>➜</span>
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                color: '#fff',
                                caretColor: '#28C840',
                                outline: 'none',
                                flex: 1,
                                fontFamily: 'inherit',
                                fontSize: 'inherit',
                                minWidth: '50px',
                                textShadow: '0 0 10px rgba(255,255,255,0.2)'
                            }}
                            autoFocus
                        />
                    </div>
                </div>
            </motion.div>
        </div >
    );
};

export default Terminal;
