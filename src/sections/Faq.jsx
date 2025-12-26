import { useState } from "react";
import Container from "../components/Container";
import SectionHead from "../components/SectionHead";
import { motion, AnimatePresence } from "framer-motion";
import { MdOutlineCloseFullscreen } from "react-icons/md";
import { MdOpenInFull } from "react-icons/md";
import { IoIosArrowDropdown } from "react-icons/io";
import { IoIosArrowDropup } from "react-icons/io";

const dataColumn1 = [
  {
    id: 1,
    question: "هل البرامج مناسبة للمبتدئين؟",
    answer:
      "نعم، جميع البرامج يتم تصميمها خصيصاً لتناسب مستواك الحالي سواء كنت مبتدئاً أو محترفاً.",
  },
  {
    id: 3,
    question: "هل يمكنني التمرين في المنزل؟",
    answer:
      "على الرغم من أن الصالة الرياضية توفر بيئة داعمة في العديد من النواحي، ولكن يمكن أيضًا الوصول لنتائج متميزة من خلال التمرين في المنزل، ونحن نضمن لك المتابعة والدعم لتحقيق ذلك بفعالية.",
  },
];

const dataColumn2 = [
  {
    id: 2,
    question: "كيف يتم التواصل والمتابعة؟",
    answer:
      "المتابعة تكون يومياً على الواتساب بشكل شخصي ومباشر 100% وبدون وجود أي مساعدين.",
  },
  {
    id: 4,
    question: "هل أحتاج لمكملات غذائية؟",
    answer:
      "معظم الأشخاص يستطيعون تلبية احتياجاتهم الغذائية من خلال نظام غذائي متوازن، ولكن قد تكون المكملات ضرورية في بعض الحالات الخاصة، بناءً على التقييم الفردي واحتياجاتك الصحية.",
  },
];

function AccordionItem({ item, isOpen, onClick }) {
  return (
    <div
      className="bg-white rounded-2xl overflow-hidden xs:p-2 md:p-5"
      style={{
        boxShadow: "0px 24.56px 32.74px -14.73px rgba(149, 149, 149, 0.25)",
      }}
    >
      <button
        onClick={onClick}
        className="w-full text-left p-4 flex justify-between items-center cursor-pointer"
      >
        <span className="xs:font-medium md:font-bold xs:text-lg md:text-xl">
          {item.question}
        </span>
        <span className="text-2xl md:text-3xl">
          {isOpen ? <IoIosArrowDropup /> : <IoIosArrowDropdown />}
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.01 }}
            className="p-4 pl-12 xs:text-lg md:text-xl text-justify"
            style={{ color: "rgba(54, 48, 73, 1)" }}
          >
            {item.answer}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Faq() {
  const [openId, setOpenId] = useState(null);

  const handleToggle = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div
      className="flex justify-center pt-14 pb-22 relative overflow-hidden bg-white"
      style={{ backgroundColor: "rgba(246, 246, 246, 1)" }}
    >
      <Container>
        <SectionHead
          titleColor="rgba(26, 26, 26, 1)"
          titleText="الأسئلة الشائعة"
          descColor="rgba(96, 96, 96, 1)"
          descText="محتاج اي مساعدة ؟"
        />
        <div className="flex flex-col lg:flex-row justify-between gap-6">
          <div className="flex-1 flex flex-col gap-4">
            {dataColumn1.map((item) => (
              <AccordionItem
                key={item.id}
                item={item}
                isOpen={openId === item.id}
                onClick={() => handleToggle(item.id)}
              />
            ))}
          </div>
          <div className="flex-1 flex flex-col gap-4">
            {dataColumn2.map((item) => (
              <AccordionItem
                key={item.id}
                item={item}
                isOpen={openId === item.id}
                onClick={() => handleToggle(item.id)}
              />
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
