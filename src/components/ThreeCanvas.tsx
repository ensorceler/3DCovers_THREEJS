"use client";

import { OrbitControls, Texture, useTexture } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import {
  CanvasTexture,
  MeshStandardMaterial,
  RepeatWrapping,
  TextureLoader,
} from "three";
import React, { useEffect, useRef, useState } from "react";
import { getConfigurationByModelPath } from "@/lib/utils";
import { ModelConfiguration } from "@/constants/ModelInfo";

interface ThreeCanvasProps {
  model3DFile: string;
  text: string;
  file: string;
  submitCounter: number;
  //handleSubmit: () => void;
}

interface ThreeModelProps {
  gltfFilePath: string;
  imageFile: string;
  text: string;
  submitCounter: number;
}

const ThreeModel = ({
  gltfFilePath,
  imageFile = "",
  text,
  submitCounter,
}: ThreeModelProps) => {
  const ref = useRef();
  const gltf = useGLTF(gltfFilePath);
  const [modelConfig, setModelConfig] = useState<ModelConfiguration | null>(
    null
  );
  //const [imageTexture, setImageTexture] = useState("");
  useFrame(() => ((ref.current! as any).rotation.y += 0.001));

  // Here, we can access the camera via the useThree hook
  useThree(({ camera }) => {
    camera.position.y = 2;
    camera.lookAt(0, 0, 0);
  });

  const textMaskOnModel = () => {
    const cv = document.createElement("canvas");

    cv.width = modelConfig?.textMaskConfig?.canvasWidth || 1536; //  3 * 512
    cv.height = modelConfig?.textMaskConfig?.canvasHeight || 800;
    const ctx = cv.getContext("2d")!;
    ctx.fillStyle = "#fefefe";
    ctx.fillRect(0, 0, cv.width, cv.height);
    ctx.fillStyle = "#191212";
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.font = "bold 5vh Arial";
    ctx.fillText(
      text,
      modelConfig?.textMaskConfig?.canvasFillTextX || 0.3 * cv.width,
      modelConfig?.textMaskConfig?.canvasFillTextY || 0.3 * cv.height
    );

    const texture = new CanvasTexture(cv);
    texture.needsUpdate = true;

    const material = new MeshStandardMaterial({
      map: texture,
    });
    texture.repeat.set(-1, 1);
    texture.offset.set(1, 1);
    texture.wrapS = texture.wrapT = RepeatWrapping;

    const specificMesh: any = getSpecificObjectFromModel();
    specificMesh.material = material;
    specificMesh.needsUpdate = true;
  };

  const imageMaskOnModel = () => {
    const specificMesh: any = getSpecificObjectFromModel();
    const textureLoader = new TextureLoader();

    textureLoader.load(imageFile, (texture) => {
      texture.repeat.set(-1, 1);
      texture.offset.set(1, 1);
      texture.needsUpdate = true;
      const material = new MeshStandardMaterial({
        map: texture,
      });

      texture.wrapS = texture.wrapT = RepeatWrapping;
      specificMesh.material = material;
      specificMesh.needsUpdate = true;
    });
  };

  const getSpecificObjectFromModel = () => {
    console.log("config", modelConfig);
    const specificObject: any = gltf?.scene?.getObjectByName(
      modelConfig?.nodeObjectName!
    );
    if (specificObject === null || specificObject === undefined) {
      console.log("null object", specificObject);
    }
    return specificObject;
  };

  useEffect(() => {
    if (imageFile) {
      imageMaskOnModel();
    }
    if (text) {
      textMaskOnModel();
    }
  }, [submitCounter]);

  useEffect(() => {
    useGLTF.preload(gltfFilePath);
    setModelConfig(getConfigurationByModelPath(gltfFilePath));
  }, [gltfFilePath]);

  return (
    <primitive
      ref={ref}
      object={gltf.scene}
      position={modelConfig?.position ?? [0, 0, 0]}
      rotation={modelConfig?.rotation ?? [0, 0, 0]}
      scale={modelConfig?.scale ?? 20}
    />
  );
};

export default function ThreeCanvas({
  model3DFile,
  text,
  file,
  submitCounter,
}: ThreeCanvasProps) {
  const [gltfFilePath, setGLTFFilePath] = useState("/3d_models/P2_type1.glb");

  useEffect(() => {
    setGLTFFilePath("/3d_models/" + model3DFile);
    //useGLTF.preload("/3d_models/" + model3DFile);
  }, [model3DFile]);

  return (
    <React.Fragment>
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
        <ThreeModel
          gltfFilePath={gltfFilePath}
          submitCounter={submitCounter}
          imageFile={file}
          text={text}
        />
        <OrbitControls />
      </Canvas>
    </React.Fragment>
  );
}
