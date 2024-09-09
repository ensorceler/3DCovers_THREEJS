"use client";
import TestingCanvas from "@/components/TestingCanvas";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Drawer } from "@/components/ui/drawer";
import { BaseSyntheticEvent, useState } from "react";

export default function TestingThreeCanvas() {
  const [textContent, setTextContent] = useState("");
  const [imageFile, setImageFile] = useState("");

  function handleFileChange(e: any) {
    console.log(e.target.files);
    setImageFile(URL.createObjectURL(e.target.files[0]));
  }

  function handleTextChange(e: BaseSyntheticEvent) {
    setTextContent(e.target.value);
  }

  return (
    <div className="flex justify-center mt-28">
      <div className="w-[644px] h-[644px] bg-neutral-800">
        <TestingCanvas file={imageFile} text={textContent} />
      </div>
      <div className="relative flex flex-col gap-4 max-w-sm ">
        <Card>
          <CardContent className="flex flex-col gap-3">
            <div>
              <Button>Edit Using Design Tool</Button>
            </div>
            <Drawer direction="right" shouldScaleBackground={false}>
              <DrawerTrigger>
                <div className="px-4 py-2 bg-indigo-400 rounded-md">
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
                  <Button>Submit</Button>
                  <DrawerClose>
                    <div className="bg-red-800 rounded-md px-4 py-2">
                      Cancel
                    </div>
                  </DrawerClose>
                </DrawerFooter>
                <div>
                  <div>{textContent}</div>
                  <div>{imageFile}</div>
                </div>
              </DrawerContent>
            </Drawer>
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
      </div>
    </div>
  );
}
