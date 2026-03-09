"use client";
import AuthForm from "@/components/forms/AuthForm";
import { signUpWithCredentials } from "@/lib/actions/auth.actions";
import { SignUpSchema } from "@/lib/validations";

const SignUp = () => {
  return (
    <AuthForm
      formType="SIGN_UP"
      schema={SignUpSchema}
      defaultValues={{ username: "", name: "", email: "", password: "" }}
      onSubmit={signUpWithCredentials}
    />
  );
};
export default SignUp;
