import { useState } from "react";
import { countryCodes } from "../data/countryCodes";
import { BASE_URL } from "../config/api";
import Container from "../components/Container";
import { IoMdCheckmark } from "react-icons/io";
import { FiUser } from "react-icons/fi";
import { CiMail } from "react-icons/ci";
import Select, { components } from "react-select";
import { FaWhatsapp } from "react-icons/fa";
import { CiMobile1 } from "react-icons/ci";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { toast } from "react-toastify";
import { useRef } from "react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { MotionDiv } from "../animations/MotionPresets";
import FogBackground from "../components/FogBackground";
import Ribbon from "../components/Ribbon";

export default function PackagePopup({
  pkg,
  setSelectedPackage,
  convertToUSD,
  usdRate,
}) {
  const [fullname, setFullname] = useState("");
  const [whatsappCode, setWhatsappCode] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [callsCode, setCallsCode] = useState("");
  const [callsNumber, setCallsNumber] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const whatsappInputRef = useRef(null);
  const callsInputRef = useRef(null);

  const selectedMonth = pkg?.selectedMonth || 1;

  if (!pkg) return null;

  const handleNumberInput = (value, setter, maxLength) => {
    const cleaned = value.replace(/\D/g, "");
    setter(cleaned.slice(0, maxLength));
  };

  const resetForm = () => {
    setFullname("");
    setWhatsappCode("");
    setWhatsappNumber("");
    setCallsCode("");
    setCallsNumber("");
    setEmail("");
  };

  const getPrice = (month) => {
    if (month === 1)
      return {
        before: pkg.one_month_price_before_discount,
        after: pkg.one_month_price_after_discount,
      };
    if (month === 6)
      return {
        before: pkg.six_month_price_before_discount,
        after: pkg.six_month_price_after_discount,
      };
    if (month === 12)
      return {
        before: pkg.twelve_month_price_before_discount,
        after: pkg.twelve_month_price_after_discount,
      };
    return { before: 0, after: 0 };
  };

  const prices = getPrice(selectedMonth);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fullname) {
      e.target.reportValidity();
      return;
    }

    if (!whatsappCode) {
      toast.error("يرجى اختيارالبلد!");
      return;
    }
    if (!callsCode) {
      toast.error("يرجى اختيارالبلد!");
      return;
    }

    const whatsappDigits = whatsappNumber.length;
    const callsDigits = callsNumber.length;

    if (whatsappCode === "+20") {
      if (whatsappDigits !== 10 || !whatsappNumber.startsWith("1")) {
        toast.error("رقم الواتساب المصري يجب أن يبدأ بـ 1 ويتكون من 10 أرقام!");
        return;
      }
    } else if (whatsappDigits < 5) {
      toast.error("رقم الواتساب يجب أن يتكون من 5 أرقام على الأقل!");
      return;
    }

    if (callsCode === "+20") {
      if (callsDigits !== 10 || !callsNumber.startsWith("1")) {
        toast.error(
          "رقم المكالمات المصري يجب أن يبدأ بـ 1 ويتكون من 10 أرقام!"
        );
        return;
      }
    } else if (callsDigits < 5) {
      toast.error("رقم المكالمات يجب أن يتكون من 5 أرقام على الأقل!");
      return;
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("يرجى إدخال بريد إلكتروني صالح");
      return;
    }

    const data = {
      package: pkg.id,
      duration: selectedMonth === 1 ? "1_month" : `${selectedMonth}_months`,
      fullname,
      whatsapp_phone_number: whatsappCode + whatsappNumber,
      calls_phone_number: callsCode + callsNumber,
      email: email || "",
    };

    setLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/api/subscriptions/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        window.lenis.scrollTo(15, {
          duration: 0.5,
        });
        Swal.fire({
          backdrop: "rgba(0, 0, 0, 0.7)",
          html: '<p class="custom-text">تم بنجاح وسيتم التواصل معك قريبا!</p>',
          icon: "success",
          confirmButtonText: "حسنا",
          allowOutsideClick: false,
          customClass: {
            popup: "custom-popup",
            confirmButton: "custom-btn",
          },
        }).then((result) => {
          if (result.isConfirmed) {
            setSelectedPackage(null);
          }
        });
        resetForm();
      } else {
        toast.error("حدث خطأ غير متوقع!");
      }
    } catch (error) {
      toast.error("حدث خطأ غير متوقع!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const countryOptions = countryCodes.map((c) => ({
    value: c.dial_code,
    label: (
      <div className="flex items-center gap-2" key={c}>
        <div className="w-7 h-4 flex justify-center items-center border border-gray-200 shadow-[0_2px_6px_rgba(0,0,0,0.08)] transform -skew-x-12 rounded-sm overflow-hidden">
          <img
            src={`https://flagsapi.com/${c.code}/flat/32.png`}
            alt={c.name}
            className="w-full h-full object-cover"
          />
        </div>

        <span className="font-medium">{c.name}</span>
        <span dir="ltr" className="text-gray-500">
          {c.dial_code}
        </span>
      </div>
    ),
    name: c.name,
    code: c.code,
  }));

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      minWidth: "100px",
      borderRadius: "0.5rem",
      backgroundColor: "rgba(243,243,243,1)",
      paddingLeft: "0.5rem",
      paddingRight: "0.5rem",
      cursor: "pointer",
      border: "none",
      boxShadow: state.isFocused ? "0 0 0 3px rgba(205,233,78,0.45)" : "none",
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 50,
      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
      maxHeight: "210px",
      overflow: "auto",
      borderRadius: "0.5rem",
    }),
    menuList: (provided) => ({
      ...provided,
      maxHeight: "210px",
      overflow: "auto",
      padding: "5px",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "rgba(205,233,78,0.2)" : "white",
      color: "black",
      cursor: "pointer",
      borderRadius: "0.5rem",
    }),
  };

  const SingleValue = ({ children, ...props }) => {
    if (!props.getValue().length) {
      return (
        <span className="text-gray-400">{props.selectProps.placeholder}</span>
      );
    }
    return (
      <components.SingleValue {...props}>{children}</components.SingleValue>
    );
  };

  return (
    <div className="relative min-h-screen">
      <div className="relative z-10 pt-8 pb-9 lg:pt-18 lg:pb-28 flex items-center">
        <Container>
          <div className="relative w-full xl:w-[85%] mx-auto">
            <div className="relative bg-white rounded-3xl p-8 z-10 w-full shadow-2xl">
              <MotionDiv variant="slideXLeft">
                <h2 className="font-semibold text-xl mb-1.5">
                  بيانات الاشتراك
                </h2>
                <p
                  className="font-medium text-sm mb-6"
                  style={{ color: "rgba(102, 102, 102, 1)" }}
                >
                  برجاء إدخال البيانات بدقة لنتواصل معك
                </p>
              </MotionDiv>

              <div className="flex gap-8 lg:flex-row flex-col">
                <MotionDiv variant="fade">
                  <div className="relative">
                    {pkg.is_special ? (
                      <Ribbon
                        selectedMonth={selectedMonth}
                        before1={pkg.one_month_price_before_discount}
                        after1={pkg.one_month_price_after_discount}
                        before6={pkg.six_month_price_before_discount}
                        after6={pkg.six_month_price_after_discount}
                        before12={pkg.twelve_month_price_before_discount}
                        after12={pkg.twelve_month_price_after_discount}
                      />
                    ) : (
                      ""
                    )}
                    <div
                      className={`text-white px-6 ${
                        pkg.is_special ? "pt-18 pb-24" : "pt-6 pb-10"
                      } xs:pt-6 xs:pb-10 rounded-3xl min-h-full relative overflow-hidden w-full`}
                      style={{ background: "rgba(26, 26, 26, 1)" }}
                    >
                      <img
                        src="/images/serv-5.png"
                        alt="light"
                        className="absolute w-400 -top-30 -right-30"
                      />
                      <img
                        src="/images/hero-left-ellipse.png"
                        alt="light"
                        className="absolute w-400 -bottom-30 -left-30"
                      />

                      <h2 className="text-2xl font-semibold mb-3">
                        {pkg.name}
                      </h2>
                      <p
                        className={`mb-8 ${
                          pkg.is_special ? "max-w-[85%]" : ""
                        }`}
                        style={{
                          color: "rgba(230, 230, 230, 1)",
                        }}
                      >
                        {pkg.short_description}
                      </p>

                      {pkg.descriptions.length !== 0 && (
                        <ul className="space-y-3 pl-2 mb-8">
                          {pkg.descriptions.map((desc, idx) => (
                            <li key={idx} className="flex gap-2 items-start">
                              <div
                                className="w-5 h-5 rounded-full shrink-0 flex justify-center items-center mt-0.5"
                                style={{
                                  backgroundColor: "var(--color-primary)",
                                  color: "white",
                                }}
                              >
                                <IoMdCheckmark />
                              </div>
                              <span className="font-medium">{desc}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      <p
                        className="font-semibold mb-3 pt-7"
                        style={{
                          borderTop: "1px solid rgba(153, 153, 153, 1)",
                        }}
                      >
                        مدة الاشتراك:{" "}
                        {selectedMonth === 1
                          ? "شهر"
                          : selectedMonth === 6
                          ? "6 شهور"
                          : "12 شهر"}
                      </p>

                      <div className="flex xs:items-center xs:gap-1 flex-col xs:flex-row">
                        <p className="font-bold text-2xl">
                          {prices.after} جنيه
                        </p>
                        {!usdRate ? (
                          ""
                        ) : (
                          <div className="xs:mt-1 flex items-center gap-1 font-semibold text-xl ">
                            <span>=</span>
                            <span>{convertToUSD(prices.after)} دولار</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </MotionDiv>

                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-4 flex-1 min-w-[55%]"
                >
                  <MotionDiv
                    variant="scaleFade"
                    overrideProps={{
                      viewport: { once: false },
                    }}
                  >
                    <div className="w-full">
                      <label className="block mb-1.5 text-sm font-semibold">
                        الاسم بالكامل
                        <span className="text-red-500 mr-0.5">*</span>
                      </label>

                      <div className="relative">
                        <FiUser
                          size={18}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                        />
                        <input
                          type="text"
                          placeholder="الاسم بالكامل"
                          value={fullname}
                          onChange={(e) => {
                            let val = e.target.value.replace(/[0-9]/g, "");
                            if (val.length > 30) val = val.slice(0, 30);
                            setFullname(val);
                          }}
                          required
                          minLength={8}
                          disabled={loading}
                          className="w-full text-right pr-10 pl-3 py-2.5 rounded-lg outline-none placeholder:text-gray-400 disabled:opacity-60 transition-all duration-200 focus:shadow-[0_0_0_3px_rgba(205,233,78,0.45)] focus:bg-gray-50"
                          style={{ background: "rgba(243, 243, 243, 1)" }}
                        />
                      </div>
                    </div>
                  </MotionDiv>

                  <MotionDiv
                    variant="scaleFade"
                    overrideProps={{
                      viewport: { once: false },
                    }}
                  >
                    <div className="flex gap-3 items-start flex-col sm:flex-row sm:pt-0 pt-2.5 border-gray-300 border-t-2 border-dotted sm:border-none">
                      <div className="sm:w-[45%] flex flex-col w-full">
                        <label className="block mb-1.5 text-sm font-semibold text-right">
                          البلد <span className="text-red-500 mr-0.5">*</span>
                        </label>
                        <div data-lenis-prevent>
                          <Select
                            value={
                              whatsappCode
                                ? countryOptions.find(
                                    (o) => o.value === whatsappCode
                                  )
                                : null
                            }
                            onChange={(option) => {
                              setWhatsappCode(option.value);
                              setTimeout(() => {
                                whatsappInputRef.current?.focus();
                              }, 0);
                            }}
                            options={countryOptions}
                            placeholder="البلد"
                            styles={customStyles}
                            menuPosition="fixed"
                            menuPlacement="auto"
                            isSearchable={false}
                            components={{ SingleValue }}
                          />
                        </div>
                      </div>

                      <div className="w-full sm:w-[55%] flex flex-col">
                        <label className="block mb-1.5 text-sm font-semibold text-right">
                          رقم الواتساب
                          <span className="text-red-500 mr-0.5">*</span>
                        </label>
                        <div className="relative h-full">
                          <FaWhatsapp
                            size={18}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                          />

                          {whatsappCode && (
                            <span
                              className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-600 bg-gray-200 px-2 py-0.5 rounded-md"
                              dir="ltr"
                            >
                              {whatsappCode}
                            </span>
                          )}

                          <input
                            ref={whatsappInputRef}
                            type="text"
                            placeholder="رقم الواتساب"
                            value={whatsappNumber}
                            onChange={(e) =>
                              handleNumberInput(
                                e.target.value,
                                setWhatsappNumber,
                                whatsappCode === "+20" ? 10 : 15
                              )
                            }
                            required
                            disabled={!whatsappCode || loading}
                            className="disabled:cursor-not-allowed w-full text-right pr-10 pl-14 py-2.5 rounded-lg outline-none bg-gray-100 placeholder:text-gray-400 disabled:opacity-60 transition-all duration-200 focus:shadow-[0_0_0_3px_rgba(205,233,78,0.45)] focus:bg-gray-50 h-full"
                          />
                        </div>
                      </div>
                    </div>
                  </MotionDiv>

                  <MotionDiv
                    variant="scaleFade"
                    overrideProps={{
                      viewport: { once: false },
                    }}
                  >
                    <div className="flex gap-3 items-start flex-col sm:flex-row sm:pt-0 pt-2.5 border-gray-300 border-t-2 border-dotted sm:border-none">
                      <div className="sm:w-[45%] flex flex-col w-full">
                        <label className="block mb-1.5 text-sm font-semibold text-right">
                          البلد <span className="text-red-500 mr-0.5">*</span>
                        </label>
                        <div data-lenis-prevent>
                          <Select
                            value={
                              callsCode
                                ? countryOptions.find(
                                    (o) => o.value === callsCode
                                  )
                                : null
                            }
                            onChange={(option) => {
                              setCallsCode(option.value);
                              setTimeout(() => {
                                callsInputRef.current?.focus();
                              }, 0);
                            }}
                            options={countryOptions}
                            placeholder="البلد"
                            styles={customStyles}
                            menuPosition="fixed"
                            menuPlacement="auto"
                            isSearchable={false}
                            components={{ SingleValue }}
                          />
                        </div>
                      </div>

                      <div className="w-full sm:w-[55%] flex flex-col">
                        <label className="block mb-1.5 text-sm font-semibold text-right">
                          رقم المكالمات
                          <span className="text-red-500 mr-0.5">*</span>
                        </label>
                        <div className="relative h-full">
                          <CiMobile1
                            size={18}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                          />

                          {callsCode && (
                            <span
                              className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-600 bg-gray-200 px-2 py-0.5 rounded-md"
                              dir="ltr"
                            >
                              {callsCode}
                            </span>
                          )}

                          <input
                            ref={callsInputRef}
                            type="text"
                            placeholder="رقم المكالمات"
                            value={callsNumber}
                            onChange={(e) =>
                              handleNumberInput(
                                e.target.value,
                                setCallsNumber,
                                callsCode === "+20" ? 10 : 15
                              )
                            }
                            required
                            disabled={!callsCode || loading}
                            className="disabled:cursor-not-allowed w-full text-right pr-10 pl-14 py-2.5 rounded-lg outline-none bg-gray-100 placeholder:text-gray-400 disabled:opacity-60 transition-all duration-200 focus:shadow-[0_0_0_3px_rgba(205,233,78,0.45)] focus:bg-gray-50 h-full"
                          />
                        </div>
                      </div>
                    </div>
                  </MotionDiv>

                  <MotionDiv
                    variant="scaleFade"
                    overrideProps={{
                      viewport: { once: false },
                    }}
                  >
                    <div className="w-full sm:pt-0 pt-2.5 border-gray-300 border-t-2 border-dotted sm:border-none">
                      <label className="block mb-1.5 text-sm font-semibold">
                        البريد الإلكتروني
                        <span className="text-gray-400 font-normal text-xs mr-0.5">
                          (اختياري)
                        </span>
                      </label>

                      <div className="relative">
                        <CiMail
                          size={18}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                        />
                        <input
                          type="email"
                          placeholder="البريد الإلكتروني"
                          value={email}
                          onChange={(e) =>
                            setEmail(e.target.value.slice(0, 50))
                          }
                          disabled={loading}
                          className="w-full text-right pr-10 pl-3 py-2.5 rounded-lg outline-none placeholder:text-gray-400 disabled:opacity-60 transition-all duration-200 focus:shadow-[0_0_0_3px_rgba(205,233,78,0.45)] focus:bg-gray-50"
                          style={{ background: "rgba(243, 243, 243, 1)" }}
                        />
                      </div>
                    </div>
                  </MotionDiv>

                  <MotionDiv
                    variant="scaleFade"
                    overrideProps={{
                      viewport: { once: false },
                    }}
                  >
                    <button
                      type="submit"
                      disabled={loading}
                      className={`mt-8 mb-3 w-full py-4 rounded-2xl text-lg font-bold transition duration-200 ${
                        loading
                          ? "bg-gray-400 cursor-not-allowed text-white"
                          : "bg-black text-white cursor-pointer"
                      }`}
                    >
                      {loading ? "جاري الإرسال ..." : "إتمام طلب الاشتراك"}
                    </button>

                    <p className="text-center text-sm">
                      نحن نحترم خصوصيتك، بياناتك في أمان تام.
                    </p>
                  </MotionDiv>
                </form>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
