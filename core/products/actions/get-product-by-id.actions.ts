import { API_URL, productsApi } from "@/core/api/productsApi"
import { Product } from "../interface/product.interface";

export const getProductById = async(id:string):Promise<Product>=>{

    try {

        const {data} = await productsApi.get<Product>(`/products/${id}`);
        return{
            ...data,
            images: data.images.map((image)=>`${API_URL}/file/product/${image}`)
        }
        
    } catch (error) {
        throw new Error(`Product with id ${id} no found`)
    }
}