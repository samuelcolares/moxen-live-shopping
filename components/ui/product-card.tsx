import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Gallery from "@/components/gallery";
import { ParsedLiveProduct } from "@/types";

export const ProductCard: React.FC<ParsedLiveProduct> = ({
  name,
  productQty,
  images,
}) => {
  return (
    <Card className="bg-transparent flex flex-col">
      <CardHeader className="py-2 px-4">
        <CardTitle className="text-2xl lg:w-auto w-3/4">{name}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col justify-between flex-1 px-4">
        <p className="mb-4">
          Quantidades em oferta:{" "}
          {productQty === 1 ? "1 unidade." : `${productQty} unidades.`}
        </p>

        <div className="w-full mx-auto">
          <Gallery images={images} title={name} />
        </div>
      </CardContent>
    </Card>
  );
};