import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import playKeystrokeSound from '../utils/SoundManager';

const Terminal = () => {
    const [input, setInput] = useState('');
    const [history, setHistory] = useState([
        { type: 'system', content: 'Welcome to MayankOS v1.0.0' },
        { type: 'system', content: 'Type "help" for commands.' },
        {
            type: 'system', content: `Available commands:
  ls          - List sections
  cd [dir]    - Go to section
  whoami      - My Profile
  skills      - Tech Stack
  contact     - Socials
  mode light  - Toggle Theme
  clear       - Clear Console`
        },
    ]);

    const containerRef = useRef(null);
    const inputRef = useRef(null);

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
  mode light  - Invert Colors
  clear       - Clear`;
                break;
            case cleanCmd === 'ls': output = 'about/    projects/    experience/    contact/'; break;
            case cleanCmd.startsWith('cd '):
                const target = cleanCmd.split(' ')[1];
                if (['about', 'projects', 'experience', 'contact'].includes(target)) {
                    output = `Navigating to ${target}...`;
                    document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' });
                } else if (target === '..') output = 'At root.';
                else output = `cd: no such dir: ${target}`;
                break;
            case cleanCmd === 'whoami': output = 'Mayank | Java Developer'; break;
            case cleanCmd === 'skills': output = 'Java, React, DSA, Spring'; break;
            case cleanCmd === 'contact': output = 'hello@example.com'; break;
            case cleanCmd === 'date': output = new Date().toString(); break;

            // Invert Mode Logic
            case cleanCmd === 'mode light':
            case cleanCmd === 'invert':
                document.body.classList.add('light-mode');
                output = 'Visual mode inverted (Light Mode Active).';
                break;
            case cleanCmd === 'mode dark':
                document.body.classList.remove('light-mode');
                output = 'Visual mode restored (Dark Mode Active).';
                break;

            case cleanCmd === 'clear': setHistory([]); return;
            case cleanCmd === '': output = ''; break;
            default: output = `Not found: ${cmd}`;
        }
        if (output) newHistory.push({ type: 'system', content: output });
        setHistory(newHistory);
    };

    const handleKeyDown = (e) => {
        if (e.key.length === 1 || e.key === 'Enter' || e.key === 'Backspace') {

        }
        if (e.key === 'Enter') { handleCommand(input); setInput(''); }
    };

    return (
        <div style={{
            width: '100%',
            maxWidth: '500px',
            height: '340px', // slightly taller for 3D room
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
                    background: 'var(--term-bg)', // Dynamic Background
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)',
                    border: '1px solid var(--term-border)', // Dynamic Border
                    borderRadius: '12px',
                    fontFamily: "'Courier New', Courier, monospace",
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                    overflow: 'hidden',
                    position: 'relative',
                    cursor: 'grab'
                }}
            >
                {/* Header with Grab Area */}
                <div style={{
                    padding: '12px 16px',
                    background: 'var(--term-header-bg)',
                    borderBottom: '1px solid var(--term-border)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#FF5F57' }}></div>
                        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#FEBC2E' }}></div>
                        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#28C840' }}></div>
                    </div>
                    <div style={{ flex: 1, textAlign: 'center', color: 'var(--term-text)', fontSize: '0.8rem', fontWeight: '600', letterSpacing: '0.5px' }}>
                        mayank@dev
                    </div>
                </div>

                {/* Body */}
                <div
                    ref={containerRef}
                    style={{
                        flex: 1,
                        padding: '16px',
                        overflowY: 'auto',
                        color: 'var(--term-text)',
                        fontSize: '0.85rem',
                        lineHeight: '1.6',
                        scrollBehavior: 'auto',
                        transform: 'translateZ(0px)' // Keeps text flat on plane
                    }}>
                    {history.map((line, i) => (
                        <div key={i} style={{
                            marginBottom: '6px',
                            whiteSpace: 'pre-wrap',
                            color: line.type === 'user' ? 'var(--term-text)' : 'var(--term-text)', // Fixed: User text should also be light
                            textShadow: line.type === 'user' ? 'none' : 'none'
                        }}>
                            {line.type === 'user' && <span style={{ color: 'var(--term-caret)', marginRight: '10px' }}>➜</span>}
                            {line.content}
                        </div>
                    ))}

                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <span style={{ color: 'var(--term-caret)', marginRight: '10px' }}>➜</span>
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                color: 'var(--term-text)', // Fixed: Use terminal text color, not global text color
                                caretColor: 'var(--term-caret)',
                                outline: 'none',
                                flex: 1,
                                fontFamily: 'inherit',
                                fontSize: 'inherit',
                                minWidth: '50px',
                                textShadow: 'none'
                            }}
                            placeholder='Type "help"...'
                            autoFocus
                        />
                    </div>
                </div>
            </motion.div>
        </div >
    );
};

export default Terminal;
