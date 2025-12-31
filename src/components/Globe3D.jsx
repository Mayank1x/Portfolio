
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

        let globe;

        const observer = new IntersectionObserver(([entry]) => {
            // If intersecting, resume. If not, pause.
            if (entry.isIntersecting) {
                canvasRef.current.style.opacity = 1;
                // Re-init if needed or just let the loop run
            } else {
                canvasRef.current.style.opacity = 0; // Optional fade
            }
            // We can't easily "stop" cobe's loop without destroying, 
            // but we can make the onRender extremely cheap.
            canvasRef.current.dataset.visible = entry.isIntersecting;
        }, { threshold: 0 });

        if (canvasRef.current) observer.observe(canvasRef.current);

        globe = createGlobe(canvasRef.current, {
            devicePixelRatio: 2,
            width: 800,
            height: 800,
            phi: 0,
            theta: 0.15,
            dark: 1,
            diffuse: 1.2,
            mapSamples: 4500, // Reduced from 12000
            mapBrightness: 6,
            baseColor: [0.3, 0.3, 0.3],
            markerColor: [0.2, 0.5, 1],
            glowColor: [0.02, 0.1, 0.3],
            opacity: 1,
            markers: [
                { location: [20.5937, 78.9629], size: 0.1 }
            ],
            onRender: (state) => {
                // Optimization: Skip calculations if not visible
                if (canvasRef.current.dataset.visible === 'false') return;

                if (isFocusing.current) {
                    const dist = targetPhi.current - phi.current;
                    const speed = dist * 0.05;
                    phi.current += speed;
                    if (Math.abs(dist) < 0.01) {
                        isFocusing.current = false;
                        phi.current = targetPhi.current;
                    }
                } else {
                    phi.current += 0.003;
                }
                state.phi = phi.current;
            },
        });

        return () => {
            globe.destroy();
            window.removeEventListener('resize', onResize);
            observer.disconnect();
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
