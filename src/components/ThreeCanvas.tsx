"use client";

import { OrbitControls, Texture } from "@react-three/drei";
import { Canvas, useLoader } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { MeshStandardMaterial, TextureLoader } from "three";
import React, { Suspense, useEffect, useState } from "react";
import { Progress } from "./ui/progress";

interface ThreeCanvasProps {
  model3DFile: string;
}

const ThreeModel = ({ gltfFilePath }: { gltfFilePath: string }) => {
  const gltf = useGLTF(gltfFilePath);
  //const gltf = useGLTF(gltfFilePath);
  return <primitive object={gltf.scene} scale={20} />;
};

export default function ThreeCanvas({ model3DFile }: ThreeCanvasProps) {
  const [gltfFilePath, setGLTFFilePath] = useState("/3d_models/P2_type1.glb");

  useEffect(() => {
    setGLTFFilePath("/3d_models/" + model3DFile);
    useGLTF.preload("/3d_models/" + model3DFile);
  }, [model3DFile]);

  return (
    <React.Fragment>
      {model3DFile ? (
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
          <pointLight
            position={[-10, -10, -10]}
            decay={0}
            intensity={Math.PI}
          />
          <Suspense>
            <ThreeModel gltfFilePath={gltfFilePath} />
          </Suspense>
          <OrbitControls />
        </Canvas>
      ) : (
        <Progress value={33} />
      )}
    </React.Fragment>
  );
}
