"use client";

import { useEffect, useRef } from "react";

export function Construction3DBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let cancelled = false;

    async function init() {
      const THREE = await import("three");

      if (cancelled || !canvas) return;

      const C_ORANGE = 0xef5e00,
        C_ORANGE2 = 0xff8c3a,
        C_SOFT = 0xffb27a;

      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;

      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0xffffff);
      scene.fog = new THREE.Fog(0xffffff, 60, 140);

      const camera = new THREE.PerspectiveCamera(
        45,
        canvas.clientWidth / canvas.clientHeight,
        0.1,
        500
      );

      // Lights
      scene.add(new THREE.HemisphereLight(0xffffff, 0xffe7d6, 0.9));
      const sun = new THREE.DirectionalLight(0xffffff, 0.9);
      sun.position.set(30, 50, 25);
      sun.castShadow = true;
      sun.shadow.mapSize.set(2048, 2048);
      sun.shadow.camera.left = -50;
      sun.shadow.camera.right = 50;
      sun.shadow.camera.top = 50;
      sun.shadow.camera.bottom = -50;
      scene.add(sun);

      // Materials
      const matOrange = new THREE.MeshStandardMaterial({ color: C_ORANGE, roughness: 0.55, metalness: 0.15 });
      const matOrange2 = new THREE.MeshStandardMaterial({ color: C_ORANGE2, roughness: 0.5, metalness: 0.1 });
      const matSoft = new THREE.MeshStandardMaterial({ color: C_SOFT, roughness: 0.7 });
      const matWhite = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.9 });
      const matGlass = new THREE.MeshStandardMaterial({
        color: 0xffd9bd,
        roughness: 0.25,
        metalness: 0.1,
        transparent: true,
        opacity: 0.85,
      });

      function beam(w: number, h: number, d: number, mat = matOrange) {
        const g = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
        g.castShadow = true;
        return g;
      }

      // Ground
      const ground = new THREE.Mesh(
        new THREE.CircleGeometry(120, 64),
        new THREE.MeshStandardMaterial({ color: 0xfff6ef, roughness: 1 })
      );
      ground.rotation.x = -Math.PI / 2;
      ground.receiveShadow = true;
      scene.add(ground);

      // Faint ring lines
      for (let r = 14; r <= 110; r += 18) {
        const ring = new THREE.Mesh(
          new THREE.RingGeometry(r, r + 0.15, 80),
          new THREE.MeshBasicMaterial({ color: 0xffd9bd, side: THREE.DoubleSide })
        );
        ring.rotation.x = -Math.PI / 2;
        ring.position.y = 0.02;
        scene.add(ring);
      }

      // Tower crane
      const tower = new THREE.Group();
      const MAST_H = 30;
      const mast = beam(1.6, MAST_H, 1.6);
      mast.position.y = MAST_H / 2;
      tower.add(mast);
      for (let y = 2; y < MAST_H - 2; y += 3) {
        const d = beam(0.18, 4.2, 0.18);
        d.position.set(0, y, 0.8);
        d.rotation.z = Math.PI / 5;
        tower.add(d);
      }
      const base = beam(4, 1.5, 4, matOrange2);
      base.position.y = 0.75;
      tower.add(base);

      const slew = new THREE.Group();
      slew.position.y = MAST_H;
      tower.add(slew);
      const cab = beam(2.2, 2.2, 2.2, matSoft);
      cab.position.set(0, 1.3, 1.6);
      slew.add(cab);
      const jib = beam(22, 1.1, 1.1);
      jib.position.set(11, 1.6, 0);
      slew.add(jib);
      const cjib = beam(8, 1, 1);
      cjib.position.set(-4, 1.6, 0);
      slew.add(cjib);
      const cw = beam(2.2, 2.6, 2.6, matOrange2);
      cw.position.set(-7.5, 1.6, 0);
      slew.add(cw);
      const apex = beam(0.6, 6, 0.6);
      apex.position.set(0, 5, 0);
      slew.add(apex);

      // Tie bars
      [[16, 0], [-7, 0]].forEach(([x]) => {
        const start = new THREE.Vector3(0, 8, 0);
        const end = new THREE.Vector3(x, 1.6, 0);
        const dir = end.clone().sub(start);
        const len = dir.length();
        const b = beam(0.18, len, 0.18);
        b.position.copy(start.clone().add(end).multiplyScalar(0.5));
        b.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.clone().normalize());
        slew.add(b);
      });

      // Trolley + hook + load
      const trolley = beam(1.4, 0.7, 1.4, matOrange2);
      trolley.position.set(11, 1.0, 0);
      slew.add(trolley);
      const cableMat = new THREE.LineBasicMaterial({ color: C_ORANGE });
      let cable: InstanceType<typeof THREE.Line> | null = null;
      const pane = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 0.2), matGlass);
      pane.castShadow = true;
      slew.add(pane);

      function updateCable() {
        if (cable) slew.remove(cable);
        const g = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(trolley.position.x, 1.0, 0),
          new THREE.Vector3(pane.position.x, pane.position.y, 0),
        ]);
        cable = new THREE.Line(g, cableMat);
        slew.add(cable);
      }
      tower.position.set(-26, 0, -6);
      scene.add(tower);

      // Mobile telescopic crane
      const mob = new THREE.Group();
      const chassis = beam(8, 1.6, 3.4, matOrange);
      chassis.position.y = 1.2;
      mob.add(chassis);
      const cabM = beam(2.4, 2, 3, matSoft);
      cabM.position.set(-2.6, 2.8, 0);
      mob.add(cabM);
      [-2.6, 0, 2.6].forEach((x) => {
        [-1.7, 1.7].forEach((z) => {
          const w = new THREE.Mesh(
            new THREE.CylinderGeometry(1, 1, 0.8, 24),
            new THREE.MeshStandardMaterial({ color: 0x222222, roughness: 0.8 })
          );
          w.rotation.x = Math.PI / 2;
          w.position.set(x, 1, z);
          w.castShadow = true;
          mob.add(w);
        });
      });
      const turn = new THREE.Group();
      turn.position.set(1, 2.2, 0);
      mob.add(turn);
      const boomPivot = new THREE.Group();
      turn.add(boomPivot);
      const boom = beam(18, 1.2, 1.2, matOrange2);
      boom.position.set(9, 0, 0);
      boomPivot.add(boom);
      boomPivot.rotation.z = Math.PI / 3.4;
      mob.position.set(30, 0, 4);
      mob.rotation.y = -Math.PI / 2.6;
      scene.add(mob);

      // Building under construction
      const bldg = new THREE.Group();
      const shell = beam(12, 22, 12, matWhite);
      shell.position.y = 11;
      shell.material.transparent = true;
      shell.material.opacity = 0;
      bldg.add(shell);
      const edges = new THREE.LineSegments(
        new THREE.EdgesGeometry(new THREE.BoxGeometry(12, 22, 12)),
        new THREE.LineBasicMaterial({ color: C_ORANGE })
      );
      edges.position.y = 11;
      bldg.add(edges);
      for (let f = 1; f < 5; f++) {
        const slab = beam(12, 0.4, 12, matWhite);
        slab.position.y = f * 5;
        slab.receiveShadow = true;
        bldg.add(slab);
        const se = new THREE.LineSegments(
          new THREE.EdgesGeometry(new THREE.BoxGeometry(12, 0.4, 12)),
          new THREE.LineBasicMaterial({ color: 0xffcaa3 })
        );
        se.position.y = f * 5;
        bldg.add(se);
      }
      const winPositions = [[-3, 3], [3, 3], [-3, 8], [3, 13]];
      winPositions.forEach(([x, y]) => {
        const w = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 0.2), matSoft);
        w.position.set(x, y, 6.05);
        bldg.add(w);
      });
      const slot = new THREE.LineSegments(
        new THREE.EdgesGeometry(new THREE.BoxGeometry(3.2, 3.2, 0.3)),
        new THREE.LineBasicMaterial({ color: C_ORANGE })
      );
      slot.position.set(3, 8, 6.05);
      bldg.add(slot);
      bldg.position.set(0, 0, -4);
      scene.add(bldg);

      // Worker on ladder
      const ladder = new THREE.Group();
      const railL = beam(0.18, 12, 0.18);
      railL.position.set(-0.7, 6, 0);
      ladder.add(railL);
      const railR = beam(0.18, 12, 0.18);
      railR.position.set(0.7, 6, 0);
      ladder.add(railR);
      for (let y = 1; y < 12; y += 1.6) {
        const rung = beam(1.6, 0.14, 0.14);
        rung.position.set(0, y, 0);
        ladder.add(rung);
      }
      ladder.rotation.x = -0.12;
      ladder.position.set(3, 0, 3.2);
      scene.add(ladder);

      function person() {
        const p = new THREE.Group();
        const body = beam(0.6, 1.8, 0.4, matOrange);
        body.position.y = 1.4;
        p.add(body);
        const head = new THREE.Mesh(new THREE.SphereGeometry(0.45, 16, 16), matOrange);
        head.position.y = 2.7;
        head.castShadow = true;
        p.add(head);
        const hat = new THREE.Mesh(
          new THREE.SphereGeometry(0.5, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2),
          matOrange2
        );
        hat.position.y = 2.85;
        p.add(hat);
        const armL = beam(0.18, 1.1, 0.18, matOrange);
        armL.position.set(-0.5, 1.7, 0.1);
        armL.rotation.z = 0.5;
        p.add(armL);
        const armR = beam(0.18, 1.1, 0.18, matOrange);
        armR.position.set(0.5, 1.8, 0.2);
        armR.rotation.z = -0.9;
        p.add(armR);
        const legL = beam(0.2, 1.2, 0.2, matOrange);
        legL.position.set(-0.2, 0.4, 0);
        p.add(legL);
        const legR = beam(0.2, 1.2, 0.2, matOrange);
        legR.position.set(0.2, 0.4, 0);
        p.add(legR);
        p.traverse((o) => {
          if (o instanceof THREE.Mesh) o.castShadow = true;
        });
        return p;
      }

      const climber = person();
      climber.position.set(3, 7.5, 3.4);
      climber.scale.set(0.9, 0.9, 0.9);
      scene.add(climber);
      const guide = person();
      guide.position.set(8, 0, 8);
      guide.rotation.y = -0.6;
      scene.add(guide);

      // Animation
      let t = 0;
      let camAngle = 0.6;
      let animId: number;

      function animate() {
        animId = requestAnimationFrame(animate);
        t += 0.01;

        slew.rotation.y = Math.sin(t * 0.4) * 0.9 + 0.3;
        const tx = 8 + Math.sin(t * 0.6) * 5;
        trolley.position.x = tx;
        const lift = 6 + Math.sin(t * 0.9) * 5;
        pane.position.set(tx, lift, 0);
        pane.rotation.y = t * 0.3;
        updateCable();

        boomPivot.rotation.z = Math.PI / 3.4 + Math.sin(t * 0.5) * 0.18;
        turn.rotation.y = Math.sin(t * 0.3) * 0.4;

        climber.children[4].rotation.z = -0.9 + Math.sin(t * 2) * 0.25;

        camAngle += 0.0025;
        const R = 70;
        camera.position.set(
          Math.cos(camAngle) * R,
          30 + Math.sin(t * 0.2) * 4,
          Math.sin(camAngle) * R
        );
        camera.lookAt(0, 12, -2);

        renderer.render(scene, camera);
      }
      updateCable();
      animate();

      const handleResize = () => {
        if (!canvas) return;
        const w = canvas.clientWidth;
        const h = canvas.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };
      window.addEventListener("resize", handleResize);

      cleanupRef.current = () => {
        cancelAnimationFrame(animId);
        window.removeEventListener("resize", handleResize);
        renderer.dispose();
        scene.traverse((obj) => {
          if (obj instanceof THREE.Mesh) {
            obj.geometry.dispose();
            if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
            else obj.material.dispose();
          }
        });
      };
    }

    init();

    return () => {
      cancelled = true;
      cleanupRef.current?.();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="construction-3d-bg"
    />
  );
}
