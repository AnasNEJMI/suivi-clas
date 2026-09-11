import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getElapsedDays = (date : Date) => {
  const targetDate = new Date(date);
  const now = new Date();

  const targetMidnight = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate());
  const todayMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const diffInMs = todayMidnight.getTime() - targetMidnight.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) {
      return "Aujourd'hui";
  }

  if (diffInDays === 1) {
      return "Hier";
  }

  if (diffInDays >= 2 && diffInDays <= 6) {
      return `Il y a ${diffInDays} jours`;
  }

  return targetDate.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
  });
}

export const getCongralutoryMessage = (score : number | null) => {
  if(!score) return '';
  if(score <= 3) return 'Résultat insatisfaisant, tu peux faire mieux !';
  if(score > 3 && score <= 6) return 'Résultat moyen, visons plus !';
  if(score > 6 && score <= 9) return 'Très bon résultat, visons la note complète !';
  if(score == 10) return 'Résultat magnifique, chapeau !';
}

export const getDaysSinceLastVisit = (lastVisit : Date) => {
  const now = new Date();
  const timeSinceLastVisit = now.getTime() - new Date(lastVisit).getTime();
  return Math.round(timeSinceLastVisit/(1000*60*60*24))
}