const variants = {
  primary: "bg-cyan-500 text-black hover:bg-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.4)]",
  "cyber-white": "bg-white text-black hover:bg-cyan-400 hover:scale-105 shadow-lg",
  "cyber-outline": "border border-white/20 text-white hover:bg-white/10 hover:border-white/40 backdrop-blur-md",
  danger: "bg-red-600 text-white hover:bg-red-500",
};

const sizes = {
  // На мобильном (text-sm, отступы поменьше), на ПК (sm:text-base, отступы побольше)
  sm: "px-4 py-2 text-xs sm:text-sm",
  md: "px-6 py-3 text-sm sm:text-base",
  lg: "px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-lg", // Уменьшили для мобилок
};

export default function Button({ 
  children, 
  variant = "primary", 
  size = "md", 
  className = "", 
  icon, 
  ...props 
}) {
  return (
    <button 
      className={`
        relative overflow-hidden font-bold rounded-xl transition-all duration-300 
        flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]} 
        ${sizes[size]} 
        ${className}
      `}
      {...props}
    >
      {icon && <span className="relative z-10">{icon}</span>}
      <span className="relative z-10">{children}</span>
    </button>
  );
}