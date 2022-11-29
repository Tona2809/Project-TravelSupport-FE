export interface Booking {
  totalPeople?: number;
  stayId?: string;
  checkinDate?: Date;
  checkoutDate?: Date;
  [key: string]: any;
}
