import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Moon, Sun, MapPin, Bed, Bath, Square, Phone, Mail, Calendar, Home, Building2, TrendingUp, Shield, Handshake, Eye, FileText, KeyRound, Menu, X } from 'lucide-react';

// Composant pour l'animation au défilement
const AnimatedCard = ({ children, delay = 0, className = "" }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

// Composant de section
const Section = ({ id, title, children, isDark }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const baseClasses = isDark ? 'bg-gradient-to-r from-[#010133]/25 to-[#010133]/15 border-[#C8A779]/35' : 'bg-gradient-to-r from-white/25 to-[#f5f5f5]/15 border-[#010133]/35';

    return (
        <section id={id} ref={ref} className="py-16 lg:py-40 relative">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8 }}
            >
                <div className="text-center mb-12 lg:mb-16">
                    <div className={`inline-block backdrop-blur-3xl ${baseClasses} border rounded-2xl px-6 py-4 lg:px-8 lg:py-6 shadow-[0_15px_45px_rgba(0,0,0,0.25)] mx-4`}>
                        <h2 className={`text-3xl sm:text-5xl lg:text-6xl font-black ${isDark ? 'bg-gradient-to-r from-[#C8A779] via-[#D4B98C] to-[#E5C89D]' : 'bg-gradient-to-r from-[#010133] via-[#1a1a5a] to-[#010133]'} bg-clip-text text-transparent tracking-tight`}>
                            {title}
                        </h2>
                    </div>
                </div>
                {children}
            </motion.div>
        </section>
    );
};

