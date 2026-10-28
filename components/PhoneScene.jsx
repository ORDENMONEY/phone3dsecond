"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/* Crée un rectangle arrondi sous forme de Shape THREE */
function roundedRectShape(w, h, r) {
  const s = new THREE.Shape();
  const x = -w / 2;
  const y = -h / 2;
  s.moveTo(x + r, y);
  s.lineTo(x + w - r, y);
  s.quadraticCurveTo(x + w, y, x + w, y + r);
  s.lineTo(x + w, y + h - r);
  s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  s.lineTo(x + r, y + h);
  s.quadraticCurveTo(x, y + h, x, y + h - r);
  s.lineTo(x, y + r);
  s.quadraticCurveTo(x, y, x + r, y);
  return s;
}

/* Texture d'écran dessinée dans un canvas 2D (écran allumé réaliste) */
function makeScreenTexture() {
  const c = document.createElement("canvas");
  c.width = 512;
  c.height = 1024;
  const ctx = c.getContext("2d");

  // Dégradé de fond
  const g = ctx.createLinearGradient(0, 0, 0, 1024);
  g.addColorStop(0, "#12042e");
  g.addColorStop(0.5, "#1b0640");
  g.addColorStop(1, "#02131f");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 512, 1024);

  // Blobs lumineux
  const blob = (x, y, r, color) => {
    const rg = ctx.createRadialGradient(x, y, 0, x, y, r);
    rg.addColorStop(0, color);
    rg.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = rg;
    ctx.fillRect(x - r, y - r, r * 2, r * 2);
  };
  blob(120, 200, 260, "rgba(139,92,246,0.55)");
  blob(400, 600, 280, "rgba(6,182,212,0.4)");
  blob(256, 900, 300, "rgba(217,70,239,0.35)");

  // Heure
  ctx.fillStyle = "rgba(255,255,255,0.95)";
  ctx.font = "700 110px 'Segoe UI', Arial";
  ctx.textAlign = "center";
  ctx.fillText("21:47", 256, 300);
  ctx.font = "400 34px 'Segoe UI', Arial";
  ctx.fillStyle = "rgba(255,255,255,0.7)";
  ctx.fillText("Mercredi 12 juin", 256, 360);

  // Icônes d'apps (grille de carrés arrondis)
  const colors = ["#8b5cf6", "#06b6d4", "#f472b6", "#34d399", "#fbbf24", "#60a5fa", "#f87171", "#a78bfa"];
  let idx = 0;
  for (let row = 0; row < 2; row++) {
    for (let col = 0; col < 4; col++) {
      const x = 80 + col * 100;
      const y = 500 + row * 100;
      ctx.fillStyle = colors[idx % colors.length];
      ctx.beginPath();
      ctx.roundRect(x, y, 72, 72, 18);
      ctx.fill();
      idx++;
    }
  }

  // Texte de marque
  ctx.fillStyle = "rgba(255,255,255,0.9)";
  ctx.font = "800 40px 'Segoe UI', Arial";
  ctx.fillText("PhoneCompte 3D", 256, 810);

  // Barre de contrôle
  ctx.fillStyle = "rgba(255,255,255,0.85)";
  ctx.beginPath();
  ctx.roundRect(206, 960, 100, 10, 10);
  ctx.fill();

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export default function PhoneScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    /* ----- Scène de base ----- */
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      38,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 7.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    /* ----- Lumières ----- */
    scene.add(new THREE.AmbientLight(0xffffff, 0.55));

    const l1 = new THREE.PointLight(0x8b5cf6, 30, 30);
    l1.position.set(3, 3, 4);
    scene.add(l1);

    const l2 = new THREE.PointLight(0x06b6d4, 25, 30);
    l2.position.set(-4, -2, 3);
    scene.add(l2);

    const l3 = new THREE.PointLight(0xf472b6, 18, 30);
    l3.position.set(0, 4, -4);
    scene.add(l3);

    /* ----- Corps du téléphone ----- */
    const phone = new THREE.Group();
    scene.add(phone);

    // Châssis titane extrudé
    const bodyGeo = new THREE.ExtrudeGeometry(roundedRectShape(1.75, 3.5, 0.3), {
      depth: 0.16,
      bevelEnabled: true,
      bevelThickness: 0.05,
      bevelSize: 0.05,
      bevelSegments: 6,
      curveSegments: 24,
    });
    bodyGeo.center();
    const bodyMat = new THREE.MeshPhysicalMaterial({
      color: 0x2a2a3a,
      metalness: 0.95,
      roughness: 0.32,
      clearcoat: 0.6,
    });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    phone.add(body);

    // Écran émissif
    const screenGeo = new THREE.ExtrudeGeometry(roundedRectShape(1.62, 3.34, 0.24), {
      depth: 0.02,
      bevelEnabled: false,
      curveSegments: 24,
    });
    screenGeo.center();
    const screenMat = new THREE.MeshBasicMaterial({ map: makeScreenTexture() });
    const screen = new THREE.Mesh(screenGeo, screenMat);
    screen.position.z = 0.11;
    phone.add(screen);

    // Bordure lumineuse de l'écran
    const rimGeo = new THREE.ExtrudeGeometry(roundedRectShape(1.68, 3.4, 0.26), {
      depth: 0.01,
      bevelEnabled: false,
      curveSegments: 24,
    });
    rimGeo.center();
    const rim = new THREE.Mesh(
      rimGeo,
      new THREE.MeshBasicMaterial({ color: 0x8b5cf6 })
    );
    rim.position.z = 0.1;
    phone.add(rim);

    // Bloc caméra arrière + lentilles
    const camBump = new THREE.Mesh(
      new THREE.ExtrudeGeometry(roundedRectShape(0.75, 0.75, 0.2), {
        depth: 0.08,
        bevelEnabled: true,
        bevelSize: 0.02,
        bevelThickness: 0.02,
        curveSegments: 16,
      }),
      new THREE.MeshPhysicalMaterial({
        color: 0x3a3a4a,
        metalness: 0.9,
        roughness: 0.25,
      })
    );
    camBump.position.set(0.45, 1.15, -0.17);
    phone.add(camBump);

    [0.13, -0.13].forEach((dy) => {
      const lens = new THREE.Mesh(
        new THREE.CylinderGeometry(0.14, 0.14, 0.06, 32),
        new THREE.MeshPhysicalMaterial({
          color: 0x060a14,
          metalness: 0.4,
          roughness: 0.05,
          clearcoat: 1,
        })
      );
      lens.rotation.x = Math.PI / 2;
      lens.position.set(0.45, 1.15 + dy, -0.25);
      phone.add(lens);

      const glass = new THREE.Mesh(
        new THREE.CircleGeometry(0.09, 32),
        new THREE.MeshBasicMaterial({ color: 0x06b6d4 })
      );
      glass.position.set(0.45, 1.15 + dy, -0.29);
      phone.add(glass);
    });

    // Boutons latéraux
    const btnMat = new THREE.MeshPhysicalMaterial({
      color: 0x3a3a4a,
      metalness: 0.9,
      roughness: 0.3,
    });
    const power = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.55, 0.09), btnMat);
    power.position.set(0.93, 0.35, 0);
    phone.add(power);

    const vol = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.9, 0.09), btnMat);
    vol.position.set(-0.93, 0.5, 0);
    phone.add(vol);

    /* ----- Halo derrière le téléphone ----- */
    const halo = new THREE.Mesh(
      new THREE.PlaneGeometry(6.5, 6.5),
      new THREE.MeshBasicMaterial({
        map: (() => {
          const c = document.createElement("canvas");
          c.width = c.height = 256;
          const ctx = c.getContext("2d");
          const rg = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
          rg.addColorStop(0, "rgba(139,92,246,0.5)");
          rg.addColorStop(0.5, "rgba(6,182,212,0.18)");
          rg.addColorStop(1, "rgba(0,0,0,0)");
          ctx.fillStyle = rg;
          ctx.fillRect(0, 0, 256, 256);
          return new THREE.CanvasTexture(c);
        })(),
        transparent: true,
        depthWrite: false,
      })
    );
    halo.position.z = -1.5;
    scene.add(halo);

    /* ----- Particules flottantes ----- */
    const N = 260;
    const pos = new Float32Array(N * 3);
    const colors = new Float32Array(N * 3);
    const palette = [
      new THREE.Color(0x8b5cf6),
      new THREE.Color(0x06b6d4),
      new THREE.Color(0xf472b6),
    ];
    for (let i = 0; i < N; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8 - 1;
      const col = palette[i % palette.length];
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    pGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    const particles = new THREE.Points(
      pGeo,
      new THREE.PointsMaterial({
        size: 0.06,
        vertexColors: true,
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
    );
    scene.add(particles);

    /* ----- Interaction : scroll + souris/tactile ----- */
    let scrollRot = 0;
    const mouse = { x: 0, y: 0 };
    const targetMouse = { x: 0, y: 0 };

    const onScroll = () => {
      const h = window.innerHeight || 800;
      scrollRot = (window.scrollY / h) * Math.PI * 1.5;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const onPointerMove = (e) => {
      const t = e.touches ? e.touches[0] : e;
      targetMouse.x = (t.clientX / window.innerWidth) * 2 - 1;
      targetMouse.y = (t.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("mousemove", onPointerMove);
    window.addEventListener("touchmove", onPointerMove, { passive: true });

    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      // Sur mobile, on recule un peu pour voir tout le téléphone
      camera.position.z = w < 640 ? 9.2 : 7.5;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);
    onResize();

    /* ----- Boucle d'animation ----- */
    const clock = new THREE.Clock();
    let raf;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Rotation liée au scroll + flottement doux
      phone.rotation.y = 0.35 + scrollRot * 1.2 + Math.sin(t * 0.4) * 0.12;
      phone.rotation.x = Math.sin(t * 0.3) * 0.08;
      phone.position.y = Math.sin(t * 0.9) * 0.16;

      // Inclinaison suivant la souris / le doigt
      mouse.x += (targetMouse.x - mouse.x) * 0.05;
      mouse.y += (targetMouse.y - mouse.y) * 0.05;
      phone.rotation.y += mouse.x * 0.35;
      phone.rotation.x += mouse.y * 0.25;

      halo.lookAt(camera.position);
      halo.rotation.z = t * 0.1;
      particles.rotation.y = t * 0.02;
      particles.rotation.x = Math.sin(t * 0.15) * 0.05;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("touchmove", onPointerMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      scene.traverse((o) => {
        if (o.geometry) o.geometry.dispose();
        if (o.material) {
          if (o.material.map) o.material.map.dispose();
          o.material.dispose();
        }
      });
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 cursor-grab active:cursor-grabbing"
      aria-hidden="true"
    />
  );
}