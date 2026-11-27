'use client';

import { useId } from 'react';
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import useCollapse from '~/hooks/useCollapse';
import { CollapseProps } from '~/shared/types';

const Collapse = ({ items, classCollapseItem, iconUp, iconDown }: CollapseProps) => {
  const { activeIndex, handleSetIndex } = useCollapse();
  // Unique per accordion: a page can render several (FAQ tabs), and ids must not repeat.
  const uid = useId();

  return (
    <>
      {items.map(({ title, description }, index) => (
        <div
          key={`accordion-${index}`}
          onClick={() => handleSetIndex(index)}
          className="mx-auto max-w-3xl select-none bg-transparent text-base text-gray-700"
        >
          <div className={classCollapseItem}>
            <div
              className="align-center flex justify-between"
              id={`${uid}-heading-${index}`}
              aria-disabled="false"
              aria-expanded={activeIndex === index}
              aria-controls={`${uid}-panel-${index}`}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleSetIndex(index);
                }
              }}
            >
              <h2 className="w-full pr-2 text-lg font-medium leading-6 text-gray-900 dark:text-slate-300">{title}</h2>
              {iconDown && iconUp ? (
                activeIndex === index ? (
                  iconUp
                ) : (
                  iconDown
                )
              ) : activeIndex === index ? (
                <IconChevronUp className="h-6 w-6 text-primary-600 dark:text-slate-200" />
              ) : (
                <IconChevronDown className="h-6 w-6 text-primary-600 dark:text-slate-200" />
              )}
            </div>
            {/* Always in the HTML (crawlers and answer engines read the FAQ that the JSON-LD describes);
                closed panels are hidden exactly as before. */}
            <div
              className="mt-3 select-none"
              aria-labelledby={`${uid}-heading-${index}`}
              id={`${uid}-panel-${index}`}
              hidden={activeIndex !== index}
            >
              <p className="mt-2 text-gray-600 dark:text-slate-400">{description}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Collapse;
