import Decimal from "decimal.js";
import { Item } from "./item";

export interface Budget {
  id: string;
  createdAt: Date;
  description: string;
  name: string
  updatedAt: Date | undefined;
  items: Item[]
  limit: Decimal;
}
