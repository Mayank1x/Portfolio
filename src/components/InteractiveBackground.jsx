import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  
  varying float vElevation;
  varying vec2 vUv;

  void main() {
    vUv = uv;
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    
    // Calculate distance from mouse interaction point
    float dist = distance(modelPosition.xy, uMouse);
    float interactionRadius = 4.0;
    
    // Create a "Gravity Well" / Ripple effect
    float influence = 1.0 - smoothstep(0.0, interactionRadius, dist);
    
    // Dynamic ripple based on distance and time
    float ripple = sin(dist * 3.0 - uTime * 3.0) * influence;
    
    // Elevation combines general wave + mouse ripple
    float elevation = ripple * 1.0; // Increased amplitude (was 0.5)
    
    // Add some subtle ambient noise wave
    elevation += sin(modelPosition.x * 0.5 + uTime * 0.5) * sin(modelPosition.y * 0.5 + uTime * 0.5) * 0.2;

    modelPosition.z += elevation;
    vElevation = elevation;

    vec4 viewPosition = viewMatrix * modelPosition;
    gl_Position = projectionMatrix * viewPosition;
  }
`;

const fragmentShader = `
  uniform vec3 uColorLow;
  uniform vec3 uColorHigh;
  
  varying float vElevation;

  void main() {
    // Mix colors based on elevation intensity
    // Base: Dark Grey -> Peak: White
    float mixStrength = (vElevation + 0.5) * 0.6; // Increased mix strength
    vec3 color = mix(uColorLow, uColorHigh, smoothstep(0.0, 1.0, mixStrength));
    
    // Increased base opacity for better visibility
    float alpha = 0.6 + (mixStrength * 0.4);
    
    gl_FragColor = vec4(color, alpha); 
  }
`;

function HolographicGrid({ colorLow, colorHigh }) {
    const mesh = useRef();
    const { viewport } = useThree();

    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uColorLow: { value: new THREE.Color('#111111') },
        uColorHigh: { value: new THREE.Color('#ffffff') }
    }), []);

    // Update uniforms when props change
    useEffect(() => {
        if (mesh.current) {
            mesh.current.material.uniforms.uColorLow.value = colorLow;
            mesh.current.material.uniforms.uColorHigh.value = colorHigh;
        }
    }, [colorLow, colorHigh]);

    // Use internal state for smooth interpolation
    const targetMouse = useRef(new THREE.Vector2(0, 0));

    useEffect(() => {
        const handleMouseMove = (event) => {
            // Convert pixel coordinates to Normalized Device Coordinates (-1 to +1)
            const x = (event.clientX / window.innerWidth) * 2 - 1;
            const y = -(event.clientY / window.innerHeight) * 2 + 1;

            // Map to World Units based on the camera's viewport at z=0
            // This ensures interaction works EVERYWHERE (Navbar, Text, etc.)
            const worldX = x * (viewport.width / 2);
            const worldY = y * (viewport.height / 2);

            targetMouse.current.set(worldX, worldY);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [viewport]);

    useFrame((state) => {
        const { clock } = state;
        if (mesh.current) {
            mesh.current.material.uniforms.uTime.value = clock.elapsedTime;
            // Smoothly interpolate the shader uniform towards the actual intersection point
            mesh.current.material.uniforms.uMouse.value.lerp(targetMouse.current, 0.1);
        }
    });

    return (
        // Lower segment count for performance (was 80, 50)
        <mesh
            ref={mesh}
            rotation={[0, 0, 0]}
        >
            <planeGeometry args={[40, 25, 80, 50]} />
            <shaderMaterial
                wireframe={true}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
                transparent={true}
                side={THREE.DoubleSide}
            />
        </mesh>
    );
}

const InteractiveBackground = () => {
    // Determine initial mode
    const [isLightMode, setIsLightMode] = useState(document.body.classList.contains('light-mode'));

    // Listen for theme changes
    useEffect(() => {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'class') {
                    setIsLightMode(document.body.classList.contains('light-mode'));
                }
            });
        });
        observer.observe(document.body, { attributes: true });
        return () => observer.disconnect();
    }, []);

    // Define colors based on mode
    // Light Mode: White background (#ffffff) means grid should be darker for visibility
    const colorLow = isLightMode ? new THREE.Color('#e0e0e0') : new THREE.Color('#111111');
    const colorHigh = isLightMode ? new THREE.Color('#111111') : new THREE.Color('#ffffff');
    const bg = isLightMode ? '#ffffff' : '#020202';

    return (
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 0,
            background: bg,
            transition: 'background 0.3s ease'
        }}>
            <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
                {/* Rotate the grid slightly for perspective */}
                <group rotation={[Math.PI * 0.15, 0, 0]}>
                    <HolographicGrid colorLow={colorLow} colorHigh={colorHigh} />
                </group>
            </Canvas>
        </div>
    );
};

export default InteractiveBackground;
