import { ethers, AbiCoder } from "ethers";

export const encodeBytes32String = (str: string) => {
  return ethers.encodeBytes32String(str);
};

export const defaultAbiCoder = (arrayTypes: Array<string>, arrayvalue: Array<string | number>) => {
  return AbiCoder.defaultAbiCoder().encode(arrayTypes, arrayvalue);
}