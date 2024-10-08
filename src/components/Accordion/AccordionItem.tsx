import { IAccordionItem } from "@src/interfaces/IAccordionItem";
import accordion from "./accordion.module.scss";
import { useEffect, useRef, useState } from "react";

export default function AccordionItem({ title, text }: IAccordionItem) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const contentRef = useRef<HTMLParagraphElement>(null);

  const handleSVGClick = () => {
    setIsOpen((isOpen) => !isOpen);
  };

  useEffect(() => {
    if (contentRef.current) {
      if (isOpen) {
        contentRef.current.style.maxHeight = `${contentRef.current.scrollHeight}px`;
      } else {
        contentRef.current.style.maxHeight = "0";
      }
    }
  }, [isOpen]);

  return (
    <div
      key={`${title}`}
      className={accordion.accordion_item_wrapper}
      onClick={handleSVGClick}
    >
      <div
        className={accordion.accordion_title_wrapper}
        key={`${title} + ${title}`}
      >
        <p className={accordion.accordion_title}>{title}</p>
        <svg
          className={
            isOpen
              ? `${accordion.accordion_cross_svg} ${accordion.active}`
              : accordion.accordion_cross_svg
          }
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
      <p
        className={`${accordion.accordion_text} ${isOpen ? "open" : ""}`}
        ref={contentRef}
      >
        {text}
      </p>
    </div>
  );
}
