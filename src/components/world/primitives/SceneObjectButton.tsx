import Link from 'next/link'
import clsx from 'clsx'
import type { ButtonHTMLAttributes, ReactNode } from 'react'
import type { SceneDestination } from '@/lib/scenes/scene-destination'
import { SceneTransitionLink } from '@/components/world/migration/SceneTransitionLink'

type CommonProps = {
  label: string
  icon?: ReactNode
  children?: ReactNode
  className?: string
  selected?: boolean
}

type SceneObjectButtonProps = CommonProps & (
  | { href: string; destination?: SceneDestination; sourceObjectId?: string; onClick?: never; type?: never }
  | ({ href?: never } & Pick<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick' | 'type' | 'disabled'>)
)

type ButtonVariant = CommonProps & { href?: never } & Pick<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick' | 'type' | 'disabled'>

export function SceneObjectButton(props: SceneObjectButtonProps) {
  const className = clsx(
    'inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-lg border border-white/25 bg-night/70 px-3 text-sm text-paper transition-colors hover:bg-night/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold',
    props.className,
  )
  const content = <>{props.icon}<span>{props.children ?? props.label}</span></>

  if ('href' in props && props.href) {
    if (props.destination) return <SceneTransitionLink href={props.href} destination={props.destination} sourceObjectId={props.sourceObjectId} aria-label={props.label} aria-current={props.selected ? 'location' : undefined} className={className}>{content}</SceneTransitionLink>
    return <Link href={props.href} aria-label={props.label} aria-current={props.selected ? 'location' : undefined} className={className}>{content}</Link>
  }

  const buttonProps = props as ButtonVariant

  return (
    <button
      type={buttonProps.type ?? 'button'}
      onClick={buttonProps.onClick}
      disabled={buttonProps.disabled}
      aria-label={props.label}
      aria-pressed={props.selected}
      className={className}
    >
      {content}
    </button>
  )
}
