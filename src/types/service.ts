export interface Service {
    id: string;
    name: string;
    description: string;
    price: number;
    image: any;
    category: 'car' | 'bike';
}
