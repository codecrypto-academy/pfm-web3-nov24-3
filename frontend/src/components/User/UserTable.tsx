"use client";

import { User, UserRole } from "@/types/user";
import Link from "next/link";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

export function UserTable() {
  // TODO: Reemplazar con datos reales de tu API/Smart Contract
  const users: User[] = [
    {
      address: "0x1234...5678",
      role: "ADMIN_ROLE",
      isActive: true,
      name: "Admin Usuario",
    },
    {
      address: "0x8765...4321",
      role: "STORE_ROLE",
      isActive: true,
      name: "Tienda Principal",
    },
    // Más usuarios...
  ];

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
          {users.map((user) => (
            <tr key={user.address}>
              <td>{user.address}</td>
              <td>{user.name}</td>
              <td>
                <span className={`badge ${getRoleBadgeColor(user.role)}`}>
                  {getRoleLabel(user.role)}
                </span>
              </td>
              <td>
                <span className={`badge ${user.isActive ? 'badge-success' : 'badge-error'}`}>
                  {user.isActive ? 'Activo' : 'Inactivo'}
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
                <button
                  onClick={() => {/* TODO: Implementar eliminación */}}
                  className="btn btn-sm btn-ghost text-error"
                >
                  <FaTrash className="w-4 h-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function getRoleBadgeColor(role: UserRole): string {
  switch (role) {
    case "ADMIN_ROLE":
      return "badge-primary";
    case "RAW_MINERAL_ROLE":
      return "badge-secondary";
    case "JEWEL_FACTORY_ROLE":
      return "badge-accent";
    case "DISTRIBUTOR_ROLE":
      return "badge-info";
    case "STORE_ROLE":
      return "badge-success";
    default:
      return "badge-ghost";
  }
}

function getRoleLabel(role: UserRole): string {
  const labels = {
    ADMIN_ROLE: "Administrador",
    RAW_MINERAL_ROLE: "Minero",
    JEWEL_FACTORY_ROLE: "Fabricante",
    DISTRIBUTOR_ROLE: "Distribuidor",
    STORE_ROLE: "Tienda"
  };
  return labels[role];
} 