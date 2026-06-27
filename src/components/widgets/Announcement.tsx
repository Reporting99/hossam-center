import { getGlobalData } from '~/shared/data/global.data';

interface AnnouncementProps {
  lang: string;
}

const Announcement = ({ lang }: AnnouncementProps) => {
  const { announcementData } = getGlobalData(lang);
  const { title, callToAction, callToAction2 } = announcementData;

  return (
    <div className="hidden overflow-hidden text-ellipsis whitespace-nowrap border-b border-blue-900 bg-blue-900 px-3 py-2 text-sm text-gray-200 md:block">
      <span className="bg-blue-800 py-0.5 px-1 text-xs font-semibold">{title}</span>{' '}
      {callToAction && callToAction.text && callToAction.href && (
        <a
          href={callToAction.href}
          className="cursor-pointer text-gray-100 hover:underline"
        >
          {callToAction.icon && <callToAction.icon className="mr-1 -ml-1.5 h-5 w-5" />} {callToAction.text}
        </a>
      )}
      {callToAction2 && callToAction2.text && callToAction2.href && (
        <a
          href={callToAction2.href}
          target="_blank"
          rel="noreferrer"
          className="float-right rtl:float-left"
          title={callToAction2.text}
        >
          <img
            src="https://res.cloudinary.com/dvcfefmys/image/upload/v1728119218/follow-us-on-facebook_wm4rcz.svg"
            alt="Follow @onWidget"
            width="90"
            height="10"
          />
        </a>
      )}
    </div>
  );
};

export default Announcement;

