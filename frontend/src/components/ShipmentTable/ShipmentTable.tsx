"use client";

import { Shipment } from "@/domain/distributor/Distributor";
import { formatDate } from "@/utils/dateUtils";
import Link from "next/link";
import { FaEye } from "react-icons/fa";
import { TruncateItem } from "../truncate/TruncateItem";

interface ShipmentTableProps {
  listShipments: Shipment[];
}

export function ShipmentTable({ listShipments }: ShipmentTableProps) {
  const deliveryDate = (date: number): Date => {
    const newDate = new Date(date);
    return new Date(newDate.setDate(newDate.getDate() + 2));
  };

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>ID Orden</th>
            <th>Proveedor</th>
            <th>Entrega</th>
            <th>Fecha Creación</th>

            <th>Materiales</th>
            <th>Cantidad Total</th>
            <th>Fecha Recepción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {listShipments.map((order) => (
            <tr key={order.uniqueId}>
              <td>
                <TruncateItem item={order.uniqueId} />
              </td>
              <td>
                <TruncateItem item={order.supplier} />
              </td>
              <td>
                <TruncateItem item={order.shipper} />
              </td>
              <td>{formatDate(new Date(order.date))}</td>

              <td>{order.name}</td>
              <td>{order.quantity}</td>
              <td>{formatDate(deliveryDate(order.date))}</td>
              <td className="space-x-2">
                <Link
                  href={{
                    pathname: `/dashboard/shipment/${order.uniqueId}`,
                    query: { delivery: JSON.stringify(order) },
                  }}
                  className="btn btn-sm btn-ghost"
                >
                  <FaEye className="w-4 h-4" />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
