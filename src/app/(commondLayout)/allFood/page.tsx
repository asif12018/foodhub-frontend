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

export default async function AllFood({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const resolvedParams = await searchParams;
  const currentPage = Number(resolvedParams.page) || 1;
  const { data, error } = await foodService.getAllFood(
    {
      isFeatured: false,
      limit: 10,
      page: currentPage,
    },
    {
      cache: "no-cache",
    },
  );

  // console.log(data?.data?.pagination);

  const pagination = data?.data?.pagination;
  const totalPages = pagination?.totalPage || 1;

  //helper function

  const createPageURL = (pageNumber: number | string) => {
    return `?page=${pageNumber}`;
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-center mt-5">All Food</h1>
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
