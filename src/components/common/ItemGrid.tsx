import { twMerge } from 'tailwind-merge';
import type { ItemGrid as ItemGridType } from '~/shared/types';
import CTA from './CTA';

const renderDescriptionLine = (line: any) => {
  if (typeof line !== 'string') return line;
  const phoneRegex = /(07\s\d{4}\s\d{4}|07\s\d{3}\s\d{4})/g;
  const parts = line.split(phoneRegex);
  return parts.map((part, i) => {
    if (/(07\s\d{4}\s\d{4}|07\s\d{3}\s\d{4})/.test(part)) {
      return (
        <span key={i} dir="ltr" className="inline-block">
          {part}
        </span>
      );
    }
    return part;
  });
};

const ItemGrid = ({
  id,
  items,
  columns,
  defaultColumns,
  defaultIcon: DefaultIcon,
  containerClass,
  panelClass,
  iconClass,
  titleClass,
  descriptionClass,
  actionClass,
}: ItemGridType) => {
  return (
    <>
      {items && (
        <div
          className={twMerge(
            `grid mx-auto gap-8 md:gap-y-12 ${
              (columns || defaultColumns) === 4
                ? 'lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2'
                : (columns || defaultColumns) === 3
                ? 'lg:grid-cols-3 sm:grid-cols-2'
                : (columns || defaultColumns) === 2
                ? 'sm:grid-cols-2'
                : 'max-w-4xl'
            }`,
            containerClass,
          )}
        >
          {items.map(({ title, description, icon: Icon, callToAction }, index) => (
            <div key={id ? `item-${id}-${index}` : `item-grid-${index}`}>
              <div className={(twMerge('flex flex-row max-w-md'), panelClass)}>
                <div className="flex justify-center">
                  {Icon ? (
                    <Icon className={twMerge('w-6 h-6 mr-2 rtl:mr-0 rtl:ml-2', iconClass)} />
                  ) : DefaultIcon ? (
                    <DefaultIcon className={twMerge('w-6 h-6 mr-2 rtl:mr-0 rtl:ml-2', iconClass)} />
                  ) : null}
                </div>
                <div className="mt-0.5">
                  {title && <h3 className={twMerge('text-xl font-bold', titleClass)}>{title}</h3>}
                  {description && (
                    <div
                      className={twMerge(`text-gray-600 dark:text-slate-400 ${title ? 'mt-3' : ''}`, descriptionClass)}
                    >
                      {Array.isArray(description) ? (
                        description.map((descLine, lineIndex) => (
                          <p key={`text-description-${lineIndex}`}>{renderDescriptionLine(descLine)}</p>
                        ))
                      ) : (
                        <p>{renderDescriptionLine(description)}</p>
                      )}
                    </div>
                  )}
                  {callToAction && (
                    <CTA
                      callToAction={callToAction}
                      linkClass={twMerge(
                        `${
                          title || description ? 'mt-3' : ''
                        } text-primary font-bold text-red-600 hover:underline dark:text-gray-200 cursor-pointer`,
                        actionClass,
                      )}
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ItemGrid;
