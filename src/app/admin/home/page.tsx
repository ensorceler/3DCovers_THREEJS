"use client";

import { modelsAtom } from "@/components/store/modelStore";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { setRedisKeyVal } from "@/lib/redis";
import { useAtom } from "jotai";
import NextImage from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminHomePage() {
  const router = useRouter();

  const [modelState, setModelState] = useAtom(modelsAtom);

  useEffect(() => {
    const isAdmin = localStorage.getItem("user");
    if (isAdmin !== "admin") {
      router.push("/admin");
    } else {
      getModelDataFromRedis();
    }
  }, []);

  const getModelDataFromRedis = async () => {
    //let models = localStorage.getItem("models");
    const res = await fetch(`/api?key=${"models"}`, {
      method: "GET",
    });
    const response = await res.json();
    console.log("response =>", response);
    if (response.data !== null) {
      const models = JSON.parse(response.data);
      setModelState(models);
    }
  };

  const onCheckedChangeModel = (modelName: string) => async (e: any) => {
    const tempModelState = modelState;
    tempModelState.forEach((item) => {
      if (item.modelName === modelName) {
        item.visible = e;
      }
    });
    //console.log("temp model state", tempModelState);
    setModelState([...tempModelState]);
    saveToRedis(JSON.stringify(tempModelState));
    //localStorage.setItem("models", JSON.stringify(tempModelState));
    //const ok = await setRedisKeyVal("models", JSON.stringify(tempModelState));
  };

  const saveToRedis = async (models: string) => {
    const data = {
      key: "models",
      value: models,
    };
    const res = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const response = await res.json();

    console.log("response", response);
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("models");
    router.push("/admin");
  };
  return (
    <div>
      <main className="flex flex-row justify-center w-screen">
        <div className="w-full h-full flex flex-col gap-5 mx-6 my-4">
          <div className="flex flex-row justify-between items-center">
            <h1 className="text-4xl font-semibold">Admin Control</h1>
            <Button variant="destructive" onClick={logout}>
              Logout
            </Button>
          </div>

          <div className="flex flex-row flex-wrap gap-3 ">
            {modelState.map((item) => (
              <Card
                className={"dark:hover:bg-green-700 dark:bg-green-900"}
                key={item.modelName}
              >
                <CardHeader>
                  <CardTitle>{item.modelName}</CardTitle>
                  <CardDescription>{item.modelName}</CardDescription>
                </CardHeader>
                <CardContent>
                  <NextImage
                    src={item.modelThumbnail}
                    height={240}
                    width={240}
                    alt="model"
                  />
                </CardContent>
                <CardFooter>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="toggle"
                      checked={item.visible}
                      onCheckedChange={onCheckedChangeModel(item.modelName)}
                    />
                    <Label htmlFor="toggle">Toggle Visibility</Label>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
