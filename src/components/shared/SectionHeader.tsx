import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  titleHighlight?: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeader({
  eyebrow,
  title,
  titleHighlight,
  description,
  align = "center",
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn(
      "mb-10 lg:mb-14",
      align === "center" && "text-center",
      className
    )}>
      {eyebrow && (
        <p className="text-xs font-bold tracking-widest text-secondary uppercase mb-3">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 leading-tight">
        {title}{" "}
        {titleHighlight && (
          <span className="gradient-text">{titleHighlight}</span>
        )}
      </h2>
      {description && (
        <p className="mt-4 text-gray-500 text-base lg:text-lg max-w-2xl leading-relaxed mx-auto">
          {description}
        </p>
      )}
    </div>
  );
}
