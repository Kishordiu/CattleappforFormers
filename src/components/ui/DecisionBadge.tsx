import * as React from "react"
import { cn } from "@/utils/utils"
import type { RecommendationStatus } from "@/types"
import { CheckCircle2, AlertCircle, Info, TrendingUp } from "lucide-react"

interface DecisionBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  status: RecommendationStatus;
  size?: 'sm' | 'md' | 'lg';
}

export function DecisionBadge({ status, size = 'md', className, ...props }: DecisionBadgeProps) {
  const config = {
    'Continue Dairy Production': {
      bg: 'bg-[var(--color-decision-green-light)]',
      text: 'text-[var(--color-decision-green)]',
      border: 'border-[var(--color-decision-green)]/20',
      icon: CheckCircle2,
      dot: 'bg-[var(--color-decision-green)]'
    },
    'Breeding Candidate': {
      bg: 'bg-[var(--color-decision-blue-light)]',
      text: 'text-[var(--color-decision-blue)]',
      border: 'border-[var(--color-decision-blue)]/20',
      icon: TrendingUp,
      dot: 'bg-[var(--color-decision-blue)]'
    },
    'Monitor Closely': {
      bg: 'bg-[var(--color-decision-amber-light)]',
      text: 'text-[var(--color-decision-amber)]',
      border: 'border-[var(--color-decision-amber)]/20',
      icon: Info,
      dot: 'bg-[var(--color-decision-amber)]'
    },
    'Consider Sale': {
      bg: 'bg-[var(--color-decision-red-light)]',
      text: 'text-[var(--color-decision-red)]',
      border: 'border-[var(--color-decision-red)]/20',
      icon: AlertCircle,
      dot: 'bg-[var(--color-decision-red)]'
    }
  };

  const style = config[status];
  const Icon = style.icon;

  const sizes = {
    sm: 'px-2 py-0.5 text-xs gap-1',
    md: 'px-3 py-1 text-sm gap-2',
    lg: 'px-4 py-2 text-base gap-2'
  };

  return (
    <div
      className={cn(
        "inline-flex items-center font-medium border",
        style.bg,
        style.text,
        style.border,
        sizes[size],
        className
      )}
      {...props}
    >
      <div className={cn("w-2 h-2 rounded-full", style.dot)} />
      {Icon && <Icon className="w-4 h-4 mr-1" />}
      {status}
    </div>
  )
}
