import { MouseEventHandler, ReactNode } from "react";
import { UseFormRegister } from "react-hook-form";
import { IconType } from "react-icons/lib";

export type ButtonType = {
  color?: string;
  className?: string;
  children?: ReactNode;
  tooltip?: string;
  type?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export type CountryType = {
  id: string;
  country: string;
  gold: number;
  silver: number;
  bronze: number;
  allMedals: number;
};

export type Store = {
  countries: Array<CountryType>;
  addCountry: (arg: CountryType) => void;
  deleteCountry: (id: string) => void;
};

export type CustomInputType = {
  name: "id" | "country" | "gold" | "silver" | "bronze" | "allMedals";
  className?: string;
  type: string;
  label?: string;
  required?: boolean;
  Icon?: IconType;
  error?: string;
  placeholder?: string;
  register: UseFormRegister<Inputs>;
};

export type CustomInputSelectType = {
  className?: string;
  label?: string;
  required?: boolean;
  error?: string;
  children?: ReactNode;
};

export type TooltipType = {
  value?: string;
  children?: ReactNode;
  className?: string;
  innerClassName?: string;
};
export type Inputs = {
  id: string;
  country: string;
  gold: number;
  silver: number;
  bronze: number;
  allMedals: number;
};

export type TemplatePanelType = {
  children?: ReactNode;
};
export type SortButtonType = {
  children: ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

export enum SortKeys {
  GOLD = "gold",
  SILVER = "silver",
  BRONZE = "bronze",
  ALL_MEDALS = "allMedals",
  COUNTRY = "country",
}

export enum SortOrder {
  ASCENDING = "ascending",
  DESCENDING = "descending",
}
