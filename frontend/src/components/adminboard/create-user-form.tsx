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
import { toast } from "sonner"
import { useMutation } from "@tanstack/react-query"
import { createUser } from "@/api/users"

const emailErrorMessage = "Veuiller renseigner une adresse email valide.";
const pwMinLengthErrorMessage = "Le mot de passe doit être composé d'au moins 8 caractères.";
const pwMaxLengthErrorMessage = "Le mot de passe doit être composé d'au plus 20 caractères.";
const pwUppercaseErrorMessage = "Le mot de passe doit être contenir au moins une lettre majuscule.";
const pwLowercaseErrorMessage = "Le mot de passe doit être contenir au moins une lettre miniscule.";
const pwNumberErrorMessage = "Le mot de passe doit être contenir au moins un chiffre.";
const pwSpecialCharacterErrorMessage = "Le mot de passe doit être contenir au moins un caractère spécial.";
const pwMismatchErrorMessage = "Veuillez renseigner le même mot de passe.";

const passwordSchema = z
  .string()
  .min(8, { message: pwMinLengthErrorMessage })
  .max(20, { message: pwMaxLengthErrorMessage })
  .refine((password) => /[A-Z]/.test(password), {
    message: pwUppercaseErrorMessage,
  })
  .refine((password) => /[a-z]/.test(password), {
    message: pwLowercaseErrorMessage,
  })
  .refine((password) => /[0-9]/.test(password), { message: pwNumberErrorMessage })
  .refine((password) => /[!@#$%^&*]/.test(password), {
    message: pwSpecialCharacterErrorMessage,
  });

const emailSchema = z
  .email({error : emailErrorMessage})


const formSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  confirmPassword : z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    error : pwMismatchErrorMessage,
    path : ['confirmPassword']
})




export function CreateUserForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver : zodResolver(formSchema),
        defaultValues : {
            email : '',
            password : '',
            confirmPassword : '',
        }
    })

    const createUserMutation = useMutation({
        mutationFn : createUser,
        onSuccess : (data) => {
            console.log(data)
            toast(
                "Vous avez soumis les identifiants suivants", {
                description: (
                    <pre className="bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4">
                    <code>{JSON.stringify(data, null, 2)}</code>
                    </pre>
                ),
                position: "bottom-right",
                classNames: {
                    content: "flex flex-col gap-2",
                },
                style: {
                    "--border-radius": "calc(var(--radius)  + 4px)",
                } as React.CSSProperties,
            })

            form.reset()
        },
        onError : (error) => {
            toast.error(error.message)
        }
    })

    function onSubmit(data: z.infer<typeof formSchema>) {

        createUserMutation.mutate({
            email: data.email,
            password: data.password,
        })

        // console.log(data);
        // toast("Vous avez soumis les valeurs suivantes", {
        // description: (
        //     <pre className="bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4">
        //     <code>{JSON.stringify(data, null, 2)}</code>
        //     </pre>
        // ),
        // position: "bottom-right",
        // classNames: {
        //     content: "flex flex-col gap-2",
        // },
        // style: {
        //     "--border-radius": "calc(var(--radius)  + 4px)",
        // } as React.CSSProperties,
        // })
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
            <Button type="submit" form="form-cu">
                Créer
            </Button>
            </Field>
        </CardFooter>
      </Card>
    </div>
  )
}
