// Globe Mesh — Originkit
// Originkit — props baked into the default export.
"use client"

import * as React from "react"
import { useEffect, useRef } from "react"
import * as THREE from "three"

const PERSPECTIVE = 0.15
const SOURCES = 3
const CAGE = 1.18
const DRAG = 0.021

const DEFAULTS = {
    dot: "#FFFFFF",
    net: "#26FF00",
    density: 20,
    spin: 20,
    spinDir: "right" as const,
    hoverOn: true,
    sizePercent: 100,
    dots: { size: 8, wobble: 6, flicker: 7 },
    cage: { detail: 1, spread: 8, glow: 11 },
    shimmer: { color: "#D8CCFF", speed: 9, style: "sweep" as const, angle: 90, width: 7 },
    waves: { color: "#6FA8FF", color2: "#FF5E8F", size: 9, glow: 11, speed: 7 },
    hover: { fill: 9, glow: 11, reach: 9 },
}

type DotOptions = { size: number; wobble: number; flicker: number }
type CageOptions = { detail: number; spread: number; glow: number }
type ShimmerOptions = { color: string; speed: number; style: "edge" | "sweep"; angle: number; width: number }
type WaveOptions = { color: string; color2: string; size: number; glow: number; speed: number }
type HoverOptions = { fill: number; glow: number; reach: number }

type Config = {
    dot: string
    net: string
    density: number
    spin: number
    spinDir: "left" | "right"
    hoverOn: boolean
    sizePercent: number
    dots?: DotOptions
    cage?: CageOptions
    shimmer?: ShimmerOptions
    waves?: WaveOptions
    hover?: HoverOptions
}

function clamp(v: number, lo: number, hi: number, fallback: number): number {
    const n = typeof v === "number" && isFinite(v) ? v : fallback
    return Math.max(lo, Math.min(hi, n))
}

function settingsFor(cfg: Config) {
    const d = cfg.dots || DEFAULTS.dots
    const cg = cfg.cage || DEFAULTS.cage
    const sh = cfg.shimmer || DEFAULTS.shimmer
    const wv = cfg.waves || DEFAULTS.waves
    const hv = cfg.hover || DEFAULTS.hover
    const on = cfg.hoverOn === false ? 0 : 1
    const density = clamp(cfg.density, 1, 20, DEFAULTS.density)
    const cageSpread = clamp(cg.spread, 1, 20, DEFAULTS.cage.spread)
    return {
        points: Math.round(300 + density * density * 22),
        dotSize: 0.004 + clamp(d.size, 1, 20, DEFAULTS.dots.size) * 0.0013,
        wobble: clamp(d.wobble, 0, 20, DEFAULTS.dots.wobble) * 0.0055,
        flicker: clamp(d.flicker, 0, 20, DEFAULTS.dots.flicker) * 0.042,
        detail: Math.round(clamp(cg.detail, 0, 4, DEFAULTS.cage.detail)),
        cage: CAGE + (cageSpread - 8) * 0.022,
        netGlow: clamp(cg.glow, 0, 20, DEFAULTS.cage.glow) * 0.075,
        shimmer: clamp(sh.speed, 0, 20, DEFAULTS.shimmer.speed) * 0.03,
        edgeMix: sh.style === "sweep" ? 0 : 1,
        sweepMix: sh.style === "sweep" ? 1 : 0,
        sweepAxis: clamp(sh.angle, 0, 360, DEFAULTS.shimmer.angle) * (Math.PI / 180),
        sweepWidth: 0.05 + clamp(sh.width, 1, 20, DEFAULTS.shimmer.width) * 0.022,
        spread: 0.12 + clamp(wv.size, 1, 20, DEFAULTS.waves.size) * 0.045,
        intensity: clamp(wv.glow, 0, 20, DEFAULTS.waves.glow) * 0.075,
        wave: clamp(wv.speed, 0, 20, DEFAULTS.waves.speed) * 0.11,
        hoverFill: on * clamp(hv.fill, 0, 20, DEFAULTS.hover.fill) * 0.007,
        hoverGlow: on * clamp(hv.glow, 0, 20, DEFAULTS.hover.glow) * 0.09,
        hoverArc: 0.25 + clamp(hv.reach, 1, 20, DEFAULTS.hover.reach) * 0.055,
        hoverOn: on,
        spin: clamp(cfg.spin, 0, 20, DEFAULTS.spin) * 0.055 * (cfg.spinDir === "left" ? -1 : 1),
        radius: 1,
    }
}

