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
import { BASE_URL } from "../config/api";
import { TbRotate360 } from "react-icons/tb";
import Button from "../components/Button";

function Transformations() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [flippedCards, setFlippedCards] = useState({});

  const toggleFlip = (id) => {
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${BASE_URL}/api/transformations`);
        if (!response.ok) throw new Error("Failed");
        const result = await response.json();
        setData(result);
      } catch (err) {
        setHasError(true);
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  /* const data = [
    {
      after_image: "/images/after-1.jpg",
      before_image: "/images/before-1.jpg",
      duration: "4 شهور",
      id: 1,
      name: "أحمد محمد",
      story:
        "كريم كان طول عمره حاسس إنه مش راضي عن جسمه وحاسس بالتعب كل يوم، وزنه زايد وطاقته منخفضة، ودايمًا بيأجل فكرة التغيير، وكان كل مرة يشوف نفسه في المرايا يحس بالإحباط، بس جوّه كان عارف إنه محتاج يبدأ خطوة صغيرة. في يوم، قرر ياخد القرار ويحجز اشتراك في الجيم، وبدأ بروتين بسيط من تمارين الكارديو واللياقة، مع شوية تغييرات في أكله زي زيادة البروتين وتقليل السكريات، وكانت البداية صعبة جدًا، حاسس بالتعب والإرهاق ومرات كان نفسه يسيب، لكن كل مرة يشوف فرق صغير في جسمه يحس بالحماس يكمل. مع مرور الأسابيع، كريم بدأ يكتشف قدراته، العضلات بدأت تظهر تدريجيًا، طاقته ارتفعت، ومزاجه اتحسن، وحتى النوم والأكل بقيوا أفضل. استمر في روتينه، وبدأ يدخل تمارين جديدة ويتحدى نفسه أكتر كل مرة، ومع كل تقدم بسيط كان شعور الفخر بالنفس يزيد، لدرجة إنه دلوقتي مش بس جسمه متناسق وقوي، لكن ثقته بنفسه عالية جدًا، وكل الناس حواليه لاحظوا التغيير الكبير، وكريم بقى مثال حي على إن أي حد يقدر يغير نفسه لو كان ملتزم وصبور، وبيأكد لكل حد إن البداية أصعب حاجة، لكن الاستمرارية والعزيمة هما اللي بيخلوا التغيير حقيقي ومستدام.",
    },
    {
      after_image: "/images/after-2.jpg",
      before_image: "/images/before-2.jpg",
      duration: "3 شهور",
      id: 2,
      name: "كريم سامح",
      story:
        "أحمد كان طول عمره حاسس بالتعب ومش راضي عن شكل جسمه، وزنه زايد وطاقته منخفضة، وكل يوم كان بيأجل فكرة التغيير، لحد ما قرر يبدأ رحلة الجيم بشكل جدي. بدأ يروح 3 مرات في الأسبوع، اتعلم نظام أكل صحي، وركز على تمارين القوة واللياقة، ومع الوقت جسمه اتغير قدامه يوم ورا يوم، بقي متناسق وعضلاته بدأت تظهر، وطاقته زادت بشكل ملحوظ. دلوقتي كريم مش بس مبسوط من شكله، لكن ثقته بنفسه ارتفعت جدًا، وبيبقى فخور بكل خطوة صغيرة اتخذها لتحقيق هدفه، وبيأكد لكل الناس حواليه إن الاستمرارية والعزيمة هما المفتاح الحقيقي لأي تغيير.",
    },
    {
      after_image: "/images/after-3.jpg",
      before_image: "/images/before-3.jpg",
      duration: "12 شهر",
      id: 3,
      name: "محمود علي",
      story:
        "أحمد كان طول عمره حاسس بالتعب ومش راضي عن شكل جسمه، وزنه زايد وطاقته منخفضة، وكل يوم كان بيأجل فكرة التغيير، لحد ما قرر يبدأ رحلة الجيم بشكل جدي. بدأ يروح 3 مرات في الأسبوع، اتعلم نظام أكل صحي، وركز على تمارين القوة واللياقة، ومع الوقت جسمه اتغير قدامه يوم ورا يوم، بقي متناسق وعضلاته بدأت تظهر، وطاقته زادت بشكل ملحوظ. دلوقتي كريم مش بس مبسوط من شكله، لكن ثقته بنفسه ارتفعت جدًا، وبيبقى فخور بكل خطوة صغيرة اتخذها لتحقيق هدفه، وبيأكد لكل الناس حواليه إن الاستمرارية والعزيمة هما المفتاح الحقيقي لأي تغيير.",
    },
    {
      after_image: "/images/after-4.jpeg",
      before_image: "/images/before-4.jpeg",
      duration: "6 شهور",
      id: 4,
      name: "يوسف حسام",
      story:
        "أحمد كان طول عمره حاسس بالتعب ومش راضي عن شكل جسمه، وزنه زايد وطاقته منخفضة، وكل يوم كان بيأجل فكرة التغيير، لحد ما قرر يبدأ رحلة الجيم بشكل جدي. بدأ يروح 3 مرات في الأسبوع، اتعلم نظام أكل صحي، وركز على تمارين القوة واللياقة، ومع الوقت جسمه اتغير قدامه يوم ورا يوم، بقي متناسق وعضلاته بدأت تظهر، وطاقته زادت بشكل ملحوظ. دلوقتي كريم مش بس مبسوط من شكله، لكن ثقته بنفسه ارتفعت جدًا، وبيبقى فخور بكل خطوة صغيرة اتخذها لتحقيق هدفه، وبيأكد لكل الناس حواليه إن الاستمرارية والعزيمة هما المفتاح الحقيقي لأي تغيير.",
    },
    {
      after_image: "/images/after.png",
      before_image: "/images/before.png",
      duration: "6 أسابيع",
      id: 5,
      name: "إسلام فتحي",
      story:
        "أحمد كان طول عمره حاسس بالتعب ومش راضي عن شكل جسمه، وزنه زايد وطاقته منخفضة، وكل يوم كان بيأجل فكرة التغيير، لحد ما قرر يبدأ رحلة الجيم بشكل جدي. بدأ يروح 3 مرات في الأسبوع، اتعلم نظام أكل صحي، وركز على تمارين القوة واللياقة، ومع الوقت جسمه اتغير قدامه يوم ورا يوم، بقي متناسق وعضلاته بدأت تظهر، وطاقته زادت بشكل ملحوظ. دلوقتي كريم مش بس مبسوط من شكله، لكن ثقته بنفسه ارتفعت جدًا، وبيبقى فخور بكل خطوة صغيرة اتخذها لتحقيق هدفه، وبيأكد لكل الناس حواليه إن الاستمرارية والعزيمة هما المفتاح الحقيقي لأي تغيير.",
    },
    {
      after_image: "/images/after.png",
      before_image: "/images/before.png",
      duration: "5 أشهر",
      id: 6,
      name: "عمر خالد",
      story:
        "أحمد كان طول عمره حاسس بالتعب ومش راضي عن شكل جسمه، وزنه زايد وطاقته منخفضة، وكل يوم كان بيأجل فكرة التغيير، لحد ما قرر يبدأ رحلة الجيم بشكل جدي. بدأ يروح 3 مرات في الأسبوع، اتعلم نظام أكل صحي، وركز على تمارين القوة واللياقة، ومع الوقت جسمه اتغير قدامه يوم ورا يوم، بقي متناسق وعضلاته بدأت تظهر، وطاقته زادت بشكل ملحوظ. دلوقتي كريم مش بس مبسوط من شكله، لكن ثقته بنفسه ارتفعت جدًا، وبيبقى فخور بكل خطوة صغيرة اتخذها لتحقيق هدفه، وبيأكد لكل الناس حواليه إن الاستمرارية والعزيمة هما المفتاح الحقيقي لأي تغيير.",
    },
    {
      after_image: "/images/after.png",
      before_image: "/images/before.png",
      duration: "90 يوم",
      id: 7,
      name: "حسام رمضان",
      story:
        "أحمد كان طول عمره حاسس بالتعب ومش راضي عن شكل جسمه، وزنه زايد وطاقته منخفضة، وكل يوم كان بيأجل فكرة التغيير، لحد ما قرر يبدأ رحلة الجيم بشكل جدي. بدأ يروح 3 مرات في الأسبوع، اتعلم نظام أكل صحي، وركز على تمارين القوة واللياقة، ومع الوقت جسمه اتغير قدامه يوم ورا يوم، بقي متناسق وعضلاته بدأت تظهر، وطاقته زادت بشكل ملحوظ. دلوقتي كريم مش بس مبسوط من شكله، لكن ثقته بنفسه ارتفعت جدًا، وبيبقى فخور بكل خطوة صغيرة اتخذها لتحقيق هدفه، وبيأكد لكل الناس حواليه إن الاستمرارية والعزيمة هما المفتاح الحقيقي لأي تغيير.",
    },
  ]; */

  let content;

  if (loading) {
    content = <Loader />;
  } else if (hasError || !data || data.length === 0) {
    content = (
      <MotionDiv
        variant="scaleFade"
        visibleOverride={{ transition: { delay: 0.3, duration: 1 } }}
      >
        <div className="flex justify-center items-center flex-col">
          <img src="/images/error-2.png" alt="error" />
          <p className="text-2xl mt-4 font-semibold text-red-600">
            حدث خطأ أثناء جلب البيانات!
          </p>
        </div>
      </MotionDiv>
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
                <div className="card-container relative">
                  <div
                    className={`card-inner ${
                      flippedCards[item.id] ? "is-flipped" : ""
                    }`}
                  >
                    <div className="card-front rounded-2xl p-3 pb-12 shadow-lg overflow-hidden bg-white/18 backdrop-blur-md border border-white/30 transition-all duration-500 cursor-grab">
                      <div className="flex gap-3 h-40 sm:h-62 mb-12">
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
                        <div className="flex gap-1 items-center">
                          <img src="/images/timer.svg" alt="duration" />
                          <span style={{ color: "var(--color-primary)" }}>
                            {item.duration}
                          </span>
                        </div>
                      </div>

                      <Button
                        onClick={() => toggleFlip(item.id)}
                        text="القصة"
                        className="pulse-btn text-black font-bold absolute bottom-3 left-3 py-2 px-4"
                      />
                    </div>

                    <div className="card-back rounded-2xl p-4 shadow-lg overflow-hidden bg-white/18 backdrop-blur-md border border-white/30 transition-all duration-500 flex flex-col">
                      <h3
                        className="text-lg font-semibold mb-1 text-white"
                        style={{ color: "var(--color-primary)" }}
                      >
                        قصة نجاح {item.name}
                      </h3>

                      <div className="story-container">
                        <p className="text-white/80 leading-relaxed text-sm story-text">
                          {item.story}
                        </p>
                      </div>

                      <Button
                        onClick={() => toggleFlip(item.id)}
                        text="التحول"
                        className="pulse-btn text-black font-bold absolute bottom-3 left-3 py-2 px-4"
                      />
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

        <style>{`
          .swiper-button-lock {
            display: none !important;
          }

          .card-container {
            perspective: 1000px;
          }
          
          .card-inner {
            position: relative;
            width: 100%;
            transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
            transform-style: preserve-3d;
          }
          .card-inner.is-flipped {
            transform: rotateY(180deg);
          }
          .card-front, .card-back {
            width: 100%;
            -webkit-backface-visibility: hidden;
            backface-visibility: hidden;
          }
          
          .card-front {
            position: relative;
          }
          
          .card-back {
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            transform: rotateY(180deg);
          }

          .story-container {
            flex: 1;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            position: relative;
            padding-bottom: 0.5rem;
          }

          .story-text {
            display: -webkit-box;
            -webkit-line-clamp: 8;
            -webkit-box-orient: vertical;
            overflow: hidden;
            line-height: 1.6;
            padding-bottom: 0.25rem;
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

            .story-text {
              -webkit-line-clamp: 9;
            }
          }

          @media (min-width: 640px){
            .story-text {
              -webkit-line-clamp: 13;
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
