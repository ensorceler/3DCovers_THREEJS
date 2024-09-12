"use client";

import ThreeCanvas from "@/components/ThreeCanvas";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { modelsInfo } from "@/constants/ModelInfo";
import { usePathname } from "next/navigation";
import { BaseSyntheticEvent, useEffect, useState } from "react";

export default function ModelPage() {
  const pathName = usePathname();
  const [model3DFile, setModel3DFile] = useState("Model-1.glb");

  const [textContent, setTextContent] = useState("");
  const [imageFile, setImageFile] = useState("");

  const [submitCounter, setSubmitCounter] = useState(0);
  const [openDrawer, setOpenDrawer] = useState(false);

  function handleFileChange(e: any) {
    //console.log(e.target.files);
    setImageFile(URL.createObjectURL(e.target.files[0]));
  }

  function handleReplaceImageBtn(e: any) {
    setImageFile(URL.createObjectURL(e.target.files[0]));
    setSubmitCounter((p) => p + 1);
  }

  function handleTextChange(e: BaseSyntheticEvent) {
    setTextContent(e.target.value);
  }

  const handleSubmit = () => {
    setSubmitCounter((p) => p + 1);
    setOpenDrawer(false);
  };

  const handleTrigger = () => {
    setOpenDrawer(true);
  };

  useEffect(() => {
    //console.log("pathname =>", pathName);
    const currentModel = modelsInfo.filter(
      (item) => item.modelLink === pathName
    )[0];
    setModel3DFile(currentModel.model3DFile);
  }, []);

  const goToInteractive2DPage = () => {
    const currentModel = modelsInfo.filter(
      (item) => item.modelLink === pathName
    )[0];
    window.open(
      "http://intractve3d-testproject.s3-website.ap-south-1.amazonaws.com/" +
        currentModel?.interactiveLink +
        ".html",
      "_blank"
    );
  };

  return (
    <div className="flex justify-center gap-6 mt-28">
      <div className="flex gap-6 items-start">
        <div className="h-[550px] w-[550px] bg-neutral-950">
          <ThreeCanvas
            model3DFile={model3DFile}
            file={imageFile}
            text={textContent}
            submitCounter={submitCounter}
          />
        </div>
        <div className="relative flex flex-col gap-4 max-w-sm ">
          <Card>
            <CardHeader className="flex flex-col gap-3">
              <p className="text-xl font-medium">Personalize 3D Model</p>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <div>
                <Button
                  variant="default"
                  className="w-64"
                  onClick={goToInteractive2DPage}
                >
                  Edit Using Design Tool
                </Button>
              </div>
              <Drawer
                direction="right"
                shouldScaleBackground={false}
                open={openDrawer}
              >
                <DrawerTrigger onClick={handleTrigger}>
                  <div className="px-4 py-2 bg-indigo-400 rounded-md w-64">
                    Personalize
                  </div>
                </DrawerTrigger>
                <DrawerContent className="right-0 top-0 w-[644px] px-4 py-3 flex flex-col gap-5">
                  <DrawerHeader className="p-0">
                    <DrawerTitle>Personalize</DrawerTitle>
                  </DrawerHeader>
                  <div className="flex flex-col space-y-2">
                    <Label htmlFor="name">Text Content of Model</Label>
                    <Input
                      id="name"
                      placeholder="TEXT"
                      onChange={handleTextChange}
                    />
                  </div>
                  <div className="">
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                      <Label htmlFor="picture">Picture</Label>
                      <Input
                        id="picture"
                        type="file"
                        onChange={handleFileChange}
                      />
                    </div>
                  </div>
                  <DrawerFooter className="w-fit p-0 flex flex-row gap-2">
                    <Button onClick={handleSubmit}>Submit</Button>
                    <DrawerClose onClick={() => setOpenDrawer(false)}>
                      <div className="bg-red-800 rounded-md px-4 py-2">
                        Cancel
                      </div>
                    </DrawerClose>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            </CardContent>
            <CardFooter>
              {submitCounter > 0 && imageFile !== "" && (
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="picture">Replace Image</Label>
                  <Input
                    id="picture"
                    type="file"
                    onChange={handleReplaceImageBtn}
                  />
                </div>
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
