"use client";

import { InputForm } from "@/components/input/InputFrom";

export default function RawMaterial() {
  return (
    <div className="card bg-base-100 w-96 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Crear un nuevo mineral</h2>
        <form onSubmit={() => {}}>
          <InputForm
            label="Nombre mineral"
            type="name"
            name="name"
            placeholder="Ingrese el nombre del mineral"
          />
          <InputForm
            label="Fecha creación"
            type="date"
            name="date"
            placeholder="Fecha"
          />
          <InputForm
            label="Cantidad"
            type="quantity"
            name="quantity"
            placeholder="Cantidad"
          />
          <InputForm
            label="Pureza"
            type="quality"
            name="quality"
            placeholder="Pureza"
          />
          <InputForm
            label="Origen"
            type="origin"
            name="origin"
            placeholder="Origen"
          />
          <div className="card-actions justify-end mt-3">
            <button type="submit" className="btn btn-primary">
              Nuevo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
