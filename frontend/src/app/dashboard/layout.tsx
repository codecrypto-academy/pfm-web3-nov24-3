"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FaHome, FaShoppingCart, FaStore, FaExchangeAlt, FaBoxes, FaWarehouse, FaUsers, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';

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
            <Link href="/dashboard"><FaHome className="w-4 h-4" /> Dashboard</Link>
          </li>
          <li>
            <Link href="/dashboard/purchase-orders"><FaShoppingCart className="w-4 h-4" /> Ordenes de compra</Link>
          </li>
          <li>
            <Link href="/dashboard/sales-orders"><FaStore className="w-4 h-4" /> Ordenes de venta</Link>
          </li>
          <li>
            <Link href="/dashboard/transactions"><FaExchangeAlt className="w-4 h-4" /> Transacciones</Link>
          </li>
          <li>
            <Link href="/dashboard/raw-material"><FaBoxes className="w-4 h-4" /> Inventorio</Link>
          </li>
          <li>
            <Link href="/dashboard/warehouses"><FaWarehouse className="w-4 h-4" /> Almacenes</Link>
          </li>

          <li>
            <Link href="/dashboard/users"><FaUsers className="w-4 h-4" /> Usuarios</Link>
          </li>
          <li>
            <Link href="/dashboard/my-account"><FaUserCircle className="w-4 h-4" /> Mi cuenta</Link>
          </li>

          {/* Agrega más elementos del menú según necesites */}
          <div className="mt-auto">
            <li>
              <button onClick={disconnect} className="btn btn-outline w-full">
                <FaSignOutAlt className="w-4 h-4" /> Cerrar Sesión
              </button>
            </li>
          </div>
        </ul>
      </div>
    </div>
  );
}
