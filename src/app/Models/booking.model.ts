export interface Booking {
  id: number;
  roomId: number;
  checkInDate: string;
  checkOutDate: string;
  specialRequestIds: number[];
  guestName: string;
  isRecurring: boolean;
}
