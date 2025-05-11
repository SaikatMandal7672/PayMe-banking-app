"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { signUpSchema } from "@/schemas/signUpSchema";
import axios from "axios";
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

const SignUp = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  //zod implementation
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      password: "",
    },
  });

  // handling on-submit using onsubmit handler of react-hook forms
  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    setIsSubmitting(true);
    console.log("onSubmit data: ", data);
    try {
      const response = await axios.post(`/api/signup`, data);
      toast.success(response.data.message);
      router.replace(`/signin`);
      setIsSubmitting(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data.message ??
            "An error occurred. User signup failed"
        );
      } else {
        toast.error("An unexpected error occurred. User signup failed");
      }
      setIsSubmitting(false);
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-violet-400 ">
      <div className="w-full h-108 max-w-md p-8 space-y-8 bg-white rounded-lg flex flex-col items-center justify-center  shadow-md gap-y-8 ">
        <div className="text-center ">
          <h1 className="text-4xl font-bold tracking-tight lg:text-5xl h-14">
            SignUp to PayMe
          </h1>
          <p className="mb-4 text-violet-800 text-[16px] h-5">
            Start ur seamless payments journey
          </p>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 flex flex-col gap-y-6 md:w-full w-xs  max-w-sm px-4 "
          >
            <FormField
              name="phone"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <Input {...field} name="phone" />
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
                  <p className="bg-green-100 rounded h-6  text-green-500 text-sm text-center">
                    Your password must be at least 6 characters long
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full bg-violet-200 text-violet-700 hover:bg-violet-700 hover:text-violet-50 "
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>
        </Form>
        <div className="text-center mt-4">
          <p>
            Already a member?{" "}
            <span className="text-blue-500 hover:text-blue-800 underline decoration-wavy"> 
              <Link href="/signin" >
                Sign in
              </Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
