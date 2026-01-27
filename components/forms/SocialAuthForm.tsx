"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import ROUTES from "@/constants/routes";

const SocialAuthForm = () => {
  const buttonClass =
    "background-dark400_light900 body-medium text-dark200_light800 rounded-2 py3.5 min-h-1/2 flex-1 px-4";

  const handleSignIn = async (provider: "github" | "google") => {
    try {
      await signIn(provider, {
        redirectTo: ROUTES.HOME,
      });
    } catch (error) {
      console.log(error);

      toast.error("Sign-in Failed", {
        description: error instanceof Error ? error.message : "An error occurred during sign-in.",
        position: "top-center",
      });
    }
  };

  return (
    <div className="mt-10 flex flex-wrap gap-2.5">
      <Button className={buttonClass} onClick={() => handleSignIn("github")}>
        <Image
          src="icons/github.svg"
          alt="GitHub Logo"
          width={20}
          height={20}
          className="invert-colors mr-2.5object-contain"
        />
        <span>Login with GitHub</span>
      </Button>

      <Button className={buttonClass} onClick={() => handleSignIn("google")}>
        <Image src="icons/google.svg" alt="Google Logo" width={20} height={20} className="mr-2.5object-contain" />
        <span>Login with Google</span>
      </Button>
    </div>
  );
};
export default SocialAuthForm;
