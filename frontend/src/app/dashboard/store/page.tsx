"use client";

import { BadgeQuality } from "@/components/badge/BadgeQuality";
import { CardStore } from "@/components/card/CardStore";
import { UserSelect } from "@/components/UserSelect/UserSelect";
import { useAuth } from "@/context/AuthContext";
import { RawMineralChain } from "@/domain/raw-mineral/RawMineral";
import { useRawMineralService } from "@/hooks/raw-mineral/useRawMineral";
import { User } from "@/types/user";
import { Fragment, ReactNode } from "react";

export default function Store() {
  const { provider } = useAuth();
  const { rawMineralList, isLoading, getAllRawMineral } =
    useRawMineralService(provider);

  const onChangeSelect = async (user: User) => {
    console.log(user);
    if (user.role === "RAW_MINERAL_ROLE") {
      await getAllRawMineral(user.address);
    }
  };

  const buyStore = (uniqueId: string) => {
    console.log("uniqueId", uniqueId);
  };

  const descriptionRawMinerla = (rawMineral: RawMineralChain): ReactNode => {
    return (
      <Fragment>
        <div className="flex flex-row items-center justify-between">
          <div className="tooltip" data-tip={rawMineral.uniqueId}>
            <span className="truncate w-48 inline-block">
              {rawMineral.uniqueId}
            </span>
          </div>
          <span>Cantidad: {rawMineral.quantity}</span>
        </div>
        <div className="flex flex-row items-center justify-between">
          <span>
            Calidad: <BadgeQuality quality={rawMineral.quality} />
          </span>
          <span>Origen: {rawMineral.origin}</span>
        </div>
      </Fragment>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Tienda</h1>
      </div>

      <div>
        <UserSelect handlerSelect={onChangeSelect} />
      </div>
      <div>{isLoading && <p className="text-center">Cargando...</p>}</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
        {!isLoading &&
          rawMineralList.length > 0 &&
          rawMineralList.map((rawMineral) => (
            <div key={rawMineral.uniqueId}>
              <CardStore
                description={descriptionRawMinerla(rawMineral)}
                image={rawMineral.img}
                name={rawMineral.name}
                onSelect={() => buyStore(rawMineral.uniqueId)}
              />
            </div>
          ))}
      </div>
    </div>
  );
}