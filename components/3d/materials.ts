import * as THREE from "three";

/** Brushed aluminium */
export function createAluminiumMaterial(): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color: new THREE.Color("#8A8A8A"),
    metalness: 0.85,
    roughness: 0.35,
  });
}

/** Dark anodized aluminium */
export function createDarkAluminiumMaterial(): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color: new THREE.Color("#3A3A3A"),
    metalness: 0.9,
    roughness: 0.25,
  });
}

/** Architectural glass */
export function createGlassMaterial(): THREE.MeshPhysicalMaterial {
  return new THREE.MeshPhysicalMaterial({
    color: new THREE.Color("#88AACC"),
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.85,
    thickness: 0.02,
    transparent: true,
    opacity: 0.4,
    envMapIntensity: 1.5,
  });
}

/** Thermal break polyamide */
export function createThermalBreakMaterial(): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color: new THREE.Color("#1A1A1A"),
    metalness: 0.0,
    roughness: 0.9,
  });
}

/** Rubber gasket */
export function createGasketMaterial(): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color: new THREE.Color("#111111"),
    metalness: 0.0,
    roughness: 0.95,
  });
}

/** Bronze accent — matches ARTSER brand accent #B58A62 */
export function createAccentMaterial(): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color: new THREE.Color("#B58A62"),
    metalness: 0.7,
    roughness: 0.3,
    emissive: new THREE.Color("#B58A62"),
    emissiveIntensity: 0.05,
  });
}
