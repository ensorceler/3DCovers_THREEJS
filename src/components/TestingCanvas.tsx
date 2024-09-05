"use client";
import { OrbitControls, Texture, useTexture } from "@react-three/drei";
import { Canvas, useLoader } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { MeshStandardMaterial, TextureLoader } from "three";
import React, { Suspense, useEffect, useState } from "react";
import { Progress } from "./ui/progress";
import * as THREE from "three";

/*
  if (scene) {
    const textureLoader = new THREE.TextureLoader();
    const specificMesh = scene.getObjectByName("part2");

    if (specificMesh) {
      textureLoader.load(newUrl, (texture) => {
        const material = new THREE.MeshStandardMaterial({
          map: texture,
          normalMap: texture,
          roughness: 1,
          metalness: 1,
          opacity: 1,
          bumpScale: 0.5,
        });
        texture.repeat.set(-1, 1);
        texture.offset.set(1, 1);
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        specificMesh.material = material;
        specificMesh.material.needsUpdate = true;
      });
    }
  }
*/

/*
https://github.com/makc/Edelweiss/blob/c3e63135f2f57f1a422c30abbeca35e579b84f02/docs/js/AssetManager.js#L245

function createCharacterLabel( text ) {

		const ctx = textCanvas.getContext( '2d' );
		const font = '24px grobold';

		ctx.font = font;
		textCanvas.width = Math.ceil( ctx.measureText( text ).width + 16 );

		ctx.font = font;
		ctx.strokeStyle = '#222';
		ctx.lineWidth = 8;
		ctx.lineJoin = 'miter';
		ctx.miterLimit = 3;
		ctx.strokeText( text, 8, 26 );
		ctx.fillStyle = 'white';
		ctx.fillText( text, 8, 26 );

		const spriteMap = new THREE.Texture( ctx.getImageData( 0, 0, textCanvas.width, textCanvas.height ) );
		spriteMap.minFilter = THREE.LinearFilter;
		spriteMap.generateMipmaps = false;
		spriteMap.needsUpdate = true;

		const sprite = new THREE.Sprite( new THREE.SpriteMaterial( { map: spriteMap } ) );
		sprite.scale.set( 0.12 * textCanvas.width / textCanvas.height, 0.12, 1 );
		sprite.position.y = 0.7 ;

		return sprite;
	}

*/

const Model = () => {
  const gltf = useLoader(GLTFLoader, "/3d_models/Model-1.glb");
  const colorMap = useTexture("/textures/thanos.png");

  useEffect(() => {
    const specificMesh: any = gltf.scene.getObjectByName("part2");
    console.log("specific mesh", specificMesh);
    const material = new MeshStandardMaterial({
      map: colorMap,
      normalMap: colorMap,
    });
    colorMap.needsUpdate = true;
    //colorMap.repeat.set(1, -1);
    //colorMap.offset.set(1, 1);
    //colorMap.wrapS = colorMap.wrapT = THREE.RepeatWrapping;
    specificMesh.material = material;
    specificMesh.needsUpdate = true;
  }, []);

  return (
    <primitive object={gltf.scene} position={[1, 1, 1]} scale={30}></primitive>
  );
};

//useGLTF.preload("/3d_models/Model-1.glb");

export default function TestingCanvas() {
  return (
    <Canvas gl={{ preserveDrawingBuffer: true }}>
      <ambientLight intensity={Math.PI / 2} />
      <pointLight position={[10, 10, 10]} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        decay={0}
        intensity={Math.PI}
      />
      <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
      <Suspense fallback={null}>
        <Model />
      </Suspense>
      <OrbitControls />
    </Canvas>
  );
}
