import React, { ReactNode } from "react";
import Image from "next/image";
import { useRawMineralOrders } from "@/hooks/raw-mineral/useRawMineralOrders";
import { useAuth } from "@/context/AuthContext";

interface CardStoreProps {
  name: string;
  image: string;
  description: ReactNode;
  addressSuplier: string;
  uniqueId: string;
  onSelect: () => void;
}

export const CardStore = ({
  name,
  image,
  description,
  addressSuplier,
  uniqueId,
  onSelect,
}: CardStoreProps) => {
  const { provider } = useAuth();
  const { isLoading, orderMineral } = useRawMineralOrders(provider);

  const handelerClick = async () => {
    await orderMineral(addressSuplier, uniqueId);
    onSelect();
  };
  return (
    <div className="card bg-base-100 w-96 shadow-xl">
      <figure>
        <Image
          src={image}
          alt={name}
          width={500}
          height={500}
          className="w-full h-48 object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <div>{description}</div>
        <div className="card-actions justify-end">
          <button
            className="btn btn-primary"
            onClick={handelerClick}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="loading loading-spinner"></span>
                Solicitar...
              </>
            ) : (
              "Solicitar"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