function buildPoints(count: number): THREE.BufferGeometry {
    const dirs = new Float32Array(count * 3)
    const seeds = new Float32Array(count)
    const golden = Math.PI * (3 - Math.sqrt(5))
    for (let i = 0; i < count; i++) {
        const y = 1 - (i / Math.max(1, count - 1)) * 2
        const r = Math.sqrt(Math.max(0, 1 - y * y))
        const a = golden * i
        dirs[i * 3] = Math.cos(a) * r
        dirs[i * 3 + 1] = y
        dirs[i * 3 + 2] = Math.sin(a) * r
        seeds[i] = Math.abs(Math.sin(i * 127.1 + 311.7) * 43758.5453) % 1
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute("position", new THREE.BufferAttribute(dirs, 3))
    g.setAttribute("aDir", new THREE.BufferAttribute(dirs, 3))
    g.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1))
    g.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 2)
    return g
}

function buildCage(radius: number, detail: number) {
    const solid = new THREE.IcosahedronGeometry(radius, detail)
    const edges = new THREE.EdgesGeometry(solid)
    const pos = edges.attributes.position
    const n = pos.count
    const param = new Float32Array(n)
    const edgeSeed = new Float32Array(n)
    for (let i = 0; i < n; i += 2) {
        param[i] = 0
        param[i + 1] = 1
        const mx = (pos.getX(i) + pos.getX(i + 1)) * 0.5
        const my = (pos.getY(i) + pos.getY(i + 1)) * 0.5
        const mz = (pos.getZ(i) + pos.getZ(i + 1)) * 0.5
        edgeSeed[i] = Math.abs(Math.sin(mx * 127.1 + my * 311.7 + mz * 74.7) * 43758.5453) % 1
        edgeSeed[i + 1] = edgeSeed[i]
    }
    edges.setAttribute("aEdge", new THREE.BufferAttribute(param, 1))
    edges.setAttribute("aSeed", new THREE.BufferAttribute(edgeSeed, 1))

    const fp = solid.attributes.position
    const verts = fp.count
    const face = new Float32Array(verts * 3)
    const faceSeed = new Float32Array(verts)
    for (let i = 0; i < verts; i += 3) {
        let cx = 0, cy = 0, cz = 0
        for (let k = 0; k < 3; k++) {
            cx += fp.getX(i + k); cy += fp.getY(i + k); cz += fp.getZ(i + k)
        }
        cx /= 3; cy /= 3; cz /= 3
        const s = Math.abs(Math.sin(cx * 269.5 + cy * 183.3 + cz * 246.1) * 43758.5453) % 1
        for (let k = 0; k < 3; k++) {
            face[(i + k) * 3] = cx; face[(i + k) * 3 + 1] = cy; face[(i + k) * 3 + 2] = cz; faceSeed[i + k] = s
        }
    }
    solid.setAttribute("aFace", new THREE.BufferAttribute(face, 3))
    solid.setAttribute("aSeed", new THREE.BufferAttribute(faceSeed, 1))
    return { edges, panels: solid }
}

