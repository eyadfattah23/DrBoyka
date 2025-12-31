import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Container from "../components/Container";
import SectionHead from "../components/SectionHead";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaArrowLeftLong } from "react-icons/fa6";
import Loader from "../components/Loader";

import "swiper/css";
import "swiper/css/navigation";
import { MotionDiv } from "../animations/MotionPresets";

const BASE_URL = "https://drboyka.onrender.com";

function Transformations() {
  //const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasError,setHasError] = useState(false);

  /*useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${BASE_URL}/api/transformations`);
        if (!response.ok) throw new Error("Failed");
        const result = await response.json();
        console.log(result);
        setData(result);
      } catch (err) {
        setHasError(true); // <-- لو حصل أي خطأ نخليها true
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);*/

  const data = [
    {
      after_image: "/images/after.png",
      before_image: "/images/before.png",
      duration: "شهرين",
      id: 1,
      name: "أحمد محمد",
    },
    {
      after_image: "/images/after.png",
      before_image: "/images/before.png",
      duration: "3 أشهر",
      id: 2,
      name: "كريم سامح",
    },
    {
      after_image: "/images/after.png",
      before_image: "/images/before.png",
      duration: "45 يوم",
      id: 3,
      name: "محمود علي",
    },
    {
      after_image: "/images/after.png",
      before_image: "/images/before.png",
      duration: "4 أشهر",
      id: 4,
      name: "يوسف حسام",
    },
    {
      after_image: "/images/after.png",
      before_image: "/images/before.png",
      duration: "6 أسابيع",
      id: 5,
      name: "إسلام فتحي",
    },
    {
      after_image: "/images/after.png",
      before_image: "/images/before.png",
      duration: "5 أشهر",
      id: 6,
      name: "عمر خالد",
    },
    {
      after_image: "/images/after.png",
      before_image: "/images/before.png",
      duration: "90 يوم",
      id: 7,
      name: "حسام رمضان",
    },
  ];

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
          <Swiper
            modules={[Navigation]}
            spaceBetween={10}
            slidesPerView={1.1}
            centeredSlides={true}
            initialSlide={Math.floor(data.length / 2)}
            navigation={{
              nextEl: ".button-prev",
              prevEl: ".button-next",
            }}
            breakpoints={{
              768: {
                spaceBetween: 20,
                slidesPerView: 2,
                centeredSlides: false,
                initialSlide: 0,
              },
              1280: {
                spaceBetween: 20,
                slidesPerView: 3,
                centeredSlides: false,
                initialSlide: 0,
              },
            }}
            className="mySwiper"
          >
            {data.map((item) => (
              <SwiperSlide key={item.id} className="swiper-slide-custom">
                <div className="rounded-2xl p-3 shadow-lg overflow-hidden bg-white/18 backdrop-blur-md border border-white/30 transition-all duration-500">
                  <div className="flex gap-3 h-40 sm:h-62 mb-8">
                    <div className="relative flex-1">
                      <div className="w-full h-full overflow-hidden rounded-2xl">
                        <img
                          src={item.before_image}
                          alt="Before"
                          className="w-full h-full object-fill"
                        />
                      </div>
                      <span
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 font-semibold text-center py-1.5 w-18 z-20 rounded-full px-4"
                        style={{ background: "var(--color-primary)" }}
                      >
                        قبل
                      </span>
                    </div>

                    <div className="relative flex-1">
                      <div className="w-full h-full overflow-hidden rounded-2xl">
                        <img
                          src={item.after_image}
                          alt="After"
                          className="w-full h-full object-fill"
                        />
                      </div>
                      <span
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 font-semibold text-center py-1.5 w-18 z-20 rounded-full px-4"
                        style={{ background: "var(--color-primary)" }}
                      >
                        بعد
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-2.5 text-white">
                      {item.name}
                    </h3>
                    <div className="flex gap-1 mb-3 items-center">
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

          <div className="flex justify-center gap-4 mt-8">
            <button
              style={{ background: "var(--color-primary)" }}
              className="text-2xl button-next w-12 h-12 flex items-center justify-center rounded-full text-gray-900 shadow-md transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer hover:scale-110"
            >
              <FaArrowRightLong />
            </button>
            <button
              style={{ background: "var(--color-primary)" }}
              className="text-2xl button-prev w-12 h-12 flex items-center justify-center rounded-full text-gray-900 shadow-md transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer hover:scale-110"
            >
              <FaArrowLeftLong />
            </button>
          </div>
        </div>

        <style jsx global>{`
          .swiper-button-lock {
            display: none !important;
          }

          @media (max-width: 767px) {
            .swiper {
              overflow: visible !important;
            }

            .swiper-wrapper {
              perspective: 1000px;
            }

            .swiper-slide-custom:not(.swiper-slide-active) > div {
              transform: scale(0.9) translateZ(-50px);
              opacity: 0.6;
              filter: blur(3px);
            }

            .swiper-slide-custom.swiper-slide-active > div {
              transform: scale(1) translateZ(0);
              opacity: 1;
              filter: blur(0);
            }
          }

          .swiper-slide-custom > div {
            transform: scale(1);
            opacity: 1;
            filter: blur(0);
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

/* import React, { useEffect, useState } from "react";
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
import { MotionDiv } from "../animations/MotionPresets";

const BASE_URL = "https://drboyka.onrender.com";

function Transformations() {
  //const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false); // <-- فقط حالة الخطأ

  /*useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${BASE_URL}/api/transformations`);
        if (!response.ok) throw new Error("Failed");
        const result = await response.json();
        console.log(result);
        setData(result);
      } catch (err) {
        setHasError(true); // <-- لو حصل أي خطأ نخليها true
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);*/

/* const data = [
    {
      after_image: "/images/after.png",
      before_image: "/images/before.png",
      duration: "شهرين",
      id: 1,
      name: "أحمد محمد",
    },
    {
      after_image: "/images/after.png",
      before_image: "/images/before.png",
      duration: "3 أشهر",
      id: 2,
      name: "كريم سامح",
    },
    {
      after_image: "/images/after.png",
      before_image: "/images/before.png",
      duration: "45 يوم",
      id: 3,
      name: "محمود علي",
    },
    {
      after_image: "/images/after.png",
      before_image: "/images/before.png",
      duration: "4 أشهر",
      id: 4,
      name: "يوسف حسام",
    },
    {
      after_image: "/images/after.png",
      before_image: "/images/before.png",
      duration: "6 أسابيع",
      id: 5,
      name: "إسلام فتحي",
    },
    {
      after_image: "/images/after.png",
      before_image: "/images/before.png",
      duration: "5 أشهر",
      id: 6,
      name: "عمر خالد",
    },
    {
      after_image: "/images/after.png",
      before_image: "/images/before.png",
      duration: "90 يوم",
      id: 7,
      name: "حسام رمضان",
    },
  ];

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
                  <div className="flex gap-3 h-45 sm:h-62 mb-8">
                    <div className="relative flex-1">
                      <div className="w-full h-full overflow-hidden rounded-2xl">
                        <img
                          src={item.before_image}
                          alt="Before"
                          className="w-full h-full object-fill"
                        />
                      </div>
                      <span
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 font-semibold text-center py-1.5 w-18 z-20 rounded-full"
                        style={{
                          background: "var(--color-primary)", // وضعنا لون احتياطي في حال عدم قراءة المتغير
                        }}
                      >
                        قبل
                      </span>
                    </div>

                    <div className="relative flex-1">
                      <div className="w-full h-full overflow-hidden rounded-2xl">
                        <img
                          src={item.after_image}
                          alt="After"
                          className="w-full h-full object-fill"
                        />
                      </div>
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

export default Transformations;*/
