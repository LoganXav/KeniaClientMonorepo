export const ButtonStyle = {
  base: "inline-flex gap-2 items-center justify-center rounded-md text-[15px] font-semibold transition-colors focus-visible:outline-none focus-visible:border-foreground focus-visible:rounded-md disabled:opacity-50 disabled:border-muted-foreground disabled:pointer-events-none ring-offset-background",
  variants: {
    default: "bg-foreground text-primary-foreground shadow hover:bg-primary/90",
    secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
    brand: "bg-yellow-400 hover:bg-yellow-500 focus:ring-yellow-600 dark:text-slate-900",
    destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
    outline: "border border-foreground bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground",

    ghost: "hover:bg-accent hover:text-accent-foreground",
    link: "text-primary underline-offset-4 hover:underline",

    input: "text-[15px] font-normal border border-border placeholder-muted-foreground bg-card transition-colors focus-visible:outline-none focus-visible:border-foreground focus-visible:ring-foreground disabled:cursor-not-allowed disabled:opacity-50",
  },
  sizes: {
    input: "h-12 px-8 rounded-lg px-3 py-1",

    lg: "h-11 px-8 rounded-md",
    md: "h-10 py-2 px-4",
    sm: "h-9 px-6 rounded-md",
    xs: "h-9 px-3 rounded-md text-xs",
    icon: "size-10 rounded-full",
    page: "px-2 py-2",
  },
};
