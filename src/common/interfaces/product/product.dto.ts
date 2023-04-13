import { IProduct } from "./product.interface";

export interface IProductFindResponseDto {
    current_page: number;
    total_pages: number;
    products: IProduct[]
}