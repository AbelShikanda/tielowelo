import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
    href: string;
    label: string;
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
    return (
        <nav className="flex flex-wrap items-center gap-1 text-sm text-gray-500" aria-label="Breadcrumb">
            {items.map((item, index) => {
                const isLast = index === items.length - 1;
                return (
                    <div key={item.href} className="flex items-center gap-1">
                        {!isLast && (
                            <a
                                href={item.href}
                                className="font-medium text-gray-600 hover:text-gray-900 transition-colors"
                            >
                                {item.label}
                            </a>
                        )}
                        {!isLast && <ChevronRight className="h-4 w-4" />}
                        {isLast && <span className="font-medium text-gray-900">{item.label}</span>}
                    </div>
                );
            })}
        </nav>
    );
}
