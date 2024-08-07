import { IAccordionItem } from "@src/interfaces/IAccordionItem";
import accordion from "./accordion.module.css";

export default function AccordionItem({ title, text }: IAccordionItem) {
  return (
    <div className={accordion.accordion_item_wrapper}>
      <div className={accordion.accordion_title_wrapper}>
        <p className={accordion.accordion_title}>{title}</p>
        <svg
          width="25"
          height="26"
          viewBox="0 0 25 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.9509 12.387L25 12.387V13.637L12.9509 13.637L12.9509 25.5002H11.5731L11.5731 13.637H0L0 12.387H11.5731V0.500244H12.9509V12.387Z"
            fill="white"
          />
        </svg>
      </div>
      <p className={accordion.accordion_text}>{text}</p>
    </div>
  );
}
