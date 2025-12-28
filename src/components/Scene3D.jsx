import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Stars } from '@react-three/drei';
import * as THREE from 'three';

function Laptop() {
    const groupRef = useRef();

    useFrame((state, delta) => {
        // Gentle floating rotation
        groupRef.current.rotation.y += delta * 0.2;
        // Gentle hovering
        groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2;
    });

    return (
        <group ref={groupRef} rotation={[0.4, 0, 0]}>
            {/* === LAPTOP BASE === */}
            <mesh position={[0, -0.2, 0]}>
                <boxGeometry args={[4, 0.2, 3]} />
                <meshStandardMaterial color="#333" roughness={0.5} metalness={0.8} />
            </mesh>

            {/* === LAPTOP SCREEN (Lid) === */}
            {/* Pivoted slightly back */}
            <group position={[0, -0.1, -1.5]} rotation={[-0.4, 0, 0]}>
                <mesh position={[0, 1.5, 0]}> {/* Offset so it rotates from hinge */}
                    <boxGeometry args={[4, 3, 0.1]} />
                    <meshStandardMaterial color="#222" roughness={0.5} metalness={0.8} />
                </mesh>

                {/* Screen Glow (Display) */}
                <mesh position={[0, 1.5, 0.06]}>
                    <planeGeometry args={[3.8, 2.8]} />
                    <meshBasicMaterial color="#000" />
                </mesh>
            </group>

            {/* === HOLOGRAM BEAM === */}
            {/* A cone of light coming from the keyboard area */}
            <mesh position={[0, 1.5, 0]} rotation={[0, 0, 0]}>
                {/* Cone: top radius, bottom radius, height */}
                <coneGeometry args={[1.5, 3.5, 4, 32, 1, true]} />
                <meshBasicMaterial
                    color="#00ffff"
                    transparent
                    opacity={0.1}
                    side={THREE.DoubleSide}
                    blending={THREE.AdditiveBlending}
                    depthWrite={false}
                />
            </mesh>

            {/* === HOLOGRAM TEXT === */}
            <Text
                position={[0, 2, 0]}
                fontSize={0.4}
                color="#00ffff"
                anchorX="center"
                anchorY="middle"
                outlineWidth={0.01}
                outlineColor="#0088ff"
            >
                Hi, Myself Mayank
            </Text>
        </group>
    );
}

const Scene3D = () => {
    return (
        <div style={{ height: '100%', width: '100%' }}>
            <Canvas dpr={[1, 2]} camera={{ position: [0, 2, 8], fov: 50 }}>
                {/* Blue-ish Ambient Light for Sci-Fi feel */}
                <ambientLight intensity={0.5} color="#0044ff" />

                {/* Spotlight hitting the laptop */}
                <spotLight position={[10, 10, 10]} angle={0.5} penumbra={1} intensity={2} color="#ffffff" />
                <pointLight position={[-10, -10, -10]} intensity={1} color="#00ffff" />

                <Suspense fallback={null}>
                    <Laptop />
                </Suspense>

                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                <fog attach="fog" args={['#000000', 5, 20]} />
            </Canvas>
        </div>
    );
};

export default Scene3D;
