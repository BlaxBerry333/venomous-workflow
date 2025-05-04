import { dayjsInstance, DEFAULT_DAYJS_LOCALE } from "../languages/helpers";

export default function handleFormatDatetime(
  date: string | Date,
  options?: { timezone?: string; locale: string },
) {
  let instance = dayjsInstance(date);
  if (options?.timezone) {
    instance = instance.tz(options?.timezone || dayjsInstance.tz.guess());
  }
  if (options?.locale) {
    instance.locale(options?.locale || DEFAULT_DAYJS_LOCALE);
  }

  return {
    DateTime: instance.format("YYYY-MM-DD HH:mm:ss"),
    Date: instance.format("YYYY-MM-DD"),
    Time: instance.format("HH:mm:ss"),
    FromNow: instance.fromNow(),
  };
}
