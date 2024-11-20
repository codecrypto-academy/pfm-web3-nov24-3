"use client";

import { InputForm } from "@/components/input/InputFrom";
import { RawMineralTable } from "@/components/RawMineral/RawMineralTable";
import { useAuth } from "@/context/AuthContext";
import { useRawMineralService } from "@/hooks/raw-mineral/useRawMineral";
import { Fragment, useEffect, useState } from "react";

export default function RawMaterial() {
  const { address, provider } = useAuth();

  const { rawMineralList, isLoading, getAllRawMineral, createRawMineral } =
    useRawMineralService(provider, address);

  const [name, setName] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [quantity, setQuantity] = useState<number | null>(null);
  const [quality, setQuality] = useState<number | null>(null);
  const [origin, setOrigin] = useState<string>("");

  useEffect(() => {
    if (provider) {
      getAllRawMineral();
    }
  }, [provider, getAllRawMineral]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const dat = new Date(date).getTime() / 1000;
      const txHash = await createRawMineral({
        name,
        date: dat,
        quantity: quantity || 0,
        quality: quality || 0,
        origin,
      });

      console.log("txHash: ", txHash);
      setName("");
      setDate("");
      setQuantity(null);
      setQuality(null);
      setOrigin("");
      getAllRawMineral();
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <Fragment>
      <div className="card bg-base-100 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Crear un nuevo mineral</h2>
          <form onSubmit={handleSubmit}>
            <InputForm
              label="Nombre mineral"
              type="text"
              name="name"
              placeholder="Ingrese el nombre del mineral"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required={true}
            />
            <InputForm
              label="Fecha creación"
              type="date"
              name="date"
              placeholder="Fecha"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required={true}
            />
            <InputForm
              label="Cantidad"
              type="number"
              name="quantity"
              placeholder="Cantidad"
              value={quantity !== null ? String(quantity) : ""}
              onChange={(e) => setQuantity(Number(e.target.value))}
              required={true}
            />
            <InputForm
              label="Pureza"
              type="number"
              name="quality"
              placeholder="Pureza"
              value={quality !== null ? String(quality) : ""}
              onChange={(e) => setQuality(Number(e.target.value))}
              required={true}
            />
            <InputForm
              label="Origen"
              type="text"
              name="origin"
              placeholder="Origen"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              required={true}
            />
            <div className="card-actions justify-end mt-3">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isLoading}
              >
                Nuevo
                {isLoading && <span className="loading loading-spinner"></span>}
              </button>
            </div>
          </form>
        </div>
      </div>
      <div>
        {rawMineralList.length > 0 && (
          <RawMineralTable rawMineralList={rawMineralList} />
        )}
      </div>
    </Fragment>
  );
}
