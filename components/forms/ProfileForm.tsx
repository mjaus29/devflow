"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import ROUTES from "@/constants/routes";
import { toast } from "sonner";
import { updateUser } from "@/lib/actions/user.action";
import { ProfileSchema } from "@/lib/validations";

import FormFieldWrapper from "./FormFieldWrapper";

interface Params {
  user: User;
}

const ProfileForm = ({ user }: Params) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ProfileSchema>>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      name: user.name || "",
      username: user.username || "",
      portfolio: user.portfolio || "",
      location: user.location || "",
      bio: user.bio || "",
    },
  });

  const handleUpdateProfile = async (values: z.infer<typeof ProfileSchema>) => {
    startTransition(async () => {
      const result = await updateUser({
        ...values,
      });

      if (result.success) {
        toast("Success", {
          description: "Your profile has been updated successfully.",
        });

        router.push(ROUTES.PROFILE(user._id));
      } else {
        toast.error(`Error (${result.status})`, {
          description: result.error?.message,
        });
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleUpdateProfile)} className="mt-9 flex w-full flex-col gap-9">
        <FormFieldWrapper control={form.control} name="name" label="Name" placeholder="Your Name" required />

        <FormFieldWrapper
          control={form.control}
          name="username"
          label="Username"
          placeholder="Your username"
          required
        />

        <FormFieldWrapper
          control={form.control}
          name="portfolio"
          label="Portfolio Link"
          placeholder="Your Portfolio link"
          type="url"
        />

        <FormFieldWrapper
          control={form.control}
          name="location"
          label="Location"
          placeholder="Where do you live?"
          required
        />

        <FormFieldWrapper
          control={form.control}
          name="bio"
          label="Bio"
          placeholder="What's special about you?"
          required
          isTextarea
          rows={5}
        />

        <div className="mt-7 flex justify-end">
          <Button type="submit" className="primary-gradient w-fit" disabled={isPending}>
            {isPending ? (
              <>
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <>Submit</>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProfileForm;
