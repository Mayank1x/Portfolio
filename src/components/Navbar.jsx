import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import MagneticButton from './MagneticButton';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [hoveredLink, setHoveredLink] = useState(null);
    const [activeSection, setActiveSection] = useState('');

    // Handle scroll effect & Active Section Detection
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);

            // Simple ScrollSpy
            const sections = ['about', 'projects', 'contact'];
            let current = '';
            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    // If section is well within viewport
                    if (rect.top <= 200 && rect.bottom >= 200) {
                        current = section;
                    }
                }
            }
            if (current) setActiveSection(current);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'About', href: '#about', id: 'about' },
        { name: 'Projects', href: '#projects', id: 'projects' },
        { name: 'Contact', href: '#contact', id: 'contact' },
    ];

    return (
        <>
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                style={{
                    position: 'fixed',
                    top: '20px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 100,
                    width: 'fit-content',
                    maxWidth: '90%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '2rem',

                    // Glass Pill Styling with BETTER VISIBILITY
                    padding: scrolled ? '10px 30px' : '12px 40px',
                    borderRadius: '50px',
                    // Use CSS variables for Theme Support, but override bg transparency
                    // Dark Mode: slightly lighter black for contrast
                    backgroundColor: 'var(--nav-bg, rgba(20, 20, 20, 0.8))',
                    backdropFilter: 'blur(16px)',
                    // Stronger Glow Border
                    border: '1px solid var(--nav-border, rgba(255, 255, 255, 0.2))',
                    boxShadow: scrolled
                        ? '0 10px 40px rgba(0,0,0,0.6)'
                        : '0 0 20px rgba(255, 255, 255, 0.1)', // Outer White Glow

                    transition: 'all 0.3s ease'
                }}
            >
                {/* Logo Area */}
                <div style={{
                    fontFamily: "'Courier New', monospace",
                    fontWeight: 'bold',
                    fontSize: '1.2rem', // Bigger Logo
                    color: 'var(--text-primary)',
                    letterSpacing: '-0.5px',
                    cursor: 'pointer',
                    userSelect: 'none',
                    marginRight: '1rem',
                    display: 'flex',
                    alignItems: 'center'
                }}>
                    <span style={{ color: 'var(--text-secondary)' }}>~/</span>Mayank
                    <motion.div
                        animate={{
                            opacity: [0, 1, 0],
                            boxShadow: ['0 0 0px var(--accent-color)', '0 0 10px var(--accent-color)', '0 0 0px var(--accent-color)']
                        }}
                        transition={{ repeat: Infinity, duration: 0.8 }}
                        style={{
                            width: '8px',
                            height: '16px',
                            background: 'var(--accent-color)',
                            marginLeft: '6px',
                            borderRadius: '1px'
                        }}
                    />
                </div>

                {/* Desktop Links */}
                <div className="desktop-menu" style={{ display: 'flex', gap: '2rem' }}>
                    {navLinks.map((link) => {
                        const isActive = activeSection === link.id;
                        const isHovered = hoveredLink === link.name;

                        return (
                            <MagneticButton
                                key={link.name}
                                href={link.href}
                                onMouseEnter={() => setHoveredLink(link.name)}
                                onMouseLeave={() => setHoveredLink(null)}
                                strength={0.25} // Subtle strength for nav
                                style={{
                                    position: 'relative',
                                    color: (isActive || isHovered) ? 'var(--text-primary)' : 'var(--text-secondary)',
                                    textDecoration: 'none',
                                    fontFamily: "'Courier New', monospace",
                                    fontSize: '1.1rem', // Bigger Links
                                    fontWeight: isActive ? 700 : 500,
                                    letterSpacing: '1px',
                                    transition: 'color 0.2s',
                                    padding: '4px 0',
                                    cursor: 'pointer' // Ensure pointer
                                }}
                            >
                                {/* Active/Hover Brackets */}
                                <span style={{
                                    display: 'inline-block',
                                    opacity: (isActive || isHovered) ? 1 : 0,
                                    transform: (isActive || isHovered) ? 'translateX(0)' : 'translateX(10px)',
                                    transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)', // Spring
                                    color: 'var(--text-primary)', // Visible in Dark Mode
                                    marginRight: '4px'
                                }}>[</span>

                                {link.name}

                                <span style={{
                                    display: 'inline-block',
                                    opacity: (isActive || isHovered) ? 1 : 0,
                                    transform: (isActive || isHovered) ? 'translateX(0)' : 'translateX(-10px)',
                                    transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                                    color: 'var(--text-primary)', // Visible in Dark Mode
                                    marginLeft: '4px'
                                }}>]</span>

                                {/* Active Dot Indicator */}
                                {isActive && (
                                    <motion.div
                                        layoutId="nav-pill"
                                        style={{
                                            position: 'absolute',
                                            bottom: '-6px',
                                            left: '50%',
                                            x: '-50%',
                                            width: '4px',
                                            height: '4px',
                                            borderRadius: '50%',
                                            background: 'var(--text-primary)',
                                            boxShadow: '0 0 8px var(--text-primary)'
                                        }}
                                    />
                                )}
                            </MagneticButton>
                        );
                    })}
                </div>

                {/* Mobile Hamburger */}
                <div className="mobile-toggle" style={{ display: 'none', cursor: 'pointer', color: 'var(--text-primary)' }} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                    {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        style={{
                            position: 'fixed',
                            top: '80px',
                            left: '50%',
                            x: '-50%', // Centered
                            width: '88%', // Matches Navbar Width on Mobile
                            maxWidth: '300px',
                            backgroundColor: 'var(--nav-bg)', // Uses new dark variable
                            backdropFilter: 'blur(20px)',
                            border: '1px solid var(--nav-border)', // Consistent Border
                            borderRadius: '24px',
                            padding: '1.5rem',
                            zIndex: 99,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '1.2rem',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.6)'
                        }}
                    >
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={() => setMobileMenuOpen(false)}
                                style={{
                                    fontFamily: "'Courier New', monospace",
                                    fontSize: '1.2rem',
                                    fontWeight: 'bold',
                                    color: 'var(--text-primary)',
                                    textDecoration: 'none'
                                }}
                            >
                                {`> ${link.name}`}
                            </a>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
                @media (max-width: 768px) {
                    .desktop-menu { display: none !important; }
                    .mobile-toggle { display: block !important; }
                    nav {
                        padding: 10px 24px !important;
                        justify-content: space-between;
                        width: 88% !important; /* Perfect margins */
                        top: 20px !important;
                        border-radius: 40px !important; /* Slightly tighter radius */
                    }
                }
            `}</style>
        </>
    );
};

export default Navbar;
