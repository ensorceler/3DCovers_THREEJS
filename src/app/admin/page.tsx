"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { BaseSyntheticEvent, useState } from "react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsername = (e: BaseSyntheticEvent) => {
    setUsername(e.target.value);
  };
  const handlePassword = (e: BaseSyntheticEvent) => {
    setPassword(e.target.value);
  };

  // shit code dude
  const submit = () => {
    if (username === "admin" && password === "123456") {
      localStorage.setItem("user", "admin");
      router.push("/admin/home");
    } else {
      alert("wrong username, password");
    }
  };

  return (
    <div className="h-screen w-screen flex  justify-center items-center">
      <Card className="w-[480px]">
        <CardHeader>
          <p className="text-xl font-medium">User Login</p>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col space-y-2">
              <Label htmlFor="name">Username</Label>
              <Input
                id="name"
                placeholder="Username"
                onChange={handleUsername}
              />
            </div>
            <div className="">
              <div className="grid w-full max-w-sm items-center gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  placeholder="Password"
                  onChange={handlePassword}
                />
              </div>
            </div>
            <div className="w-fit">
              <Button variant="default" onClick={submit}>
                Login
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
