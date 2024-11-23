"use client";

import { SalesOrder } from "@/types/salesOrder";
import { formatDate } from "@/utils/dateUtils";
import Link from "next/link";
import { FaEye, FaEdit } from "react-icons/fa";

export function SalesOrderTable() {
  // TODO: Reemplazar con datos reales de tu API/Smart Contract
  const salesOrders: SalesOrder[] = [
    {
      id: "SO-001",
      creationDate: new Date("2024-02-20"),
      customer: "Cliente A",
      products: "Anillo de Oro, Collar de Plata",
      totalQuantity: 2,
      status: "Pendiente",
      paymentMethod: "Criptomoneda",
    },
    // Más órdenes...
  ];

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>ID Orden</th>
            <th>Fecha Creación</th>
            <th>Cliente</th>
            <th>Productos</th>
            <th>Cantidad Total</th>
            <th>Estado</th>
            <th>Método de Pago</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {salesOrders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{formatDate(order.creationDate)}</td>
              <td>{order.customer}</td>
              <td>{order.products}</td>
              <td>{order.totalQuantity}</td>
              <td>
                <span className={`badge ${getStatusBadgeColor(order.status)}`}>
                  {order.status}
                </span>
              </td>
              <td>{order.paymentMethod}</td>
              <td className="space-x-2">
                <Link
                  href={`/dashboard/sales-orders/${order.id}`}
                  className="btn btn-sm btn-ghost"
                >
                  <FaEye className="w-4 h-4" />
                </Link>
                <Link
                  href={`/dashboard/sales-orders/${order.id}/edit`}
                  className="btn btn-sm btn-ghost"
                >
                  <FaEdit className="w-4 h-4" />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function getStatusBadgeColor(status: string): string {
  switch (status.toLowerCase()) {
    case "pendiente":
      return "badge-warning";
    case "en proceso":
      return "badge-info";
    case "completada":
      return "badge-success";
    default:
      return "badge-ghost";
  }
} 