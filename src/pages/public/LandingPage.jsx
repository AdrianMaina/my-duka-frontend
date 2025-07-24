// =======================================================================
// FILE: src/pages/public/LandingPage.jsx (EDITED)
// =======================================================================
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaUserTie, FaUserCog, FaUser, FaArrowRight } from 'react-icons/fa';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const RoleCard = ({ icon: Icon, title, description, delay }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 50 }
      }}
      transition={{ duration: 0.5, delay: delay * 0.2 }}
      className="text-center p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-2"
    >
      <div className="inline-flex items-center justify-center w-20 h-20 mb-6 rounded-full bg-primary-blue/10">
        <Icon className="text-4xl text-accent-yellow" />
      </div>
      <h4 className="text-2xl font-bold text-text-dark mb-4">{title}</h4>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
};

const LandingPage = () => {
  const controls = useAnimation();
  const [heroRef, heroInView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  useEffect(() => {
    if (heroInView) {
      controls.start("visible");
    }
  }, [controls, heroInView]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="flex justify-between items-center p-4 md:p-6 sticky top-0 bg-white/90 backdrop-blur-sm z-50 shadow-sm">
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-primary-blue"
        >
          MyDuka
        </motion.h1>
        <motion.nav
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link 
            to="/login" 
            className="py-2 px-4 rounded-md text-primary-blue border border-primary-blue hover:bg-primary-blue hover:text-white transition-all duration-300 hover:shadow-md"
            aria-label="Login to your account"
          >
            Login
          </Link>
          <Link 
            to="/register" 
            className="py-2 px-4 ml-3 rounded-md text-white bg-primary-blue hover:bg-blue-700 transition-all duration-300 hover:shadow-md"
            aria-label="Register a new account"
          >
            Register
            <FaArrowRight className="inline ml-2" />
          </Link>
        </motion.nav>
      </header>
      
      <main className="flex-grow">
        <section 
          ref={heroRef}
          className="grid md:grid-cols-2 items-center gap-8 p-6 md:p-12 lg:p-16"
        >
          <motion.div
            variants={{
              visible: { opacity: 1, y: 0 },
              hidden: { opacity: 0, y: 50 }
            }}
            initial="hidden"
            animate={controls}
            transition={{ duration: 0.6 }}
            className="text-center md:text-left"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-primary-blue leading-tight">
              <span className="block">Panga Duka Yako</span>
              <span className="text-text-dark bg-gradient-to-r from-accent-yellow to-accent-yellow/70 bg-clip-text text-transparent">
                Kidigitali
              </span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-xl mx-auto md:mx-0">
              The simplest way for Kenyan shop owners to manage inventory, track sales, and pay suppliers. All in one place.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link 
                to="/register" 
                className="px-8 py-4 rounded-lg text-text-dark font-bold bg-accent-yellow hover:bg-accent-yellow/90 transition-all duration-300 hover:shadow-lg text-lg text-center"
                aria-label="Get started with MyDuka"
              >
                Get Started for Free
              </Link>
            </div>
          </motion.div>
          <motion.div
            variants={{
              visible: { opacity: 1, scale: 1 },
              hidden: { opacity: 0, scale: 0.9 }
            }}
            initial="hidden"
            animate={controls}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center"
          >
            <img 
              src="/Friendly Shopkeeper in Colourful Store.png" 
              alt="A modern Kenyan duka with a friendly shopkeeper" 
              className="rounded-xl  max-w-full h-auto md:max-w-lg lg:max-w-xl transition-all duration-500 hover:scale-105" 
              loading="lazy"
            />
          </motion.div>
        </section>

        <section className="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-soft-gray to-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-blue"
              >
                Built for Your Entire Team
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-lg md:text-xl text-gray-600 mt-4 max-w-2xl mx-auto"
              >
                Secure, role-based access ensures everyone has the right tools for their job.
              </motion.p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              <RoleCard 
                icon={FaUserTie} 
                title="The Merchant" 
                description="The business owner. Registers the duka, invites admins, views all financial reports, and has complete oversight of all stores." 
                delay={0}
              />
              <RoleCard 
                icon={FaUserCog} 
                title="The Admin" 
                description="The store manager. Manages inventory, pays suppliers via M-Pesa, handles supply requests, and invites clerks to their store." 
                delay={1}
              />
              <RoleCard 
                icon={FaUser} 
                title="The Clerk" 
                description="The shop staff. Focuses on day-to-day tasks like receiving new stock from suppliers and logging any spoiled or damaged items." 
                delay={2}
              />
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-primary-blue text-white">
          <div className="container mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Duka?</h2>
              <p className="text-xl mb-10 opacity-90">
                Join thousands of Kenyan businesses already managing their shops the smart way.
              </p>
              <Link 
                to="/register" 
                className="inline-block px-10 py-4 rounded-lg font-bold bg-white text-primary-blue hover:bg-gray-100 transition-all duration-300 hover:shadow-lg text-lg"
                aria-label="Create your free account now"
              >
                Create Your Free Account
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="bg-text-dark text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">MyDuka</h3>
              <p className="opacity-80">Empowering Kenyan businesses with simple, powerful tools.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2">
                <li><Link to="/features" className="opacity-80 hover:opacity-100 transition-opacity">Features</Link></li>
                <li><Link to="/pricing" className="opacity-80 hover:opacity-100 transition-opacity">Pricing</Link></li>
                <li><Link to="/integrations" className="opacity-80 hover:opacity-100 transition-opacity">Integrations</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><Link to="/blog" className="opacity-80 hover:opacity-100 transition-opacity">Blog</Link></li>
                <li><Link to="/help" className="opacity-80 hover:opacity-100 transition-opacity">Help Center</Link></li>
                <li><Link to="/tutorials" className="opacity-80 hover:opacity-100 transition-opacity">Tutorials</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><Link to="/about" className="opacity-80 hover:opacity-100 transition-opacity">About Us</Link></li>
                <li><Link to="/contact" className="opacity-80 hover:opacity-100 transition-opacity">Contact</Link></li>
                <li><Link to="/careers" className="opacity-80 hover:opacity-100 transition-opacity">Careers</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/20 mt-12 pt-8 text-center opacity-80 text-sm">
            <p>© {new Date().getFullYear()} MyDuka. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
