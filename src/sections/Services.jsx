import React from "react";
import Container from "../components/Container";
import SectionHead from "../components/SectionHead";
import { MotionDiv } from "../animations/motionPresets";

const items = [
  {
    image: "/images/serv-1.png",
    title: "تغذية علاجية ومرنة",
    description:
      "نظام غذائي محسوب السعرات حسب حالتك الصحية وهدفك، مبني بالكامل على أصناف الطعام التي تفضلها بدون حرمان.",
  },
  {
    image: "/images/serv-2.png",
    title: "تدريب احترافي ذكي",
    description:
      "برنامج تدريبي مفصل يناسب يومك (جيم أو منزل) مع فيديوهات شرح دقيقة للأداء الصحيح لتجنب الإصابات.",
  },
  {
    image: "/images/serv-3.png",
    title: "تأهيل وتطور مستمر",
    description:
      "برامج خاصة لتأهيل الإصابات، مع تغيير شامل لخطط التدريب والتغذية شهرياً لضمان استمرار النتائج.",
  },
  {
    image: "/images/serv-4.png",
    title: "متابعة شخصية 100%",
    description:
      "متابعة يومية مباشرة معي شخصياً (بدون فريق مساعدين) عبر الواتساب لضمان التزامك والرد على استفساراتك.",
  },
];

export default function Services() {
  return (
    <div
      id="services"
      className="flex justify-center pt-14 pb-22 relative overflow-hidden bg-white"
    >
      <img
        src="/images/serv-5.png"
        alt="serv-5"
        className="absolute -bottom-90 -right-90 md:-bottom-90 md:-right-90 lg:-bottom-90 lg:-right-90 xl:-bottom-90 xl:-right-90 z-0"
      />
      <Container>
        <SectionHead
          titleColor="rgba(26, 26, 26, 1)"
          titleText="خدماتنا"
          descColor="rgba(96, 96, 96, 1)"
          descText="نقدم لك مجموعة متكاملة من الخدمات لضمان وصولك لأفضل النتائج بأسرع وقت وبطريقة صحية وآمنة"
        />
        <div
          className="
            grid gap-6 
            grid-cols-1 
            sm:grid-cols-2 
            lg:grid-cols-4 
            max-w-6xl
            mx-auto
          "
        >
          {items.map((item, idx) => (
            <MotionDiv variant="scaleZ">
              <div
                key={idx}
                className="flex flex-col sm:items-start sm:text-right items-center text-center px-2.5 pt-2.5 pb-8 rounded-3xl shadow-sm relative"
                style={{
                  BoxShadow: "0px 4px 200px 0px rgba(0, 0, 0, 0.1)",
                  backgroundColor: "white",
                }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full object-fill mb-6"
                />
                <h3
                  className="text-xl font-semibold mb-2"
                  style={{ color: "rgba(26, 26, 26, 1)" }}
                >
                  {item.title}
                </h3>
                <p style={{ color: "rgba(77, 77, 77, 1)" }}>
                  {item.description}
                </p>
              </div>
            </MotionDiv>
          ))}
        </div>
      </Container>
    </div>
  );
}
