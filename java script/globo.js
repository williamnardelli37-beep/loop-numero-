document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("shaderCanvas");
    if (!canvas) return;

    // Configuração da cena Three.js
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, -1);
    
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 1);

    // Vertex Shader
    const vertexShader = `
        attribute vec3 position;
        void main() {
            gl_Position = vec4(position, 1.0);
        }
    `;

    // Fragment Shader para o efeito de ondas neon
    const fragmentShader = `
        precision highp float;
        uniform vec2 resolution;
        uniform float time;
        uniform float xScale;
        uniform float yScale;
        uniform float distortion;

        void main() {
            vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
            
            float d = length(p) * distortion;
            
            float rx = p.x * (1.0 + d);
            float gx = p.x;
            float bx = p.x * (1.0 - d);

            float r = 0.05 / abs(p.y + sin((rx + time) * xScale) * yScale);
            float g = 0.05 / abs(p.y + sin((gx + time) * xScale) * yScale);
            float b = 0.05 / abs(p.y + sin((bx + time) * xScale) * yScale);
            
            gl_FragColor = vec4(r, g, b, 1.0);
        }
    `;

    // Uniforms
    const uniforms = {
        resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        time: { value: 0.0 },
        xScale: { value: 1.0 },
        yScale: { value: 0.5 },
        distortion: { value: 0.05 }
    };

    // Geometria de plano cobrindo a tela
    const positions = new Float32Array([
        -1.0, -1.0, 0.0,
         1.0, -1.0, 0.0,
        -1.0,  1.0, 0.0,
         1.0, -1.0, 0.0,
        -1.0,  1.0, 0.0,
         1.0,  1.0, 0.0,
    ]);

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const material = new THREE.RawShaderMaterial({
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        uniforms: uniforms,
        side: THREE.DoubleSide
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Ajuste de tamanho da tela
    function onWindowResize() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        renderer.setSize(width, height);
        uniforms.resolution.value.set(width, height);
    }

    window.addEventListener("resize", onWindowResize);
    onWindowResize();

    // Loop de Animação
    function animate() {
        requestAnimationFrame(animate);
        uniforms.time.value += 0.01;
        renderer.render(scene, camera);
    }

    animate();
});