// Composant pour les cartes de propriété
const PropertyCard = ({ property, delay, isDark }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const baseClasses = isDark ? 'bg-[#010133]/20 border-[#C8A779]/30' : 'bg-white/20 border-[#010133]/30';

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay }}
            whileHover={{ y: -10 }}
            className="group"
        >
            <div className={`backdrop-blur-3xl ${baseClasses} border rounded-3xl overflow-hidden shadow-[0_15px_50px_rgba(0,0,0,0.25)] transition-all duration-300`}>
                <div className="relative overflow-hidden h-64">
                    <img
                        src={property.image}
                        alt={property.type}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/800x600/010133/C8A779?text=Plan+Disponible"; }}
                    />
                    <div className={`absolute top-4 right-4 backdrop-blur-xl ${isDark ? 'bg-[#C8A779]/80' : 'bg-[#010133]/90'} text-white px-4 py-2 rounded-2xl font-bold text-sm`}>
                        {property.price}
                    </div>
                </div>

                <div className="p-6">
                    <h3 className={`text-2xl font-bold mb-3 ${isDark ? 'text-[#C8A779]' : 'text-[#010133]'}`}>{property.type}</h3>
                    <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'} mb-4 flex items-center gap-2`}>
                        <MapPin className={`w-4 h-4 ${isDark ? 'text-[#C8A779]' : 'text-[#010133]'}`} />
                        {property.location}
                    </p>

                    <div className={`grid grid-cols-3 gap-4 mb-6 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        <div className="flex items-center gap-2">
                            <Bed className={`w-4 h-4 ${isDark ? 'text-[#C8A779]' : 'text-[#010133]'}`} />
                            <span className="text-sm">{property.beds} Chambres</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Bath className={`w-4 h-4 ${isDark ? 'text-[#C8A779]' : 'text-[#010133]'}`} />
                            <span className="text-sm">{property.baths} SDB</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Square className={`w-4 h-4 ${isDark ? 'text-[#C8A779]' : 'text-[#010133]'}`} />
                            <span className="text-sm">{property.surface}</span>
                        </div>
                    </div>

                    <motion.button
                        whileHover={{
                            scale: 1.03,
                            y: -3,
                            boxShadow: isDark
                                ? '0 20px 40px -10px rgba(200, 167, 121, 0.5), 0 0 20px rgba(200, 167, 121, 0.3)'
                                : '0 20px 40px -10px rgba(1, 1, 51, 0.4), 0 0 15px rgba(1, 1, 51, 0.2)'
                        }}
                        whileTap={{ scale: 0.98, y: 0 }}
                        className={`w-full py-3.5 ${isDark ? 'bg-gradient-to-br from-[#C8A779] via-[#D4B98C] to-[#E5C89D]' : 'bg-gradient-to-br from-[#010133] via-[#1a1a5a] to-[#2d2d70]'} text-white rounded-2xl font-semibold shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.4)] transition-all duration-200`}
                    >
                        Voir les plans
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
};

// Composant pour les cartes d'avantages
const BenefitCard = ({ benefit, delay, isDark }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const baseClasses = isDark ? 'bg-[#010133]/20 border-[#C8A779]/30' : 'bg-white/20 border-[#010133]/30';

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay }}
            whileHover={{ scale: 1.05, y: -5, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.3)' }}
            className={`backdrop-blur-3xl ${baseClasses} border rounded-3xl p-8 shadow-[0_15px_45px_rgba(0,0,0,0.25)] text-center transition-all duration-300`}
        >
            <div className={`w-16 h-16 mx-auto mb-4 rounded-xl ${isDark ? 'bg-gradient-to-br from-[#C8A779]/20 to-[#D4B98C]/20' : 'bg-gradient-to-br from-[#010133]/20 to-[#1a1a5a]/20'} flex items-center justify-center`}>
                <div className={`${isDark ? 'text-[#C8A779]' : 'text-[#010133]'} text-3xl`}>
                    {benefit.icon}
                </div>
            </div>
            <h4 className={`font-bold mb-2 text-xl ${isDark ? 'text-[#C8A779]' : 'text-[#010133]'}`}>{benefit.title}</h4>
            <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{benefit.desc}</p>
        </motion.div>
    );
};

const ProcessStepCard = ({ step, delay, isDark }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const baseClasses = isDark ? 'bg-[#010133]/20 border-[#C8A779]/30' : 'bg-white/20 border-[#010133]/30';

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay }}
            whileHover={{ y: -5, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.3)' }}
            className={`backdrop-blur-3xl ${baseClasses} border rounded-3xl p-6 shadow-[0_15px_40px_rgba(0,0,0,0.25)] transition-all duration-300 flex items-start space-x-4`}
        >
            <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-black text-xl ${isDark ? 'bg-[#C8A779] text-[#010133]' : 'bg-[#010133] text-white'} shadow-lg`}>
                {step.number}
            </div>
            <div>
                <h4 className={`font-bold mb-1 text-lg ${isDark ? 'text-[#C8A779]' : 'text-[#010133]'}`}>{step.title}</h4>
                <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{step.desc}</p>
            </div>
        </motion.div>
    );
};

