import React, { useState } from "react";
import { useAuthActions } from "@convex-dev/auth/react";
import { useForm } from "react-hook-form";
import { AuthSignInSchema, AuthSignInSchemaType } from "@/types/auth/authTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Form } from "../ui/form";
import CustomInput from "../validated-inputs/custom-input";
import CustomPasswordInput from "../validated-inputs/custom-password-input";
import {
  LoaderIcon,
  LockIcon,
  MailIcon,
  TriangleAlertIcon,
} from "lucide-react";
import SubmitLoader from "../loaders/submit-loader";
const SignUpInput = () => {
  const { signIn } = useAuthActions();
  const router = useRouter();
  const [loading, setIsloading] = useState(false);
  const [error, setError] = useState("");

  const form = useForm<AuthSignInSchemaType>({
    resolver: zodResolver(AuthSignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSignIn = (values: AuthSignInSchemaType) => {
    setIsloading(true);
    setError("");
    signIn("password", {
      email: values.email,
      password: values.password,
      flow: "signIn",
    })
      .then(() => {
        toast.success("sign in Successfull");
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setIsloading(false);
        router.push("/");
      });
  };
  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-y-2"
        onSubmit={form.handleSubmit(handleSignIn)}
      >
        <CustomInput
          control={form.control}
          name="email"
          label="Email"
          disabled={loading}
          placeholder="Enter Your Email"
          icon={MailIcon}
        />
        <CustomPasswordInput
          control={form.control}
          label="Password"
          name="password"
          disabled={loading}
          placeholder="Enter Your Password"
          icon={LockIcon}
        />
        {!!error && (
          <div className="flex  h-8 rounded-lg flex-row bg-red-500/50 items-center justify-center px-4">
            <TriangleAlertIcon className="  size-3.5" />
            <p className="p-3 rounded-lg ">{error}</p>
          </div>
        )}
        <div className="w-full my-4">
          <SubmitLoader
            defaultText="Sign In"
            loadingIcon={LoaderIcon}
            loadingState={loading}
            loadingText="Signing in..."
          />
        </div>
      </form>
    </Form>
  );
};

export default SignUpInput;
