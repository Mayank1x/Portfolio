import { useRef, useEffect } from "react";
import { Renderer, Camera, Transform, Plane, Program, Mesh } from "ogl";

const vertex = `
  attribute vec3 position;
  attribute vec2 uv;
  uniform mat4 modelViewMatrix;
  uniform mat4 projectionMatrix;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragment = `
  precision highp float;
  uniform float uTime;
  uniform vec3 uColor;
  uniform float uResolution;
  uniform vec2 uMouse;
  varying vec2 vUv;

  // Noise functions
  float random(in vec2 _st) {
      return fract(sin(dot(_st.xy, vec2(12.9898,78.233))) * 43758.5453123);
  }

  // Value Noise by Inigo Quilez - iq/2013
  // https://www.shadertoy.com/view/lsf3WH
  float noise(in vec2 st) {
      vec2 i = floor(st);
      vec2 f = fract(st);
      vec2 u = f*f*(3.0-2.0*f);
      return mix( mix( random( i + vec2(0.0,0.0) ),
                       random( i + vec2(1.0,0.0) ), u.x),
                  mix( random( i + vec2(0.0,1.0) ),
                       random( i + vec2(1.0,1.0) ), u.x), u.y);
  }

  void main() {
    vec2 st = vUv;
    float t = uTime * 0.5;

    // Fluid distortion
    float n = noise(st * 3.0 + t);
    float n2 = noise(st * 6.0 - t * 0.5);
    
    // Laser lines
    float line = smoothstep(0.48, 0.5, abs(sin(st.y * 20.0 + n * 2.0 + t)));
    float glow = 0.05 / abs(sin(st.y * 20.0 + n * 2.0 + t));
    
    // Combine for laser effect
    vec3 color = uColor * (line * 0.2 + glow * 1.5);
    
    // Fade edges
    float alpha = smoothstep(0.0, 0.2, st.x) * smoothstep(1.0, 0.8, st.x);
    alpha *= smoothstep(0.0, 0.2, st.y) * smoothstep(1.0, 0.8, st.y);

    gl_FragColor = vec4(color, alpha * (n2 * 0.5 + 0.5));
  }
`;

const LaserFlow = ({
    color = "#ff0000",
    speed = 1,
    className = "",
    style = {}
}) => {
    const containerRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const renderer = new Renderer({ alpha: true, dpr: 2 });
        const gl = renderer.gl;
        containerRef.current.appendChild(gl.canvas);

        const camera = new Camera(gl);
        camera.position.z = 5;

        const scene = new Transform();
        const geometry = new Plane(gl, { width: 10, height: 10, widthSegments: 20, heightSegments: 20 });

        const program = new Program(gl, {
            vertex,
            fragment,
            uniforms: {
                uTime: { value: 0 },
                uColor: { value: hexToRgb(color) },
                uResolution: { value: 1.0 },
            },
            transparent: true,
            depthTest: false
        });

        const mesh = new Mesh(gl, { geometry, program });
        mesh.setParent(scene);

        let animationId;
        function update(t) {
            animationId = requestAnimationFrame(update);
            program.uniforms.uTime.value = t * 0.001 * speed;
            renderer.render({ scene, camera });
        }
        animationId = requestAnimationFrame(update);

        const handleResize = () => {
            renderer.setSize(containerRef.current.offsetWidth, containerRef.current.offsetHeight);
            camera.perspective({ aspect: gl.canvas.width / gl.canvas.height });
        };
        handleResize();
        window.addEventListener("resize", handleResize);

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener("resize", handleResize);
            if (containerRef.current && containerRef.current.contains(gl.canvas)) {
                containerRef.current.removeChild(gl.canvas);
            }
        };
    }, [color, speed]);

    return <div ref={containerRef} className={className} style={{ width: "100%", height: "100%", ...style }} />;
};

// Helper for color conversion
function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? [parseInt(result[1], 16) / 255, parseInt(result[2], 16) / 255, parseInt(result[3], 16) / 255]
        : [1, 1, 1];
}

export default LaserFlow;
