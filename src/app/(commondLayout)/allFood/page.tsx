import { ProductCard1 } from "@/components/product-card1";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { foodService } from "@/services/food.service";
import { categoryService } from "@/services/category.service";
import { CuisineFilter } from "@/components/cuisine-filter";
import CheckboxDiateryPreference from "@/components/dietary-filter";
import { Slider } from "@/components/ui/slider";
import { SliderControlled } from "@/components/module/get all food/slider";

export default async function AllFood({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    cuisine?: string;
    dietary_tags?: string;
  }>;
}) {

  //pagination code
  const resolvedParams = await searchParams;
  const currentPage = Number(resolvedParams.page) || 1;
  const cuisine = resolvedParams.cuisine;
  const dietary_tags = resolvedParams.dietary_tags;

  //-----------------
  const { data: categoriesData } = await categoryService.getAllCategory();
  const { data, error } = await foodService.getAllFood(
    {
      isFeatured: false,
      limit: 10,
      page: currentPage,
      cuisine: cuisine,
      dietary_tags: dietary_tags ? dietary_tags.split(",") : undefined,
    },
    {
      cache: "no-cache",
    },
  );

  //min max price

  const {data:priceData, error:priceError} = await foodService.getMinMaxPrice();


  //pagination code

  const pagination = data?.data?.pagination;
  const totalPages = pagination?.totalPage || 1;

  //----------------------

  //helper function for pagination

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams();
    if (cuisine) params.set("cuisine", cuisine);
    if (dietary_tags) params.set("dietary_tags", dietary_tags);
    params.set("page", pageNumber.toString());
    return `?${params.toString()}`;
  };

  //------------------------------------

  return (
    <div>
      <h1 className="text-2xl font-bold text-center mt-5">All Food</h1>

      <CuisineFilter categories={categoriesData?.data || []} />
      <div className="my-5 flex items-center justify-center gap-2">
        <CheckboxDiateryPreference />
      </div>

      <div className="my-10">
          <SliderControlled min={priceData.min.price || 0} max={priceData.max.price || 2000} step={5}/>
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

      <div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href={currentPage <= 1 ? "#" : createPageURL(currentPage - 1)}
                className={
                  currentPage <= 1 ? "pointer-events-none opacity-50" : ""
                }
              />
            </PaginationItem>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  href={createPageURL(page)}
                  isActive={currentPage === page}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}

            {totalPages > 3 && <PaginationEllipsis />}

            <PaginationItem>
              <PaginationNext
                href={
                  currentPage >= totalPages
                    ? "#"
                    : createPageURL(currentPage + 1)
                }
                className={
                  currentPage >= totalPages
                    ? "pointer-events-none opacity-50"
                    : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
