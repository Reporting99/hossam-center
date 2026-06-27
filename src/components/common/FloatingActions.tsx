'use client';

import { useState, useEffect } from 'react';
import { IconBrandWhatsapp, IconPhone, IconArrowUp, IconX } from '@tabler/icons-react';

interface FloatingActionsProps {
  lang: string;
}

export default function FloatingActions({ lang }: FloatingActionsProps) {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showCallDropdown, setShowCallDropdown] = useState(false);
  const [hideContactButtons, setHideContactButtons] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const footerElement = document.getElementById('footer');
    if (!footerElement) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setHideContactButtons(entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0.1,
      }
    );

    observer.observe(footerElement);
    return () => {
      observer.unobserve(footerElement);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const isRtl = lang === 'ar';

  return (
    <>
      {/* Contact Actions (WhatsApp & Call) */}
      <div
        data-floating-actions
        className={`fixed bottom-6 z-50 flex flex-col gap-3 transition-all duration-300 ${
          hideContactButtons ? 'opacity-0 pointer-events-none scale-90' : 'opacity-100 scale-100'
        } ${isRtl ? 'left-6 items-start' : 'right-6 items-end'}`}
      >
        {/* Call Dropdown Menu */}
        {showCallDropdown && (
          <div
            className="flex flex-col gap-2 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg p-3 shadow-xl mb-1 animate-fade-in text-sm font-semibold min-w-[180px]"
            style={{ bottom: '100%' }}
          >
            <div className="flex justify-between items-center border-b border-gray-100 dark:border-slate-800 pb-1 mb-1 text-gray-500 dark:text-gray-400">
              <span>{isRtl ? 'اتصل بنا' : 'Call Us'}</span>
              <button
                onClick={() => setShowCallDropdown(false)}
                className="hover:text-red-500 transition-colors"
              >
                <IconX className="h-4 w-4" />
              </button>
            </div>
            <a
              href="tel:+962797996020"
              className="flex items-center gap-2 py-1.5 px-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded text-gray-800 dark:text-slate-200 transition-colors"
            >
              <IconPhone className="h-4 w-4 text-primary-600" />
              <span dir="ltr">07 9799 6020</span>
            </a>
            <a
              href="tel:+962795328713"
              className="flex items-center gap-2 py-1.5 px-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded text-gray-800 dark:text-slate-200 transition-colors"
            >
              <IconPhone className="h-4 w-4 text-primary-600" />
              <span dir="ltr">07 9532 8713</span>
            </a>
          </div>
        )}

        <div className="flex flex-col gap-3">
          {/* Call Button */}
          <button
            onClick={() => setShowCallDropdown(!showCallDropdown)}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-transform hover:scale-110 active:scale-95 focus:outline-none"
            title={isRtl ? 'اتصل بنا' : 'Call us'}
            aria-label="Call Phone Numbers"
          >
            <IconPhone className="h-6 w-6" />
          </button>

          {/* WhatsApp Button */}
          <a
            href="https://wa.me/962797996020"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500 text-white shadow-lg hover:bg-green-600 transition-transform hover:scale-110 active:scale-95 focus:outline-none"
            title={isRtl ? 'تواصل عبر واتساب' : 'Chat on WhatsApp'}
            aria-label="WhatsApp Link"
          >
            <IconBrandWhatsapp className="h-7 w-7" />
          </a>
        </div>
      </div>

      {/* Back to Top Button Container (opposite side) */}
      {showScrollTop && (
        <div
          data-floating-actions
          className={`fixed bottom-6 z-50 flex flex-col gap-3 transition-all duration-300 ${
            isRtl ? 'right-6 items-end' : 'left-6 items-start'
          }`}
        >
          <button
            onClick={scrollToTop}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-800 text-white shadow-lg hover:bg-gray-700 transition-transform hover:scale-110 active:scale-95 focus:outline-none dark:bg-slate-800 dark:hover:bg-slate-700"
            title={isRtl ? 'الرجوع للأعلى' : 'Back to top'}
            aria-label="Back to Top"
          >
            <IconArrowUp className="h-6 w-6" />
          </button>
        </div>
      )}
    </>
  );
}
