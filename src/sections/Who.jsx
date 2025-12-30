import { MotionDiv } from "../animations/motionPresets";
import Container from "../components/Container";

const data = [
  {
    icon: "/images/who-1.svg",
    text: "طبيب علاج طبيعي ، وأخصائي تغذية ، ومتخصص في تأهيل الإصابات الرياضية",
  },
  {
    icon: "/images/who-2.svg",
    text: "هدفي مساعدتك للوصول لنسخة أقوى وأصح من نفسك بخطة واضحة وبسيطة",
  },
  {
    icon: "/images/who-3.svg",
    text: "نعمل بخطة مدروسة علميآ، سهلة التطبيق ، ومناسبة تمامآ لأسلوب حياتك.",
  },
  {
    icon: "/images/who-4.svg",
    text: "لا نعتمد على الحلول المؤقتة أو أنظمة الحرمان القاسية ، بل أسلوب حياة مستدام",
  },
];

export default function Who() {
  return (
    <section
      className="w-full pt-14 pb-18 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(224deg, rgb(255, 255, 255) 60%, #f5ffb8 100%)",
      }}
    >
      <img
        src="/images/serv-5.png"
        alt="serv-5"
        className="
          absolute
          -left-50
          -top-40
          sm:-top-60
          md:-left-70 md:-top-100
          lg:-right-120
          z-0
        "
      />
      <Container>
        <div
          className="
          flex flex-col lg:flex-row
          items-center
          justify-center
          gap-12
        "
        >
          {/* الجزء النصي */}
          <div className="flex flex-col gap-10 lg:max-w-xl text-center lg:text-right">
            <MotionDiv variant="scaleFade">
              <h2 className="text-3xl font-medium">من هو ك.يوسف؟</h2>
            </MotionDiv>

            <ul className="flex flex-col gap-5 mx-auto lg:mx-0">
              {data.map((item, index) => (
                <MotionDiv
                  variant="slideXRight"
                  visibleOverride={{
                    viewport: { once: true, amount: 0.9 },
                    transition: { duration: 1, delay: index * 0.2 },
                  }}
                >
                  <li
                    key={index}
                    className="
                    group
                    flex flex-col items-center text-center
                    md:flex-row md:items-center md:text-right
                    gap-4
                    rounded-2xl
                    p-5 md:p-0
                   md:bg-transparent bg-white
                    border border-black/5
                    shadow-sm
                    md:border-none md:shadow-none
                    lg:w-[89%]
                  "
                  >
                    {/* الأيقونة */}
                    <div
                      style={{ background: "rgba(217, 250, 43, 0.22)" }}
                      className="w-12 h-12 flex items-center justify-center rounded-full shrink-0"
                    >
                      <img src={item.icon} alt="" />
                    </div>

                    {/* النص */}
                    <p className="text-lg font-medium leading-relaxed">
                      {item.text}
                    </p>
                  </li>
                </MotionDiv>
              ))}
            </ul>
          </div>

          {/* الصورة */}
          <MotionDiv
            variant="scaleFade"
            visibleOverride={{
              transition: { duration: 0.7 },
            }}
            overrideProps={{ viewport: { once: true, amount: 0.6 } }}
          >
            <div className="shrink">
              <img
                src="/images/who-5.png"
                alt="youssef"
                className="w-full max-w-md h-auto"
              />
            </div>
          </MotionDiv>
        </div>
      </Container>
    </section>
  );
}
