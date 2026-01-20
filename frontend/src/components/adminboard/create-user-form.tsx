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
import z from "zod"
import {Controller, useForm} from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod"
import { createUser } from "@/api/users"
import ErrorToast from "../toasts/error-toast"
import SuccessToast from "../toasts/success-toast"
import { useApiMutation } from "@/hooks/useApiMutation"
import { createUserFormSchema } from "@/lib/schemas/createUser.schema"

export function CreateUserForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
    const form = useForm<z.infer<typeof createUserFormSchema>>({
        resolver : zodResolver(createUserFormSchema),
        defaultValues : {
            email : '',
            password : '',
            confirmPassword : '',
        }
    })

    const createUserMutation = useApiMutation(
        createUser,
        {
            onSuccess : (data) => {
                SuccessToast({
                    message : "L'utilisateur a été créé avec succès.",
                    data
                })
                form.reset()
            },
            onError : (error) => {
                ErrorToast({error});
            }
        }
    )

    function onSubmit(data: z.infer<typeof createUserFormSchema>) {

        createUserMutation.mutate({
            email: data.email,
            password: data.password,
        })

    }


  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Créer un utilisateur</CardTitle>
          <CardDescription>
            Compléter le formulaire
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form id = 'form-cu' onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
                <Controller
                    name="email"
                    control={form.control}
                    render={({field, fieldState}) => (
                        <Field data-invalid = {fieldState.invalid}>
                            <FieldLabel htmlFor="form-cu-email">
                                Email
                            </FieldLabel>
                            <Input
                                {...field}
                                type="email"
                                id="form-cu-email"
                                disabled = {createUserMutation.isPending}
                                aria-invalid={fieldState.invalid}
                                placeholder="Adresse email"
                                autoComplete="off"
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                >
                </Controller>
                <Controller
                    name="password"
                    control={form.control}
                    render={({field, fieldState}) => (
                        <Field data-invalid = {fieldState.invalid}>
                            <FieldLabel htmlFor="form-cu-password">
                                Mot de passe
                            </FieldLabel>
                            <Input
                                {...field}
                                disabled = {createUserMutation.isPending}
                                type='password'
                                id="form-cu-password"
                                aria-invalid={fieldState.invalid}
                                placeholder="Mot de passe"
                                autoComplete="off"
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                >
                </Controller>
                <Controller
                    name="confirmPassword"
                    control={form.control}
                    render={({field, fieldState}) => (
                        <Field data-invalid = {fieldState.invalid}>
                            <FieldLabel htmlFor="form-cu-confirmPassword">
                                Confirmer le mot de passe
                            </FieldLabel>
                            <Input
                                {...field}
                                disabled = {createUserMutation.isPending}
                                type='password'
                                id="form-cu-confirmPassword"
                                aria-invalid={fieldState.invalid}
                                placeholder="Confirmer le mot de passe"
                                autoComplete="off"
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
            <Button type="submit" form="form-cu" disabled = {createUserMutation.isPending}>
                {
                    createUserMutation.isPending ? 'Loading ...' : 'Créer'
                }
            </Button>
            </Field>
        </CardFooter>
      </Card>
    </div>
  )
}
