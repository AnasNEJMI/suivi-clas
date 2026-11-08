import { useEffect, useId, useRef, useState } from 'react'
import { Controller, useFormContext, useWatch } from 'react-hook-form'
import { BookCheckIcon, CheckIcon, CopyIcon } from 'lucide-react'
import type { CreateBilanFormValues } from '@/lib/schemas/create-bilan.schema'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { StepBadge } from './step-badge'

// Typing only re-renders these two tiny components, not the whole card (matters on phones,
// where a re-render of a large tree while editing can make selection handles flicker or vanish).
function SummaryCheck() {
    const { control } = useFormContext<CreateBilanFormValues>()
    const summary = useWatch({ control, name: 'summary' })
    return summary?.trim() ? <CheckIcon className='text-lime-500 size-4' aria-label='Bilan renseigné' /> : null
}

function SummaryFooter({ descriptionId }: { descriptionId: string }) {
    const { control, getValues } = useFormContext<CreateBilanFormValues>()
    const summary = useWatch({ control, name: 'summary' }) ?? ''
    const [copied, setCopied] = useState(false)
    const timeout = useRef<ReturnType<typeof setTimeout>>(undefined)

    const words = summary.trim() ? summary.trim().split(/\s+/).length : 0

    async function copy() {
        try {
            await navigator.clipboard.writeText(getValues('summary') ?? '')
            setCopied(true)
            clearTimeout(timeout.current)
            timeout.current = setTimeout(() => setCopied(false), 2000)
        } catch {
            // Clipboard can be blocked (insecure context, permissions): the text stays selectable anyway.
        }
    }

    return (
        <div className='flex items-center justify-between gap-2'>
            <p id={descriptionId} className='text-xs text-muted-foreground'>
                {words} mot{words > 1 ? 's' : ''}
            </p>
            <Button
                type='button' // inside the bilan <form>: must never submit it
                variant='ghost'
                size='sm'
                onClick={copy}
                disabled={words === 0}
                className='h-9 gap-1.5 text-xs'
            >
                {copied ? <CheckIcon className='size-4 text-lime-600' /> : <CopyIcon className='size-4' />}
                {copied ? 'Copié' : 'Copier le texte'}
            </Button>
            <span role='status' aria-live='polite' className='sr-only'>
                {copied ? 'Texte copié dans le presse-papiers' : ''}
            </span>
        </div>
    )
}

// Keys that move the caret or extend the selection (with any modifier: Shift, Ctrl/Alt for word jumps, Cmd).
const CARET_KEYS = new Set(['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End', 'PageUp', 'PageDown'])

/**
 * Some ancestor or global handler (carousel, stepper, hotkeys, swipe navigation...) can call preventDefault()
 * on arrow keys, which freezes the caret and kills Shift+arrow selection inside the textarea.
 * This listener runs first (window, capture phase) and stops those keys from reaching any other handler
 * while the focus is in this textarea. It does NOT cancel the browser default, so the caret and selection work natively.
 */
function useKeepCaretKeys(textareaId: string) {
    useEffect(() => {
        function onKeyDown(event: KeyboardEvent) {
            const target = event.target
            if (target instanceof HTMLElement && target.id === textareaId && CARET_KEYS.has(event.key)) {
                event.stopPropagation()
            }
        }
        window.addEventListener('keydown', onKeyDown, { capture: true })
        return () => window.removeEventListener('keydown', onKeyDown, { capture: true })
    }, [textareaId])
}

export default function SummaryCard({ step }: { step: number }) {
    const { control } = useFormContext<CreateBilanFormValues>()
    const lessonId = useWatch({ control, name: 'lessonId' })
    const textareaId = useId()
    const descriptionId = useId()
    useKeepCaretKeys(textareaId)

    if (lessonId < 1) return null

    return (
        <Card className={cn('border-none shadow-card gap-0 relative rounded-2xl rounded-tr-none mt-8')}>
            <StepBadge step={step} />
            <CardHeader className='gap-0'>
                <CardTitle className='text-base font-bold text-indigo-600 flex items-center gap-1'>
                    <BookCheckIcon /> Bilan <SummaryCheck />
                </CardTitle>
                <CardDescription className='text-sm'>Résumé de la séance</CardDescription>
            </CardHeader>
            <CardContent className='flex flex-col gap-2 mt-2'>
                <Controller
                    name='summary'
                    control={control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid} className='gap-1'>
                            <FieldLabel htmlFor={textareaId} className='sr-only'>
                                Résumé de la séance
                            </FieldLabel>
                            <Textarea
                                {...field}
                                id={textareaId}
                                value={field.value ?? ''}
                                placeholder='Bonjour, lors de cette séance ...'
                                aria-invalid={fieldState.invalid}
                                aria-describedby={descriptionId}
                                autoComplete='off'
                                // French text: browser spell-check, sentence capitals, correct hyphenation.
                                lang='fr'
                                spellCheck
                                autoCapitalize='sentences'
                                autoCorrect='on'
                                className={cn(
                                    // 16px: below that, iOS Safari zooms the page when the field gets focus.
                                    'text-base leading-relaxed placeholder:text-sm',
                                    // Comfortable size: grows with the text (field-sizing), then scrolls inside itself.
                                    'min-h-56 max-h-[70dvh] overflow-y-auto field-sizing-content resize-y p-3',
                                    // Explicitly allow word / range selection and fast taps, even if an ancestor
                                    // or a global stylesheet sets user-select: none (common in app-like layouts).
                                    'select-text touch-manipulation',
                                    // Keep the caret clear of the keyboard and the bottom bar when scrolling into view.
                                    'scroll-mb-40',
                                    'bg-white border-zinc-200 focus-visible:ring-lime-500/50 focus-visible:border-lime-200',
                                )}
                            />
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
                <SummaryFooter descriptionId={descriptionId} />
            </CardContent>
        </Card>
    )
}
