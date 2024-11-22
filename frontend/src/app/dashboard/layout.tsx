"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isConnected, disconnect, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isConnected) {
      router.push("/");
    }
  }, [isConnected, router]);

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <div className="p-4">{children}</div>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          <li className="mb-4">
            <div className="font-bold">
              Wallet: {user?.address?.slice(0, 6)}...{user?.address?.slice(-4)}
            </div>
          </li>
          <li>
            <a href="/dashboard">Dashboard</a>
          </li>
          <li>
            <a href="/dashboard/users">Usuarios</a>
          </li>
          <li>
            <a href="/dashboard/perfil">Perfil</a>
          </li>
          <Link href="/dashboard/raw-material" className="btn btn-ghost">
            JewelChain
          </Link>
          {/* Agrega más elementos del menú según necesites */}
          <div className="mt-auto">
            <li>
              <button onClick={disconnect} className="btn btn-outline w-full">
                Cerrar Sesión
              </button>
            </li>
          </div>
        </ul>
      </div>
    </div>
  );
}
