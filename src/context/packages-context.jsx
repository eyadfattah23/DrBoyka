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
          console.log("Packages:", data);
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
      name: "باقة القوة الأساسية",
      short_description:
        "برنامج تدريبي متكامل للمبتدئين يركز على بناء العضلات.",
      descriptions: [
        "جدول غذائي مرن لـ باقة القوة الأساسية",
        "متابعة أسبوعية للنتائج لـ باقة القوة الأساسية",
        "فيديوهات تعليمية للتمارين لـ باقة القوة الأساسية",
      ],
      one_month_price_before_discount: "500.00",
      one_month_price_after_discount: "400.00",
      six_month_price_before_discount: "2500.00",
      six_month_price_after_discount: "2000.00",
      twelve_month_price_before_discount: "4500.00",
      twelve_month_price_after_discount: "3500.00",
      is_active: true,
      updated_at: "2025-12-23T20:53:08.278586+02:00",
      is_special: false,
    },

    {
      id: 3,
      name: "باقة التحول السريع",
      short_description:
        "برنامج مكثف لحرق الدهون وإعادة تشكيل الجسم في وقت قياسي.",
      descriptions: [
        "خطة كارديو مخصصة لحرق الدهون",
        "نظام غذائي عالي البروتين",
        "متابعة يومية عبر واتساب",
        "تعديلات أسبوعية على الخطة حسب التقدم",
      ],
      one_month_price_before_discount: "700.00",
      one_month_price_after_discount: "550.00",
      six_month_price_before_discount: "3600.00",
      six_month_price_after_discount: "3000.00",
      twelve_month_price_before_discount: "6500.00",
      twelve_month_price_after_discount: "5200.00",
      is_active: true,
      updated_at: "2025-12-24T18:20:11.112233+02:00",
      is_special: false,
    },
    {
      id: 5,
      name: "باقة الأداء الاحترافي",
      short_description:
        "برنامج متقدم للرياضيين يركز على القوة، التحمل، وتحسين الأداء.",
      descriptions: [
        "خطة تدريب متقدمة مبنية على الأداء",
        "تحليل مستوى القوة والتحمل",
        "جدول تغذية مخصص حسب الهدف",
        "متابعة مباشرة مع الكابتن",
        "فيديوهات احترافية لشرح التمارين",
      ],
      one_month_price_before_discount: "900.00",
      one_month_price_after_discount: "750.00",
      six_month_price_before_discount: "4800.00",
      six_month_price_after_discount: "4000.00",
      twelve_month_price_before_discount: "8500.00",
      twelve_month_price_after_discount: "7000.00",
      is_active: true,
      updated_at: "2025-12-26T14:45:32.445566+02:00",
      is_special: true,
    },
    {
      id: 4,
      name: "باقة التحول السريع",
      short_description:
        "برنامج مكثف لحرق الدهون وإعادة تشكيل الجسم في وقت قياسي.",
      descriptions: [
        "خطة كارديو مخصصة لحرق الدهون",
        "نظام غذائي عالي البروتين",
        "متابعة يومية عبر واتساب",
        "تعديلات أسبوعية على الخطة حسب التقدم",
      ],
      one_month_price_before_discount: "700.00",
      one_month_price_after_discount: "550.00",
      six_month_price_before_discount: "3600.00",
      six_month_price_after_discount: "3000.00",
      twelve_month_price_before_discount: "6500.00",
      twelve_month_price_after_discount: "5200.00",
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
