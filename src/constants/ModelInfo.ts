export interface ModelsInfo {
  modelName: string;
  modelThumbnail: string;
  modelLink: string;
  model3DFile: string;
  configuration: ModelConfiguration;
}

export interface ModelConfiguration {
  nodeObjectName: string;
  scale?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
  textMaskConfig?: {
    canvasWidth: number;
    canvasHeight: number;
    canvasFillTextX: number;
    canvasFillTextY: number;
  };
  imageMaskConfig?: {};
}

export const modelsInfo: ModelsInfo[] = [
  {
    modelName: "P2 Type 1",
    modelThumbnail: "/thumbnail/1.png",
    modelLink: "/model/p2-type1",
    model3DFile: "P2_type1.glb",
    configuration: {
      nodeObjectName: "P2_Top2",
      position: [0, 0, 0],
      scale: 10,
      textMaskConfig: {
        canvasWidth: 1536,
        canvasHeight: 800,
        canvasFillTextX: 0.6 * 1536,
        canvasFillTextY: 0.35 * 800,
      },
    },
  },
  {
    modelName: "P3 Type 1",
    modelThumbnail: "/thumbnail/2.png",
    modelLink: "/model/p3-type1",
    model3DFile: "P3_type1.glb",
    configuration: {
      nodeObjectName: "P3_Top",
      position: [0, 0, 0],
      scale: 10,
      textMaskConfig: {
        canvasWidth: 1200,
        canvasHeight: 1200,
        canvasFillTextX: 0.6 * 1200,
        canvasFillTextY: 0.5 * 1200,
      },
    },
  },
  {
    modelName: "P3 Type 3",
    modelThumbnail: "/thumbnail/3.png",
    modelLink: "/model/p3-type3",
    model3DFile: "p3_typ3.glb",
    configuration: {
      nodeObjectName: "P3_typ3_Top",
      position: [0, 0, 0],
      scale: 10,
      textMaskConfig: {
        canvasWidth: 1200,
        canvasHeight: 1200,
        canvasFillTextX: 0.4 * 1200,
        canvasFillTextY: 0.2 * 1200,
      },
    },
  },
  {
    modelName: "P4 Type 1",
    modelThumbnail: "/thumbnail/4.png",
    modelLink: "/model/p4-type1",
    model3DFile: "P4_type1.glb",
    configuration: {
      nodeObjectName: "P4Type1",
      position: [0, 0, 0],
      scale: 45,
      textMaskConfig: {
        canvasWidth: 2400,
        canvasHeight: 600,
        canvasFillTextX: 0.25 * 2400,
        canvasFillTextY: 0.4 * 600,
      },
    },
  },
  {
    modelName: "P5 Type 1",
    modelThumbnail: "/thumbnail/5.png",
    modelLink: "/model/p5-type1",
    model3DFile: "P5_type1.glb",
    configuration: {
      nodeObjectName: "P5_typ1",
      position: [0, 0, 0],
      scale: 40,
      textMaskConfig: {
        canvasWidth: 1536,
        canvasHeight: 800,
        canvasFillTextX: 0.3 * 1200,
        canvasFillTextY: 0.35 * 800,
      },
    },
  },
  {
    modelName: "P9 Type 1",
    modelThumbnail: "/thumbnail/6.png",
    modelLink: "/model/p9-type1",
    model3DFile: "P9_type1.glb",
    configuration: {
      nodeObjectName: "Ear_L2",
      position: [0, 0, 0],
      scale: 50,
      textMaskConfig: {
        canvasWidth: 2000,
        canvasHeight: 800,
        canvasFillTextX: 0.4 * 2000,
        canvasFillTextY: 0.35 * 800,
      },
    },
  },
  {
    modelName: "Model 1",
    modelThumbnail: "/thumbnail/7.png",
    modelLink: "/model/model-1",
    model3DFile: "Model-1.glb",
    configuration: {
      nodeObjectName: "part2",
      position: [0, 0, 0],
      scale: 38,
      textMaskConfig: {
        canvasWidth: 1536,
        canvasHeight: 800,
        canvasFillTextX: 0.45 * 1536,
        canvasFillTextY: 0.25 * 800,
      },
    },
  },
  {
    modelName: "Model 2",
    modelThumbnail: "/thumbnail/model-2.png",
    modelLink: "/model/model-2",
    model3DFile: "Model-2.glb",
    configuration: {
      nodeObjectName: "polySurface1",
      position: [0, 0, 0],
      scale: 2.5,
      rotation: [Math.PI / 2, Math.PI / 2, Math.PI / 2],
      textMaskConfig: {
        canvasWidth: 1536,
        canvasHeight: 800,
        canvasFillTextX: 0.2 * 1536,
        canvasFillTextY: 0.25 * 800,
      },
    },
  },
];
