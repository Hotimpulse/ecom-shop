import { ReactNode } from "react";

export interface IAccordionItem {
  title: string;
  text: string;
  key: string;
  children?: ReactNode;
}
