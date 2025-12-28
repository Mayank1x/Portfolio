import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
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
    float elevation = ripple * 0.5; // Much lower amplitude (was 1.5)
    
    // Add some subtle ambient noise wave
    elevation += sin(modelPosition.x * 0.5 + uTime * 0.5) * sin(modelPosition.y * 0.5 + uTime * 0.5) * 0.1;

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
    // Subtle mix: mostly base color, only slightly lighter at peaks
    float mixStrength = (vElevation + 0.5) * 0.4; // Reduced opacity/mix
    vec3 color = mix(uColorLow, uColorHigh, smoothstep(0.0, 1.0, mixStrength));
    
    // Variable opacity based on intensity to make it fade into background more
    float alpha = 0.4 + (mixStrength * 0.6);
    
    gl_FragColor = vec4(color, alpha); 
  }
`;

function HolographicGrid() {
    const mesh = useRef();

    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uColorLow: { value: new THREE.Color('#111111') }, // Dark Grey
        uColorHigh: { value: new THREE.Color('#ffffff') } // Pure White
    }), []);

    useFrame((state) => {
        const { clock, mouse, viewport } = state;
        if (mesh.current) {
            mesh.current.material.uniforms.uTime.value = clock.elapsedTime;

            // Map mouse to world coordinates (approximate for z=0 plane)
            const x = (mouse.x * viewport.width) / 2;
            const y = (mouse.y * viewport.height) / 2;

            // Smooth follow
            mesh.current.material.uniforms.uMouse.value.lerp(new THREE.Vector2(x, y), 0.12);
        }
    });

    return (
        // Lower segment count for performance (was 80, 50)
        <mesh ref={mesh} rotation={[0, 0, 0]}>
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
    return (
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 0,
            // Even darker background
            background: '#020202'
        }}>
            <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
                {/* Rotate the grid slightly for perspective */}
                <group rotation={[Math.PI * 0.15, 0, 0]}>
                    <HolographicGrid />
                </group>
            </Canvas>
        </div>
    );
};

export default InteractiveBackground;
