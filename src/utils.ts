import { format } from 'date-fns';

export function getReadableDate(date: Date): string {
  return format(date, 'EEEE, MMMM do, yyyy');
}
