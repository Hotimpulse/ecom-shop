import { IAccordionItem } from "@src/interfaces/IAccordionItem";
import { IAccordionProps } from "@src/interfaces/IAccordionProps";
import accordion from "./accordion.module.scss";
import AccordionItem from "./AccordionItem";
import React from "react";

export default function Accordion({ data }: IAccordionProps) {
  return (
    <div className={accordion.accordion}>
      <hr />
      {data.map((item: IAccordionItem) => (
        <React.Fragment key={item.key}>
          <AccordionItem key={item.key} title={item.title} text={item.text} />
          <hr key={`hr-${item.key}`} />
        </React.Fragment>
      ))}
    </div>
  );
}
