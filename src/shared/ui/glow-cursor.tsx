"use client";

import { Mesh, Program, Renderer, Triangle } from "ogl";
import { useEffect, useRef } from "react";
import { cn } from "@/shared/lib/cn";

const MAX_POINTS = 64;

type BlendMode = "normal" | "screen" | "plus-lighter";

export type GlowCursorProps = {
  color?: string;
  secondaryColor?: string;
  trailLength?: number;
  trailWidth?: number;
  trailTaper?: number;
  followSpeed?: number;
  glowIntensity?: number;
  glowSpread?: number;
  hotspot?: number;
  brightness?: number;
  opacity?: number;
  pulseSpeed?: number;
  noiseStrength?: number;
  /** Also fade while the pointer rests inside (leaving always fades). */
  idleFade?: boolean;
  idleTimeout?: number;
  fadeDuration?: number;
  /** "screen" for dark sections; on light ones it is invisible, use "normal". */
  blendMode?: BlendMode;
  maxDevicePixelRatio?: number;
  enabled?: boolean;
  className?: string;
};

type GlowCursorConfig = Required<Omit<GlowCursorProps, "className">>;

const VERTEX_SHADER = `
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER = `
precision highp float;

#define MAX_POINTS 64

uniform vec2 uResolution;
uniform vec2 uPoints[MAX_POINTS];
uniform float uPointCount;
uniform vec3 uColor;
uniform vec3 uSecondaryColor;
uniform float uTrailWidth;
uniform float uTaper;
uniform float uGlowIntensity;
uniform float uGlowSpread;
uniform float uHotspot;
uniform float uBrightness;
uniform float uOpacity;
uniform float uPulseSpeed;
uniform float uNoiseStrength;
uniform float uNormalBlend;
uniform float uTime;
uniform float uFade;

varying vec2 vUv;

float sRGB(float x) {
  if (x <= 0.00031308) return 12.92 * x;
  return 1.055 * pow(x, 1.0 / 2.4) - 0.055;
}

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float filmGrain(vec2 p, float time) {
  float frame = time * 18.0;
  float frameIndex = mod(floor(frame), 256.0);
  float nextFrameIndex = mod(frameIndex + 1.0, 256.0);
  float blend = fract(frame);
  blend = blend * blend * (3.0 - 2.0 * blend);
  vec2 pixel = floor(p);
  float current = hash(pixel + vec2(frameIndex * 17.0, frameIndex * 31.0));
  float next = hash(pixel + vec2(nextFrameIndex * 17.0, nextFrameIndex * 31.0));
  return mix(current, next, blend) * 2.0 - 1.0;
}

