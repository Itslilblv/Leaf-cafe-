'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Clock, Coffee, Leaf, ArrowRight, Instagram, Twitter } from 'lucide-react'

// --- بيانات المنيو ---
const menuItems = [
  {
    id: 'v60',
    title: 'V60',
    titleAr: 'في 60',
    description: 'Specialty coffee brewed with precision for a clean, tea-like finish.',
    descriptionAr: 'قهوة مختصة محضرة بعناية لتعطيك إيحاءات صافية ومميزة.',
    price: '18 SAR',
    image: 'https://images.unsplash.com/photo-1544787210-2827448b303c?q=80&w=500&auto=format&fit=crop'
  },
  {
    id: 'latte',
    title: 'Spanish Latte',
    titleAr: 'سبانش لاتيه',
    description: 'Perfect balance of rich espresso and sweet creamy milk.',
    descriptionAr: 'توازن مثالي بين الإسبريسو القوي والحليب المحلى الكريمي.',
    price: '22 SAR',
    image: 'https://images.unsplash.com/photo-1541167760496-162955ed8a9f?q=80&w=500&auto=format&fit=crop'
  },
  {
    id: 'coldbrew',
    title: 'Cold Brew',
    titleAr: 'كولد برو',
    description: 'Slow-steeped for 24 hours to ensure maximum smoothness.',
    descriptionAr: 'منقوعة ببطء لمدة 24 ساعة لضمان سلاسة الطعم والنكهة.',
    price: '20 SAR',
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=500&auto=format&fit=crop'
  }
]

export default function LeafCafeWebsite() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  // تأثير لضمان تشغيل الفيديو
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => console.log("Autoplay blocked"))
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#0a0c0a] text-white font-sans selection:bg-emerald-500/30" dir="rtl">
      
      {/* 1. Hero Section with Video Background */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* هنا نضع رابط الفيديو الذي ولدته، سأضع رابطاً تجريبياً الآن */}
          <video
            ref={videoRef}
            src="https://assets.mixkit.co/videos/preview/mixkit-pouring-hot-coffee-into-a-cup-32882-large.mp4"
            className="w-full h-full object-cover scale-105"
            muted
            loop
            playsInline
            onLoadedData={() => setIsVideoLoaded(true)}
          />
          <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0c0a]" />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center px-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 backdrop-blur-md"
          >
            <Leaf className="w-4 h-4 text-emerald-400" />
            <span className="text-emerald-300 text-sm font-medium tracking-widest uppercase">Specialty Coffee</span>
          </motion.div>
          
          <h1 className="text-7xl md:text-9xl font-bold mb-4 tracking-tighter bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">
            LEAF
          </h1>
          <p className="text-xl md:text-3xl font-light text-emerald-50/80 mb-10 max-w-2xl mx-auto leading-relaxed">
            حيث تلتقي الطبيعة بكل رشفة. تجربة القهوة المختصة في قلب بحرة.
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full font-bold transition-all transform hover:scale-105 flex items-center justify-center gap-2">
              <Coffee className="w-5 h-5" />
              تصفح القائمة
            </button>
            <button className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-full font-bold transition-all flex items-center justify-center gap-2">
              <MapPin className="w-5 h-5" />
              موقعنا
            </button>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 opacity-50"
        >
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-white rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* 2. Menu Section (Interactive Cards) */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-16">
          <div>
            <h2 className="text-4xl md:text-6xl font-bold mb-4">قائمة ليف</h2>
            <div className="h-1 w-24 bg-emerald-500 rounded-full" />
          </div>
          <p className="text-gray-400 max-w-md text-left hidden md:block">
            نختار محاصيلنا بعناية من أجود مزارع القهوة حول العالم لنقدم لك كوباً لا يُنسى.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {menuItems.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ y: -10 }}
              onHoverStart={() => setActiveMenu(item.id)}
              onHoverEnd={() => setActiveMenu(null)}
              className="group relative overflow-hidden rounded-[2rem] bg-[#151815] border border-white/5 p-4 transition-all hover:border-emerald-500/50"
            >
              <div className="relative h-64 w-full overflow-hidden rounded-[1.5rem] mb-6">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 px-4 py-1 bg-black/60 backdrop-blur-md rounded-full text-emerald-400 font-bold">
                  {item.price}
                </div>
              </div>
              
              <div className="px-2">
                <h3 className="text-2xl font-bold mb-1">{item.titleAr}</h3>
                <p className="text-emerald-500 text-sm mb-4 font-mono">{item.title}</p>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  {item.descriptionAr}
                </p>
                <button className="w-full py-3 rounded-xl bg-white/5 group-hover:bg-emerald-600 transition-colors flex items-center justify-center gap-2">
                  تفاصيل النكهة <ArrowRight className="w-4 h-4 rotate-180" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. Visit Us Section (Glassmorphism Map) */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h2 className="text-5xl font-bold leading-tight">ننتظرك في <span className="text-emerald-500">بحرة</span></h2>
            <p className="text-gray-400 text-lg">
              زرنا اليوم واستمتع بأجواء هادئة ومثالية للعمل أو الاسترخاء.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-500">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-xl">ساعات العمل</h4>
                  <p className="text-gray-400">يومياً: 6:00 ص - 12:00 م | 4:00 م - 12:00 ص</p>
                  <p className="text-gray-400 text-sm">الجمعة: 4:00 م - 1:00 ص</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-500">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-xl">الموقع</h4>
                  <p className="text-gray-400">مكة المكرمة، بحرة، حي بهرة القديمة</p>
                </div>
              </div>
            </div>
          </div>

          <div className="h-[400px] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl relative">
             {/* خريطة افتراضية - هنا يوضع رابط Iframe الحقيقي */}
            <div className="absolute inset-0 bg-emerald-900/20 flex items-center justify-center">
                <p className="text-emerald-400 animate-pulse font-mono tracking-tighter">MAP_INTERACTIVE_LAYER</p>
            </div>
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3714.000000000000!2d39.4!3d21.4!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjHCsDI0JzAwLjAiTiAzOcKwMjQnMDAuMCJF!5e0!3m2!1sar!2ssa!4v1620000000000!5m2!1sar!2ssa"
              className="w-full h-full filter grayscale contrast-125 opacity-60 hover:opacity-100 transition-opacity duration-500"
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </section>

      {/* 4. Footer */}
      <footer className="py-12 border-t border-white/5 text-center">
        <div className="flex justify-center gap-6 mb-8">
          <Instagram className="w-6 h-6 text-gray-500 hover:text-emerald-500 cursor-pointer transition-colors" />
          <Twitter className="w-6 h-6 text-gray-500 hover:text-emerald-500 cursor-pointer transition-colors" />
          <Coffee className="w-6 h-6 text-gray-500 hover:text-emerald-500 cursor-pointer transition-colors" />
        </div>
        <p className="text-gray-600 text-sm uppercase tracking-widest">
          &copy; 2026 Leaf Cafe. Designed with Passion.
        </p>
      </footer>

      {/* Custom Styles for Glassmorphism */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;700;900&display=swap');
        
        body {
          font-family: 'Cairo', sans-serif;
        }

        .hero-text-shadow {
          text-shadow: 0 0 20px rgba(16, 185, 129, 0.5);
        }
      `}</style>
    </div>
  )
}
