export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/80 backdrop-blur-md">
      <div className="relative flex flex-col items-center">
        {/* Animated concentric rings */}
        <div className="relative w-16 h-16 sm:w-20 sm:h-20">
          <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-ping" style={{ animationDuration: '2s' }} />
          <div className="absolute inset-1 rounded-full border-2 border-t-primary border-r-transparent border-b-primary/40 border-l-transparent animate-spin" style={{ animationDuration: '1.2s' }} />
          <div className="absolute inset-3 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="font-bengali text-lg sm:text-xl text-primary font-medium select-none">
              আ
            </span>
          </div>
        </div>
        <p className="font-serif text-sm tracking-wider uppercase text-foreground/75 mt-4 animate-pulse">
          Aaboron
        </p>
        <span className="font-bengali text-xs text-primary/70 mt-0.5">
          ধৈর্য ধরুন
        </span>
      </div>
    </div>
  )
}