const SOURCE_GLSL = /* glsl */ `
#define SOURCES ${SOURCES}
uniform vec3 uSource[SOURCES];
uniform vec3 uSourceColor[SOURCES];
uniform float uSpread;
uniform float uIntensity;
uniform float uWave;
uniform float uTime;
uniform vec3 uHoverDir;
uniform float uHover;
uniform float uHoverArc;
vec3 sourceLight(vec3 dir) {
  vec3 lit = vec3(0.0);
  for (int i = 0; i < SOURCES; i++) {
    float ang = acos(clamp(dot(dir, uSource[i]), -1.0, 1.0));
    float reach = smoothstep(uSpread, 0.0, ang);
    float ripple = 0.5 + 0.5 * sin(ang * 9.0 - uTime * uWave * 3.0);
    lit += uSourceColor[i] * reach * (0.55 + ripple * 0.75);
  }
  return lit * uIntensity;
}
float hoverNear(vec3 dir) {
  float ang = acos(clamp(dot(dir, uHoverDir), -1.0, 1.0));
  return smoothstep(uHoverArc, 0.0, ang) * uHover;
}`

const SWEEP_GLSL = /* glsl */ `
uniform float uSweepAxis;
float sweepCoord(vec3 worldDir) {
  return dot(worldDir, vec3(cos(uSweepAxis), sin(uSweepAxis), 0.0));
}`

const BAND_GLSL = /* glsl */ `
uniform float uSweepWidth;
uniform float uSweepMix;
float sweepBand(float coord, float time, float rate) {
  float head = mix(1.3, -1.3, fract(time * rate * 0.5));
  float d = coord - head;
  return exp(-(d * d) / (uSweepWidth * uSweepWidth)) * uSweepMix;
}`

const POINT_VERTEX = /* glsl */ `
attribute vec3 aDir;
attribute float aSeed;
uniform float uRadius;
uniform float uDotSize;
uniform float uWobble;
uniform float uFlicker;
uniform float uViewHeight;
varying float vFacing;
varying float vLit;
varying vec3 vGlow;
varying float vSeed;
varying float vNear;
varying float vFlick;
${SOURCE_GLSL}
void main() {
  vec3 glow = sourceLight(aDir); vGlow = glow;
  vLit = min(1.0, max(max(glow.r, glow.g), glow.b)); vSeed = aSeed; vNear = hoverNear(aDir);
  float w = sin(aDir.x * 4.1 + uTime * 1.7) * cos(aDir.y * 3.3 - uTime * 1.3) * sin(aDir.z * 3.9 + uTime * 0.9 + aSeed * 0.6);
  float rate = 1.4 + aSeed * 4.6;
  float f = sin(uTime * rate + aSeed * 61.0) * 0.6 + sin(uTime * rate * 1.7 + aSeed * 23.0) * 0.4;
  vFlick = 1.0 - uFlicker * (1.0 - (0.5 + 0.5 * f));
  float r = uRadius * (1.0 + w * uWobble + vLit * 0.03 + vNear * 0.02);
  vec4 mv = modelViewMatrix * vec4(aDir * r, 1.0);
  vec3 n = normalize((modelViewMatrix * vec4(aDir, 0.0)).xyz); vFacing = dot(n, normalize(-mv.xyz));
  float size = uDotSize * (1.0 + vLit * 0.5 + vNear * 0.6) * mix(1.0, vFlick, 0.35);
  gl_PointSize = max(size * (uViewHeight * projectionMatrix[1][1]) / (-2.0 * mv.z), 0.0);
  gl_Position = projectionMatrix * mv;
}`

const POINT_FRAGMENT = /* glsl */ `
precision highp float;
uniform vec3 uDot;
varying float vFacing; varying float vLit; varying vec3 vGlow; varying float vSeed; varying float vNear; varying float vFlick;
void main() {
  float d = length(gl_PointCoord - 0.5) * 2.0;
  float core = 1.0 - smoothstep(0.0, 0.45, d); float halo = exp(-d * d * 2.5);
  float depth = mix(0.25, 1.0, smoothstep(-0.6, 0.65, vFacing));
  float grain = 0.7 + 0.3 * vSeed;
  vec3 col = uDot * grain + vGlow;
  float a = (core * 0.8 + halo * 0.35) * depth * vFlick * (0.85 + vLit * 0.9 + vNear * 0.8);
  if (a < 0.002) discard;
  gl_FragColor = vec4(col * a, a);
}`

