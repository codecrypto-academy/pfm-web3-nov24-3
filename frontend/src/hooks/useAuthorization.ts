import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { UserRole } from "@/types/user";

export function useAuthorization(authorizedRoles: UserRole[]) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user && !authorizedRoles.includes(user.role)) {
      router.push("/unauthorized");
    }
  }, [user, router, authorizedRoles]);

  // Retorna true si el usuario está autorizado, false en caso contrario
  return user && authorizedRoles.includes(user.role);
} 