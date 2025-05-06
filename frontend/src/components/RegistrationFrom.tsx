"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { register } from "../lib/auth";
// import { useSonner } from "sonner";

export default function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password !== confirmPassword) {
      //   toasts({
      //     variant: "destructive",
      //     title: "Passwords do not match",
      //     description: "Please ensure both passwords match",
      //   });
      setIsLoading(false);
      return;
    }

    try {
      const success = await register({ name, email, password });

      if (success) {
        // toast({
        //   title: "Registration successful",
        //   description: "You can now log in with your credentials",
        // });
        router.push("/");
      } else {
        // toast({
        //   variant: "destructive",
        //   title: "Registration failed",
        //   description: "Email may already be in use",
        // });
      }
    } catch (error) {
      //   toast({
      //     variant: "destructive",
      //     title: "Registration failed",
      //     description: "An error occurred during registration",
      //   });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg shadow-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" name="name" placeholder="John Doe" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="admin@example.com"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            required
          />
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Creating account..." : "Register"}
        </Button>
      </form>
      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link href="/" className="text-blue-600 hover:underline">
          Login
        </Link>
      </div>
    </div>
  );
}
