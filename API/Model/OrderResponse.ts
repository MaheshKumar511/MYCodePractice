export type Order = {
    _id: string;
    orderById: string;
    orderBy: string;
    productOrderedId: string;
    productName: string;
    country: string;
    productDescription: string;
    productImage: string;
    orderDate: string | null;
    orderPrice: string;
    __v: number;
};

export type OrderResponse = {
    data: Order[];
    count: number;
    message: string;
};