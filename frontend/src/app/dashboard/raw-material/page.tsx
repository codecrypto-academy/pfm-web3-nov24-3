"use client";

import { useAuthorization } from "@/hooks/useAuthorization";
import { RawMineralTable } from "@/components/RawMineral/RawMineralTable";
import { FaPlus } from "react-icons/fa";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRawMineralService } from "@/hooks/raw-mineral/useRawMineral";
import { useEffect } from "react";

export default function RawMaterial() {
  const { provider, user } = useAuth();
  const isAuthorized = useAuthorization([
    "ADMIN_ROLE",
    "RAW_MINERAL_ROLE"
  ]);

  const {
    rawMineralList,
    isLoading,
    error,
    getAllRawMineral
  } = useRawMineralService(provider, user?.address);

  useEffect(() => {
    if (user?.address) {
      getAllRawMineral();
    }
  }, [user?.address, getAllRawMineral]);

  if (!isAuthorized) {
    return null;
  }

  if (error) {
    return <div className="alert alert-error">{error}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Inventario Minerales</h1>
        <Link 
          href="/dashboard/raw-material/new" 
          className="btn btn-primary"
        >
          <FaPlus className="w-4 h-4 mr-2" />
          Nuevo Mineral
        </Link>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <RawMineralTable rawMineralList={rawMineralList} />
      )}
    </div>
  );
}
