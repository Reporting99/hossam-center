import Image from 'next/image';

// Width = the `sizes` slot, so the logo has its final size before the file arrives (no header
// layout shift); max-width:100% still lets the header shrink it. width/height carry each file's ratio.
const SIZE = 'h-auto w-[120px] min-[769px]:w-[180px] min-[1025px]:w-[200px]';

const Logo = () => (
  <div className="ml-2 flex items-center">
    {/* Light theme logo */}
    <Image
      src="/Website Logo Red.png"  // Light mode logo
      alt="Hossam Maintenance Center Logo"
      width={727}
      height={278}
      sizes="(max-width: 768px) 120px, (max-width: 1024px) 180px, 200px" // Responsive sizes
      className={`${SIZE} dark:hidden`} // Hide in dark mode
    />
    {/* Dark theme logo */}
    <Image
      src="/Website Logo.png" // Dark mode logo
      alt="Hossam Maintenance Center Logo (Dark)"
      width={430}
      height={185}
      sizes="(max-width: 768px) 120px, (max-width: 1024px) 180px, 200px" // Responsive sizes
      className={`${SIZE} hidden dark:block`} // Show only in dark mode
    />
  </div>
);

export default Logo;
