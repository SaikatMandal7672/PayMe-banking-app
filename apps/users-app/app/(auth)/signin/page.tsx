"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { signInSchema } from "@/schemas/signInSchema";
import { signIn } from "next-auth/react";

const SignIn = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  //zod implementation
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      password: "",
    },
  });

  // handling on-submit using onsubmit handler of react-hook forms
  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    setIsSubmitting(true);
    try {
      const result = await signIn("credentials", {
        phone: data.phone,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        console.error("Sign-in error:", result.error);
        toast.error(
          <div className="text-[#b10303]">
            <h1 className="text-xl">SignIn failed</h1>
            <h3>Incorrect username or password.</h3>
          </div>,
          {
            style: {
              background: "#ffdddd",
              opacity: "0.8",
              border: "solid 1px #ff5757",
              backdropFilter: "blur(3px)",
            },
          }
        );
        setIsSubmitting(false);
      } else if (result?.ok) {
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Error during sign-in:", error);
      toast.error("An unexpected error occurred");
      setIsSubmitting(false);
    }
  };
  return (
    <div className="min-h-screen bg-violet-300 flex justify-center items-center p-4">
      <div className="w-full h-96 max-w-md p-8 flex flex-col items-center justify-center gap-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center ">
          <h1 className="text-4xl font-bold tracking-tight lg:text-5xl  text-neutral-950 ">
            PayMe
          </h1>
          <p className="text-[16px] te xt-[#013f9e]">SignIn to your Account</p>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-y-4 w-full px-4"
          >
            <FormField
              name="phone"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone number</FormLabel>
                  <Input {...field} name="phone" className="bg-white" />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <Input type="password" {...field} name="password" />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full bg-purple-200 text-purple-700 hover:bg-violet-700 hover:text-purple-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </Form>
        <div className="text-center mt-4 w-full ">
          <p>
            Don&apos;t have an account?
            <Link
              href="/signup"
              className="text-blue-400 underline decoration-wavy decoration-1 hover:text-blue-800 ml-1"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
