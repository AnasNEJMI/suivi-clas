import { useAuth } from "@/contexts/auth/use-auth";
import { ApiError } from "@/lib/errors/apiError.class";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Card, CardContent } from "@/components/ui/card";
import { LogOutIcon, Loader2Icon, ShieldAlertIcon } from "lucide-react";
import { BrandButton } from "@/components/brand-button";

const LogoutCard = () => {
  const { requestLogout } = useAuth();
  const [isRequestingLoggingOut, setIsRequestingLoggingOut] = useState(false);
  const navigate = useNavigate();

  async function onLogout() {
    setIsRequestingLoggingOut(true);
    try {
      await requestLogout();
    } catch (error) {
      if (ApiError.isUnauthorized(error)) {
        navigate("/", { replace: true });
      }
    } finally {
      setIsRequestingLoggingOut(false);
    }
  }

  return (
    <Card className="mt-6 border-rose-200/70 bg-linear-to-r from-rose-50/40 via-white to-white shadow-2xs rounded-2xl overflow-hidden font-outfit">
      <CardContent className="p-5 lg:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
        {/* Section Texte & Icône */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-100/80 text-rose-600 flex items-center justify-center shrink-0 border border-rose-200/50">
            <LogOutIcon className="size-5" />
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h4 className="font-bold text-base lg:text-lg text-slate-900 leading-tight">
                Se déconnecter
              </h4>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-rose-100/70 text-rose-700 border border-rose-200/60">
                <ShieldAlertIcon className="size-3 text-rose-500" />
                Fin de session
              </span>
            </div>
            <p className="text-xs lg:text-sm text-slate-500 font-medium leading-relaxed">
              Vous serez redirigé en toute sécurité vers la page d'accueil.
            </p>
          </div>
        </div>

        {/* Bouton d'action */}
        <BrandButton
          variant="destructive"
          className="w-full sm:w-auto px-6 h-11 text-xs font-bold gap-2 rounded-xl shrink-0 shadow-2xs hover:shadow-xs transition-all cursor-pointer"
          disabled={isRequestingLoggingOut}
          onClick={onLogout}
        >
          {isRequestingLoggingOut ? (
            <>
              <Loader2Icon className="size-4 animate-spin" />
              <span>Déconnexion...</span>
            </>
          ) : (
            <>
              <LogOutIcon className="size-4" />
              <span>Déconnexion</span>
            </>
          )}
        </BrandButton>
      </CardContent>
    </Card>
  );
};

export default LogoutCard;