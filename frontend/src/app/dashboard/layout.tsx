'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isConnected, disconnect, address } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isConnected) {
      router.push('/login');
    }
  }, [isConnected, router]);

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Contenido principal */}
        <div className="p-4">
          {children}
        </div>
        {/* Botón de logout en la parte inferior */}
        <div className="fixed bottom-0 right-0 p-4">
          <button onClick={disconnect} className="btn btn-error">
            Cerrar Sesión
          </button>
        </div>
      </div> 
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label> 
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          <li className="mb-4">
            <div className="font-bold">Wallet: {address?.slice(0, 6)}...{address?.slice(-4)}</div>
          </li>
          <li><a href="/dashboard">Dashboard</a></li>
          <li><a href="/dashboard/perfil">Perfil</a></li>
          {/* Agrega más elementos del menú según necesites */}
        </ul>
      </div>
    </div>
  );
} 