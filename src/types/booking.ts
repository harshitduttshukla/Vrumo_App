export interface Booking {
    id: string;
    serviceId: string;
    vehicleType: string;
    vehicleModel: string;
    date: string;
    time: string;
    price: number;
    status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
}
