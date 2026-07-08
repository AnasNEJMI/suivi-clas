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
import { useState } from "react"
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group"
import { USER_TYPE_LABELS, USER_TYPES, UserType } from "@/api/api.types"
import { Separator } from "../ui/separator"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const {requestLogin}  = useAuth();
  const [isRequestingLoggingIn, setIsRequestingLoggingIn] = useState(false);

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver : zodResolver(loginFormSchema),
    defaultValues : {
      username : '',
      password : '',
      userType : 'student'
    }
  })

  const setUserType = (value : string) => {
    if(value !== form.getValues('userType')){
      form.setValue('userType', value as UserType);
    }
  }


  async function onSubmit(data : z.infer<typeof loginFormSchema>){
    setIsRequestingLoggingIn(true);
    try{
      await requestLogin(data.username, data.password, data.userType);
    }catch(error){
      console.error(error);
    }finally{
      setIsRequestingLoggingIn(false);
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="bg-linear-135 from-25% from-lime-100/50 to-95% to-lime-300/75 border-lime-400 font-outfit">
        <CardHeader>
          <CardTitle>Se connecter</CardTitle>
          <CardDescription>
            Soumettre votre identifiant et votre mot de passe pour accéder à votre espace personnel
          </CardDescription>
        </CardHeader>
        <CardContent className="mt-2">
          <form id = 'form-login' onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name = 'username'
                control={form.control}
                render = {({field, fieldState}) => (
                  <Field data-invalid = {fieldState.invalid}>
                    <FieldLabel htmlFor="form-login-username">Identifiant</FieldLabel>
                    <Input
                      {...field}
                      id="form-login-username"
                      type="text"
                      placeholder="Identifiant"
                      disabled = {isRequestingLoggingIn}
                      aria-invalid={fieldState.invalid}
                      autoComplete='off'
                      required
                      className="bg-white focus-visible:ring-lime-500/50 focus-visible:border-lime-200  border-lime-200"
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
                      {/* <a
                        href="#"
                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                      >
                        Mot de passe oublié?
                      </a> */}
                    </div>
                    <Input
                      {...field}
                      disabled = {isRequestingLoggingIn}
                      id="form-login-password"
                      type="password"
                      aria-invalid={fieldState.invalid}
                      autoComplete="current-password"
                      required
                      className="bg-white focus-visible:ring-lime-500/50 focus-visible:border-lime-200  border-lime-200"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              >
              </Controller>
              <Separator className="bg-lime-400"/>
              <Controller
                name = 'userType'
                control={form.control}
                render = {({field, fieldState}) => (
                  <Field data-invalid = {fieldState.invalid}>
                    <div className='flex justify-between items-start gap-6'>
                      <FieldLabel htmlFor="form-login-usertype" className="text-nowrap">Vous êtes</FieldLabel>
                      <ToggleGroup
                        type="single"
                        value={field.value}
                        onValueChange={setUserType}
                        id="form-login-usertype"
                        aria-invalid={fieldState.invalid}
                        variant="default"
                        className='w-full md:max-w-xs items-center justify-end flex-col gap-2'
                      >
                        {
                          USER_TYPES.map((userType, index) => (
                            <ToggleGroupItem
                              key={index}  
                              value={userType}
                              aria-label={userType}
                              className="w-full flex items-center justify-center py-6 bg-white/30 rounded-md"
                            >
                              <span className="text-base  leading-none font-medium">{USER_TYPE_LABELS[userType as UserType]}</span>
                            </ToggleGroupItem>
                          ))
                        }
                      </ToggleGroup>
                    </div>
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
          <Field orientation="horizontal" className="flex">
            <Button size='lg' type="button" variant="outline" onClick={() => form.reset()} className="font-medium text-base py-6 flex-1">
                Annuler
            </Button>
            <Button type="submit" size='lg' form="form-login" disabled = {isRequestingLoggingIn} className="font-medium text-base py-6 flex-1">
                {
                  isRequestingLoggingIn ? 'Chargement ...' : 'Se Connecter'
                }
            </Button>
          </Field>
        </CardFooter>
      </Card>
    </div>
  )
}