const CAGE_VERTEX = /* glsl */ `
attribute float aEdge; attribute float aSeed;
varying float vFacing; varying float vEdge; varying float vSeed; varying vec3 vGlow; varying float vNear; varying float vSweep;
${SOURCE_GLSL}${SWEEP_GLSL}
void main() {
  vec3 dir = normalize(position); vEdge = aEdge; vSeed = aSeed; vGlow = sourceLight(dir); vNear = hoverNear(dir);
  vSweep = sweepCoord(normalize((modelMatrix * vec4(position, 1.0)).xyz));
  vec4 mv = modelViewMatrix * vec4(position, 1.0); vec3 n = normalize((modelViewMatrix * vec4(dir, 0.0)).xyz); vFacing = dot(n, normalize(-mv.xyz)); gl_Position = projectionMatrix * mv;
}`

const CAGE_FRAGMENT = /* glsl */ `
precision highp float;
uniform vec3 uNet; uniform vec3 uShimmerColor; uniform float uNetGlow; uniform float uShimmer; uniform float uHoverGlow; uniform float uEdgeMix; uniform float uTime;
varying float vFacing; varying float vEdge; varying float vSeed; varying vec3 vGlow; varying float vNear; varying float vSweep;
${BAND_GLSL}
void main() {
  float depth = mix(0.32, 1.0, smoothstep(-0.9, 0.8, vFacing));
  float head = fract(vSeed + uTime * uShimmer);
  float run = smoothstep(0.3, 0.0, abs(vEdge - head)) * uEdgeMix;
  float sweep = sweepBand(vSweep, uTime, uShimmer);
  float twinkle = 0.5 + 0.5 * sin(vSeed * 43.0 + uTime * uShimmer * 5.0);
  float spark = clamp(run * 1.1 + sweep * 1.2 + twinkle * 0.35, 0.0, 1.0);
  vec3 col = mix(uNet, uShimmerColor, spark) + vGlow * 0.6;
  float a = uNetGlow * depth * (0.4 + run * 1.5 + sweep * 1.9 + twinkle * 0.3); a += vNear * uHoverGlow * depth;
  if (a < 0.002) discard;
  gl_FragColor = vec4(col * a, a);
}`

const PANEL_VERTEX = /* glsl */ `
attribute vec3 aFace; attribute float aSeed;
varying float vFacing; varying float vSeed; varying float vNear; varying vec3 vGlow; varying float vSweep;
${SOURCE_GLSL}${SWEEP_GLSL}
void main() {
  vec3 dir = normalize(aFace); vSeed = aSeed; vNear = hoverNear(dir); vGlow = sourceLight(dir);
  vSweep = sweepCoord(normalize((modelMatrix * vec4(aFace, 0.0)).xyz));
  vec4 mv = modelViewMatrix * vec4(position, 1.0); vec3 n = normalize((modelViewMatrix * vec4(dir, 0.0)).xyz); vFacing = dot(n, normalize(-mv.xyz)); gl_Position = projectionMatrix * mv;
}`

const PANEL_FRAGMENT = /* glsl */ `
precision highp float;
uniform vec3 uNet; uniform vec3 uShimmerColor; uniform float uFill; uniform float uShimmer; uniform float uEdgeMix; uniform float uTime;
varying float vFacing; varying float vSeed; varying float vNear; varying vec3 vGlow; varying float vSweep;
${BAND_GLSL}
void main() {
  float depth = mix(0.12, 1.0, smoothstep(-0.4, 0.7, vFacing));
  float pulse = (0.5 + 0.5 * sin(vSeed * 31.0 + uTime * uShimmer * 4.0)) * uEdgeMix;
  pulse = clamp(pulse + sweepBand(vSweep, uTime, uShimmer) * 1.2, 0.0, 1.0);
  vec3 col = mix(uNet, uShimmerColor, pulse * 0.7) + vGlow * 0.5;
  float a = uFill * depth * vNear * (0.45 + pulse * 0.9);
  if (a < 0.002) discard;
  gl_FragColor = vec4(col * a, a);
}`

