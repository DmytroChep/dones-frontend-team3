export interface ICategory{
    id: number,
    name: string
}

export interface IProduct{
    id: number,
    title: string,
    price: number,
    img: string,
    category: ICategory,
    description: string,
    color: string,
    _count: {
        orderProduct: number
    }
}