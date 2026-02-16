"use client";
import { cn } from "@/lib/utils";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Field as UIField,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { authClient } from "@/src/app/lib/auth-client";
import { useRouter } from "next/navigation";
interface Login2Props {
  heading?: string;
  logo?: {
    url: string;
    src: string;
    alt: string;
    title?: string;
    className?: string;
  };
  buttonText?: string;
  googleText?: string;
  signupText?: string;
  signupUrl?: string;
  className?: string;
}

//registration form schema
const registrationSchema = z.object({
  name: z.string().min(3, "Name must be at least 5 characters long"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  image: z.string().or(z.undefined()),
  roles: z.enum(["Customer", "Provider"]),
  phone: z
    .string()
    .min(11, "phone number must be 11 digit long")
    .or(z.undefined()),
});

const RegisterForm = ({
  heading = "Register Now",
  logo = {
    url: "https://www.shadcnblocks.com",
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-wordmark.svg",
    alt: "logo",
    title: "shadcnblocks.com",
  },
  buttonText = "Login",
  signupText = "Need an account?",
  signupUrl = "https://shadcnblocks.com",
  className,
}: Login2Props) => {
  const router = useRouter();

  //rgistration form business logic

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phone: undefined as string | undefined,
      image: undefined as string | undefined,
      roles: "Customer" as "Customer" | "Provider",
    },
    validators: {
      onSubmit: registrationSchema,
    },
    onSubmit: async ({ value, formApi }) => {
      const toastId = toast("registration ongoing....");
      try {
        const { error } = await authClient.signUp.email(value);

    if (error) {
      // 2. Check for the specific email conflict error
      if (error.code === "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL") {
        formApi.setFieldMeta("email", (prev) => ({
          ...prev,
          errors: ["This email is already registered."],
        }));
      }

      toast.error(error.message, { id: toastId });
      return; // Stop execution here
    }

    toast.success("registration successful", { id: toastId });
    await authClient.getSession();
    window.location.href = "/";
      } catch (err) {
        toast.error("something went wrong", { id: toastId });
      }
    },
  });

  return (
    <section className={cn("h-screen bg-muted", className)}>
      <div className="flex h-full items-center justify-center">
        <div className="flex flex-col items-center gap-6 lg:justify-start">
          {/* Logo */}
          <a href={logo.url}>
            <img
              src={logo.src}
              alt={logo.alt}
              title={logo.title}
              className="h-10 dark:invert"
            />
          </a>
          <div className="flex w-full max-w-sm min-w-sm flex-col items-center gap-y-4 rounded-md border border-muted bg-background px-6 py-8 shadow-md">
            {heading && <h1 className="text-xl font-semibold">{heading}</h1>}
            <div className="flex w-full flex-col gap-2">
          <form id="registration-form"
          onSubmit={(e)=>{
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          >
                <form.Field
                name="name"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <UIField>
                      <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                      <Input
                        type="text"
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                      ></Input>
                      {isInvalid && (
                        <FieldError
                          errors={field.state.meta.errors}
                        ></FieldError>
                      )}
                    </UIField>
                  );
                }}
              />

              <form.Field
                name="email"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <UIField>
                      <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                      <Input
                        type="email"
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                      ></Input>
                      {isInvalid && (
                        <FieldError
                          errors={field.state.meta.errors}
                        ></FieldError>
                      )}
                    </UIField>
                  );
                }}
              />

              <form.Field
                name="password"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <UIField>
                      <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                      <Input
                        type="password"
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                      ></Input>
                      {isInvalid && (
                        <FieldError
                          errors={field.state.meta.errors}
                        ></FieldError>
                      )}
                    </UIField>
                  );
                }}
              />

              <form.Field
                name="image"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <UIField>
                      <FieldLabel htmlFor={field.name}>Image Url</FieldLabel>
                      <Input
                        type="text"
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                      ></Input>
                      {isInvalid && (
                        <FieldError
                          errors={field.state.meta.errors}
                        ></FieldError>
                      )}
                    </UIField>
                  );
                }}
              />

              <form.Field
                name="roles"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched &&
                    field.state.meta.errors.length > 0;

                  return (
                    <UIField>
                      <FieldLabel htmlFor={field.name}>Select Role</FieldLabel>

                      {/* Using a standard HTML select or your UI Library's Select component */}
                      <select
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onChange={(e) =>
                          field.handleChange(
                            e.target.value as "Customer" | "Provider",
                          )
                        }
                        className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="" disabled>
                          Select a role...
                        </option>
                        <option value="Customer">Customer</option>
                        <option value="Provider">Provider</option>
                      </select>

                      {isInvalid && (
                        <FieldError
                          errors={field.state.meta.errors}
                        ></FieldError>
                      )}
                    </UIField>
                  );
                }}
              />
          </form>
            </div>

            <Button form="registration-form" type="submit" className="w-full">
              Register
            </Button>
          </div>
          <div className="flex justify-center gap-1 text-sm text-muted-foreground">
            <p>{signupText}</p>
            <a
              href={signupUrl}
              className="font-medium text-primary hover:underline"
            >
              Sign up
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export { RegisterForm };
