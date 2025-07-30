'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';''
import { useEffect, useState } from 'react';


export default function LandingPage() {
 
   
      
        // --- New Responsive Header ---
const [isMenuOpen, setIsMenuOpen] = useState(false);
const [isHeaderVisible, setIsHeaderVisible] = useState(true);

useEffect(() => {
  let lastScrollY = window.scrollY;

  const handleScroll = () => {
    if (window.scrollY > lastScrollY && window.scrollY > 100) {
      // Scrolling down past 100px
      setIsHeaderVisible(false);
    } else {
      // Scrolling up
      setIsHeaderVisible(true);
    }
    lastScrollY = window.scrollY;
  };

  window.addEventListener('scroll', handleScroll);
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
}, []);
return (
  <div className="bg-white text-gray-800 overflow-x-hidden">
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${isHeaderVisible ? '' : 'header-hidden'}`}
    >
      <div className="container mx-auto px-4 sm:px-6 py-3 my-2 rounded-xl bg-white shadow-lg border border-gray-200">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-600">CreatorVerse</h1>

          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-8 items-center">
            <a href="#" className="text-gray-700 font-medium hover:text-indigo-600">Home</a>
            <a href="#features" className="text-gray-700 font-medium hover:text-indigo-600">Features</a>
            <a href="#testimonials" className="text-gray-700 font-medium hover:text-indigo-600">Testimonials</a>
            <a href="#pricing" className="text-gray-700 font-medium hover:text-indigo-600">Pricing</a>
          </nav>

          {/* Desktop Login/Signup */}
          <div className="hidden md:flex items-center space-x-2">
           <motion.div whileTap={{ scale: 0.95 }}>
  <Link href="/login" className="px-4 py-2 text-gray-700 font-semibold">
    Login
  </Link>
</motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/login" className="px-4 py-2 bg-indigo-600 text-white rounded-full font-semibold">
                Get Started
              </Link>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden mt-2 mx-4 rounded-lg bg-white shadow-xl border border-gray-200"
        >
          <nav className="flex flex-col items-center space-y-4 py-4">
            <a href="#" className="text-gray-800 hover:text-indigo-600" onClick={() => setIsMenuOpen(false)}>Home</a>
            <a href="#features" className="text-gray-800 hover:text-indigo-600" onClick={() => setIsMenuOpen(false)}>Features</a>
            <a href="#testimonials" className="text-gray-800 hover:text-indigo-600" onClick={() => setIsMenuOpen(false)}>Testimonials</a>
            <a href="#pricing" className="text-gray-800 hover:text-indigo-600" onClick={() => setIsMenuOpen(false)}>Pricing</a>
            <div className="w-full px-4 pt-4 border-t border-gray-200 flex flex-col space-y-2">
              <Link href="/login" className="w-full text-center px-6 py-2 text-indigo-600 font-semibold border border-indigo-600 rounded-md">
                Login
              </Link>
              <Link href="/login" className="w-full text-center px-6 py-2 bg-indigo-600 text-white rounded-md font-semibold">
                Get Started
              </Link>
            </div>
          </nav>
        </motion.div>
      )}
    </header>

    {/* {\* Your existing main content (<section>, etc.) goes here */} 
      
      
      
      <main>
        {/* --- Hero Section --- */}
{/* --- Hero Section (with Gradient) --- */}

<section className="bg-gradient-to-br from-gray-900 via-slate-800 to-indigo-900 h-screen flex items-center justify-center text-white">
  {/* Content */}
  <div className="container mx-auto px-6 text-center">
    <motion.h1
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="text-4xl md:text-7xl font-extrabold tracking-tight"
    >
      The Operating System for Modern Creators
    </motion.h1>
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2, ease: "easeInOut" }}
      className="mt-4 text-lg md:text-xl text-gray-300 max-w-3xl mx-auto"
    >
      CreatorVerse is the all-in-one platform to manage your content, sell products, and grow your audience. Stop the chaos, start creating.
    </motion.p>
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgba(129, 140, 248, 0.4)" }}
      whileTap={{ scale: 0.95 }}
      className="mt-10 inline-block"
    >
      <Link href="/login" className="px-8 py-4 bg-indigo-600 text-white font-bold rounded-lg text-lg shadow-lg">
        Claim Your Username
      </Link>
    </motion.div>
  </div>
</section>
{/* --- Trusted By Section --- */}
{/* --- Trusted By Section (with real logos) --- */}
{/* --- Trusted By Section (with Color Logos) --- */}
<section className="bg-white py-12 sm:py-16">
  <div className="container mx-auto px-6">
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      <p className="text-center text-sm font-semibold text-gray-500 uppercase tracking-wider">
        The go-to platform for creators on
      </p>
      <div className="mt-8 flex justify-around items-center flex-wrap gap-x-12 gap-y-8">
        
        {/* YouTube Logo */}
        <div className="flex justify-center items-center transition-transform duration-300 hover:scale-110">
          <Image 
            src="/logos/youtube.svg" 
            alt="YouTube Logo"
            width={112} // 112px wide
            height={28} // 28px tall
            className="h-7 w-auto" // Control height, width will adjust
          />
        </div>
        
        {/* Instagram Logo */}
        <div className="flex justify-center items-center transition-transform duration-300 hover:scale-110">
          <Image 
            src="/logos/instagram.svg" 
            alt="Instagram Logo"
            width={104} // 104px wide
            height={30} // 30px tall
            className="h-8 w-auto"
          />
        </div>

        {/* LinkedIn Logo */}
        <div className="flex justify-center items-center transition-transform duration-300 hover:scale-110">
          <Image 
            src="/logos/linkedin.svg" 
            alt="LinkedIn Logo"
            width={96} // 96px wide
            height={24} // 24px tall
            className="h-6 w-auto"
          />
        </div>

        {/* Substack Logo (Assuming you have this) */}
        <div className="flex justify-center items-center transition-transform duration-300 hover:scale-110">
            <Image 
                src="/logos/linkedin.svg" 
                alt="Substack Logo"
                width={120}
                height={24}
                className="h-6 w-auto"
            />
        </div>

        {/* Coaches (Text) */}
        <div className="flex justify-center items-center transition-transform duration-300 hover:scale-110">
          <span className="text-2xl font-semibold text-gray-500">Coaches</span>
        </div>

      </div>
    </motion.div>
  </div>
</section>
{/* --- Features Section --- */}
<section id="features" className="py-20 sm:py-24 bg-gray-50">
  <div className="container mx-auto px-6">
    <div className="text-center max-w-3xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900">The All-in-One Toolkit for Creators</h2>
      <p className="mt-4 text-lg text-gray-600">
        Stop duct-taping tools together. Get everything you need to run your creator business, beautifully integrated under one roof.
      </p>
    </div>

    <div className="mt-16 grid md:grid-cols-3 gap-12">
      {/* Feature 1: Link-in-Bio */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <div className="inline-block p-4 bg-indigo-100 rounded-lg">
          <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.536a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg>
        </div>
        <h3 className="mt-4 text-xl font-bold">One Link, Infinite Possibilities</h3>
        <p className="mt-2 text-gray-600">
          Create a stunning micro-website that automatically showcases your latest content and digital products. Your single, most powerful link.
        </p>
      </motion.div>

      {/* Feature 2: Digital Store */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <div className="inline-block p-4 bg-indigo-100 rounded-lg">
          <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
        </div>
        <h3 className="mt-4 text-xl font-bold">Sell Directly, Earn More</h3>
        <p className="mt-2 text-gray-600">
          Your own digital storefront is just a few clicks away. Sell e-books, templates, and courses with zero platform fees.
        </p>
      </motion.div>

      {/* Feature 3: Content Planner */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <div className="inline-block p-4 bg-indigo-100 rounded-lg">
          <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
        </div>
        <h3 className="mt-4 text-xl font-bold">Plan Content, Not Chaos</h3>
        <p className="mt-2 text-gray-600">
          Organize your creative workflow with our simple content planner. Track ideas from script to publication and never miss a deadline.
        </p>
      </motion.div>
    </div>
  </div>
</section>
{/* --- Feature Spotlight Section --- */}
<section className="py-20 sm:py-24 bg-white">
  <div className="container mx-auto px-6 space-y-24">
    {/* Spotlight 1: Digital Store */}
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      viewport={{ once: true }}
      className="grid md:grid-cols-2 gap-12 items-center"
    >
      <div className="text-left">
        <span className="text-sm font-bold uppercase text-indigo-600">Monetize Effortlessly</span>
        <h3 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900">Your Storefront, Your Brand.</h3>
        <p className="mt-4 text-lg text-gray-600">
          Launch your digital store in minutes. Sell e-books, presets, templates, or any digital file directly to your audience. No middleman, no high commission fees. Just your brand, your products, and your customers.
        </p>
        <ul className="mt-6 space-y-2 text-gray-600">
          <li className="flex items-center"><svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>Instant file delivery after payment.</li>
          <li className="flex items-center"><svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>Secure payments with Razorpay.</li>
          <li className="flex items-center"><svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>You keep almost all the revenue.</li>
        </ul>
      </div>
      <div className="p-4 bg-gray-100 rounded-lg shadow-lg">
        <Image
          src="https://images.pexels.com/photos/5926382/pexels-photo-5926382.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Digital Store Mockup"
          width={1260}
          height={750}
          className="rounded-md object-cover"
        />
      </div>
    </motion.div>

    {/* Spotlight 2: Link-in-Bio */}
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      viewport={{ once: true }}
      className="grid md:grid-cols-2 gap-12 items-center"
    >
      <div className="md:order-2 text-left">
        <span className="text-sm font-bold uppercase text-indigo-600">Connect Everything</span>
        <h3 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900">One Link to Rule Them All.</h3>
        <p className="mt-4 text-lg text-gray-600">
          Your Link-in-Bio page is no longer just a list of links. It's a dynamic, living profile that automatically updates with your latest content and products. Turn your followers into customers, effortlessly.
        </p>
         <ul className="mt-6 space-y-2 text-gray-600">
          <li className="flex items-center"><svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>Auto-updates with new products.</li>
          <li className="flex items-center"><svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>Beautiful, mobile-first design.</li>
          <li className="flex items-center"><svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>Your central hub for your entire brand.</li>
        </ul>
      </div>
      <div className="md:order-1 p-4 bg-gray-100 rounded-lg shadow-lg">
        <Image
          src="https://images.pexels.com/photos/7176027/pexels-photo-7176027.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Link-in-Bio Mockup"
          width={1260}
          height={750}
          className="rounded-md object-cover"
        />
      </div>
    </motion.div>
  </div>
</section>
{/* --- More Feature Spotlights Section (Updated with better images and effects) --- */}
<section className="py-20 sm:py-24 bg-gray-50">
  <div className="container mx-auto px-6 space-y-24">
    {/* Spotlight 3: Content Planner */}
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      viewport={{ once: true }}
      className="grid md:grid-cols-2 gap-12 items-center"
    >
      <div className="text-left">
        <span className="text-sm font-bold uppercase text-indigo-600">Stay Organized</span>
        <h3 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900">From Idea to Published, Seamlessly.</h3>
        <p className="mt-4 text-lg text-gray-600">
          End the creative chaos. With our intuitive content planner, you can map out your content schedule, manage multiple platforms, and track your progress from a single, beautiful interface.
        </p>
        <ul className="mt-6 space-y-2 text-gray-600">
          <li className="flex items-center"><svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>Visual calendar view to track deadlines.</li>
          <li className="flex items-center"><svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>Manage statuses: Idea, Scripting, Filming, etc.</li>
          <li className="flex items-center"><svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>Never run out of content ideas again.</li>
        </ul>
      </div>
      <div className="p-4 bg-gray-100 rounded-lg shadow-lg overflow-hidden">
        <Image
          src="https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Content Planner Mockup"
          width={1260}
          height={750}
          className="rounded-md object-cover transition-transform duration-500 ease-in-out hover:scale-105"
        />
      </div>
    </motion.div>

    {/* Spotlight 4: AI Repurposing (Coming Soon) */}
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      viewport={{ once: true }}
      className="grid md:grid-cols-2 gap-12 items-center"
    >
      <div className="md:order-2 text-left">
        <span className="text-sm font-bold uppercase text-indigo-600">The Future is Here</span>
        <h3 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900">Your Personal AI Content Machine. <span className="text-base font-semibold align-top bg-indigo-100 text-indigo-600 px-2 py-1 rounded-full">Coming Soon</span></h3>
        <p className="mt-4 text-lg text-gray-600">
          Imagine turning one long video into a dozen pieces of content with a single click. Our upcoming AI engine will automatically create viral Reels, insightful blog posts, and engaging tweet threads for you.
        </p>
         <ul className="mt-6 space-y-2 text-gray-600">
          <li className="flex items-center"><svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>Create 10x more content in half the time.</li>
          <li className="flex items-center"><svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>Auto-transcribe and find viral moments.</li>
          <li className="flex items-center"><svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>Dominate every platform with repurposed content.</li>
        </ul>
      </div>
      <div className="md:order-1 p-4 bg-gray-100 rounded-lg shadow-lg overflow-hidden">
        <Image
          src="https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="AI Repurposing Mockup"
          width={1260}
          height={750}
          className="rounded-md object-cover transition-transform duration-500 ease-in-out hover:scale-105"
        />
      </div>
    </motion.div>
  </div>
</section>
{/* --- Testimonials Section --- */}
{/* --- Infinite Scrolling Testimonials Section --- */}
<section className="py-20 sm:py-24 bg-white overflow-hidden" id="testimonials">
  <div className="container mx-auto px-6">
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
      className="text-center max-w-3xl mx-auto mb-12"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Loved by Creators, Big and Small</h2>
      <p className="mt-4 text-lg text-gray-600">
        Don't just take our word for it. Here's what creators are saying about their new-found creative freedom.
      </p>
    </motion.div>
  </div>
  
  <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 1 }}
    viewport={{ once: true }}
    className="marquee-container"
  >
    {/* We render the content twice for a seamless loop */}
    <div className="marquee-content">
      {/* Testimonial Set 1 */}
      <div className="flex-shrink-0 w-80 md:w-96 mx-4 bg-gray-50 p-8 rounded-lg shadow-lg">
        <p className="text-gray-700">"CreatorVerse has saved me over 10 hours a week. Instead of fighting with multiple tools, I can just focus on my content."</p>
        <div className="mt-6 flex items-center">
          <Image src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Profile of Rahul Kumar" width={48} height={48} className="w-12 h-12 rounded-full object-cover" />
          <div className="ml-4"><p className="font-bold">Rahul Kumar</p><p className="text-sm text-gray-500">YouTuber (65k)</p></div>
        </div>
      </div>
      <div className="flex-shrink-0 w-80 md:w-96 mx-4 bg-gray-50 p-8 rounded-lg shadow-lg">
        <p className="text-gray-700">"My product sales have doubled since I started using CreatorVerse. The integrated store and link-in-bio page work together so seamlessly."</p>
        <div className="mt-6 flex items-center">
          <Image src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Profile of Priya Sharma" width={48} height={48} className="w-12 h-12 rounded-full object-cover" />
          <div className="ml-4"><p className="font-bold">Priya Sharma</p><p className="text-sm text-gray-500">Coach & Course Creator</p></div>
        </div>
      </div>
      <div className="flex-shrink-0 w-80 md:w-96 mx-4 bg-gray-50 p-8 rounded-lg shadow-lg">
        <p className="text-gray-700">"As a writer, having one place to plan my newsletter and sell my e-books is incredible. The simplicity is its biggest strength."</p>
        <div className="mt-6 flex items-center">
          <Image src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Profile of Aman Singh" width={48} height={48} className="w-12 h-12 rounded-full object-cover" />
          <div className="ml-4"><p className="font-bold">Aman Singh</p><p className="text-sm text-gray-500">Writer & Blogger</p></div>
        </div>
      </div>

      {/* Testimonial Set 2 (Duplicate for loop) */}
      <div className="flex-shrink-0 w-80 md:w-96 mx-4 bg-gray-50 p-8 rounded-lg shadow-lg">
        <p className="text-gray-700">"CreatorVerse has saved me over 10 hours a week. Instead of fighting with multiple tools, I can just focus on my content."</p>
        <div className="mt-6 flex items-center">
          <Image src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Profile of Rahul Kumar" width={48} height={48} className="w-12 h-12 rounded-full object-cover" />
          <div className="ml-4"><p className="font-bold">Rahul Kumar</p><p className="text-sm text-gray-500">YouTuber (65k)</p></div>
        </div>
      </div>
      <div className="flex-shrink-0 w-80 md:w-96 mx-4 bg-gray-50 p-8 rounded-lg shadow-lg">
        <p className="text-gray-700">"My product sales have doubled since I started using CreatorVerse. The integrated store and link-in-bio page work together so seamlessly."</p>
        <div className="mt-6 flex items-center">
          <Image src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Profile of Priya Sharma" width={48} height={48} className="w-12 h-12 rounded-full object-cover" />
          <div className="ml-4"><p className="font-bold">Priya Sharma</p><p className="text-sm text-gray-500">Coach & Course Creator</p></div>
        </div>
      </div>
      <div className="flex-shrink-0 w-80 md:w-96 mx-4 bg-gray-50 p-8 rounded-lg shadow-lg">
        <p className="text-gray-700">"As a writer, having one place to plan my newsletter and sell my e-books is incredible. The simplicity is its biggest strength."</p>
        <div className="mt-6 flex items-center">
          <Image src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Profile of Aman Singh" width={48} height={48} className="w-12 h-12 rounded-full object-cover" />
          <div className="ml-4"><p className="font-bold">Aman Singh</p><p className="text-sm text-gray-500">Writer & Blogger</p></div>
        </div>
      </div>
    </div>
  </motion.div>
</section>
{/* --- Pricing Section --- */}
<section id="pricing" className="py-20 sm:py-24 bg-gray-50">
    <div className="container mx-auto px-6 text-center">
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
        >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Simple, Transparent Pricing</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                Choose the plan that fits your journey as a creator. No hidden fees, cancel anytime.
            </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 mt-16 max-w-5xl mx-auto">
            {/* Free Plan */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0 }}
                viewport={{ once: true }}
                className="border rounded-lg p-8 bg-white shadow-lg text-left flex flex-col"
            >
                <h3 className="text-2xl font-bold">Free</h3>
                <p className="mt-2 text-gray-500">For creators just starting out.</p>
                <p className="text-4xl font-extrabold my-6">₹0</p>
                <ul className="space-y-3 text-gray-600 flex-grow">
                    <li className="flex items-center"><svg className="w-5 h-5 mr-2 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>1 Team Member</li>
                    <li className="flex items-center"><svg className="w-5 h-5 mr-2 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>2 Content Uploads/Month</li>
                    <li className="flex items-center"><svg className="w-5 h-5 mr-2 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>1 Digital Product</li>
                    <li className="flex items-center"><svg className="w-5 h-5 mr-2 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>Link-in-Bio Page</li>
                </ul>
                <Link href="/login" className="mt-8 block w-full text-center px-6 py-3 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300">
                    Get Started
                </Link>
            </motion.div>

            {/* Starter Plan - Most Popular */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="border-2 border-indigo-600 rounded-lg p-8 bg-white shadow-2xl relative text-left flex flex-col"
            >
                <p className="absolute top-0 -translate-y-1/2 bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-semibold">Most Popular</p>
                <h3 className="text-2xl font-bold">Starter</h3>
                <p className="mt-2 text-gray-500">For creators scaling their business.</p>
                <p className="text-4xl font-extrabold my-6">₹999<span className="text-base font-medium text-gray-500">/month</span></p>
                <ul className="space-y-3 text-gray-600 flex-grow">
                    <li className="flex items-center"><svg className="w-5 h-5 mr-2 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>3 Team Members</li>
                    <li className="flex items-center"><svg className="w-5 h-5 mr-2 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>30 Content Uploads/Month</li>
                    <li className="flex items-center"><svg className="w-5 h-5 mr-2 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>10 Digital Products</li>
                    <li className="flex items-center"><svg className="w-5 h-5 mr-2 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>Content Planner</li>
                    <li className="flex items-center"><svg className="w-5 h-5 mr-2 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>Basic Analytics</li>
                </ul>
                <Link href="/login" className="mt-8 block w-full text-center px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 shadow-md">
                    Choose Starter
                </Link>
            </motion.div>

            {/* Pro Plan */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                className="border rounded-lg p-8 bg-white shadow-lg text-left flex flex-col"
            >
                <h3 className="text-2xl font-bold">Creator Pro</h3>
                <p className="mt-2 text-gray-500">For creators with established teams.</p>
                <p className="text-4xl font-extrabold my-6">₹2,999<span className="text-base font-medium text-gray-500">/month</span></p>
                <ul className="space-y-3 text-gray-600 flex-grow">
                    <li className="flex items-center"><svg className="w-5 h-5 mr-2 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>Unlimited Team Members</li>
                    <li className="flex items-center"><svg className="w-5 h-5 mr-2 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>Unlimited Uploads & Products</li>
                    <li className="flex items-center"><svg className="w-5 h-5 mr-2 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>AI Repurposing Tools</li>
                    <li className="flex items-center"><svg className="w-5 h-5 mr-2 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>Advanced Analytics & Support</li>
                </ul>
                <Link href="/login" className="mt-8 block w-full text-center px-6 py-3 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300">
                    Choose Pro
                </Link>
            </motion.div>
        </div>
    </div>
</section>
{/* --- FAQ Section --- */}
{/* --- Interactive FAQ Section --- */}
<section id="faq" className="py-20 sm:py-24 bg-white">
  <div className="container mx-auto px-6 max-w-3xl">
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
      className="text-center mb-16"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Have Questions? We Have Answers.</h2>
      <p className="mt-4 text-lg text-gray-600">
        Here are some of the most common questions we get from creators like you.
      </p>
    </motion.div>

    <FAQAccordion />
  </div>
</section>
{/* --- Final CTA Section --- */}
<section className="py-20 sm:py-24 bg-gradient-to-br from-gray-900 via-slate-800 to-indigo-900 text-white">
  <div className="container mx-auto px-6 text-center">
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
    >
      <h2 className="text-3xl md:text-4xl font-bold">Ready to Simplify Your Creator Life?</h2>
      <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
        Join thousands of creators building their business on CreatorVerse. It takes less than 60 seconds to get started.
      </p>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-8 inline-block"
      >
        <Link href="/login" className="px-8 py-4 bg-indigo-600 text-white font-bold rounded-lg text-lg shadow-lg hover:bg-indigo-500 transition-colors">
          Get Started for Free Today
        </Link>
      </motion.div>
    </motion.div>
  </div>
</section>

{/* --- Footer --- */}
<footer className="bg-gray-900 text-white">
    <div className="container mx-auto px-6 py-8 text-center">
        <p>&copy; 2025 CreatorVerse. All rights reserved.</p>
        <div className="mt-4 flex justify-center space-x-6">
            <a href="#" className="text-gray-400 hover:text-white">Terms</a>
            <a href="#" className="text-gray-400 hover:text-white">Privacy</a>
        </div>
        <p className="text-sm text-gray-500 mt-6">
            Built for the new generation of Indian Creators.
        </p>
    </div>
</footer>

      </main>
      {/* We will add a Footer here later */}
    </div>
  );
}
// --- New Accordion Component for the FAQ Section ---

const faqs = [
  {
    question: "Is there a free trial?",
    answer: "We have a generous Free plan that you can use for as long as you like. It's perfect for getting started and includes all the core features. No credit card required to sign up."
  },
  {
    question: "What are the transaction fees?",
    answer: "CreatorVerse charges 0% platform fees on your sales, even on the Free plan. You only pay the standard processing fees charged by our payment partner, Razorpay."
  },
  {
    question: "Can I cancel my plan anytime?",
    answer: "Absolutely. You are in complete control. You can upgrade, downgrade, or cancel your paid plan at any time from your dashboard settings."
  },
  {
    question: "Who is CreatorVerse for?",
    answer: "CreatorVerse is built for any Indian creator who wants to monetize their knowledge and audience—YouTubers, Instagrammers, coaches, writers, designers, developers, and more. If you create content and want to build a business, it's for you."
  }
];

const FAQItem = ({ faq, isOpen, onClick }) => {
  return (
    <motion.div 
      className="border-b border-gray-200 py-4"
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <button
        onClick={onClick}
        className="w-full flex justify-between items-center text-left text-lg font-semibold text-gray-800"
      >
        <span>{faq.question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
        </motion.div>
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0, marginTop: isOpen ? '16px' : '0px' }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <p className="text-gray-600">
          {faq.answer}
        </p>
      </motion.div>
    </motion.div>
  );
};

const FAQAccordion = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const handleToggle = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <FAQItem
          key={index}
          faq={faq}
          isOpen={openFaq === index}
          onClick={() => handleToggle(index)}
        />
      ))}
    </div>
  );
};