class GlobeScene {
    private container: HTMLElement
    private cfg: Config
    private renderer: THREE.WebGLRenderer
    private scene = new THREE.Scene()
    private camera = new THREE.PerspectiveCamera(30, 1, 0.1, 2000)
    private group = new THREE.Group()
    private pointGeo: THREE.BufferGeometry
    private pointMat: THREE.ShaderMaterial
    private points: THREE.Points
    private cageGeo: THREE.BufferGeometry
    private cageMat: THREE.ShaderMaterial
    private cage: THREE.LineSegments
    private panelGeo: THREE.BufferGeometry
    private panelMat: THREE.ShaderMaterial
    private panels: THREE.Mesh
    private sources: THREE.Vector3[] = []
    private axes: THREE.Vector3[] = []
    private hoverDir = new THREE.Vector3(0, 0, 1)
    private aimX = 0
    private aimY = 0
    private grip = 0
    private targetGrip = 0
    private halfHeight = 1.5
    private time = 0
    private spinAngle = 0
    private dragX = 0
    private dragY = 0
    private velX = 0
    private velY = 0
    private isDragging = false
    private lastX = 0
    private lastY = 0
    private width = 0
    private height = 0
    private dpr = 1
    private frameId = 0
    private lastT = 0
    private disposed = false

    constructor(container: HTMLElement, cfg: Config) {
        this.container = container; this.cfg = cfg
        const S = settingsFor(cfg)
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
        this.dpr = Math.min(window.devicePixelRatio || 1, 2)
        this.renderer.setPixelRatio(this.dpr)
        this.renderer.outputColorSpace = THREE.SRGBColorSpace
        this.renderer.setClearColor(0x000000, 0)
        const el = this.renderer.domElement
        el.style.position = "absolute"; el.style.inset = "0"; el.style.width = "100%"; el.style.height = "100%"; el.style.cursor = "grab"; el.style.touchAction = "none"
        container.appendChild(el)
        const starts = [new THREE.Vector3(-0.6, -0.45, 0.65), new THREE.Vector3(0.72, 0.35, 0.6), new THREE.Vector3(0.1, 0.9, -0.42)]
        const axes = [new THREE.Vector3(0.2, 1, 0.1), new THREE.Vector3(-0.8, 0.4, 0.3), new THREE.Vector3(0.3, -0.5, 0.9)]
        for (let i = 0; i < SOURCES; i++) { this.sources.push(starts[i].normalize()); this.axes.push(axes[i].normalize()) }
        const shared = { uTime: { value: 0 }, uSpread: { value: S.spread }, uIntensity: { value: S.intensity }, uWave: { value: S.wave }, uSource: { value: this.sources.map(v => v.clone()) }, uSourceColor: { value: this.sourceColors(cfg) }, uHoverDir: { value: this.hoverDir }, uHover: { value: 0 }, uHoverArc: { value: S.hoverArc } }
        const cageColors = { uNet: { value: new THREE.Color(cfg.net || DEFAULTS.net) }, uShimmerColor: { value: new THREE.Color(cfg.shimmer?.color || DEFAULTS.shimmer.color) }, uShimmer: { value: S.shimmer }, uEdgeMix: { value: S.edgeMix }, uSweepMix: { value: S.sweepMix }, uSweepAxis: { value: S.sweepAxis }, uSweepWidth: { value: S.sweepWidth } }
        this.pointMat = new THREE.ShaderMaterial({ vertexShader: POINT_VERTEX, fragmentShader: POINT_FRAGMENT, uniforms: { ...shared, uRadius: { value: S.radius }, uDotSize: { value: S.dotSize }, uWobble: { value: S.wobble }, uFlicker: { value: S.flicker }, uViewHeight: { value: 600 }, uDot: { value: new THREE.Color(cfg.dot || DEFAULTS.dot) } }, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, depthTest: false })
        this.cageMat = new THREE.ShaderMaterial({ vertexShader: CAGE_VERTEX, fragmentShader: CAGE_FRAGMENT, uniforms: { ...shared, ...cageColors, uNetGlow: { value: S.netGlow }, uHoverGlow: { value: S.hoverGlow } }, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, depthTest: false })
        this.panelMat = new THREE.ShaderMaterial({ vertexShader: PANEL_VERTEX, fragmentShader: PANEL_FRAGMENT, uniforms: { ...shared, ...cageColors, uFill: { value: S.hoverFill } }, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, depthTest: false, side: THREE.DoubleSide })
        this.pointGeo = buildPoints(S.points); this.points = new THREE.Points(this.pointGeo, this.pointMat); this.points.frustumCulled = false; this.group.add(this.points)
        const built = buildCage(S.radius * S.cage, S.detail); this.cageGeo = built.edges; this.panelGeo = built.panels; this.cage = new THREE.LineSegments(this.cageGeo, this.cageMat); this.panels = new THREE.Mesh(this.panelGeo, this.panelMat); this.cage.frustumCulled = false; this.panels.frustumCulled = false; this.group.add(this.panels); this.group.add(this.cage); this.scene.add(this.group); this.bindEvents()
    }

