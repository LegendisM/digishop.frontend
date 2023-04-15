export enum ProductCategories {
    GENERAL = "GENERAL",
    SPECIAL = "SPECIAL",
    POPULAR = "POPULAR",
    MODERN = "MODERN"
}

export interface IProduct {
    _id: string;
    name: string;
    category: string;
    description: string;
    image: string;
    price: number;
    stock: number;
}