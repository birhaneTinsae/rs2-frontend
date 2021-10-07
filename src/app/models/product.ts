import { Page } from "./user";

export interface Product {
    id: number;
    name: string;
    type: string;
    description: string;
}

export interface ProductResponse {
    "_embedded": {
        productDTOList: Product[];
    }

    page: Page;
}