void main() {
  vec2 pixel = vUv * uResolution;
  float denominator = max(uPointCount - 1.0, 1.0);
  float strongest = 0.0;
  float strongestCore = 0.0;
  float colorWeight = 0.0;
  vec3 colorSum = vec3(0.0);

  for (int i = 0; i < MAX_POINTS - 1; i++) {
    float index = float(i);
    // Segments past the trail contribute nothing; stop instead of looping
    // all 63 per pixel (a 16-point trail does a quarter of the work).
    if (index >= uPointCount - 1.0) break;
    float active = 1.0 - step(uPointCount - 1.0, index);
    vec2 start = uPoints[i];
    vec2 end = uPoints[i + 1];
    vec2 toPixel = pixel - start;
    vec2 segment = end - start;
    float along = clamp(dot(toPixel, segment) / max(dot(segment, segment), 0.0001), 0.0, 1.0);
    float progress = clamp((index + along) / denominator, 0.0, 1.0);
    float life = pow(max(1.0 - progress, 0.0), mix(0.55, 1.25, uTaper));
    float width = uTrailWidth * mix(1.0, 0.25, pow(progress, mix(0.55, 1.6, uTaper)));
    float distanceToTrail = length(toPixel - segment * along);
    float falloff = max(width * (0.8 + uGlowSpread * 1.4), 0.5);
    float beam = min(1.0, (falloff * falloff) / (distanceToTrail * distanceToTrail + falloff * falloff));
    float core = exp(-pow(distanceToTrail / max(width, 0.5), 2.0) * 2.5);
    float pulseAmount = min(abs(uPulseSpeed), 1.0);
    float pulse = 1.0 + sin(uTime * uPulseSpeed * 3.0 - progress * 11.0) * 0.16 * pulseAmount;
    float intensity = (core + beam * uGlowIntensity * 0.55) * life * pulse * active;
    vec3 segmentColor = mix(uColor, uSecondaryColor, progress);

    strongest = max(strongest, intensity);
    strongestCore = max(strongestCore, core * life * active);
    colorSum += segmentColor * intensity;
    colorWeight += intensity;
  }

  float grain = filmGrain(pixel, uTime);
  float noiseAmount = (1.0 - exp(-uNoiseStrength * 2.2)) * 0.4;
  float alpha = clamp(strongest * uOpacity * uFade, 0.0, 1.0);
  if (alpha < 0.0005) discard;

  vec3 color = colorSum / max(colorWeight, 0.0001);
  color = mix(color, vec3(1.0), smoothstep(0.25, 0.95, strongestCore) * uHotspot);
  float luminance = sRGB(clamp(strongest * uBrightness, 0.0, 1.0));
  luminance *= 1.0 + grain * noiseAmount;
  vec3 additiveColor = color * luminance;
  float normalAlpha = clamp(strongest * uBrightness * uOpacity * uFade, 0.0, 1.0);
  vec3 normalColor = mix(color, vec3(1.0), smoothstep(0.45, 1.0, strongestCore) * uHotspot * 0.35);
  gl_FragColor = vec4(mix(additiveColor, normalColor, uNormalBlend), mix(alpha, normalAlpha, uNormalBlend));
}
`;

const hexToRgb = (hex: string): [number, number, number] => {
  let value = (hex || "").replace("#", "").trim();
  if (value.length === 3)
    value = value
      .split("")
      .map((char) => char + char)
      .join("");
  const parsed = Number.parseInt(value || "000000", 16);
  return [
    ((parsed >> 16) & 255) / 255,
    ((parsed >> 8) & 255) / 255,
    (parsed & 255) / 255,
  ];
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

/**
 * A glowing trail that follows the pointer (WebGL via ogl). A background
 * layer, not a wrapper: drop it as a child of a `relative isolate` section and
 * it listens to pointer movement on that parent and paints behind the content
 * (`-z-10`). Built to be rationed (a few sections, not every one):
 * - off for touch-only devices and prefers-reduced-motion (renders nothing);
 * - the WebGL context is created on the first hover, not on page load;
 * - the render loop runs only while the section is on screen and the trail is
 *   visible, and sleeps otherwise;
 * - leaving the section always fades the trail out.
 */
export function GlowCursor({
  color = "#67E8F9",
  secondaryColor = "#A78BFA",
  trailLength = 40,
  trailWidth = 8,
  trailTaper = 0.8,
  followSpeed = 0.16,
  glowIntensity = 1.9,
  glowSpread = 1.2,
  hotspot = 0.65,
  brightness = 1.25,
  opacity = 1,
  pulseSpeed = 1.1,
  noiseStrength = 0.035,
  idleFade = true,
  idleTimeout = 700,
  fadeDuration = 900,
  blendMode = "screen",
  maxDevicePixelRatio = 1.5,
  enabled = true,
  className,
}: GlowCursorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const propsRef = useRef<GlowCursorConfig>({} as GlowCursorConfig);

  propsRef.current = {
    color,
    secondaryColor,
    trailLength,
    trailWidth,
    trailTaper,
    followSpeed,
    glowIntensity,
    glowSpread,
    hotspot,
    brightness,
    opacity,
    pulseSpeed,
    noiseStrength,
    idleFade,
    idleTimeout,
    fadeDuration,
    maxDevicePixelRatio,
    blendMode,
    enabled,
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;
    // A pointer trail means nothing on touch screens, and it is motion.
    if (
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;

    const pointData: number[] = Array(MAX_POINTS * 2).fill(0);
    const points = Array.from({ length: MAX_POINTS }, () => ({ x: 0, y: 0 }));
    const target = { x: 0, y: 0 };
    const head = { x: 0, y: 0 };

    let gl: {
      renderer: Renderer;
      program: Program;
      mesh: Mesh;
    } | null = null;
    let initialized = false;
    let pointerInside = false;
    let onScreen = true;
    let fade = 0;
    let lastInputTime = performance.now();
    let lastFrameTime = performance.now();
    let raf = 0;
    let running = false;
    let destroyed = false;

    const resize = () => {
      if (!gl) return;
      const width = Math.max(host.clientWidth, 1);
      const height = Math.max(host.clientHeight, 1);
      gl.renderer.setSize(width, height);
      gl.program.uniforms.uResolution.value = [width, height];
    };

    // Created on the first hover, so pages don't pay for WebGL up front.
    const createGl = () => {
      const config = propsRef.current;
      const renderer = new Renderer({
        canvas,
        alpha: true,
        dpr: Math.min(window.devicePixelRatio || 1, config.maxDevicePixelRatio),
      });
      renderer.gl.clearColor(0, 0, 0, 0);
      const program = new Program(renderer.gl, {
        vertex: VERTEX_SHADER,
        fragment: FRAGMENT_SHADER,
        uniforms: {
          uResolution: { value: [1, 1] },
          uPoints: { value: pointData },
          uPointCount: { value: config.trailLength },
          uColor: { value: hexToRgb(config.color) },
          uSecondaryColor: { value: hexToRgb(config.secondaryColor) },
          uTrailWidth: { value: config.trailWidth },
          uTaper: { value: config.trailTaper },
          uGlowIntensity: { value: config.glowIntensity },
          uGlowSpread: { value: config.glowSpread },
          uHotspot: { value: config.hotspot },
          uBrightness: { value: config.brightness },
          uOpacity: { value: config.opacity },
          uPulseSpeed: { value: config.pulseSpeed },
          uNoiseStrength: { value: config.noiseStrength },
          uNormalBlend: { value: config.blendMode === "normal" ? 1 : 0 },
          uTime: { value: 0 },
          uFade: { value: 0 },
        },
        transparent: true,
        depthTest: false,
        depthWrite: false,
      });
      const mesh = new Mesh(renderer.gl, {
        geometry: new Triangle(renderer.gl),
        program,
      });
      gl = { renderer, program, mesh };
      resize();
    };

    const initializeTrail = (x: number, y: number) => {
      target.x = x;
      target.y = y;
      head.x = x;
      head.y = y;
      for (const point of points) {
        point.x = x;
        point.y = y;
      }
      initialized = true;
      fade = 1;
    };

    const render = (now: number) => {
      if (destroyed || !gl) return;
      const config = propsRef.current;
      const { program, renderer, mesh } = gl;
      const delta = Math.min((now - lastFrameTime) / 16.667, 3);
      lastFrameTime = now;

      if (initialized) {
        const headEase =
          1 - (1 - clamp(config.followSpeed, 0.01, 0.99)) ** delta;
        const chainBase = clamp(0.28 + config.followSpeed * 0.35, 0.08, 0.92);
        const chainEase = 1 - (1 - chainBase) ** delta;
        head.x += (target.x - head.x) * headEase;
        head.y += (target.y - head.y) * headEase;
        points[0].x = head.x;
        points[0].y = head.y;

        for (let i = 1; i < MAX_POINTS; i++) {
          points[i].x += (points[i - 1].x - points[i].x) * chainEase;
          points[i].y += (points[i - 1].y - points[i].y) * chainEase;
        }

        for (let i = 0; i < MAX_POINTS; i++) {
          pointData[i * 2] = points[i].x;
          pointData[i * 2 + 1] = points[i].y;
        }
      }

      const idleFor = now - lastInputTime;
      const shouldFade =
        !pointerInside || (config.idleFade && idleFor > config.idleTimeout);
      const fadeStep = (16.667 * delta) / Math.max(config.fadeDuration, 16);
      const fadeTarget = initialized && config.enabled && !shouldFade ? 1 : 0;
      fade += (fadeTarget - fade) * Math.min(1, fadeStep * 7);

      const u = program.uniforms;
      u.uPointCount.value = clamp(
        Math.round(config.trailLength),
        2,
        MAX_POINTS,
      );
      u.uColor.value = hexToRgb(config.color);
      u.uSecondaryColor.value = hexToRgb(config.secondaryColor);
      u.uTrailWidth.value = Math.max(config.trailWidth, 0.1);
      u.uTaper.value = clamp(config.trailTaper, 0, 1);
      u.uGlowIntensity.value = Math.max(config.glowIntensity, 0);
      u.uGlowSpread.value = Math.max(config.glowSpread, 0);
      u.uHotspot.value = clamp(config.hotspot, 0, 1);
      u.uBrightness.value = Math.max(config.brightness, 0);
      u.uOpacity.value = clamp(config.opacity, 0, 1);
      u.uPulseSpeed.value = config.pulseSpeed;
      u.uNoiseStrength.value = clamp(config.noiseStrength, 0, 1);
      u.uNormalBlend.value = config.blendMode === "normal" ? 1 : 0;
      u.uTime.value = now * 0.001;
      u.uFade.value = fade;

      renderer.render({ scene: mesh });

      // Sleep once the trail has faded out or the section left the screen;
      // the next pointer event wakes the loop.
      if (onScreen && (pointerInside || fade > 0.002)) {
        raf = requestAnimationFrame(render);
      } else {
        running = false;
        if (fade <= 0.002) {
          u.uFade.value = 0;
          renderer.render({ scene: mesh });
        }
      }
    };

    const wake = () => {
      if (running || destroyed || !onScreen) return;
      running = true;
      lastFrameTime = performance.now();
      raf = requestAnimationFrame(render);
    };

    const updatePointer = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      if (!gl) createGl();
      const rect = host.getBoundingClientRect();
      const x = clamp(event.clientX - rect.left, 0, rect.width);
      const y = clamp(rect.height - (event.clientY - rect.top), 0, rect.height);
      if (!initialized) initializeTrail(x, y);
      target.x = x;
      target.y = y;
      pointerInside = true;
      lastInputTime = performance.now();
      wake();
    };

    const onPointerLeave = () => {
      pointerInside = false;
      lastInputTime = performance.now();
      wake();
    };

    const visibility = new IntersectionObserver(([entry]) => {
      onScreen = entry?.isIntersecting ?? true;
      if (onScreen && (pointerInside || fade > 0.002)) wake();
    });
    visibility.observe(host);
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);
    host.addEventListener("pointermove", updatePointer);
    host.addEventListener("pointerenter", updatePointer);
    host.addEventListener("pointerleave", onPointerLeave);

    return () => {
      destroyed = true;
      cancelAnimationFrame(raf);
      visibility.disconnect();
      resizeObserver.disconnect();
      host.removeEventListener("pointermove", updatePointer);
      host.removeEventListener("pointerenter", updatePointer);
      host.removeEventListener("pointerleave", onPointerLeave);
      if (gl) {
        gl.mesh.geometry.remove();
        gl.program.remove();
        // Hand the context back; browsers cap live WebGL contexts per page.
        gl.renderer.gl.getExtension("WEBGL_lose_context")?.loseContext();
      }
    };
  }, []);

  return (
    // biome-ignore lint/a11y/noAriaHiddenOnFocusable: a canvas without tabindex is not focusable; this one is purely decorative
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 block h-full w-full select-none",
        className,
      )}
      style={{ mixBlendMode: blendMode }}
    />
  );
}

/**
 * The site's glow, with the brand settings in one place. `tone="dark"` is for
 * ink sections (screen blending, as specified); `tone="light"` switches to
 * normal blending, since screen adds nothing on white, and softens it so it
 * never fights the copy it passes behind.
 */
export function BrandGlow({ tone = "dark" }: { tone?: "light" | "dark" }) {
  const light = tone === "light";
  return (
    <GlowCursor
      color="#0788FD"
      secondaryColor="#0785FD"
      trailLength={16}
      trailWidth={8}
      trailTaper={0.8}
      followSpeed={0.24}
      glowIntensity={1.2}
      glowSpread={1.3}
      hotspot={0.65}
      brightness={1.25}
      opacity={light ? 0.55 : 1}
      pulseSpeed={2}
      noiseStrength={0.075}
      idleFade={false}
      idleTimeout={900}
      fadeDuration={900}
      blendMode={light ? "normal" : "screen"}
    />
  );
}
