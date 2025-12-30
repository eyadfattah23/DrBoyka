import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Container from "../components/Container";
import SectionHead from "../components/SectionHead";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaArrowLeftLong } from "react-icons/fa6";
import Loader from "../components/Loader";

// استيراد ستايلات Swiper
import "swiper/css";
import "swiper/css/navigation";
import { MotionDiv } from "../animations/motionPresets";

const BASE_URL = "https://drboyka.onrender.com";

function Transformations() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false); // <-- فقط حالة الخطأ

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/transformations`);
        if (!response.ok) throw new Error("Failed");
        const result = await response.json();
        setData(result);
      } catch (err) {
        setHasError(true); // <-- لو حصل أي خطأ نخليها true
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  let content;

  if (loading) {
    content = <Loader />;
  } else if (hasError || !data || data.length === 0) {
    content = (
      <div className="flex justify-center items-center flex-col">
        <img src="/images/error-2.png" alt="error" />
        <p className="text-2xl mt-4 font-semibold text-red-600">
          حدث خطأ أثناء جلب البيانات!
        </p>
      </div>
    );
  } else {
    content = (
      <MotionDiv
        variant="scaleFade"
        visibleOverride={{ delay: 1, transition: { duration: 1 } }}
      >
        <div className="max-w-7xl mx-auto px-4 relative group">
          {/* Swiper Component */}
          <Swiper
            modules={[Navigation]}
            spaceBetween={20}
            slidesPerView={1}
            navigation={{
              nextEl: ".button-prev",
              prevEl: ".button-next",
            }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1280: { slidesPerView: 3 },
            }}
            className="mySwiper"
          >
            {data.map((item) => (
              <SwiperSlide key={item.id}>
                <div
                  className="
                    rounded-2xl
                    p-3
                    shadow-lg
                    overflow-hidden
                    bg-white/18
                    backdrop-blur-md
                    border border-white/30
                  "
                >
                  {/* صور قبل وبعد */}
                  <div className="flex gap-3 h-62 mb-8">
                    {/* Before Box */}
                    <div className="relative flex-1">
                      {" "}
                      {/* الحاوية الأساسية بدون overflow */}
                      {/* حاوية الصورة هي اللي فيها القص والدوران */}
                      <div className="w-full h-full overflow-hidden rounded-2xl">
                        <img
                          src={item.before_image}
                          alt="Before"
                          className="w-full h-full object-fill"
                        />
                      </div>
                      {/* الكلمة الآن حرة تخرج برا حدود الصورة */}
                      <span
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 font-semibold text-center py-1.5 w-18 z-20 rounded-full"
                        style={{
                          background: "var(--color-primary)", // وضعنا لون احتياطي في حال عدم قراءة المتغير
                        }}
                      >
                        قبل
                      </span>
                    </div>

                    {/* After Box */}
                    <div className="relative flex-1">
                      {" "}
                      {/* الحاوية الأساسية بدون overflow */}
                      {/* حاوية الصورة هي اللي فيها القص والدوران */}
                      <div className="w-full h-full overflow-hidden rounded-2xl">
                        <img
                          src={item.after_image}
                          alt="After"
                          className="w-full h-full object-fill"
                        />
                      </div>
                      {/* الكلمة الآن حرة تخرج برا حدود الصورة */}
                      <span
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 font-semibold text-center py-1.5 w-18 z-20 rounded-full"
                        style={{
                          background: "var(--color-primary)", // وضعنا لون احتياطي في حال عدم قراءة المتغير
                        }}
                      >
                        بعد
                      </span>
                    </div>
                  </div>

                  {/* البيانات التحليلية */}
                  <div>
                    <h3 className="text-xl font-semibold mb-2.5 text-white">
                      {item.name}
                    </h3>
                    <div className="flex gap-1 mb-3">
                      <img src="/images/timer.svg" alt="duration" />
                      <span style={{ color: "var(--color-primary)" }}>
                        {item.duration}
                      </span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* أزرار التحكم - تظهر فقط إذا كان عدد العناصر أكبر من المعروض */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              style={{ background: "var(--color-primary)" }}
              className="text-2xl button-next w-12 h-12 flex items-center justify-center rounded-full text-gray-900 shadow-md transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              <FaArrowRightLong />
            </button>
            <button
              style={{ background: "var(--color-primary)" }}
              className="text-2xl button-prev w-12 h-12 flex items-center justify-center rounded-full text-gray-900 shadow-md transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              <FaArrowLeftLong />
            </button>
          </div>
        </div>

        <style jsx global>{`
          /* إخفاء الأزرار تماماً إذا لم يكن هناك سلايد قابل للحركة */
          .swiper-button-lock {
            display: none !important;
          }
        `}</style>
      </MotionDiv>
    );
  }
  return (
    <div
      id="transformations"
      className="w-full pt-14 pb-22 relative overflow-hidden"
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
      <img
        src="/images/serv-5.png"
        alt="serv-5"
        className="
          absolute
          -bottom-35
          left-35
          sm:-bottom-60
          sm:left-45
          md:-bottom-100
          md:-left-90
          z-0
        "
      />
      <Container>
        <SectionHead
          titleColor="var(--color-primary)"
          titleText="قصص نجاح حقيقية"
          descColor="white"
          descText="نقدم لك مجموعة متكاملة من الخدمات لضمان وصولك لأفضل النتائج بأسرع وقت وبطريقة صحية وآمنة"
        />
        {content}
      </Container>
    </div>
  );
}

export default Transformations;
