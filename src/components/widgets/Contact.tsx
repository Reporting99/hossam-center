import Image from 'next/image';
import Headline from '../common/Headline';
import { ContactProps } from '~/shared/types';
import WidgetWrapper from '../common/WidgetWrapper';

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

const Contact = ({ header, content, items, image, id, hasBackground = false, form }: ContactProps) => (
  <WidgetWrapper id={id ? id : ''} hasBackground={hasBackground} containerClass="max-w-6xl">
    {header && <Headline header={header} titleClass="text-3xl sm:text-5xl" />}
    <div className="grid md:grid-cols-2 gap-10 items-stretch justify-center">
      
      {/* Contact Information */}
      <div className="pr-6">
        {content && <p className="mt-3 mb-12 text-lg text-gray-600 dark:text-slate-400">{content}</p>}
        <ul className="mb-6 md:mb-0">
          {items &&
            items.map(({ title, description, icon: Icon }, index) => (
              <li key={`item-contact-${index}`} className="flex">
                <div className="flex h-10 w-10 items-center justify-center rounded bg-black text-gray-50">
                  {Icon && <Icon className="h-6 w-6" />}
                </div>
                <div className="ml-4 rtl:ml-0 rtl:mr-4 mb-4">
                  <h3 className="mb-2 text-lg font-medium leading-6 text-gray-900 dark:text-white">{title}</h3>
                  {Array.isArray(description) ? (
                    description.map((descLine, lineIndex) => (
                      <p key={`text-description-${lineIndex}`} className="text-gray-600 dark:text-slate-400">
                        {renderDescriptionLine(descLine)}
                      </p>
                    ))
                  ) : (
                    <p className="text-gray-600 dark:text-slate-400">{renderDescriptionLine(description)}</p>
                  )}
                </div>
              </li>
            ))}
        </ul>
      </div>

      {/* Image */}
      {image && (
        <div className="flex justify-center items-center">
          <Image
            src={image.src}
            alt={image.alt}
            width={500}
            height={500}
            className="rounded-lg shadow-lg"
            placeholder="blur"
            objectFit="cover"
          />
        </div>
      )}

      {/* Form Section */}
      {form && (
        <div className="mt-8 md:col-span-2">
          <h3 className="text-2xl font-bold mb-4">{form.title}</h3>
          <form className="grid gap-6">
            {form.inputs.map((input, index) => (
              <div key={index} className="flex flex-col">
                <label className="mb-2 font-semibold text-gray-800 dark:text-white">{input.label}</label>
                {input.type === 'textarea' ? (
                  <textarea
                    className="p-3 border border-gray-300 rounded-md dark:bg-slate-800 dark:border-slate-600"
                    placeholder={input.placeholder}
                  />
                ) : (
                  <input
                    type={input.type}
                    className="p-3 border border-gray-300 rounded-md dark:bg-slate-800 dark:border-slate-600"
                    placeholder={input.placeholder}
                  />
                )}
              </div>
            ))}
            <button type={form.btn.type} className="btn btn-primary mt-4">
              {form.btn.title}
            </button>
          </form>
        </div>
      )}
    </div>
  </WidgetWrapper>
);

export default Contact;
