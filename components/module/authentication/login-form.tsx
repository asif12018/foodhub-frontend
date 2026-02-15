"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import * as z from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field as UIField,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { authClient } from "@/src/app/lib/auth-client";
import { useRouter } from "next/navigation";




//from schema
const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(8, "minimum length is 8")
})

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const router = useRouter();

  const form = useForm({
    defaultValues:{
      email:"",
      password:""
    },
    validators:{
      onSubmit: loginSchema
    },
    onSubmit: async ({value}) =>{
     const toastId = toast("Signing in....");
     try{
         const {error} = await authClient.signIn.email(value);
         if(error){
           toast.error(error.message, {id: toastId});
           return
         }
         toast.success("User Signin successfully", {id: toastId});
         router.push("/")
     }catch(err){
       toast.error("Something went wrong", {id: toastId});
     }
    }
  });

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
          id="login-form"
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
          >
            <FieldGroup>
              <form.Field
              name="email" children={(field)=>{
                const isValid = field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                   <UIField>
                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                    <Input
                    type="email"
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onChange={(e)=> field.handleChange(e.target.value)}
                    ></Input>
                    {
                      isValid && (
                        <FieldError errors={field.state.meta.errors}/>
                      )
                    }
                   </UIField>
                )
              }}/>


               <form.Field
              name="password" children={(field)=>{
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                   <UIField>
                    <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                    <Input
                    type="password"
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onChange={(e)=> field.handleChange(e.target.value)}
                    ></Input>
                    {
                      isInvalid && (
                        <FieldError errors={field.state.meta.errors}/>
                      )
                    }
                   </UIField>
                )
              }}/>
              <UIField>
                <Button form="login-form" type="submit">Login</Button>
                
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <a href="#">Sign up</a>
                </FieldDescription>
              </UIField>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
