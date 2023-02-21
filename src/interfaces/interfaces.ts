type variant = "outlined" | "contained" | "text";

export interface IEmptyProps {
  icon?: any;
  btnVariant?: variant;
  title: string;
  description: string;
  onAddNewClick?: () => void;
}

export interface ICreateEntry {
  id: number;
  machine_types: string[];
  machine_attributes: string[];
  color: string;
  weight_value: string;
  power_value: number;
  manufacturing_date: string;
}