    private sourceColors(cfg: Config): THREE.Color[] { const wv = cfg.waves || DEFAULTS.waves; const a = new THREE.Color(wv.color || DEFAULTS.waves.color); const b = new THREE.Color(wv.color2 || DEFAULTS.waves.color2); return [a.clone(), b.clone(), a.clone().lerp(b, 0.35)] }

    private bindEvents() {
        const el = this.renderer.domElement
        const down = (e: PointerEvent) => { this.isDragging = true; this.lastX = e.clientX; this.lastY = e.clientY; this.velX = 0; this.velY = 0; el.style.cursor = "grabbing" }
        const move = (e: PointerEvent) => { const r = this.container.getBoundingClientRect(); if (r.width && r.height) { this.aimX = ((e.clientX - r.left) / r.width) * 2 - 1; this.aimY = -(((e.clientY - r.top) / r.height) * 2 - 1) }; if (!this.isDragging) return; const dx = e.clientX - this.lastX; const dy = e.clientY - this.lastY; this.lastX = e.clientX; this.lastY = e.clientY; this.dragY += dx * DRAG; this.dragX += dy * DRAG; this.velY = dx * DRAG; this.velX = dy * DRAG }
        const up = () => { this.isDragging = false; el.style.cursor = "grab" }
        const enter = () => { this.targetGrip = 1 }; const leave = () => { this.targetGrip = 0; up() }
        el.addEventListener("pointerdown", down); el.addEventListener("pointerenter", enter); el.addEventListener("pointerleave", leave); el.addEventListener("pointercancel", leave); window.addEventListener("pointermove", move); window.addEventListener("pointerup", up)
        this.unbind = () => { el.removeEventListener("pointerdown", down); el.removeEventListener("pointerenter", enter); el.removeEventListener("pointerleave", leave); el.removeEventListener("pointercancel", leave); window.removeEventListener("pointermove", move); window.removeEventListener("pointerup", up) }
    }
    private unbind = () => {}
    start() { this.lastT = performance.now(); const loop = () => { this.frameId = requestAnimationFrame(loop); this.step() }; loop() }
    setSize(width: number, height: number) { if (this.disposed || width <= 0 || height <= 0) return; this.width = width; this.height = height; this.renderer.setSize(width, height, false); this.pointMat.uniforms.uViewHeight.value = height * this.dpr; this.updateCamera() }
    updateConfig(cfg: Config) {
        if (this.disposed) return
        const prev = this.cfg; this.cfg = cfg; const S = settingsFor(cfg); const p = this.pointMat.uniforms; const c = this.cageMat.uniforms; const f = this.panelMat.uniforms
        p.uSpread.value = S.spread; p.uIntensity.value = S.intensity; p.uWave.value = S.wave; p.uHoverArc.value = S.hoverArc; p.uDotSize.value = S.dotSize; p.uWobble.value = S.wobble; p.uFlicker.value = S.flicker; p.uDot.value.set(cfg.dot || DEFAULTS.dot)
        c.uNet.value.set(cfg.net || DEFAULTS.net); c.uShimmerColor.value.set(cfg.shimmer?.color || DEFAULTS.shimmer.color); c.uShimmer.value = S.shimmer; c.uEdgeMix.value = S.edgeMix; c.uSweepMix.value = S.sweepMix; c.uSweepAxis.value = S.sweepAxis; c.uSweepWidth.value = S.sweepWidth; c.uNetGlow.value = S.netGlow; c.uHoverGlow.value = S.hoverGlow; f.uFill.value = S.hoverFill
        const cols = this.sourceColors(cfg); const live = p.uSourceColor.value as THREE.Color[]; for (let i = 0; i < SOURCES; i++) live[i].copy(cols[i])
        if (cfg.density !== prev.density) { this.group.remove(this.points); this.pointGeo.dispose(); this.pointGeo = buildPoints(S.points); this.points = new THREE.Points(this.pointGeo, this.pointMat); this.points.frustumCulled = false; this.group.add(this.points) }
        if (cfg.cage?.detail !== prev.cage?.detail || cfg.cage?.spread !== prev.cage?.spread) { this.group.remove(this.cage); this.group.remove(this.panels); this.cageGeo.dispose(); this.panelGeo.dispose(); const built = buildCage(S.radius * S.cage, S.detail); this.cageGeo = built.edges; this.panelGeo = built.panels; this.cage = new THREE.LineSegments(this.cageGeo, this.cageMat); this.panels = new THREE.Mesh(this.panelGeo, this.panelMat); this.cage.frustumCulled = false; this.panels.frustumCulled = false; this.group.add(this.panels); this.group.add(this.cage) }
        this.updateCamera()
    }
    private updateCamera() {
        const aspect = Math.max(1, this.width) / Math.max(1, this.height); const distance = 1 / PERSPECTIVE; const sizePct = clamp(this.cfg.sizePercent, 20, 200, DEFAULTS.sizePercent); const S = settingsFor(this.cfg); const span = S.radius * S.cage * 2.55 * (100 / sizePct); const visibleHeight = aspect < 1 ? span / aspect : span; this.halfHeight = visibleHeight / 2; this.camera.aspect = aspect; this.camera.position.set(0, 0, distance); this.camera.lookAt(0, 0, 0); this.camera.fov = 2 * Math.atan(visibleHeight / 2 / distance) * (180 / Math.PI); this.camera.near = Math.max(0.1, distance - 20); this.camera.far = distance + 20; this.camera.updateProjectionMatrix()
    }
    private updateHoverDir() {
        const aspect = Math.max(1, this.width) / Math.max(1, this.height); const distance = 1 / PERSPECTIVE; const halfH = this.halfHeight; const halfW = halfH * aspect; const oz = distance; let dx = this.aimX * halfW; let dy = this.aimY * halfH; let dz = -oz; const len = Math.hypot(dx, dy, dz) || 1; dx /= len; dy /= len; dz /= len; const S = settingsFor(this.cfg); const radius = S.radius * S.cage; const b = oz * dz; const c = oz * oz - radius * radius; const disc = b * b - c; const t = disc > 0 ? -b - Math.sqrt(disc) : -b; const hit = new THREE.Vector3(dx * t, dy * t, oz + dz * t); this.group.updateMatrixWorld(); this.group.worldToLocal(hit); if (hit.lengthSq() > 1e-8) this.hoverDir.copy(hit.normalize())
    }
    private step() {
        if (this.disposed) return
        const now = performance.now(); let dt = (now - this.lastT) / 1000; this.lastT = now; if (!isFinite(dt) || dt < 0) dt = 0; if (dt > 0.05) dt = 0.05
        const S = settingsFor(this.cfg); this.time += dt; const live = this.pointMat.uniforms.uSource.value as THREE.Vector3[]
        for (let i = 0; i < SOURCES; i++) { this.sources[i].applyAxisAngle(this.axes[i], dt * S.wave * (0.35 + i * 0.12)).normalize(); live[i].copy(this.sources[i]) }
        if (!this.isDragging) { const decay = Math.exp(-dt * 3); this.dragY += this.velY; this.dragX += this.velX; this.velX *= decay; this.velY *= decay; this.spinAngle += S.spin * dt }
        this.pointMat.uniforms.uTime.value = this.time; this.group.rotation.y = this.spinAngle + this.dragY; this.group.rotation.x = clamp(this.dragX * 0.5, -1, 1, 0); this.grip += (this.targetGrip * S.hoverOn - this.grip) * (1 - Math.exp(-dt * 5)); this.pointMat.uniforms.uHover.value = this.grip; if (this.grip > 0.001) this.updateHoverDir(); this.renderer.render(this.scene, this.camera)
    }
    dispose() { this.disposed = true; cancelAnimationFrame(this.frameId); this.unbind(); this.pointGeo.dispose(); this.cageGeo.dispose(); this.panelGeo.dispose(); this.pointMat.dispose(); this.cageMat.dispose(); this.panelMat.dispose(); this.renderer.dispose(); const el = this.renderer.domElement; if (el.parentNode === this.container) this.container.removeChild(el) }
}