const RealEstate = () => {
    const [isDark, setIsDark] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleDarkMode = () => setIsDark(!isDark);

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDark]);

    const navLinks = [
        { name: 'Accueil', href: '#hero' },
        { name: 'Projet', href: '#project' },
        { name: 'Biens', href: '#properties' },
        { name: 'Processus', href: '#process' },
        { name: 'Avantages', href: '#benefits' },
        { name: 'Contact', href: '#contact' }
    ];

    const handleScroll = (e, href) => {
        e.preventDefault();
        setIsMenuOpen(false);
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const properties = [
        {
            id: 1,
            type: 'Appartement F3 Deluxe',
            price: '45 000 000 DA',
            surface: '85 m²',
            beds: 3,
            baths: 2,
            floor: '4ème étage, Vue jardin',
            location: 'Quartier du Soleil Levant',
            image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop'
        },
        {
            id: 2,
            type: 'Appartement F4 Premium',
            price: '58 000 000 DA',
            surface: '110 m²',
            beds: 4,
            baths: 2,
            floor: '6ème étage, Vue Panoramique',
            location: 'Quartier du Soleil Levant',
            image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop'
        },
        {
            id: 3,
            type: 'Duplex F5 Exécutif',
            price: '75 000 000 DA',
            surface: '145 m²',
            beds: 5,
            baths: 3,
            floor: 'Dernier étage, Terrasse Privée',
            location: 'Quartier du Soleil Levant',
            image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop'
        }
    ];

    const benefits = [
        { icon: <MapPin />, title: 'Localisation Stratégique', desc: 'Accès direct aux principaux axes et services essentiels.' },
        { icon: <Shield />, title: 'Sécurité et Sérénité', desc: 'Gardiennage 24h/24, surveillance vidéo et accès contrôlé.' },
        { icon: <TrendingUp />, title: 'Potentiel d\'Investissement', desc: 'Un bien qui prend de la valeur dans un secteur en croissance.' },
        { icon: <Building2 />, title: 'Finitions Haut de Gamme', desc: 'Matériaux importés, isolation phonique et thermique supérieure.' }
    ];

    const processSteps = [
        { number: 1, icon: <Handshake />, title: 'Consultation & Découverte', desc: 'Échange personnalisé sur vos besoins et vos attentes.' },
        { number: 2, icon: <Eye />, title: 'Visite immersive du Site', desc: 'Découvrez les appartements témoins et les commodités.' },
        { number: 3, icon: <FileText />, title: 'Formalisation de la Réservation', desc: 'Signature du contrat préliminaire et sécurisation de votre unité.' },
        { number: 4, icon: <KeyRound />, title: 'Remise des Clés & Emménagement', desc: 'Devenir propriétaire et emménager dans votre nouveau foyer.' }
    ];

    // Palette de couleurs Azure Résidences (#010133 Navy / #C8A779 Gold)
    const baseBgLight = 'bg-gray-50';
    const baseBgDark = 'bg-[#010133]';
    const buttonGradientPrimary = isDark
        ? 'bg-gradient-to-br from-[#C8A779] via-[#D4B98C] to-[#E5C89D]'
        : 'bg-gradient-to-br from-[#010133] via-[#1a1a5a] to-[#2d2d70]';

    return (
        <div className={`w-full min-h-screen ${isDark ? baseBgDark : baseBgLight} ${isDark ? 'text-slate-100' : 'text-slate-900'} overflow-x-hidden relative transition-colors duration-500`} style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>

            {/* Custom Styles for deep shadows */}
            <style>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(30px, -30px) scale(1.05); }
        }
      `}</style>

            {/* Background Effects (Glassy, Navy/Gold Hues) */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                {/* Radial Gradient overlay */}
                <div className={`absolute inset-0 ${isDark ? 'bg-[radial-gradient(circle_at_50%_50%,rgba(200,167,121,0.1),transparent_70%)]' : 'bg-[radial-gradient(circle_at_50%_50%,rgba(1,1,51,0.15),transparent_70%)]'}`} />

                {/* Floating Blurs 1 */}
                <div
                    className={`absolute top-0 left-1/4 w-96 h-96 ${isDark ? 'bg-gradient-to-br from-[#C8A779]/15 to-[#010133]/10' : 'bg-gradient-to-br from-[#010133]/20 to-[#C8A779]/15'} rounded-full blur-3xl opacity-70`}
                    style={{ animation: 'float 20s ease-in-out infinite' }}
                />
                {/* Floating Blurs 2 */}
                <div
                    className={`absolute bottom-0 right-1/4 w-96 h-96 ${isDark ? 'bg-gradient-to-br from-[#010133]/10 to-[#C8A779]/15' : 'bg-gradient-to-br from-[#C8A779]/15 to-[#010133]/20'} rounded-full blur-3xl opacity-70`}
                    style={{ animation: 'float 25s ease-in-out infinite reverse' }}
                />
            </div>


            {/* Navigation (Glassy) */}
            <motion.nav
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4"
            >
                <motion.div
                    whileHover={{ scale: 1.01 }}
                    className={`backdrop-blur-3xl ${isDark ? 'bg-[#010133]/85 border-[#C8A779]/40' : 'bg-white/85 border-[#010133]/40'} border rounded-2xl px-4 md:px-6 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.25)] transition-all duration-300 w-full md:w-auto`}
                >
                    <div className="flex gap-2 md:gap-5 items-center relative z-10 justify-between md:justify-start">
                        {/* Logo */}
                        <a href="#" onClick={(e) => handleScroll(e, '#hero')} className="flex-shrink-0">
                            <img src="/logo.png" alt="Azure Résidences Logo" className="h-8 md:h-10 w-auto object-contain" />
                        </a>

                        {/* Desktop Nav */}
                        <div className="hidden lg:flex gap-3 xl:gap-5 items-center">
                            {navLinks.map((link, i) => (
                                <motion.a
                                    key={link.name}
                                    href={link.href}
                                    onClick={(e) => handleScroll(e, link.href)}
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.08 }}
                                    whileHover={{ scale: 1.05 }}
                                    className={`text-sm font-medium ${isDark ? 'text-slate-200 hover:text-[#C8A779]' : 'text-slate-900 hover:text-[#010133]'} transition-colors whitespace-nowrap px-1 xl:px-2`}
                                >
                                    {link.name}
                                </motion.a>
                            ))}
                        </div>

                        {/* Mobile Nav Toggle */}
                        <button
                            className="lg:hidden p-1 bg-transparent border-0"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? (
                                <X className={`w-5 h-5 md:w-6 md:h-6 ${isDark ? 'text-[#C8A779]' : 'text-[#010133]'}`} />
                            ) : (
                                <Menu className={`w-5 h-5 md:w-6 md:h-6 ${isDark ? 'text-[#C8A779]' : 'text-[#010133]'}`} />
                            )}
                        </button>

                        {/* Desktop Theme Toggle */}
                        <motion.button
                            onClick={toggleDarkMode}
                            whileHover={{ scale: 1.15, rotate: 180 }}
                            whileTap={{ scale: 0.95 }}
                            className="hidden lg:block ml-1 p-1.5 rounded-full backdrop-blur-xl bg-transparent border-0 transition-all duration-300 flex-shrink-0"
                        >
                            {isDark ? <Sun className="w-3.5 h-3.5 text-[#C8A779]" /> : <Moon className="w-3.5 h-3.5 text-[#010133]" />}
                        </motion.button>
                    </div>
                </motion.div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            < AnimatePresence >
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 z-40 pt-24 px-4 bg-black/60 backdrop-blur-xl lg:hidden"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        <div
                            className={`flex flex-col gap-4 p-6 rounded-3xl ${isDark ? 'bg-[#010133]/90 border border-[#C8A779]/30' : 'bg-white/90 border border-[#010133]/30'}`}
                            onClick={e => e.stopPropagation()}
                        >
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={(e) => handleScroll(e, link.href)}
                                    className={`text-lg font-medium py-2 border-b ${isDark ? 'text-slate-200 border-[#C8A779]/20' : 'text-slate-900 border-[#010133]/20'}`}
                                >
                                    {link.name}
                                </a>
                            ))}
                            {/* Mobile Theme Toggle */}
                            <motion.button
                                onClick={toggleDarkMode}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`flex items-center justify-center gap-3 text-lg font-medium py-3 rounded-xl ${isDark ? 'bg-[#C8A779]/10 text-[#C8A779]' : 'bg-[#010133]/10 text-[#010133]'} transition-all duration-300 mt-2`}
                            >
                                {isDark ? (
                                    <>
                                        <Sun className="w-5 h-5" />
                                        <span>Mode clair</span>
                                    </>
                                ) : (
                                    <>
                                        <Moon className="w-5 h-5" />
                                        <span>Mode sombre</span>
                                    </>
                                )}
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence >

            {/* Hero Section (Full Background Image) */}
            < section id="hero" className="h-screen relative flex items-center justify-center text-center" >
                {/* Background Image Container */}
                < div className="absolute inset-0 overflow-hidden" >
                    <img
                        src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop"
                        alt="Intérieur d'un appartement de luxe"
                        className="w-full h-full object-cover transition-transform duration-1000"
                        onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/1920x1080/010133/C8A779?text=Vue+Intérieure+Prestige"; }}
                    />
                    {/* Overlay for Glass effect and readability */}
                    <div className={`absolute inset-0 ${isDark ? 'bg-[#010133]/60 backdrop-blur-md' : 'bg-black/40 backdrop-blur-sm'}`}></div>
                </div >

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5 }}
                    className="relative z-10 max-w-5xl px-4"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className={`inline-flex items-center gap-2 backdrop-blur-3xl ${isDark ? 'bg-gradient-to-r from-[#C8A779]/25 to-[#C8A779]/15 border-[#C8A779]/40' : 'bg-gradient-to-r from-[#010133]/25 to-[#010133]/15 border-[#010133]/50'} border rounded-2xl px-5 py-2.5 mb-12 sm:mb-16 shadow-[0_8px_32px_rgba(0,0,0,0.3)]`}
                    >
                        <Home className={`w-4 h-4 ${isDark ? 'text-[#C8A779]' : 'text-white'}`} />
                        <span className={`text-sm font-medium ${isDark ? 'text-[#C8A779]' : 'text-white'}`}>Résidence Premium</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="text-3xl xs:text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-black mb-4 sm:mb-6 tracking-tighter leading-tight px-4"
                    >
                        {/* Nouveau gradient de titre (Navy/Gold) */}
                        <span className={`bg-gradient-to-r from-white via-[#C8A779] to-[#C8A779] bg-clip-text text-transparent drop-shadow-lg`}>
                            Azure Résidences
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                        className="text-base sm:text-xl md:text-2xl lg:text-3xl mb-4 font-light text-white drop-shadow-lg px-4"
                    >
                        <span className="text-transparent bg-gradient-to-r from-[#C8A779] to-[#D4B98C] bg-clip-text">
                            Prestige & Investissement
                        </span> au cœur de la ville
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.1 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center mt-8 sm:mt-12"
                    >
                        {/* Bouton secondaire (Glassy) */}
                        <motion.button
                            whileHover={{
                                scale: 1.05,
                                y: -3,
                                boxShadow: isDark
                                    ? '0 15px 35px -5px rgba(200, 167, 121, 0.4), 0 0 15px rgba(200, 167, 121, 0.25)'
                                    : '0 15px 35px -5px rgba(1, 1, 51, 0.3), 0 0 10px rgba(1, 1, 51, 0.2)'
                            }}
                            whileTap={{ scale: 0.98, y: 0 }}
                            onClick={(e) => handleScroll(e, '#properties')}
                            className={`px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base backdrop-blur-2xl ${isDark ? 'bg-[#C8A779]/15 text-[#C8A779]' : 'bg-[#010133]/15 text-white'} rounded-2xl font-semibold transition-all duration-200 shadow-[0_8px_30px_rgba(0,0,0,0.25)]`}
                        >
                            Explorer les Biens
                        </motion.button>

                        {/* Bouton principal (Solid Gradient + Deep Shadow) */}
                        <motion.button
                            whileHover={{
                                scale: 1.05,
                                y: -3,
                                boxShadow: isDark
                                    ? '0 20px 45px -10px rgba(200, 167, 121, 0.6), 0 0 25px rgba(200, 167, 121, 0.4)'
                                    : '0 20px 45px -10px rgba(1, 1, 51, 0.5), 0 0 20px rgba(1, 1, 51, 0.3)'
                            }}
                            whileTap={{ scale: 0.98, y: 0 }}
                            onClick={(e) => handleScroll(e, '#contact')}
                            className={`px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base ${buttonGradientPrimary} text-white rounded-2xl font-semibold relative overflow-hidden group transition-all duration-200 shadow-[0_10px_40px_rgba(0,0,0,0.35)]`}
                        >
                            <span className="relative z-10">Réserver une visite</span>
                        </motion.button>
                    </motion.div>
                </motion.div>
            </section >

            {/* Project Overview */}
            < Section id="project" title="Le Concept Architectural" isDark={isDark} >
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <AnimatedCard>
                        <div className={`backdrop-blur-3xl ${isDark ? 'bg-gradient-to-br from-[#010133]/25 to-[#010133]/15 border-[#C8A779]/40' : 'bg-gradient-to-br from-white/25 to-[#f5f5f5]/15 border-[#010133]/40'} border rounded-3xl p-8 lg:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.3)]`}>
                            <div className="grid lg:grid-cols-2 gap-10 items-center">
                                <div>
                                    <h3 className={`text-3xl font-bold mb-4 ${isDark ? 'text-[#C8A779]' : 'text-[#010133]'}`}>Une Résidence d'Exception</h3>
                                    <p className={`${isDark ? 'text-slate-300' : 'text-slate-700'} mb-4 leading-relaxed`}>
                                        Azure Résidences est le fruit d'une collaboration avec des architectes de renom, visant à créer un espace de vie alliant esthétisme, fonctionnalité et respect de l'environnement. Chaque détail a été pensé pour votre bien-être.
                                    </p>
                                    <ul className={`space-y-3 ${isDark ? 'text-slate-400' : 'text-slate-600'} mt-6`}>
                                        <li className="flex items-center gap-2">
                                            <div className={`w-2 h-2 ${isDark ? 'bg-[#C8A779]' : 'bg-[#010133]'} rounded-full`} />
                                            Espaces verts aménagés de 3000 m²
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <div className={`w-2 h-2 ${isDark ? 'bg-[#C8A779]' : 'bg-[#010133]'} rounded-full`} />
                                            Système de Domotique avancé
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <div className={`w-2 h-2 ${isDark ? 'bg-[#C8A779]' : 'bg-[#010133]'} rounded-full`} />
                                            Parking souterrain et bornes de recharge
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <div className={`w-2 h-2 ${isDark ? 'bg-[#C8A779]' : 'bg-[#010133]'} rounded-full`} />
                                            Salle de sport, piscine et conciergerie privée
                                        </li>
                                    </ul>
                                </div>
                                <div className={`rounded-3xl overflow-hidden shadow-[0_15px_50px_rgba(0,0,0,0.3)] ${isDark ? 'border-[#C8A779]/40' : 'border-[#010133]/40'} border backdrop-blur-sm`}>
                                    <img
                                        src="https://placehold.co/800x600/010133/C8A779?text=Vue+3D+de+la+Résidence"
                                        alt="Résidence"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                    </AnimatedCard>
                </div>
            </Section >

            {/* Properties */}
            < Section id="properties" title="Nos Unités Disponibles" isDark={isDark} >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {properties.map((property, i) => (
                            <PropertyCard key={property.id} property={property} delay={i * 0.2} isDark={isDark} />
                        ))}
                    </div>
                </div>
            </Section >

            {/* New Section: Processus d'Achat (Glassy Cards) */}
            < Section id="process" title="Votre Accès au Luxe : Le Processus" isDark={isDark} >
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {processSteps.map((step, i) => (
                            <ProcessStepCard key={step.number} step={step} delay={i * 0.1} isDark={isDark} />
                        ))}
                    </div>
                </div>
            </Section >

            {/* Benefits */}
            < Section id="benefits" title="Pourquoi Azure Résidences" isDark={isDark} >
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {benefits.map((benefit, i) => (
                            <BenefitCard key={benefit.title} benefit={benefit} delay={i * 0.1} isDark={isDark} />
                        ))}
                    </div>
                </div>
            </Section >

            {/* Contact */}
            < Section id="contact" title="Contactez Notre Équipe" isDark={isDark} >
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <AnimatedCard delay={0.2}>
                        <div className={`backdrop-blur-3xl ${isDark ? 'bg-gradient-to-br from-[#010133]/25 to-[#010133]/15 border-[#C8A779]/40' : 'bg-gradient-to-br from-white/25 to-[#f5f5f5]/15 border-[#010133]/40'} border rounded-3xl p-8 sm:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.3)] text-center`}>
                            <p className={`text-lg sm:text-xl ${isDark ? 'text-slate-300' : 'text-slate-700'} mb-8`}>
                                Notre conseiller se tient à votre disposition pour toute information complémentaire et pour organiser une visite privée de la résidence.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
                                <motion.a
                                    href="tel:+213XXXXXXXXX"
                                    whileHover={{
                                        scale: 1.05,
                                        y: -3,
                                        boxShadow: isDark
                                            ? '0 12px 30px -5px rgba(200, 167, 121, 0.4), 0 0 15px rgba(200, 167, 121, 0.2)'
                                            : '0 12px 30px -5px rgba(1, 1, 51, 0.3), 0 0 10px rgba(1, 1, 51, 0.15)'
                                    }}
                                    whileTap={{ scale: 0.98, y: 0 }}
                                    className={`flex items-center gap-2 px-6 py-3 ${isDark ? 'bg-[#C8A779]/15 border-[#C8A779]/50 text-[#C8A779]' : 'bg-[#010133]/15 border-[#010133]/60 text-[#010133]'} border-2 rounded-2xl font-semibold backdrop-blur-2xl transition-all duration-200 shadow-[0_8px_25px_rgba(0,0,0,0.2)]`}
                                >
                                    <Phone className="w-4 h-4" />
                                    +213 XXX XXX XXX
                                </motion.a>
                                <motion.a
                                    href="mailto:contact@azure-residences.com"
                                    whileHover={{
                                        scale: 1.05,
                                        y: -3,
                                        boxShadow: isDark
                                            ? '0 12px 30px -5px rgba(200, 167, 121, 0.4), 0 0 15px rgba(200, 167, 121, 0.2)'
                                            : '0 12px 30px -5px rgba(1, 1, 51, 0.3), 0 0 10px rgba(1, 1, 51, 0.15)'
                                    }}
                                    whileTap={{ scale: 0.98, y: 0 }}
                                    className={`flex items-center gap-2 px-6 py-3 ${isDark ? 'bg-[#C8A779]/15 border-[#C8A779]/50 text-[#C8A779]' : 'bg-[#010133]/15 border-[#010133]/60 text-[#010133]'} border-2 rounded-2xl font-semibold backdrop-blur-2xl transition-all duration-200 shadow-[0_8px_25px_rgba(0,0,0,0.2)]`}
                                >
                                    <Mail className="w-4 h-4" />
                                    contact@azure-residences.com
                                </motion.a>
                            </div>

                            <motion.button
                                whileHover={{
                                    scale: 1.05,
                                    y: -4,
                                    boxShadow: isDark
                                        ? '0 25px 50px -10px rgba(200, 167, 121, 0.6), 0 0 30px rgba(200, 167, 121, 0.4)'
                                        : '0 25px 50px -10px rgba(1, 1, 51, 0.5), 0 0 25px rgba(1, 1, 51, 0.3)'
                                }}
                                whileTap={{ scale: 0.98, y: 0 }}
                                className={`px-10 py-5 ${buttonGradientPrimary} text-white rounded-2xl font-bold text-lg shadow-[0_15px_50px_rgba(0,0,0,0.4)] transition-all duration-200`}
                            >
                                <Calendar className="w-5 h-5 inline mr-2" />
                                Planifier une Consultation
                            </motion.button>
                        </div>
                    </AnimatedCard>
                </div>
            </Section >

            {/* Footer */}
            < footer className="py-16 text-center relative z-10" >
                <div className={`backdrop-blur-3xl ${isDark ? 'bg-gradient-to-r from-[#010133]/25 to-[#010133]/15 border-[#C8A779]/40' : 'bg-gradient-to-r from-white/25 to-[#f5f5f5]/15 border-[#010133]/40'} border rounded-2xl px-8 py-4 inline-block shadow-[0_8px_30px_rgba(0,0,0,0.25)]`}>
                    <p className={`${isDark ? 'text-slate-400' : 'text-slate-600'} text-sm`}>
                        © 2025 Azure Résidences • Tous droits réservés
                    </p>
                </div>
            </footer >
        </div >
    );
};

export default RealEstate;
