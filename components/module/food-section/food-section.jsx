import { ProductCard1 } from "@/components/product-card1";
import { foodService } from "@/services/food.service";


export default async function FoodSection() {
  const { data, error } = await foodService.getAllFood(
    {
      isFeatured: false,
      limit: 3,
      page: 1,
    },
    {
      cache: "no-cache",
    },
  );



  return (
    <div>
      <div className="flex justify-center items-center flex-col gap-2">
        <h1 className="text-4xl font-bold text-center">Discover Food</h1>
        <p className="text-gray-600 text-center">
          Explore our wide range of delicious food options
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.data?.data?.map((food) => (
          <ProductCard1
            key={food.id}
            product={{
              name: food.name,
              description: food.description,
              price: {
                regular: food.price,
                currency: "BDT",
              },
              image: {
                src: food.image?.[0] || "https://placehold.co/600x400",
                alt: food.name,
              },
              cuisine: food.cuisine,
              dietary_tags: food.dietary_tags,
              preparation_time: food.prepTimeMinutes,
              link: `/food/${food.id}`,
            }}
            className="w-full"
          />
        ))}
      </div>
    </div>
  );
}
