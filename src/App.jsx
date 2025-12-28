import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import CustomCursor from './components/CustomCursor';
import GrainOverlay from './components/GrainOverlay';
import './index.css';

function App() {
    return (
        <Router>
            <div className="app-container">
                <GrainOverlay />
                <CustomCursor />
                <Navbar />
                <Routes>
                    <Route path="/" element={
                        <main>
                            <Hero />
                            <div id="about"><About /></div>
                            <div id="projects"><Projects /></div>
                            <div id="contact"><Contact /></div>
                        </main>
                    } />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
