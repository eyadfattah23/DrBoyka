import { createContext, useContext, useEffect, useState } from "react";
import { BASE_URL } from "../config/api";

const PackagesContext = createContext(null);

export function PackagesProvider({ children }) {
  const [packagesIsLoading, setPackagesIsLoading] = useState(false);
  // const [packages, setPackages] = useState(null);
  const [errorFetchingPackages, setErrorFetchingPackages] = useState(false);

  /*useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPackagesIsLoading(true);
    setErrorFetchingPackages(false);

    {
      fetch(`${BASE_URL}/api/packages`)
        .then((res) => {
          if (!res.ok) throw new Error();
          return res.json();
        })
        .then((data) => {
          setPackages(data);
        })
        .catch(() => {
          setErrorFetchingPackages(true);
        })
        .finally(() => {
          setPackagesIsLoading(false);
        });
    }
  }, []);*/

  const packages = [
    {
      id: 2,
      name: "باقة الانطلاقة القوية",
      short_description:
        "برنامج مثالي للمبتدئين يساعدك على بناء العضلات واكتساب القوة بشكل تدريجي وآمن.",
      descriptions: [
        "خطة تدريب مخصصة حسب مستواك",
        "نظام غذائي مرن وسهل الالتزام",
        "متابعة أسبوعية لتقييم التقدم",
        "فيديوهات تعليمية لشرح التمارين",
      ],
      one_month_price_before_discount: "500",
      one_month_price_after_discount: "400",
      three_month_price_before_discount: "1200",
      three_month_price_after_discount: "1000",
      six_month_price_before_discount: "2200",
      six_month_price_after_discount: "1800",
      twelve_month_price_before_discount: "4000",
      twelve_month_price_after_discount: "3200",
      is_active: true,
      updated_at: "2025-12-23T20:53:08.278586+02:00",
      is_special: false,
    },

    {
      id: 3,
      name: "باقة التحول السريع",
      short_description:
        "برنامج مكثف لحرق الدهون ونحت الجسم في أسرع وقت ممكن بنتائج ملحوظة.",
      descriptions: [
        "خطة كارديو متقدمة لحرق الدهون",
        "نظام غذائي عالي البروتين",
        "متابعة يومية عبر واتساب",
        "تعديلات مستمرة حسب تطور مستواك",
      ],
      one_month_price_before_discount: "700",
      one_month_price_after_discount: "550",
      three_month_price_before_discount: "1800",
      three_month_price_after_discount: "1500",
      six_month_price_before_discount: "3200",
      six_month_price_after_discount: "2700",
      twelve_month_price_before_discount: "6000",
      twelve_month_price_after_discount: "5000",
      is_active: true,
      updated_at: "2025-12-24T18:20:11.112233+02:00",
      is_special: true,
    },

    {
      id: 5,
      name: "باقة الأداء الاحترافي",
      short_description:
        "برنامج متقدم للرياضيين يركز على القوة، التحمل، وتحقيق أفضل أداء بدني ممكن.",
      descriptions: [
        "برنامج تدريبي مبني على أهدافك الرياضية",
        "تحليل شامل لمستوى القوة والتحمل",
        "نظام تغذية احترافي مخصص",
      ],
      one_month_price_before_discount: "900",
      one_month_price_after_discount: "750",
      three_month_price_before_discount: "2400",
      three_month_price_after_discount: "2000",
      six_month_price_before_discount: "4200",
      six_month_price_after_discount: "3600",
      twelve_month_price_before_discount: "8000",
      twelve_month_price_after_discount: "6800",
      is_active: true,
      updated_at: "2025-12-26T14:45:32.445566+02:00",
      is_special: false,
    },

    {
      id: 4,
      name: "باقة التنشيف الذكي",
      short_description:
        "برنامج متوازن للتنشيف وخسارة الدهون مع الحفاظ على الكتلة العضلية.",
      descriptions: [
        "تمارين مخصصة لحرق الدهون",
        "نظام غذائي محسوب السعرات",
        "متابعة أسبوعية للتقدم",
        "تعديلات مستمرة حسب النتائج",
      ],
      one_month_price_before_discount: "650",
      one_month_price_after_discount: "500",
      three_month_price_before_discount: "1600",
      three_month_price_after_discount: "1300",
      six_month_price_before_discount: "3000",
      six_month_price_after_discount: "2500",
      twelve_month_price_before_discount: "5600",
      twelve_month_price_after_discount: "4600",
      is_active: true,
      updated_at: "2025-12-24T18:20:11.112233+02:00",
      is_special: false,
    },
  ];

  return (
    <PackagesContext.Provider
      value={{
        packagesIsLoading,
        packages,
        errorFetchingPackages,
      }}
    >
      {children}
    </PackagesContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function usePackages() {
  const context = useContext(PackagesContext);

  if (!context) {
    throw new Error("usePackages must be used inside PackagesProvider");
  }

  return context;
}
