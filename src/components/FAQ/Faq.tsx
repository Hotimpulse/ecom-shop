import faq from "./faq.module.css";
import { IAccordionItem } from "@src/interfaces/IAccordionItem";
import Accordion from "../Accordion/Accordion";

const data: IAccordionItem[] = [
  {
    title: "How can I track the status of my order?",
    text: `After placing your order, you will receive a confirmation email
        containing your order number and a tracking link. You can also log in to
        your account on our website and go to the "My Orders" section to track
        your delivery status.`,
    key: "0",
  },
  {
    title: "What payment methods do you accept?",
    text: `After placing your order, you will receive a confirmation email
        containing your order number and a tracking link. You can also log in to
        your account on our website and go to the "My Orders" section to track
        your delivery status.`,
    key: "1",
  },
  {
    title: "How can I return or exchange an item?",
    text: `After placing your order, you will receive a confirmation email
        containing your order number and a tracking link. You can also log in to
        your account on our website and go to the "My Orders" section to track
        your delivery status.`,
    key: "2",
  },
];

export default function Faq() {
  return (
    <div className={faq.faq_wrapper}>
      <div className={faq.faq_container}>
        <h2 className={faq.faq_headline}>FAQ</h2>
        <Accordion data={data} />
      </div>
    </div>
  );
}
