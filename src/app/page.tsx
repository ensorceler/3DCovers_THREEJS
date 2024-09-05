import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { modelsInfo } from "@/constants/ModelInfo";
import NextImage from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-row justify-center w-screen">
      <div className="w-full h-full flex flex-col gap-5 mx-6 my-4">
        <h1 className="text-4xl font-semibold">List of Models</h1>
        <div className="flex flex-row flex-wrap gap-3 ">
          {modelsInfo.map((item) => (
            <Link href={item.modelLink} passHref key={item.modelName}>
              <Card
                className={
                  "dark:hover:bg-neutral-800 cursor-pointer active:scale-95"
                }
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
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
