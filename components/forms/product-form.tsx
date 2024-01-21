"use client";

import React from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import AlertModal from "@/components/modal/alert-dialog-modal";
import { Trash2Icon } from "lucide-react";

import { cn } from "@/lib/utils";
import { UploadButton } from "@/lib/uploadthing";

import { Product as ProductType } from "@/types";
import { Product as ProductPrismaType } from "@prisma/client";
import { UploadFileResponse } from "uploadthing/client";

import {
  onCreateProduct,
  onDeleteProduct,
  onUpdateProduct,
} from "@/actions/product-actions";
import { toast } from "sonner";

const formSchema = z.object({
  productName: z.string().min(4, {
    message: "Nome do produto deve conter no mínimo 4 caracteres.",
  }),
  productImages: z
    .array(
      z.object({
        value: z.string().url({ message: "Please enter a valid URL." }),
      })
    )
    .nonempty()
    .max(5),
  productQty: z.string(),
});

type ZodSchema = z.infer<typeof formSchema>;

type ProductFormProps = {
  initialData: ProductPrismaType | null;
};

export const ProductForm: React.FC<ProductFormProps> = ({ initialData }) => {
  const params: { produtoId: string } = useParams();
  const router = useRouter();

  const form = useForm<ZodSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          productName: initialData.name,
          productQty: initialData.productQty.toString(),
          productImages: JSON.parse(initialData.images as string).map(
            (image: string) => ({ value: image })
          ),
        }
      : {
          productName: "",
          productImages: [{ value: "" }],
          productQty: "",
        },
  });

  const { fields, append, remove, replace, update } = useFieldArray({
    name: "productImages",
    control: form.control,
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const mappedImages = values.productImages.map((image) => image.value);

    const data: ProductType = {
      name: values.productName,
      images: JSON.stringify(mappedImages),
      productQty: values.productQty,
    };
    try {
      if (initialData) {
        onUpdateProduct(params.produtoId, data)
          .then(() => toast.success("Produto atualizado!"))
          .catch(() => toast.error("Error ao atualizar o produto!"));
      } else {
        onCreateProduct(data)
          .then(() => toast.success("Produto criado!"))
          .catch(() => toast.error("Error ao criar o produto!"));
      }
    } catch (error) {
      console.log(error);
      toast.error(
        "Algo de errado aconteceu, visualize o console para mais informações"
      );
    } finally {
      router.push("/canal");
    }
  }

  const onUploadComplete = (res: UploadFileResponse<null>[]) => {
    const inputArrSize = fields.length;

    const response = res.map((item) => ({ value: item.url }));
    const responseSize = response.length;

    if (inputArrSize === 1 && fields[0].value === "") {
      return update(0, response[0]);
    }

    if (inputArrSize + responseSize <= 5) {
      return append(response);
    }

    if (responseSize === 5) {
      return replace(response);
    }

    if (inputArrSize === 5 && responseSize !== 5) {
      for (let i = 1; i <= responseSize; i++) {
        return update(inputArrSize - i, response[i - 1]);
      }
    }
  };

  const deleteProduct = () => {
    try {
      onDeleteProduct(params.produtoId)
        .then(() => toast.warning("Produto deletado!"))
        .catch(() => toast.error("Error ao deletar o produto!"));
    } catch (error) {
      console.log(error);
      toast.error(
        "Algo de errado aconteceu, visualize o console para mais informações"
      );
    } finally {
      router.push("/canal");
    }
  };

  const title = initialData ? "Editar Produto" : "Criar Produto";
  const buttonText = initialData ? "Editar" : "Criar";
  const deleteButton = (
    <AlertModal
      description="Esta ação é irreversível. Isso irá permanentemente deletar este
    produto e remover seus dados de nosso servidor."
      deleteFunction={deleteProduct}
    >
      <Button variant={"destructive"} className="flex items-center gap-2">
        <span>Deletar Produto</span>
        <Trash2Icon className="w-4 h-4" />
      </Button>
    </AlertModal>
  );

  return (
    <Form {...form}>
      <div className="flex justify-between max-w-[700px] mx-auto">
        <Heading title={title} />
        {initialData && deleteButton}
      </div>
      <Separator className="max-w-[700px] mx-auto" />
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-2 max-w-[700px] border rounded-md p-4 mx-auto flex flex-col"
      >
        <div className="flex gap-4 mb-3">
          <FormField
            control={form.control}
            name="productName"
            render={({ field }) => (
              <FormItem className="basis-3/4">
                <FormLabel>Nome do produto</FormLabel>
                <FormControl>
                  <Input
                    placeholder="PlayStation 4 20th Anniversary Edition  "
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="productQty"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantidade</FormLabel>
                <FormControl>
                  <Input placeholder="10" {...field} type="number" min={1} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {fields.map((field, index) => (
          <div key={index} className="flex gap-2">
            <FormField
              control={form.control}
              key={field.id}
              name={`productImages.${index}.value`}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className={cn(index !== 0 && "sr-only")}>
                    Imagens do Produto
                  </FormLabel>
                  <FormDescription className={cn(index !== 0 && "hidden")}>
                    No máximo 5 imagens, aonde você pode dar upload em nosso
                    servidor ou colar um link do{" "}
                    <Link
                      href={"https://imgur.com/upload"}
                      className="text-primary underline-offset-4 hover:underline"
                    >
                      imgur
                    </Link>{" "}
                    da imagem de sua preferência
                  </FormDescription>
                  <FormControl>
                    <Input {...field} className="" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              variant={"destructive"}
              className="self-end"
              onClick={() => {
                remove(index);
              }}
            >
              <span className="sr-only">Deletar campo de texto</span>
              <Trash2Icon className="w-4 h-4" />
            </Button>
          </div>
        ))}
        <div className="flex gap-4">
          <UploadButton
            className="block text-sm"
            endpoint="productImages"
            onClientUploadComplete={onUploadComplete}
            onUploadError={(error: Error) => {
              alert(`ERROR! ${error.message}`);
            }}
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="h-10 w-fit text-sm"
            onClick={() => append({ value: "" })}
            disabled={fields.length === 5}
          >
            Add URL manualmente
          </Button>
        </div>

        <Button type="submit" className="w-fit ml-auto">
          {buttonText}
        </Button>
      </form>
    </Form>
  );
};
