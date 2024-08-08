import { IAccordionItem } from "@src/interfaces/IAccordionItem";
import { IAccordionProps } from "@src/interfaces/IAccordionProps";
import accordion from "./accordion.module.scss";
import AccordionItem from "./AccordionItem";

export default function Accordion({ data }: IAccordionProps) {
  return (
    <div className={accordion.accordion}>
      <hr />
      {data.map((item: IAccordionItem) => (
        <>
          <AccordionItem key={item.key} title={item.title} text={item.text} />
          <hr />
        </>
      ))}
    </div>
  );
}
