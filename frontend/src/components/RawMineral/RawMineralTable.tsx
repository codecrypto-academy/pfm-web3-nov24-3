"use client";

import { RawMineralChain } from "@/domain/raw-mineral/RawMineral";

interface RawMineralTableProps {
  rawMineralList: RawMineralChain[];
}

export const RawMineralTable = ({ rawMineralList }: RawMineralTableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Fecha</th>
            <th>Cantidad</th>
            <th>Calidad</th>
            <th>Origen</th>
          </tr>
        </thead>
        <tbody>
          {rawMineralList.length > 0 &&
            rawMineralList.map((mineral) => (
              <tr key={mineral.uniqueId}>
                <td>{mineral.uniqueId}</td>
                <td>{mineral.name}</td>
                <td>{mineral.date}</td>
                <td>{mineral.quantity}</td>
                <td>{mineral.quality}</td>
                <td>{mineral.origin}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
