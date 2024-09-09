"use client";
import { OrbitControls, Texture, useTexture } from "@react-three/drei";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import {
  CanvasTexture,
  MeshBasicMaterial,
  MeshStandardMaterial,
  RepeatWrapping,
  TextureLoader,
} from "three";
import React, { Suspense, useEffect, useRef, useState } from "react";

interface TestingCanvasProps {
  text: string;
  file: string;
}

const Model = () => {
  const ref = useRef();
  const colorMap = useTexture("/textures/thanos.png");
  const gltf = useLoader(GLTFLoader, "/3d_models/P4_type1.glb");
  //const
  useFrame(() => ((ref.current! as any).rotation.y += 0.001));

  // Here, we can access the camera via the useThree hook
  useThree(({ camera }) => {
    camera.position.y = 2;
    camera.lookAt(0, 0, 0);
  });

  const getSpecificObjectFromModel = () => {
    //console.log("config", modelConfig);
    const specificObject: any = gltf?.scene?.getObjectByName("P4Type1");
    return specificObject;
  };

  useEffect(() => {
    console.log("gltf mode => ", gltf);
    textMaskOnModel();
  }, []);

  const textMaskOnModel = () => {
    const cv = document.createElement("canvas");
    cv.width = 2400; //  3 * 512
    cv.height = 600;
    const ctx = cv.getContext("2d")!;
    ctx.fillStyle = "#fefefe";
    //ctx.globalAlpha = 0;
    ctx.fillRect(0, 0, cv.width, cv.height);
    ctx.fillStyle = "#191212";
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.font = "bold 4vh sans-serif";
    ctx.fillText("Hello, World", 0.4 * cv.width, 0.2 * cv.height);
    ctx.fillText(
      " THREE  |                           three.js playground",
      0,
      0.1 * cv.height
    );
    ctx.fillText(
      " THREE  |                                              ",
      0,
      0.2 * cv.height
    );
    ctx.fillText(
      " THREE and many other things  and in life hello thanos baby ",
      0.25 * cv.width,
      0.4 * cv.height
    );
    ctx.fillText(
      " THREE  |                       * learning by playing * ",
      0,
      0.5 * cv.height
    );

    const texture = new CanvasTexture(cv);
    texture.needsUpdate = true;
    const material = new MeshStandardMaterial({
      map: texture,
    });
    texture.repeat.set(-1, 1);
    //texture.offset.set(1, 1);
    texture.wrapS = texture.wrapT = RepeatWrapping;

    const specificMesh: any = getSpecificObjectFromModel();
    //console.log("specific mesh", specificMesh);
    specificMesh.material = material;
    specificMesh.needsUpdate = true;
  };

  return (
    <primitive
      ref={ref}
      object={gltf.scene}
      position={[0, 0, 0]}
      scale={45}
      rotation={[0, Math.PI, 0]}
    ></primitive>
  );
};

export default function TestingCanvas({}: TestingCanvasProps) {
  //const camera=new Perspeci();

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

  // ... step 11: text 
//=================================================================================================
			// https://threejs.org/docs/index.html#examples/en/loaders/FontLoader			
const textMesh = new THREE.Group( );		
const fontLoader = new FontLoader( );							// see function createText( loadedFont )
fontLoader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', createText );
textMesh.scale.set( 0.005, 0.005, 0.005 );
textMesh.rotation.y = -0.74 // radiant
textMesh.position.set( 5, 1, 0 );
scene.add( textMesh );

// ----------------------------------------------------------------------------

			// https://en.wikipedia.org/wiki/Canvas_element   https://threejs.org/docs/#api/en/textures/CanvasTexture
const cv = document.createElement( 'canvas' );
cv.width = 1536 //  3 * 512
cv.height = 512;
const ctx = cv.getContext( '2d' );
ctx.fillStyle = '#fefefe'; 
ctx.fillRect( 0, 0, cv.width, cv.height );
ctx.fillStyle = '#129912';
ctx.textAlign = 'left';
ctx.textBaseline = 'middle';
ctx.font = 'bold 6vh Arial';
			// https://unicode.org/emoji/charts/full-emoji-list.html#1f642 (mark and copy - column Browser)
ctx.fillText( ' THREE  |                           three.js playground', 0, 0.1 * cv.height );
ctx.fillText( ' THREE  |                                              ', 0, 0.2 * cv.height );
ctx.fillText( ' THREE  |            with a flag 🏳, rotating squirrel 🐿, flower 🌻', 0, 0.3 * cv.height );
ctx.fillText( ' THREE  |                       and many other things  ', 0, 0.4 * cv.height );
ctx.fillText( ' THREE  |                       * learning by playing * ', 0, 0.5 * cv.height );
ctx.fillText( ' THREE  |                                              ', 0, 0.6 * cv.height);
ctx.fillText( ' THREE  |                😀   it should bring you joy     😀', 0, 0.7 * cv.height );
ctx.fillText( ' THREE  |                                              ', 0, 0.8 * cv.height );
ctx.fillText( ' THREE  |                  😂    ♠ ♣ ♥ ♦  🐞  ♪ ♫ ♭ ♮ ♯    😂 ', 0, 0.9 * cv.height );
const txtGeometry = new THREE.BoxGeometry( 2.4, 0.8, 0.1 ); // w 3 : h 1
const cvTexture = new THREE.Texture( cv );
cvTexture.needsUpdate = true; // otherwise all black only
const spineMat = new THREE.MeshPhongMaterial( { color: 0xa5800e } );
const cvMaterial = new THREE.MeshBasicMaterial( { map: cvTexture  } );
const cvMaterials = [ spineMat, spineMat, spineMat, spineMat, cvMaterial, cvMaterial ]; 
const cvTxtMesh = new THREE.Mesh( txtGeometry, cvMaterials );
cvTxtMesh.rotation.y = 2.4; // radiant
cvTxtMesh.position.set( -3, -0.59, 3 );
scene.add( cvTxtMesh );


*/
