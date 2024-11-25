"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaEye, FaEdit } from "react-icons/fa";
import {
  getRoleBadgeColor,
  getRoleIcon,
  getRoleLabel,
} from "@/utils/roleUtils";
import React from "react";
import { useAuth } from "@/context/AuthContext";
import { UserDeleteButton } from "./UserDeleteButton";
import { useUserService } from "@/hooks/user/useUserService";

export function UserTable() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { provider } = useAuth();
  const { userList, listUsers } = useUserService(provider);

  useEffect(() => {}, [userList]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        await listUsers();
      } catch (err) {
        console.error("Error al obtener usuarios:", err);
        setError(err instanceof Error ? err.message : "Error desconocido");
      } finally {
        setIsLoading(false);
      }
    };

    if (provider) {
      fetchUsers();
    }
  }, [provider, listUsers]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-error">
        <p>Error al cargar los usuarios: {error}</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>Dirección</th>
            <th>Nombre</th>
            <th>Rol</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {userList.map((user) => (
            <tr key={user.address}>
              <td>
                <code className="text-sm bg-base-200 p-1 rounded">
                  {user.address}
                </code>
              </td>
              <td>{user.name}</td>
              <td>
                <span className={`badge ${getRoleBadgeColor(user.role)}`}>
                  {React.createElement(getRoleIcon(user.role), {
                    className: "w-4 h-4 mr-1",
                  })}
                  {getRoleLabel(user.role)}
                </span>
              </td>
              <td>
                <span
                  className={`badge ${
                    user.isActive ? "badge-success" : "badge-error"
                  }`}
                >
                  {user.isActive ? "Activo" : "Inactivo"}
                </span>
              </td>
              <td className="space-x-2">
                <Link
                  href={`/dashboard/users/${user.address}`}
                  className="btn btn-sm btn-ghost"
                >
                  <FaEye className="w-4 h-4" />
                </Link>
                <Link
                  href={`/dashboard/users/${user.address}/edit`}
                  className="btn btn-sm btn-ghost"
                >
                  <FaEdit className="w-4 h-4" />
                </Link>
                <UserDeleteButton address={user.address} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
