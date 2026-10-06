import { Building2Icon } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export function AssociationInfoCard({ label, address, postalCode }: { label: string; address: string, postalCode : number }) {
  return (
    <Card className="relative overflow-hidden mt-4 font-outfit border border-emerald-200/60 shadow-lg shadow-emerald-950/5 bg-linear-to-br from-emerald-200/60 via-teal-200/80 to-lime-300/80 bg-size-[200%_200%] animate-gradient">
      
      {/* 1. Ambient Blur Blobs for dynamic glow */}
      <div className="absolute -top-10 -left-10 size-36 bg-emerald-400/30 rounded-full blur-2xl pointer-events-none animate-pulse" />
      <div className="absolute -bottom-10 -right-10 size-36 bg-lime-400/30 rounded-full blur-2xl pointer-events-none animate-pulse" />

      {/* 2. Background Pattern Overlay (Radial Dot Grid) */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(#059669_1.2px,transparent_1.2px)] bg-size-[14px_14px] opacity-15 pointer-events-none"
        style={{ maskImage: 'radial-gradient(ellipse at center, black 50%, transparent 100%)' }}
      />

      {/* 3. Decorative Watermark Icon */}
      <Building2Icon className="absolute -bottom-5 -right-5 size-36 text-emerald-900/10 -rotate-12 pointer-events-none" />

      {/* Card Content Wrapper */}
      <div className="relative z-10 p-0.5">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2.5 text-lg font-bold text-emerald-950">
            {/* Icon Pill Badge */}
            <span className="flex items-center justify-center size-9 rounded-xl bg-white/80 shadow-xs border border-emerald-200/80 text-emerald-600">
              <Building2Icon className="size-5" />
            </span>
            Mon association
          </CardTitle>
        </CardHeader>

        <CardContent className="mt-0">
          <div className="flex flex-col gap-2 text-sm w-full">
            
            {/* Row 1: Nom */}
            <div className="flex items-center justify-between gap-6 py-2 px-3.5 rounded-xl bg-white/20 border border-white/60 shadow-2xs backdrop-blur-xs">
              <span className="text-emerald-900/85 font-medium">Nom</span>
              <span className="font-semibold text-emerald-950 text-right">{label}</span>
            </div>

            {/* Row 2: Localisation */}
            <div className="flex items-center justify-between gap-6 py-2 px-3.5 rounded-xl bg-white/20 border border-white/60 shadow-2xs backdrop-blur-xs">
              <span className="text-emerald-900/85 font-medium">Adresse</span>
              <span className="font-semibold text-emerald-950 text-right">{address}</span>
            </div>

            {/* Row 3: Postal Code */}
            <div className="flex items-center justify-between gap-6 py-2 px-3.5 rounded-xl bg-white/20 border border-white/60 shadow-2xs backdrop-blur-xs">
              <span className="text-emerald-900/85 font-medium">Code Postal</span>
              <span className="font-semibold text-emerald-950 text-right">{postalCode}</span>
            </div>

          </div>
        </CardContent>
      </div>
    </Card>
  );
}