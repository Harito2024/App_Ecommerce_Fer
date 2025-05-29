import { getProductById } from "@/core/products/actions/get-product-by-id.actions"
import { useQuery } from "@tanstack/react-query"



export const useProduct = (producId: string) => {
    const productQuery = useQuery({
        queryKey:['products', producId],
        queryFn:()=> getProductById(producId),
        staleTime:1000*60*60
    })
    //Mutacion

    //Mantener el ID del producto en caso de ser uno nuevo
  
    return {
        productQuery
  }
}