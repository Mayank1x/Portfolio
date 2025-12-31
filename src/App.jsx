import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import TargetCursor from './components/TargetCursor';
import CustomCursor from './components/CustomCursor';
import GrainOverlay from './components/GrainOverlay';
import BootScreen from './components/BootScreen';
import SmoothScroll from './components/SmoothScroll';
import './index.css';

function App() {
    // Determine initial state: if user has visited recently, skip boot? (Optional, skipping for now to force cool effect)
    const [isLoading, setIsLoading] = useState(true);

    return (
        <Router>
            <div className="app-container">
                {/* <SmoothScroll /> */}
                <GrainOverlay />
                <CustomCursor />
                <TargetCursor />

                <AnimatePresence mode="wait">
                    {isLoading ? (
                        <BootScreen key="boot" onComplete={() => setIsLoading(false)} />
                    ) : (
                        <>
                            <Navbar />
                            <Routes>
                                <Route path="/" element={
                                    <main>
                                        <Hero />
                                        <div id="about"><About /></div>
                                        <div id="projects"><Projects /></div>
                                        <div id="experience"><Experience /></div>
                                        <div id="contact"><Contact /></div>
                                    </main>
                                } />
                            </Routes>
                        </>
                    )}
                </AnimatePresence>
            </div>
        </Router>
    );
}

export default App;
