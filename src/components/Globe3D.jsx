
import createGlobe from 'cobe';
import { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';

const Globe3D = forwardRef((props, ref) => {
    const canvasRef = useRef();
    const phi = useRef(0);
    const targetPhi = useRef(0);
    const isFocusing = useRef(false);

    useImperativeHandle(ref, () => ({
        focusOn: (location) => {
            // India Logic:
            // We want to rotate to a specific phase where India is centered.
            // 5.0 = Africa. 5.9 = America (West). 
            // We need East of Africa. So we subtract.
            // 5.0 - 1.5 = 3.5.
            const indiaPhase = 3.5;
            const cycle = Math.PI * 2;

            // Calculate current cycle progress
            const currentRotation = phi.current;

            // Calculate the "base" rotation for the next cycle
            // We want result > current
            // Formula: target = (current - (current % cycle)) + indiaPhase
            let nextTarget = (Math.floor(currentRotation / cycle) * cycle) + indiaPhase;

            // If the calculated target is behind us or too close, add a full cycle
            if (nextTarget < currentRotation + 0.5) {
                nextTarget += cycle;
            }

            targetPhi.current = nextTarget;
            isFocusing.current = true;
        }
    }));

    useEffect(() => {
        let width = 0;
        const onResize = () => canvasRef.current && (width = canvasRef.current.offsetWidth);
        window.addEventListener('resize', onResize);
        onResize();

        const globe = createGlobe(canvasRef.current, {
            devicePixelRatio: 2,
            width: 800,
            height: 800,
            phi: 0,
            theta: 0.15,
            dark: 1,
            diffuse: 2,
            mapSamples: 16000,
            mapBrightness: 10, // Increased to 10 for maximum visibility
            baseColor: [0.05, 0.05, 0.05],
            markerColor: [0.2, 0.5, 1], // Bright Blue to pop
            glowColor: [0.02, 0.1, 0.3], // Blue glow
            opacity: 1,
            markers: [
                { location: [20.5937, 78.9629], size: 0.1 }
            ],
            onRender: (state) => {
                if (isFocusing.current) {
                    // Smoothly interpolate towards target
                    const dist = targetPhi.current - phi.current;
                    const speed = dist * 0.05; // Ease out

                    phi.current += speed;

                    // Stop focusing when close enough
                    if (Math.abs(dist) < 0.01) {
                        isFocusing.current = false;
                        phi.current = targetPhi.current;
                    }
                } else {
                    // Default Auto-Rotation
                    phi.current += 0.003;
                }

                state.phi = phi.current;
            },
        });

        return () => {
            globe.destroy();
            window.removeEventListener('resize', onResize);
        };
    }, []);

    return (
        <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'visible', // Allow canvas to overflow if moved
            // Centered perfectly via flex above.
        }}>
            <canvas
                ref={canvasRef}
                style={{
                    width: '100%',
                    height: '100%',
                    maxWidth: '400px',
                    aspectRatio: '1',
                    transform: 'translateY(-70px)' // Move globe significantly up
                }}
            />
        </div>
    );
});

export default Globe3D;
