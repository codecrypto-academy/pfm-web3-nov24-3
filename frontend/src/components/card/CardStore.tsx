import React, { ReactNode } from "react";
import Image from "next/image";

interface CardStoreProps {
  name: string;
  image: string;
  description: ReactNode;
  onSelect: () => void;
}

export const CardStore = ({
  name,
  image,
  description,
  onSelect,
}: CardStoreProps) => {
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
          <button className="btn btn-primary" onClick={onSelect}>
            Solicitar
          </button>
        </div>
      </div>
    </div>
  );
};
