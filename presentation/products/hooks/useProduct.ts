import { updateCreateProduct } from '@/core/products/actions/create-update-product.actions';
import { getProductById } from '@/core/products/actions/get-product-by-id.actions';
import { Product } from '@/core/products/interface/product.interface';
import { useCameraStore } from '@/presentation/store/useCameraStore';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRef } from 'react';
import { Alert } from 'react-native';

export const useProduct = (productId: string) => {

  const {clearImages} = useCameraStore()
  const queryClient = useQueryClient();
  const productIdRef = useRef(productId); // new / UUID

  const productQuery = useQuery({
    queryKey: ['products', productId],
    queryFn: () => getProductById(productId),
    staleTime: 1000 * 60 * 60, // 1 hora
  });

  // Mutación
  const productMutation = useMutation({
    mutationFn: async (data: Product) =>
      updateCreateProduct({
        ...data,
        id: productIdRef.current,
      }),

    onSuccess(data: Product) {
      productIdRef.current = data.id;
      clearImages()

      queryClient.invalidateQueries({
        queryKey: ['products', 'infinite'],
      });
      queryClient.invalidateQueries({
        queryKey: ['products', data.id],
      });

      Alert.alert('Producto guardado', `${data.title} se guardo correctamente`);
    },
  });

  // Mantener el ID del producto en caso de ser uno nuevo

  return {
    productQuery,
    productMutation,
  };
};