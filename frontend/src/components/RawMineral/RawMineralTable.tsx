"use client";

import { RawMineralChain } from "@/domain/raw-mineral/RawMineral";
import { formatDate } from "@/utils/dateUtils";
import Link from "next/link";
import { FaEye, FaEdit } from "react-icons/fa";

interface RawMineralTableProps {
  rawMineralList: RawMineralChain[];
}

export const RawMineralTable = ({ rawMineralList }: RawMineralTableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Fecha</th>
            <th>Cantidad</th>
            <th>Calidad</th>
            <th>Origen</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {rawMineralList.map((mineral) => (
            <tr key={mineral.uniqueId}>
              <td>{mineral.uniqueId}</td>
              <td>{mineral.name}</td>
              <td>{formatDate(new Date(Number(mineral.date)))}</td>
              <td>{mineral.quantity}</td>
              <td>
                <span className={`badge ${getQualityBadgeColor(mineral.quality)}`}>
                  {mineral.quality}%
                </span>
              </td>
              <td>{mineral.origin}</td>
              <td className="space-x-2">
                <Link
                  href={`/dashboard/raw-material/${mineral.uniqueId}`}
                  className="btn btn-sm btn-ghost"
                >
                  <FaEye className="w-4 h-4" />
                </Link>
                <Link
                  href={`/dashboard/raw-material/${mineral.uniqueId}/edit`}
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
};

function getQualityBadgeColor(quality: number): string {
  if (quality >= 90) return "badge-success";
  if (quality >= 70) return "badge-info";
  if (quality >= 50) return "badge-warning";
  return "badge-error";
}
