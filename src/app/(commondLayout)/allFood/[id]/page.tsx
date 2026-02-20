


import { ProductDetail1 } from '@/components/product-detail1'
import { foodService } from '@/services/food.service';
import foodSingleData from '@/src/constants/food.types';


export default async function FoodDetailsPage({params}:{params: Promise<{id: string}>}) {
  const {id} = await params;

  const {data, error} = await foodService.getFoodById(id);

  return (
    <div className='container mx-auto'>
        <ProductDetail1 key={data.data.id as string} food={data.data as foodSingleData}></ProductDetail1>
    </div>
  )
}
