import { SplashScreen } from 'expo-router';
import { useSession } from '@/contexts/auth-context';

SplashScreen.preventAutoHideAsync();

export function SplashScreenController() {
  const { isLoading } = useSession();

  if (!isLoading) {
    SplashScreen.hide();
  }

  return null;
}
