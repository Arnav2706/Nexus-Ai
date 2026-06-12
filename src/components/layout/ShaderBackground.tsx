import React, { useEffect, useRef } from 'react';

export const ShaderBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Sync the WebGL drawing-buffer size with the CSS-driven layout size.
    function syncSize() {
      const w = canvas?.clientWidth || 1280;
      const h = canvas?.clientHeight || 720;
      if (canvas && (canvas.width !== w || canvas.height !== h)) {
        canvas.width = w;
        canvas.height = h;
      }
    }

    const observer = new ResizeObserver(syncSize);
    observer.observe(canvas);
    syncSize();

    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) return;
    
    // Typecast to WebGLRenderingContext explicitly inside this block
    const glCtx = gl as WebGLRenderingContext;

    const vs = `attribute vec2 a_position;
varying vec2 v_texCoord;
void main() {
  v_texCoord = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;
    const fs = `precision highp float;
uniform float u_time;
uniform vec2 u_resolution;

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    
    // Subtle scanline / grid effect
    float grid = sin(uv.y * 100.0 + u_time * 0.5) * 0.02;
    float scanline = sin(uv.x * 200.0) * 0.01;
    
    vec3 color = vec3(0.02, 0.02, 0.02); // Very dark background
    color += grid + scanline;
    
    gl_FragColor = vec4(color, 1.0);
}`;

    function cs(type: number, src: string) {
      const s = glCtx.createShader(type);
      if (!s) return null;
      glCtx.shaderSource(s, src);
      glCtx.compileShader(s);
      return s;
    }

    const prog = glCtx.createProgram();
    if (!prog) return;

    const vertexShader = cs(glCtx.VERTEX_SHADER, vs);
    const fragmentShader = cs(glCtx.FRAGMENT_SHADER, fs);
    if (!vertexShader || !fragmentShader) return;

    glCtx.attachShader(prog, vertexShader);
    glCtx.attachShader(prog, fragmentShader);
    glCtx.linkProgram(prog);
    glCtx.useProgram(prog);

    const buf = glCtx.createBuffer();
    glCtx.bindBuffer(glCtx.ARRAY_BUFFER, buf);
    glCtx.bufferData(glCtx.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), glCtx.STATIC_DRAW);
    
    const pos = glCtx.getAttribLocation(prog, 'a_position');
    glCtx.enableVertexAttribArray(pos);
    glCtx.vertexAttribPointer(pos, 2, glCtx.FLOAT, false, 0, 0);
    
    const uTime = glCtx.getUniformLocation(prog, 'u_time');
    const uRes = glCtx.getUniformLocation(prog, 'u_resolution');

    let animationFrameId: number;

    function render(t: number) {
      if (canvas) {
        glCtx.viewport(0, 0, canvas.width, canvas.height);
        if (uTime) glCtx.uniform1f(uTime, t * 0.001);
        if (uRes) glCtx.uniform2f(uRes, canvas.width, canvas.height);
        glCtx.drawArrays(glCtx.TRIANGLE_STRIP, 0, 4);
      }
      animationFrameId = requestAnimationFrame(render);
    }
    
    render(0);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full -z-50 bg-black">
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
};
