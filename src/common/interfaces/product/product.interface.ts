export interface IProduct {
    _id: string;
    name: string;
    category: string[];
    description: string;
    price: number;
    stock: number;
    cover: string;
    images: string[];
}