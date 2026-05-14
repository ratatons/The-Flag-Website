import React, { useRef, useState, useEffect } from 'react';
import emailjs from 'emailjs-com';
import './App.css';
import LoadingPage from './components/LoadingPage';
import logoImage from './logo.png';
import headerlogo from './Colored.png';
import backgroundImage from './WEB_BG.png';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [sendStatus, setSendStatus] = useState({ type: '', message: '' });
  const [timestamp] = useState(() => new Date().toLocaleString());
  const [language, setLanguage] = useState('en');
  const contactRef = useRef(null);
  const formRef = useRef(null);

  const EMAILJS_SERVICE_ID = 'service_hvhsebk';
  const EMAILJS_TEMPLATE_ID = 'template_hz0fm4p';
  const EMAILJS_PUBLIC_KEY = 'VzKKLcJI9VSsA6w5M';

  const translations = {
    en: {
      whoWeAre: 'Who We Are',
      contactUs: 'Contact us',
      whoWeAreTitle: 'Who We Are',
      whoWeAreText1: "Side Quest is run by people who are tired of watching lives get lost just because the right info isn't out there. We're bored, fed up, and honestly pissed that this keeps happening when it doesn't have to.",
      whoWeAreText2: "We're here to change that — no excuses, no waiting around. But we can't do it solo. We need you. 🏖️",
      getInTouch: 'Get in Touch',
      contactDescription: "We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
      yourName: 'Your Name',
      yourEmail: 'Your Email',
      phoneNumber: 'Phone Number (Optional)',
      yourMessage: 'Your Message',
      sendMessage: 'Send Message',
      sending: 'Sending…',
      successMessage: 'Message sent! We will get back to you soon.',
      errorMessage: 'There was a problem sending. Please try again.',
      downloadApp: 'Download Our App',
      downloadDescription: 'Get the best experience on mobile. Available soon.',
      getItOn: 'GET IT ON',
      googlePlay: 'Google Play',
      downloadOn: 'Download on the',
      appStore: 'App Store',
      privacyPolicy: 'Privacy Policy',
      langButton: 'AR',
      featureDescription: 'A smart application aimed at guiding citizens towards safer beaches based on a flag system and real-time information.',
      featureEmail: 'Enter your email'
    },
    fr: {
      whoWeAre: 'Qui sommes-nous',
      contactUs: 'Contactez-nous',
      whoWeAreTitle: 'Qui sommes-nous',
      whoWeAreText1: "Side Quest est géré par des personnes fatiguées de voir des vies perdues simplement parce que les bonnes informations ne sont pas disponibles. Nous en avons marre et nous sommes franchement énervés que cela continue alors que ce n'est pas nécessaire.",
      whoWeAreText2: "Nous sommes là pour changer cela — sans excuses, sans attendre. Mais nous ne pouvons pas le faire seuls. Nous avons besoin de vous. 🏖️",
      getInTouch: 'Contactez-nous',
      contactDescription: "Nous aimerions avoir de vos nouvelles. Envoyez-nous un message et nous vous répondrons dès que possible.",
      yourName: 'Votre nom',
      yourEmail: 'Votre email',
      phoneNumber: 'Numéro de téléphone (Optionnel)',
      yourMessage: 'Votre message',
      sendMessage: 'Envoyer le message',
      sending: 'Envoi en cours…',
      successMessage: 'Message envoyé ! Nous vous répondrons bientôt.',
      errorMessage: "Un problème est survenu lors de l'envoi. Veuillez réessayer.",
      downloadApp: 'Téléchargez notre application',
      downloadDescription: 'Obtenez la meilleure expérience sur mobile. Bientôt disponible.',
      getItOn: 'DISPONIBLE SUR',
      googlePlay: 'Google Play',
      downloadOn: 'Télécharger sur',
      appStore: 'App Store',
      privacyPolicy: 'Politique de confidentialité',
      langButton: 'EN',
      featureDescription: 'Une application intelligente visant à guider les citoyens vers les plages les plus sûres en fonction d\'un système de drapeaux et d\'informations en temps réel.',
      featureEmail: 'Entrez votre email'
    },
    ar: {
      whoWeAre: 'من نحن',
      contactUs: 'تواصل معنا',
      whoWeAreTitle: 'من نحن',
      whoWeAreText1: "جانب كويست يديره أشخاص تعبوا من رؤية الأرواح تضيع فقط لأن المعلومات الصحيحة غير متوفرة. نحن ملل وغاضبون من استمرار هذا عندما لا يكون ضروريا.",
      whoWeAreText2: "نحن هنا لتغيير ذلك — بدون أعذار، بدون انتظار. لكن لا يمكننا فعل ذلك بمفردنا. نحتاج إليك. 🏖️",
      getInTouch: 'تواصل معنا',
      contactDescription: "نود أن نسمع منك. أرسل لنا رسالة وسنرد عليك في أقرب وقت ممكن.",
      yourName: 'اسمك',
      yourEmail: 'بريدك الإلكتروني',
      phoneNumber: 'رقم الهاتف (اختياري)',
      yourMessage: 'رسالتك',
      sendMessage: 'إرسال الرسالة',
      sending: 'جاري الإرسال…',
      successMessage: 'تم إرسال الرسالة! سنرد عليك قريبا.',
      errorMessage: 'حدثت مشكلة في الإرسال. يرجى المحاولة مرة أخرى.',
      downloadApp: 'حمل تطبيقنا',
      downloadDescription: 'احصل على أفضل تجربة على الهاتف المحمول. متاح قريبا.',
      getItOn: 'احصل عليه من',
      googlePlay: 'Google Play',
      downloadOn: 'حمل من',
      appStore: 'App Store',
      privacyPolicy: 'سياسة الخصوصية',
      langButton: 'EN',
      featureDescription: 'تطبيق ذكي يهدف إلى توجيه المواطنين نحو الشواطئ الأكثر أمناً اعتماداً على نظام الرايات والمعلومات الفورية.'
    }
  };

  const t = translations[language];

  useEffect(() => {
    // Simulate loading time (2 seconds)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Set favicon to project logo so the tab shows the app logo
  useEffect(() => {
    try {
      const setFavicon = () => {
        const existing = document.querySelector("link[rel~='icon']");
        const link = existing || document.createElement('link');
        link.type = 'image/png';
        link.rel = 'icon';
        link.href = logoImage;
        if (!existing) document.head.appendChild(link);
      };
      setFavicon();
    } catch (err) {
      // ignore in non-browser environments
    }
  }, []);

  const handleContactClick = (e) => {
    e.preventDefault();
    contactRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendEmail = (e) => {
    e.preventDefault();
    if (!formRef.current) return;
    setSending(true);
    setSendStatus({ type: '', message: '' });

    emailjs
      .sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY
      )
      .then(() => {
        setSendStatus({ type: 'success', message: t.successMessage });
        formRef.current.reset();
      })
      .catch(() => {
        setSendStatus({ type: 'error', message: t.errorMessage });
      })
      .finally(() => setSending(false));
  };

  return (
    <div className="App">
      {/* Loading Page */}
      <LoadingPage fadeOut={!isLoading} />
      {/* Hero Section with Background */}
      <section className="hero-section">
        <div className="background-container">
          <img src={backgroundImage} alt="Background" className="background-image" />
          <div className="background-fade"></div>
        </div>
        
        <div className="content-container">
          {/* Top Navigation Bar */}
          <header className="header-top">
            <div className="header-brand" draggable={false} onDragStart={(e) => e.preventDefault()} onMouseDown={(e) => e.preventDefault()}>
              <img 
                src={headerlogo} 
                alt="Logo" 
                className="header-logo"
                draggable={false}
                onDragStart={(e) => e.preventDefault()}
              />
              <span className="brand-text" draggable={false} onDragStart={(e) => e.preventDefault()}>Side Quest Team</span>
            </div>
            <nav className="header-nav">
              <a href="#who-we-are">{t.whoWeAre}</a>
              <a href="#contact" onClick={handleContactClick}>{t.contactUs}</a>
              <button 
                className="lang-button" 
                onClick={() => setLanguage(language === 'en' ? 'ar' : language === 'ar' ? 'fr' : 'en')}
              >
                {t.langButton}
              </button>
            </nav>
          </header>


        </div>
      </section>

      {/* Feature Section */}
      <section className="feature-section">
        <div className="feature-container">
          <div className="feature-content">
            <div className="feature-logo-wrapper">
              <img 
                src={logoImage} 
                alt="Feature Logo" 
                className="feature-logo"
              />
            </div>
            <div className="feature-text">
              <p className="feature-description">{t.featureDescription}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="who-section" id="who-we-are">
        <div className="who-bg"></div>
        <div className="who-overlay"></div>
        <div className="who-content">
          <div className="who-card">
            <div className="who-text">
              <h2>{t.whoWeAreTitle}</h2>
              <p>{t.whoWeAreText1}</p>
              <p>{t.whoWeAreText2}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="contact-section" id="contact" ref={contactRef}>
        <div className="contact-container">
          <h2 className="contact-title">{t.getInTouch}</h2>
          <p className="contact-description">{t.contactDescription}</p>
          
          <form className="contact-form" ref={formRef} onSubmit={handleSendEmail}>
            <input type="hidden" name="time" value={timestamp} />
            <div className="form-group">
              <input 
                type="text" 
                placeholder={t.yourName} 
                className="form-input"
                name="name"
                required
              />
            </div>
            
            <div className="form-group">
              <input 
                type="email" 
                placeholder={t.yourEmail} 
                className="form-input"
                name="email"
                required
              />
            </div>
            
            <div className="form-group">
              <input 
                type="tel" 
                placeholder={t.phoneNumber} 
                className="form-input"
                name="phone"
              />
            </div>
            
            <div className="form-group">
              <textarea 
                placeholder={t.yourMessage} 
                className="form-textarea"
                rows="6"
                name="message"
                required
              ></textarea>
            </div>
            
            <button type="submit" className="submit-button" disabled={sending}>
              {sending ? t.sending : t.sendMessage}
            </button>

            {sendStatus.message && (
              <div className={`status-message ${sendStatus.type}`}>
                {sendStatus.message}
              </div>
            )}
          </form>
        </div>
      </section>

      {/* Download App Section */}
      <section className="download-section">
        <div className="download-container">
          <h2 className="download-title">{t.downloadApp}</h2>
          <p className="download-description">{t.downloadDescription}</p>
          
          <div className="download-buttons">
            <a href="https://play.google.com/store" className="store-button google-play" target="_blank" rel="noopener noreferrer">
              <div className="button-content">
                <svg className="store-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                </svg>
                <div className="button-text">
                  <span className="button-label">{t.getItOn}</span>
                  <span className="button-store">{t.googlePlay}</span>
                </div>
              </div>
            </a>
            
            <a href="https://www.apple.com/app-store/" className="store-button app-store" target="_blank" rel="noopener noreferrer">
              <div className="button-content">
                <svg className="store-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z" />
                </svg>
                <div className="button-text">
                  <span className="button-label">{t.downloadOn}</span>
                  <span className="button-store">{t.appStore}</span>
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="social-links">
          <a href="#facebook">Facebook</a>
          <span>/</span>
          <a href="https://www.instagram.com/sidequest_dz/" target="_blank" rel="noopener noreferrer">Instagram</a>
          <span>/</span>
          <a href="#linkedin">LinkedIn</a>
        </div>
      </footer>
    </div>
  );
}

export default App;
