"use client";

import { useRef, useState, useEffect } from 'react';
import { IconRss } from '@tabler/icons-react';
import { useOnClickOutside } from '~/hooks/useOnClickOutside';
import ToggleDarkMode from '~/components/atoms/ToggleDarkMode';
import Link from 'next/link';
import Logo from '~/components/atoms/Logo';
import ToggleMenu from '../atoms/ToggleMenu';
import { getGlobalData } from '~/shared/data/global.data';
import { usePathname } from 'next/navigation';
import { getLocalizedHref } from '~/utils/permalinks';

interface HeaderProps {
  lang: string;
}

const Header = ({ lang }: HeaderProps) => {
  const { headerData } = getGlobalData(lang);
  const { links, actions, isSticky, showToggleTheme, showRssFeed, position } = headerData;

  const ref = useRef<HTMLUListElement | null>(null);
  const pathname = usePathname();

  const updatedIsDropdownOpen =
    links &&
    links.map(() => {
      return false;
    });

  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean[]>(updatedIsDropdownOpen as boolean[]);
  const [isToggleMenuOpen, setIsToggleMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    setIsToggleMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isToggleMenuOpen) {
      document.body.classList.add('mobile-menu-open');
    } else {
      document.body.classList.remove('mobile-menu-open');
    }
    return () => {
      document.body.classList.remove('mobile-menu-open');
    };
  }, [isToggleMenuOpen]);

  const handleDropdownOnClick = (index: number) => {
    setIsDropdownOpen((prevValues) => {
      const newValues = [...(prevValues as boolean[])];
      newValues.forEach((value, i) => {
        if (value === true) {
          newValues[i] = false;
        } else {
          newValues[i] = i === index;
        }
      });
      return newValues;
    });
  };

  const handleCloseDropdownOnClick = (index: number) => {
    setIsDropdownOpen((prevValues) => {
      const newValues = [...(prevValues as boolean[])];
      newValues[index] = false;
      return newValues;
    });
  };

  const handleToggleMenuOnClick = () => {
    setIsToggleMenuOpen(!isToggleMenuOpen);
  };

  useOnClickOutside(ref, () => {
    setIsDropdownOpen(updatedIsDropdownOpen as boolean[]);
  });

  const getLanguageToggleLink = () => {
    if (!pathname) return '/';
    const segments = pathname.split('/');
    if (segments[1] === 'ar') {
      segments[1] = 'en';
    } else if (segments[1] === 'en') {
      segments[1] = 'ar';
    } else {
      return `/en${pathname}`;
    }
    return segments.join('/');
  };

  return (
    <header
      className={`top-0 z-40 mx-auto w-full flex-none bg-white transition-all duration-100 ease-in dark:bg-black md:bg-white/90 md:backdrop-blur-sm dark:md:bg-black ${
        isSticky ? 'sticky' : 'relative'
      } ${isToggleMenuOpen ? 'h-screen md:h-auto' : 'h-auto'} border-b border-gray-600`}
      id="header"
    >
      <div className="mx-auto w-full max-w-7xl md:flex md:justify-between md:py-3.5 md:px-4">
        <div
          className={`flex justify-between py-3 px-3 md:py-0 md:px-0 ${
            isToggleMenuOpen
              ? 'md:bg-transparent md:dark:bg-transparent md:border-none bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-600'
              : ''
          }`}
        >
          <Link
            className="flex items-center"
            href={getLocalizedHref('/', lang)}
            onClick={() =>
              isToggleMenuOpen ? handleToggleMenuOnClick() : setIsDropdownOpen(updatedIsDropdownOpen as boolean[])
            }
          >
            <Logo />
          </Link>
          <div className="flex items-center md:hidden">
            <ToggleMenu handleToggleMenuOnClick={handleToggleMenuOnClick} isToggleMenuOpen={isToggleMenuOpen} />
          </div>
        </div>
        <nav
          className={`${isToggleMenuOpen ? 'block px-3' : 'hidden'} h-screen md:w-full ${
            position === 'right' ? 'justify-end' : position === 'left' ? 'justify-start' : 'justify-center'
          } w-auto overflow-y-auto dark:text-slate-200 md:mx-5 md:flex md:h-auto md:items-center md:overflow-visible`}
          aria-label="Main navigation"
        >
          <ul
            ref={ref}
            className="flex w-full flex-col mt-2 mb-36 md:m-0 text-xl md:w-auto md:flex-row md:self-center md:pt-0 md:text-base"
          >
            {links && links.map(({ label, href, icon: Icon, links }, index) => (
              <li key={`item-link-${index}`} className={links?.length ? 'dropdown' : ''}>
                {links && links.length ? (
                  <>
                    <Link
                      className="flex items-center px-4 py-3 font-medium transition duration-150 ease-in-out hover:text-gray-900 dark:hover:text-white"
                      onMouseOver={() => handleDropdownOnClick(index)} // Open dropdown on hover
                      onClick={() =>
                        isToggleMenuOpen ? handleToggleMenuOnClick() : handleCloseDropdownOnClick(index)
                      }
                      href={getLocalizedHref('/services', lang)}
                    >
                      {label}
                      {Icon && (
                        <Icon
                          className={`${
                            isDropdownOpen[index] ? 'rotate-180' : ''
                          } ml-0.5 rtl:ml-0 rtl:mr-0.5 hidden h-3.5 w-3.5 md:inline`}
                        />
                      )}
                    </Link>
                    <ul
                      className={`${
                        isDropdownOpen[index] ? 'block' : 'md:hidden'
                      } rounded pl-4 font-medium drop-shadow-xl md:absolute md:min-w-[200px] md:bg-white/90 md:pl-0 md:backdrop-blur-md dark:md:bg-slate-900/90 md:border md:border-gray-200 md:dark:border-slate-700`}
                    >
                      {links.map(({ label: label2, href: href2 }, index2) => (
                        <li key={`item-link-${index2}`}>
                          <Link
                            className="whitespace-no-wrap block py-2 px-5 first:rounded-t last:rounded-b dark:hover:bg-gray-700 md:hover:bg-gray-200"
                            href={href2 as string}
                            onClick={() =>
                              isToggleMenuOpen ? handleToggleMenuOnClick() : handleCloseDropdownOnClick(index)
                            }
                          >
                            {label2}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <Link
                    className="flex items-center px-4 py-3 font-medium transition duration-150 ease-in-out hover:text-gray-900 dark:hover:text-white"
                    href={href as string}
                    onClick={() => (isToggleMenuOpen ? handleToggleMenuOnClick() : handleDropdownOnClick(index))}
                  >
                    {label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
        <div
          className={`${
            isToggleMenuOpen ? 'block' : 'hidden'
          } fixed bottom-0 left-0 w-full justify-end p-3 md:static md:mb-0 md:flex md:w-auto md:self-center md:p-0 md:bg-transparent md:dark:bg-transparent md:border-none bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-600`}
        >
          <div className="flex w-full items-center justify-between md:w-auto gap-4">
            {showToggleTheme && <ToggleDarkMode />}
            
            {/* Language Switcher */}
            <Link
              href={getLanguageToggleLink()}
              className="text-xs font-bold uppercase py-2 px-3 rounded border border-gray-300 hover:bg-gray-100 dark:border-slate-700 dark:hover:bg-slate-800 text-gray-800 dark:text-slate-200 transition-colors"
            >
              {lang === 'ar' ? 'English' : 'العربية'}
            </Link>

            {showRssFeed && (
              <Link
                className="text-muted inline-flex items-center rounded-lg p-2.5 text-sm hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                aria-label="RSS Feed"
                href=""
              >
                <IconRss className="h-5 w-5" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

