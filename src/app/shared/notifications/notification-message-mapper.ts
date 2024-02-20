import { NotificationMessageCodeEnum } from './notification-message-code.enum';

export type NotificationMessageMapperType = {
  [key in NotificationMessageCodeEnum]: string;
};

export const NotificationMessageMapper: NotificationMessageMapperType = {
  [NotificationMessageCodeEnum.LOGGED_IN]: 'Logged in',
  [NotificationMessageCodeEnum.LOGGED_OUT]: 'Logged out',
  [NotificationMessageCodeEnum.CREATED]: 'Created',
  [NotificationMessageCodeEnum.CATEGORY_CREATED]: 'Created category',
  [NotificationMessageCodeEnum.CATEGORY_UPDATED]: 'Updated category',
  [NotificationMessageCodeEnum.CATEGORY_DELETED]: 'Deleted category',
};
