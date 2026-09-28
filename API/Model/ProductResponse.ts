export type Product = {
    _id: string;
    productName: string;
    productCategory: string;
    productSubCategory: string;
    productPrice: number;
    productDescription: string;
    productImage: string;
    productRating: string;
    productTotalPrice?: number;
    productTotalOrders?: string;
    productStatus?: boolean;
    productFor?: string;
    productAddedBy?: string;
    __v?: number;
};

export type ProductResponse = {
    message: string;
    data: Product[];
};

export type ProductDetailsResponse = {
    message: string;
    data: Product;
};