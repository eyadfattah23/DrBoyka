import os
import django
from decimal import Decimal
from django.core.files.base import ContentFile
import requests

# 1. Setup Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'drboyka.settings')
django.setup()

from packages.models import Package, PackageDescription, Subscription
from users.models import Transformation
def download_image(url):
    """Helper to download real images for the ImageFields"""
    try:
        response = requests.get(url, timeout=10)
        if response.status_code == 200:
            return ContentFile(response.content)
    except Exception as e:
        print(f"Could not download image: {e}")
    return None

def run_seed():
    print("--- جارٍ إدخال البيانات ---")

    # --- 1. SEED PACKAGES (الباقات) ---
    packages_data = [
        {
            "name": "باقة القوة الأساسية",
            "short_description": "برنامج تدريبي متكامل للمبتدئين يركز على بناء العضلات.",
            "prices": ["500.00", "400.00", "2500.00", "2000.00", "4500.00", "3500.00"]
        },
        {
            "name": "التدريب الشخصي النخبة",
            "short_description": "تواصل مباشر مع الكوتش 24/7 مع خطة تغذية مخصصة تماماً.",
            "prices": ["1200.00", "1000.00", "6000.00", "5000.00", "10000.00", "8500.00"]
        },
        {
            "name": "باقة التنشيف وحرق الدهون",
            "short_description": "خطة مكثفة لخسارة الوزن والحصول على جسم رياضي في وقت قياسي.",
            "prices": ["800.00", "650.00", "4000.00", "3200.00", "7000.00", "5500.00"]
        }
    ]

    created_packages = []
    for p in packages_data:
        pkg, _ = Package.objects.update_or_create(
            name=p["name"],
            defaults={
                "short_description": p["short_description"],
                "one_month_price_before_discount": Decimal(p["prices"][0]),
                "one_month_price_after_discount": Decimal(p["prices"][1]),
                "six_month_price_before_discount": Decimal(p["prices"][2]),
                "six_month_price_after_discount": Decimal(p["prices"][3]),
                "twelve_month_price_before_discount": Decimal(p["prices"][4]),
                "twelve_month_price_after_discount": Decimal(p["prices"][5]),
            }
        )
        created_packages.append(pkg)

    # --- 2. SEED PACKAGE DESCRIPTIONS (مميزات الباقات) ---
    features = ["جدول غذائي مرن", "متابعة أسبوعية للنتائج", "فيديوهات تعليمية للتمارين"]
    for pkg in created_packages:
        for feature in features:
            PackageDescription.objects.get_or_create(
                package=pkg,
                description=f"{feature} لـ {pkg.name}"
            )

    # --- 3. SEED SUBSCRIPTIONS (الاشتراكات) ---
    subscriptions_data = [
        {"name": "أحمد محمد", "email": "ahmed@example.com", "duration": "1_month"},
        {"name": "سارة علي", "email": "sara@example.com", "duration": "6_months"},
        {"name": "ياسين حسن", "email": "yassin@example.com", "duration": "12_months"},
    ]

    for i, sub in enumerate(subscriptions_data):
        target_pkg = created_packages[i]
        pricing = target_pkg.get_price(sub["duration"])
        
        Subscription.objects.update_or_create(
            email=sub["email"],
            defaults={
                "package": target_pkg,
                "duration": sub["duration"],
                "price_before_discount": pricing['before'],
                "price_after_discount": pricing['after'],
                "fullname": sub["name"],
                "whatsapp_phone_number": f"+20100000000{i}",
                "calls_phone_number": f"+20100000000{i}",
                "status": "active",
                "notes": "عميل مشترك من خلال سكربت البيانات."
            }
        )

    # --- 4. SEED TRANSFORMATIONS (قصص النجاح) ---
    # Using real URLs from Unsplash (High-quality fitness images)
    transformations_data = [
        {
            "name": "كابتن عمر", "duration": "3 أشهر", "order": 1,
            "before": "https://m.media-amazon.com/images/I/71GH3aYEljL._AC_SL1500_.jpg",
            "after": "https://m.media-amazon.com/images/I/71GH3aYEljL._AC_SL1500_.jpg"
        },
        {
            "name": "محمود س.", "duration": "6 أشهر", "order": 2,
            "before": "https://m.media-amazon.com/images/I/71GH3aYEljL._AC_SL1500_.jpg",
            "after": "https://m.media-amazon.com/images/I/71GH3aYEljL._AC_SL1500_.jpg"
        },
        {
            "name": "ليلى هـ.", "duration": "1 سنة", "order": 3,
            "before": "https://m.media-amazon.com/images/I/71GH3aYEljL._AC_SL1500_.jpg",
            "after": "https://m.media-amazon.com/images/I/71GH3aYEljL._AC_SL1500_.jpg"
        },
    ]

    for trans in transformations_data:
        obj, created = Transformation.objects.get_or_create(
            name=trans["name"],
            defaults={
                "duration": trans["duration"],
                "order": trans["order"],
                "is_active": True
            }
        )
        if created:
            # Download and save the images specifically for this record
            before_file = download_image(trans["before"])
            after_file = download_image(trans["after"])
            if before_file:
                obj.before_image.save(f"{trans['name']}_before.jpg", before_file, save=False)
            if after_file:
                obj.after_image.save(f"{trans['name']}_after.jpg", after_file, save=False)
            obj.save()

    print("--- تم الانتهاء من إدخال كافة البيانات بنجاح ---")

if __name__ == "__main__":
    run_seed()