type Props = Config & { style?: React.CSSProperties }
function __OriginkitBase_Globe(props: Props) {
    const { dot = DEFAULTS.dot, net = DEFAULTS.net, density = DEFAULTS.density, spin = DEFAULTS.spin, spinDir = DEFAULTS.spinDir, hoverOn = DEFAULTS.hoverOn, sizePercent = DEFAULTS.sizePercent, dots = DEFAULTS.dots, cage = DEFAULTS.cage, shimmer = DEFAULTS.shimmer, waves = DEFAULTS.waves, hover = DEFAULTS.hover, style } = props
    const containerRef = useRef<HTMLDivElement | null>(null); const sceneRef = useRef<GlobeScene | null>(null); const cfgRef = useRef<Config>(null as any)
    cfgRef.current = { dot, net, density, spin, spinDir, hoverOn, sizePercent, dots, cage, shimmer, waves, hover }
    useEffect(() => { const container = containerRef.current; if (!container) return; let scene: GlobeScene; try { scene = new GlobeScene(container, cfgRef.current) } catch { return }; sceneRef.current = scene; scene.setSize(container.clientWidth, container.clientHeight); scene.start(); const ro = new ResizeObserver(() => scene.setSize(container.clientWidth, container.clientHeight)); ro.observe(container); return () => { ro.disconnect(); scene.dispose(); sceneRef.current = null } }, [])
    useEffect(() => { sceneRef.current?.updateConfig(cfgRef.current) }, [dot, net, density, spin, spinDir, hoverOn, sizePercent, dots?.size, dots?.wobble, dots?.flicker, cage?.detail, cage?.spread, cage?.glow, shimmer?.color, shimmer?.speed, shimmer?.style, shimmer?.angle, shimmer?.width, waves?.color, waves?.color2, waves?.size, waves?.glow, waves?.speed, hover?.fill, hover?.glow, hover?.reach])
    return <div ref={containerRef} role="img" aria-label="Globe of points inside a shimmering wireframe cage" style={{ position: "relative", width: "100%", height: "100%", minWidth: 120, minHeight: 120, overflow: "hidden", ...style }} />
}

function Globe(props: Props) { return <__OriginkitBase_Globe {...props} /> }
Globe.displayName = "Globe"
Globe.defaultProps = { ...DEFAULTS }

const __originkitPresetProps = { dot: "#FFFFFF", net: "#26FF00", density: 20, spin: 20, spinDir: "right", hoverOn: true, sizePercent: 100 }

export default function GlobePreset(props: Record<string, unknown>) {
    return <Globe {...(__originkitPresetProps as Record<string, unknown>) } {...props} />
}
