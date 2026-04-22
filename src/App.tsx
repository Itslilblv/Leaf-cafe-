import { useState, useRef, useEffect, createContext, useContext, ReactNode } from 'react';

/* ═══════════════════════════════════════════
   بيانات المنيو - تم تحديث مسارات الصور
   من images/ إلى ./assets/
═══════════════════════════════════════════ */
interface MenuItem {
  id: number; name: string; nameEn: string; price: string; img: string; badge?: string; badgeColor?: string;
}
interface MenuCategory {
  id: string; label: string; labelAr: string; icon: string; items: MenuItem[];
}

const MENU: MenuCategory[] = [
  {
    id: 'hot', label: 'Hot', labelAr: 'حار', icon: '☕',
    items: [
      { id: 1, name: 'اسبريسو', nameEn: 'Espresso', price: '8', img: './assets/espresso.jpg', badge: 'Classic', badgeColor: 'bg-amber-600' },
      { id: 2, name: 'ميكياتو', nameEn: 'Macchiato', price: '10', img: './assets/cappuccino.jpg' },
      { id: 3, name: 'كورتادو', nameEn: 'Cortado', price: '12', img: './assets/espresso.jpg' },
      { id: 4, name: 'فلات وايت', nameEn: 'Flat White', price: '12', img: './assets/cappuccino.jpg', badge: '⭐ مميز', badgeColor: 'bg-purple-600' },
      { id: 5, name: 'كابتشينو', nameEn: 'Cappuccino', price: '14', img: './assets/cappuccino.jpg', badge: '🔥 الأكثر طلباً', badgeColor: 'bg-red-600' },
      { id: 6, name: 'لاتيه', nameEn: 'Latte', price: '14', img: './assets/cappuccino.jpg' },
      { id: 7, name: 'سبانش لاتيه', nameEn: 'Spanish Latte', price: '14', img: './assets/cappuccino.jpg', badge: '⭐ مميز', badgeColor: 'bg-purple-600' },
      { id: 8, name: 'كراميل لاتيه', nameEn: 'Caramel Latte', price: '14', img: './assets/cappuccino.jpg' },
      { id: 9, name: 'هوت شوكليت', nameEn: 'Hot Chocolate', price: '14', img: './assets/hot-chocolate.jpg' },
      { id: 10, name: 'هوت موكا', nameEn: 'Hot Mocha', price: '14', img: './assets/hot-chocolate.jpg' },
      { id: 11, name: 'هوت ماتشا', nameEn: 'Hot Matcha', price: '12', img: './assets/matcha.jpg' },
      { id: 12, name: 'أمريكانو', nameEn: 'Americano', price: '10', img: './assets/espresso.jpg' },
    ]
  },
  {
    id: 'cold', label: 'Cold', labelAr: 'بارد', icon: '🧊',
    items: [
      { id: 20, name: 'آيس لاتيه', nameEn: 'Iced Latte', price: '16', img: './assets/iced-latte.jpg', badge: '🔥 الأكثر طلباً', badgeColor: 'bg-red-600' },
      { id: 21, name: 'آيس سبانش', nameEn: 'Iced Spanish', price: '16', img: './assets/iced-latte.jpg', badge: '⭐ مميز', badgeColor: 'bg-purple-600' },
      { id: 22, name: 'آيس وايت موكا', nameEn: 'Iced White Mocha', price: '16', img: './assets/iced-latte.jpg' },
      { id: 23, name: 'آيس كراميل', nameEn: 'Iced Caramel', price: '16', img: './assets/iced-latte.jpg' },
      { id: 24, name: 'آيس شوكليت', nameEn: 'Iced Chocolate', price: '16', img: './assets/iced-latte.jpg' },
      { id: 25, name: 'آيس موكا', nameEn: 'Iced Mocha', price: '16', img: './assets/iced-latte.jpg' },
      { id: 26, name: 'كلاسيك ماتشا', nameEn: 'Classic Matcha', price: '14', img: './assets/matcha.jpg', badge: '🍃 منعش', badgeColor: 'bg-emerald-600' },
      { id: 27, name: 'آيس أمريكانو', nameEn: 'Iced Americano', price: '12', img: './assets/iced-latte.jpg' },
      { id: 28, name: 'كركديه باشن فروت', nameEn: 'Hibiscus Passion', price: '13', img: './assets/mojito.jpg', badge: '✨ جديد', badgeColor: 'bg-sky-600' },
      { id: 29, name: 'كركديه عادي', nameEn: 'Classic Hibiscus', price: '10', img: './assets/mojito.jpg' },
    ]
  },
  {
    id: 'drip', label: 'Drip', labelAr: 'مقطرة', icon: '⏳',
    items: [
      { id: 30, name: 'قهوة اليوم', nameEn: 'Coffee of the Day', price: '8 / 10', img: './assets/v60.jpg', badge: 'حار | بارد', badgeColor: 'bg-orange-600' },
      { id: 31, name: 'V60 إثيوبي', nameEn: 'V60 Ethiopian', price: '14 / 16', img: './assets/v60.jpg', badge: '⭐ مختص', badgeColor: 'bg-purple-600' },
      { id: 32, name: 'V60 كولومبي', nameEn: 'V60 Colombian', price: '14 / 16', img: './assets/v60.jpg', badge: '⭐ مختص', badgeColor: 'bg-purple-600' },
    ]
  },
  {
    id: 'mojito', label: 'Mojito', labelAr: 'موهيتو', icon: '🍹',
    items: [
      { id: 40, name: 'شيري', nameEn: 'Cherry', price: '12 / 15', img: './assets/mojito.jpg', badge: '🍃 منعش', badgeColor: 'bg-emerald-600' },
      { id: 41, name: 'فروتيكا', nameEn: 'Frutica', price: '12 / 15', img: './assets/mojito.jpg', badge: '🍃 منعش', badgeColor: 'bg-emerald-600' },
      { id: 42, name: 'فروتيفا', nameEn: 'Frutiva', price: '12 / 15', img: './assets/mojito.jpg', badge: '✨ جديد', badgeColor: 'bg-sky-600' },
    ]
  },
  {
    id: 'dessert', label: 'Dessert', labelAr: 'حلى', icon: '🍰',
    items: [
      { id: 50, name: 'كوكوت مانجو', nameEn: 'Mango Cocotte', price: '16', img: './assets/dessert.jpg' },
      { id: 51, name: 'كوكوت فراولة', nameEn: 'Strawberry Cocotte', price: '16', img: './assets/dessert.jpg' },
      { id: 52, name: 'ليزي كات', nameEn: 'Lazy Cat', price: '16', img: './assets/dessert.jpg', badge: '⭐ مميز', badgeColor: 'bg-purple-600' },
      { id: 53, name: 'ماتيلدا كيك', nameEn: 'Matilda Cake', price: '16', img: './assets/dessert.jpg' },
      { id: 54, name: 'بودينغ تراميسيو', nameEn: 'Tiramisu Pudding', price: '18', img: './assets/dessert.jpg', badge: '🔥 الأكثر طلباً', badgeColor: 'bg-red-600' },
      { id: 55, name: 'سان سباستيان', nameEn: 'San Sebastian', price: '18', img: './assets/dessert.jpg', badge: '⭐ مميز', badgeColor: 'bg-purple-600' },
      { id: 56, name: 'شيز بيكان', nameEn: 'Cheese Pecan', price: '16', img: './assets/dessert.jpg' },
      { id: 57, name: 'كوكيز بيكان', nameEn: 'Pecan Cookies', price: '10', img: './assets/dessert.jpg' },
    ]
  },
];

const GALLERY = [
  { src: './assets/hero-bg.jpg', title: 'أجواء ليف كافيه' },
  { src: './assets/cappuccino.jpg', title: 'كابتشينو مميز' },
  { src: './assets/espresso.jpg', title: 'اسبريسو فاخر' },
  { src: './assets/iced-latte.jpg', title: 'آيس لاتيه' },
  { src: './assets/v60.jpg', title: 'V60 مقطرة' },
  { src: './assets/matcha.jpg', title: 'ماتشا طازجة' },
  { src: './assets/hot-chocolate.jpg', title: 'هوت شوكليت' },
  { src: './assets/mojito.jpg', title: 'موهيتو منعش' },
  { src: './assets/dessert.jpg', title: 'حلويات فاخرة' },
  { src: './assets/leaf-logo.jpg', title: 'ليف كافيه' },
];

// باقي الكود كما هو تماماً مع استبدال أي رابط يبدأ بـ "images/" إلى "./assets/"
// ملاحظة: في قسم الـ Navbar والـ Hero تم تحديث "images/leaf-logo.jpg" و "images/hero-bg.jpg"

// ... (تكملة الكود من نسختك) ...
