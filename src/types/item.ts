import { Category } from "./category.enum";

export interface Item {
  id: string;
  name: string;
  description: string;
  cost: string;
  createdAt: Date;
  category: Category;
  updatedAt: Date | undefined;
}
