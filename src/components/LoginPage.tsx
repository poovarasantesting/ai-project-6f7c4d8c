import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Separator } from "./ui/separator";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempted with:", { email, password });
    // In a real app, you would handle authentication here
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center p-4 md:p-8 bg-gray-100">
      <div className="max-w-md w-full space-y-8">
        {/* Facebook Logo */}
        <div className="text-center">
          <h1 className="text-blue-600 text-5xl font-bold mb-4">facebook</h1>
          <p className="text-xl text-gray-700 mb-6">
            Connect with friends and the world around you on Facebook.
          </p>
        </div>

        {/* Login Card */}
        <Card className="shadow-lg">
          <CardHeader className="space-y-1 pb-2">
            <h2 className="text-lg font-semibold">Log in to Facebook</h2>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                type="email"
                placeholder="Email or phone number"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12"
                required
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12"
                required
              />
              <Button type="submit" className="w-full h-12 bg-blue-600 hover:bg-blue-700">
                Log In
              </Button>
            </form>
            <div className="text-center mt-4">
              <a href="#" className="text-blue-600 hover:underline text-sm">
                Forgot password?
              </a>
            </div>
          </CardContent>
          <Separator className="my-2" />
          <CardFooter className="flex justify-center py-4">
            <Button variant="outline" className="bg-green-600 text-white hover:bg-green-700 font-semibold px-4">
              Create New Account
            </Button>
          </CardFooter>
        </Card>

        <div className="text-center text-sm mt-6">
          <p>
            <a href="#" className="font-bold hover:underline">
              Create a Page
            </a>{" "}
            for a celebrity, brand or business.
          </p>
        </div>
      </div>
    </div>
  );
}