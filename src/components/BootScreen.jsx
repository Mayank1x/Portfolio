import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import playKeystrokeSound from '../utils/SoundManager';

const BootScreen = ({ onComplete }) => {
    const [logs, setLogs] = useState([]);
    const [progress, setProgress] = useState(0);
    const [bootPhase, setBootPhase] = useState('bios'); // 'bios' | 'loader' | 'access'

    // Auto-scroll to bottom of logs
    const logContainerRef = useRef(null);
    useEffect(() => {
        if (logContainerRef.current) {
            logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
        }
    }, [logs]);

    const sysLogs = [
        "BIOS DATE 01/15/25 15:22:05 VER 1.0.2",
        "CPU: INTEL(R) CORE(TM) i9-12900K @ 5.20GHZ",
        "SPEED: 5200 MHZ",
        "cl_flush_monitor..... [ OK ]",
        "check_cpu_flags...... [ OK ]",
        "waking_up_cores...... [ OK ]",
        "dram_integrity_check. [ OK ]",
        "allocating_vram...... [ OK ]",
        "loading_kernel....... [ OK ]",
        "mounting_root_fs..... [ OK ]",
        "init_graphics_driver. [ OK ]",
        "starting_network..... [ OK ]",
        "handshake_protocol... [ OK ]",
        "user_profile_data.... [ FOUND ]",
        "decrypting_assets.... [ OK ]",
        "initializing_ui...... [ WAITING ]"
    ];

    useEffect(() => {
        // PHASE 1: Rapid BIOS Logs
        if (bootPhase === 'bios') {
            let logIndex = 0;
            const logInterval = setInterval(() => {
                if (logIndex < sysLogs.length) {
                    setLogs(prev => [...prev, sysLogs[logIndex]]);
                    logIndex++;
                } else {
                    clearInterval(logInterval);
                    setBootPhase('loader');
                }
            }, 80); // Slightly faster for punchiness
            return () => clearInterval(logInterval);
        }

        // PHASE 2: Progress Bar
        if (bootPhase === 'loader') {
            const progressInterval = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(progressInterval);
                        setBootPhase('access');
                        return 100;
                    }
                    // Random burst speed for realism
                    return Math.min(prev + Math.floor(Math.random() * 25) + 5, 100);
                });
            }, 150);
            return () => clearInterval(progressInterval);
        }

        // PHASE 3: Access Granted & Exit
        if (bootPhase === 'access') {
            const timeout = setTimeout(() => {
                onComplete();
            }, 1200);
            return () => clearTimeout(timeout);
        }
    }, [bootPhase, onComplete]);

    return (
        <motion.div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: '#050505',
                color: '#e0e0e0',
                fontFamily: "'Courier New', Courier, monospace",
                zIndex: 9999,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end', // Aligns to bottom
                alignItems: 'flex-start',   // Aligns to left (Side)
                padding: '40px',
                pointerEvents: 'none',      // Let clicks pass through if needed
                // Subtle Vignette
                backgroundImage: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.8) 100%)'
            }}
            exit={{
                y: '-100%',
                transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
            }}
        >
            <div style={{
                width: '100%',
                maxWidth: '600px',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                position: 'relative'
            }}>
                {/* Header Info */}
                <div style={{
                    borderBottom: '1px solid #333',
                    paddingBottom: '10px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '0.75rem',
                    color: '#666',
                    letterSpacing: '1px'
                }}>
                    <span>MAYANK_OS_BOOTLOADER_v1.0</span>
                    <span>MEM: 64TB OK</span>
                </div>

                {/* Log Output Area */}
                <div
                    ref={logContainerRef}
                    style={{
                        height: '250px',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        fontSize: '0.9rem',
                        lineHeight: '1.6',
                        color: '#aaa',
                        textShadow: '0 0 8px rgba(0, 255, 0, 0.2)' // Subtle cyber glow
                    }}
                >
                    {logs.map((log, i) => (
                        <div key={i}>{`> ${log}`}</div>
                    ))}
                    {bootPhase === 'bios' && <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 0.5 }}>_</motion.span>}
                </div>

                {/* Progress Bar (Only visible in loader/access phase) */}
                {bootPhase !== 'bios' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        style={{ width: '100%' }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', color: '#fff', fontSize: '0.8rem', letterSpacing: '2px' }}>
                            <span>LOADING_MODULES</span>
                            <span>{progress}%</span>
                        </div>
                        <div style={{ width: '100%', height: '4px', background: '#222', padding: '0px' }}>
                            <motion.div
                                style={{ height: '100%', background: '#fff', width: `${progress}%`, boxShadow: '0 0 10px #fff' }}
                            />
                        </div>
                    </motion.div>
                )}

                {/* Success Message */}
                {bootPhase === 'access' && (
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, filter: 'blur(10px)' }}
                        animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
                        style={{
                            marginTop: '2rem',
                            textAlign: 'left', // Aligned left
                            fontSize: '2rem',
                            fontWeight: '900',
                            color: '#ffffff', // White
                            letterSpacing: '8px',
                            textShadow: '0 0 30px rgba(255, 255, 255, 0.6)' // White Glow
                        }}
                    >
                        ACCESS GRANTED
                    </motion.div>
                )}
            </div >
        </motion.div >
    );
};

export default BootScreen;
