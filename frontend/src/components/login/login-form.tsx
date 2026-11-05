import { useState, type ComponentProps } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type z from 'zod'
import {
  AlertCircle,
  ClipboardList,
  Eye,
  EyeOff,
  GraduationCap,
  LockKeyhole,
  UserRound,
  UsersRound,
} from 'lucide-react'

import { USER_TYPE_LABELS, USER_TYPES, type UserType } from '@/api/api.types'
import { useAuth } from '@/contexts/auth/use-auth'
import { createLoginFormSchema as loginFormSchema } from '@/lib/schemas/login.schema'
import { cn } from '@/lib/utils'
import { BrandButton } from '@/components/brand-button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group-alt'

const roleDetails: Record<string, { description: string; icon: typeof GraduationCap }> = {
  student: {
    description: 'Accéder à mon espace élève',
    icon: GraduationCap,
  },
  associationMember: {
    description: 'Accéder à mon espace association',
    icon: UsersRound,
  },
  animator: {
    description: 'Accéder à mon espace animateur',
    icon: ClipboardList,
  },
}

export function LoginForm({
  className,
  ...props
}: ComponentProps<'div'>) {
  const { requestLogin } = useAuth()
  const [isRequestingLoggingIn, setIsRequestingLoggingIn] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [loginError, setLoginError] = useState<string | null>(null)

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: '',
      password: '',
      userType: 'student',
    },
  })

  async function onSubmit(data: z.infer<typeof loginFormSchema>) {
    setLoginError(null)
    setIsRequestingLoggingIn(true)

    try {
      await requestLogin(data.username.trim(), data.password, data.userType)
    } catch {
      setLoginError(
        "La connexion n'a pas abouti. Vérifiez votre identifiant, votre mot de passe et le type de compte, puis réessayez.",
      )
    } finally {
      setIsRequestingLoggingIn(false)
    }
  }

  return (
    <div className={cn('w-full font-outfit', className)} {...props}>
      <Card className="ml-auto overflow-hidden rounded-[1.65rem] max-w-xl border-0 bg-white shadow-none dark:bg-zinc-900">
        <CardHeader className="space-y-2 px-5 pb-2 pt-6 sm:px-7 sm:pt-7">
          <div className="mb-1 flex size-11 items-center justify-center rounded-2xl bg-lime-100 text-zinc-900 ring-1 ring-lime-200">
            <LockKeyhole className="size-5" aria-hidden="true" />
          </div>
          <CardTitle className="text-2xl font-extrabold tracking-tight text-zinc-950 dark:text-white sm:text-[1.7rem]">
            Se connecter
          </CardTitle>
          <CardDescription className="max-w-sm text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
            Renseignez vos informations pour accéder à votre espace personnel.
          </CardDescription>
        </CardHeader>

        <CardContent className="px-5 pb-3 pt-5 sm:px-7">
          <form
            id="form-login"
            onSubmit={form.handleSubmit(onSubmit)}
            noValidate
          >
            <FieldGroup className="gap-5">
              <Controller
                name="username"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="gap-2">
                    <FieldLabel
                      htmlFor="form-login-username"
                      className="text-sm font-bold text-zinc-800 dark:text-zinc-200"
                    >
                      Identifiant
                    </FieldLabel>
                    <div className="relative">
                      <UserRound
                        className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-zinc-400"
                        aria-hidden="true"
                      />
                      <Input
                        {...field}
                        onChange={(event) => {
                          field.onChange(event)
                          if (loginError) setLoginError(null)
                        }}
                        id="form-login-username"
                        type="text"
                        placeholder="Votre identifiant"
                        disabled={isRequestingLoggingIn}
                        aria-invalid={fieldState.invalid}
                        aria-describedby={fieldState.error ? 'login-username-error' : undefined}
                        autoComplete="username"
                        autoCapitalize="none"
                        spellCheck={false}
                        required
                        className="h-12 rounded-xl border-zinc-200 bg-zinc-50 pl-10 text-sm text-zinc-900 placeholder:text-zinc-400 transition-colors focus-visible:border-lime-500 focus-visible:bg-white focus-visible:ring-4 focus-visible:ring-lime-500/15 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:focus-visible:bg-zinc-900"
                      />
                    </div>
                    {fieldState.invalid && (
                      <FieldError id="login-username-error" errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="gap-2">
                    <FieldLabel
                      htmlFor="form-login-password"
                      className="text-sm font-bold text-zinc-800 dark:text-zinc-200"
                    >
                      Mot de passe
                    </FieldLabel>
                    <div className="relative">
                      <LockKeyhole
                        className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-zinc-400"
                        aria-hidden="true"
                      />
                      <Input
                        {...field}
                        onChange={(event) => {
                          field.onChange(event)
                          if (loginError) setLoginError(null)
                        }}
                        id="form-login-password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Votre mot de passe"
                        disabled={isRequestingLoggingIn}
                        aria-invalid={fieldState.invalid}
                        aria-describedby={fieldState.error ? 'login-password-error' : undefined}
                        autoComplete="current-password"
                        required
                        className="h-12 rounded-xl border-zinc-200 bg-zinc-50 pl-10 pr-12 text-sm text-zinc-900 placeholder:text-zinc-400 transition-colors focus-visible:border-lime-500 focus-visible:bg-white focus-visible:ring-4 focus-visible:ring-lime-500/15 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:focus-visible:bg-zinc-900"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((visible) => !visible)}
                        disabled={isRequestingLoggingIn}
                        aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                        aria-pressed={showPassword}
                        className="absolute right-2 top-1/2 inline-flex size-9 -translate-y-1/2 items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-500 focus-visible:ring-offset-1 disabled:opacity-50 dark:hover:bg-zinc-700 dark:hover:text-white"
                      >
                        {showPassword ? (
                          <EyeOff className="size-4" aria-hidden="true" />
                        ) : (
                          <Eye className="size-4" aria-hidden="true" />
                        )}
                      </button>
                    </div>
                    {fieldState.invalid && (
                      <FieldError id="login-password-error" errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="userType"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="gap-2.5">
                    <div className="flex flex-col gap-1">
                      <FieldLabel
                        htmlFor="form-login-usertype"
                        className="text-sm font-bold text-zinc-800 dark:text-zinc-200"
                      >
                        Je me connecte en tant que…
                      </FieldLabel>
                      <p className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                        Choisissez le profil associé à votre compte.
                      </p>
                    </div>

                    <ToggleGroup
                      type="single"
                      orientation="vertical"
                      value={field.value}
                      onValueChange={(value) => {
                        if (value) field.onChange(value)
                      }}
                      aria-label="Choisir le type de compte"
                      variant="outline"
                      size="lg"
                      spacing={2}
                      className="w-full"
                    >
                      {USER_TYPES.map((userType) => (
                        <ToggleGroupItem
                          key={userType}
                          value={userType}
                          aria-label={USER_TYPE_LABELS[userType as UserType]}
                          className="w-full justify-start"
                        >
                          <div className="flex flex-col gap-0.5">
                            <span className="font-bold">
                              {USER_TYPE_LABELS[userType as UserType]}
                            </span>
                            <span className="text-xs font-normal text-slate-500 dark:text-slate-400">
                              {userType === "student" &&
                                "Accéder à mon espace élève"}
                              {userType === "associationMember" &&
                                "Accéder à mon espace association"}
                              {userType === "animator" &&
                                "Accéder à mon espace animateur"}
                            </span>
                          </div>
                        </ToggleGroupItem>
                      ))}
                    </ToggleGroup>

                    <p className="min-h-4 text-[11px] leading-relaxed text-zinc-500 dark:text-zinc-400">
                      {roleDetails[field.value]?.description}
                    </p>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {loginError && (
                <div
                  role="alert"
                  className="flex items-start gap-2.5 rounded-xl border border-rose-200 bg-rose-50 px-3.5 py-3 text-sm text-rose-800 dark:border-rose-900/70 dark:bg-rose-950/40 dark:text-rose-200"
                >
                  <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                  <p className="leading-relaxed">{loginError}</p>
                </div>
              )}
            </FieldGroup>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col gap-3 px-5 pb-6 pt-3 sm:px-7 sm:pb-7">
          <BrandButton
            type="submit"
            form="form-login"
            disabled={isRequestingLoggingIn}
            className="h-12 w-full rounded-xl text-sm font-bold shadow-sm transition-transform active:scale-[0.99]"
          >
            {isRequestingLoggingIn ? 'Connexion en cours…' : 'Se connecter'}
          </BrandButton>
          <p className="text-center text-[11px] leading-relaxed text-zinc-400 dark:text-zinc-500">
            Sélectionnez le profil correspondant à votre compte avant de vous connecter.
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
