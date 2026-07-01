interface PageHeaderProps {
  title: string;
  description: string;
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="mb-8 border-b border-stone-800/80 pb-6">
      <h1 className="page-title">{title}</h1>
      <p className="mt-3 max-w-2xl text-base leading-relaxed text-stone-400">
        {description}
      </p>
    </div>
  );
}
