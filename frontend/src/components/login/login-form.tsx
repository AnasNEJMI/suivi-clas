import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/contexts/auth/use-auth"
import { Controller, useForm } from "react-hook-form"
import { createLoginFormSchema as loginFormSchema } from "@/lib/schemas/login.schema"
import type z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate } from "react-router"
import { useState } from "react"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const {requestLogin}  = useAuth();
  const navigate = useNavigate();
  const [isRequestingLoggingIn, setIsRequestingLoggingIn] = useState(false);

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver : zodResolver(loginFormSchema),
    defaultValues : {
      email : '',
      password : ''
    }
  })


  async function onSubmit(data : z.infer<typeof loginFormSchema>){
    setIsRequestingLoggingIn(true);
    try{
      await requestLogin(data.email, data.password);
      navigate('/dashboard', {replace : true});
    }catch(error){
      console.error(error);
    }finally{
      setIsRequestingLoggingIn(false);
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Se connecter</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form id = 'form-login' onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name = 'email'
                control={form.control}
                render = {({field, fieldState}) => (
                  <Field data-invalid = {fieldState.invalid}>
                    <FieldLabel htmlFor="form-login-email">Email</FieldLabel>
                    <Input
                      {...field}
                      id="form-login-email"
                      type="email"
                      placeholder="Adresse email"
                      disabled = {isRequestingLoggingIn}
                      aria-invalid={fieldState.invalid}
                      autoComplete="email"
                      required
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              >
              </Controller>
              <Controller
                name = 'password'
                control={form.control}
                render = {({field, fieldState}) => (
                  <Field data-invalid = {fieldState.invalid}>
                    <div className="flex items-center">
                      <FieldLabel htmlFor="form-login-password">Mot de passe</FieldLabel>
                      <a
                        href="#"
                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                      >
                        Mot de passe oublié?
                      </a>
                    </div>
                    <Input
                      {...field}
                      disabled = {isRequestingLoggingIn}
                      id="form-login-password"
                      type="password"
                      aria-invalid={fieldState.invalid}
                      autoComplete="current-password"
                      required
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              >
              </Controller>
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter>
          <Field orientation="horizontal">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
              Annuler
          </Button>
          <Button type="submit" form="form-login" disabled = {isRequestingLoggingIn}>
              {
                isRequestingLoggingIn ? 'Loading ...' : 'Créer'
              }
          </Button>
          </Field>
        </CardFooter>
      </Card>
    </div>
  )
}
