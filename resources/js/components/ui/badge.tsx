import * as React from 'react';
import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'success';
}

const Badge = forwardRef<HTMLDivElement, BadgeProps>(
    ({ className, variant, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
                    variant === 'default' &&
                        'bg-primary text-primary-foreground',
                    variant === 'secondary' &&
                        'bg-secondary text-secondary-foreground',
                    variant === 'destructive' &&
                        'bg-destructive text-destructive-foreground',
                    variant === 'outline' && 'border-input',
                    variant === 'success' && 'bg-travel-100 text-travel-700 border-travel-200',
                    className,
                )}
                {...props}
            />
        );
    },
);
Badge.displayName = 'Badge';

export { Badge };
