"use client";

import ThreeCanvas from "@/components/ThreeCanvas";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { modelsInfo } from "@/constants/ModelInfo";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function ModelPage() {
  const pathName = usePathname();
  const [model3DFile, setModel3DFile] = useState("Model-1.glb");
  const [showPersonalizeDialog, setShowPersonalizeDialog] = useState(true);

  useEffect(() => {
    console.log("pathname =>", pathName);
    const currentModel = modelsInfo.filter(
      (item) => item.modelLink === pathName
    )[0];
    //console.log("current model ", currentModel.model3DFile);
    setModel3DFile(currentModel.model3DFile);
  }, []);

  return (
    <div className="flex justify-center gap-6 mt-28">
      <div className="flex gap-6 items-start">
        <div className="h-[644px] w-[644px] bg-neutral-800">
          <ThreeCanvas model3DFile={model3DFile} />
        </div>
        <div className="relative flex flex-col gap-4 max-w-sm ">
          <Card>
            <CardHeader className="flex flex-col gap-3">
              <p className="text-xl font-medium">
                Custom Dog Photo Best Dad By Par Black White Golf Head Cover
              </p>
              <p>
                $39.65 $49.56 Comp. value i each Save 20% with code ENDOFSEASONZ
              </p>
              <p>
                ☆★ ☆★ ☆★ ☆★ ☆★ (245) <br />
                by Black Dog Art Order today and get it by Sep 9 - 13
              </p>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <div>
                <Button>Edit Using Design Tool</Button>
              </div>
              <Drawer direction="right" shouldScaleBackground={false}>
                <DrawerTrigger>
                  <div className="w-fit">
                    <Button variant="destructive">Personalize</Button>
                  </div>
                </DrawerTrigger>
                <DrawerContent className="right-0 top-0 w-[644px] px-4 py-3 flex flex-col gap-5">
                  <DrawerHeader className="p-0">
                    <DrawerTitle>Personalize</DrawerTitle>
                  </DrawerHeader>
                  <div className="flex flex-col space-y-2">
                    <Label htmlFor="name">Text Content of Model</Label>
                    <Input id="name" placeholder="TEXT" />
                  </div>
                  <div className="">
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                      <Label htmlFor="picture">Picture</Label>
                      <Input id="picture" type="file" />
                    </div>
                  </div>
                  <DrawerFooter className="w-fit p-0 flex flex-row gap-2">
                    <Button>Submit</Button>
                    <DrawerClose>
                      <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            </CardContent>
            <CardFooter></CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
