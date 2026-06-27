"use client";
import Image from 'next/image';

// Define the images and logos
const LOGOS = [
  {
    src: 'https://res.cloudinary.com/dvcfefmys/image/upload/v1727938115/Mitasu-logo_dwenyb.png',
    alt: 'Mitasu Logo',
  },
  {
    src: 'https://res.cloudinary.com/dvcfefmys/image/upload/v1727938115/ngk-logo_llqcec.png',
    alt: 'NGK Logo',
  },
  {
    src: 'https://res.cloudinary.com/dvcfefmys/image/upload/v1727938115/Honda-Logo_rzd5wr.png',
    alt: 'Honda Logo',
  },
  {
    src: 'https://res.cloudinary.com/dvcfefmys/image/upload/v1727938115/bosch-logo_c1vm7h.png',
    alt: 'Bosch Logo',
  },
  {
    src: 'https://res.cloudinary.com/dvcfefmys/image/upload/v1727938114/KYB-Logo_vsxclh.png',
    alt: 'KYB Logo',
  },
  {
    src: 'https://res.cloudinary.com/dvcfefmys/image/upload/v1727938114/Honda_Genuine_logo_is45bm.webp',
    alt: 'Honda Genuine Logo',
  },
  {
    src: 'https://res.cloudinary.com/dvcfefmys/image/upload/v1727938114/ravenol-logo_tu1r4q.png',
    alt: 'Ravenol Logo',
  },
];

export const InfiniteSlider = () => {
  return (
    <div className="relative w-full overflow-hidden" dir="ltr">
      {/* Main slider div */}
      <div className="animate-infinite-slider flex">
        {LOGOS.map((logo, index) => (
          <div
            className="slide flex items-center justify-center p-4"
            key={index}
          >
            <div className="image-wrapper">
              <Image src={logo.src} alt={logo.alt} width={150} height={75} className="slider-image" />
            </div>
          </div>
        ))}
        {/* Duplicate the logos for seamless infinite scrolling */}
        {LOGOS.map((logo, index) => (
          <div
            className="slide flex items-center justify-center p-4"
            key={index + LOGOS.length}
          >
            <div className="image-wrapper">
              <Image src={logo.src} alt={logo.alt} width={150} height={75} className="slider-image" />
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .animate-infinite-slider {
          display: flex;
          width: max-content; /* Ensure the slider fits all logos */
          animation: scroll 30s linear infinite; /* Longer time for slower scroll */
        }

        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%); /* Shift by 50% for seamless scroll */
          }
        }

        .slide {
          flex-shrink: 0;
          width: 150px;
        }

        .image-wrapper {
          filter: grayscale(100%); /* Apply grayscale */
          transition: filter 0.3s ease-in-out; /* Smooth transition on hover */
        }

        .image-wrapper:hover {
          filter: grayscale(0%); /* Remove grayscale on hover */
        }

        @media (min-width: 768px) {
          .slide {
            width: 200px;
          }
        }

        @media (min-width: 1024px) {
          .slide {
            width: 250px;
          }
        }
      `}</style>
    </div>
  );
};
