"use client";

import React from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import * as z from "zod";
import dayjs from "dayjs";

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
import AlertModal from "@/components/alert-dialog-modal";
import { Trash2Icon, Calendar as CalendarIcon } from "lucide-react";

import { UploadDropzone } from "@/lib/uploadthing";

import { Live as LivePrismaType, Product } from "@prisma/client";
import { Live as LiveType } from "@/types";
import { UploadFileResponse } from "uploadthing/client";

import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  onCreateLive,
  onDeleteLive,
  onUpdateLive,
} from "@/actions/live-actions";
import { cn } from "@/lib/utils";
import { DialogClose } from "@/components/ui/dialog";

const formSchema = z.object({
  liveTitle: z.string().min(4, {
    message: "Nome da live deve conter no mínimo 4 caracteres.",
  }),
  liveDescription: z.string().min(10, {
    message: "Descrição da live deve conter no mínimo 10 caracteres.",
  }),
  products: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "Você precisa selecionar ao menos 1 produto.",
  }),
  dates: z.object({
    liveDateStart: z
      .string()
      .min(1, { message: "Você precisa selecionar uma data." }),
    liveDateEnd: z
      .string()
      .min(1, { message: "Você precisa selecionar uma data." }),
  }),
  liveThumbnailUrl: z
    .array(
      z.object({
        value: z.string().url({ message: "Por favor coloque uma URL válida." }),
      })
    )
    .nonempty(),
});

type ZodSchema = z.infer<typeof formSchema>;

type LiveFormProps = {
  isModal?: boolean;
  initialData: LivePrismaType | null;
  products: Product[];
};

export const LiveForm: React.FC<LiveFormProps> = ({
  initialData,
  products,
  isModal = false,
}) => {
  const params: { liveId: string } = useParams();
  const router = useRouter();

  const form = useForm<ZodSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          liveTitle: initialData.title,
          liveDescription: initialData.description,
          dates: {
            liveDateStart: dayjs(initialData.dateStart).format(
              "YYYY-MM-DDTHH:mm"
            ),
            liveDateEnd: dayjs(initialData.dateEnd).format("YYYY-MM-DDTHH:mm"),
          },
          liveThumbnailUrl: [{ value: initialData.thumbnailUrl }],
          products: JSON.parse(initialData.products as string).map(
            (product: Product) => product.id
          ),
        }
      : {
          liveTitle: "",
          liveDescription: "",
          dates: {
            liveDateStart: "",
            liveDateEnd: "",
          },
          liveThumbnailUrl: [{ value: "" }],
          products: [],
        },
  });

  const { fields, replace } = useFieldArray({
    name: "liveThumbnailUrl",
    control: form.control,
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    let err: boolean = false;

    const mappedProducts = products
      .filter((item) => values.products.includes(item.id))
      .map((item) => ({
        ...item,
        images: JSON.parse(item.images as string),
      }));

    const data: LiveType = {
      title: values.liveTitle,
      description: values.liveDescription,
      thumbnailUrl: values.liveThumbnailUrl[0].value,
      dateStart: dayjs(values.dates.liveDateStart).toDate(),
      dateEnd: dayjs(values.dates.liveDateEnd).toDate(),
      products: JSON.stringify(mappedProducts),
    };

    try {
      if (
        dayjs(values.dates.liveDateStart).toDate() >
        dayjs(values.dates.liveDateEnd).toDate()
      ) {
        err = true;
        return toast.error("data de término maior que data de início");
      }

      if (dayjs(values.dates.liveDateStart).toDate() < dayjs().toDate()) {
        err = true;
        return toast.error(
          "data de início nao pode ser menor que a data atual"
        );
      }
      if (initialData) {
        onUpdateLive(params.liveId, data)
          .then(() => toast.success("Live atualizada!"))
          .catch(() => toast.error("Error ao atualizar a live."));
      } else {
        onCreateLive(data)
          .then(() => toast.success("Live agendada!"))
          .catch(() => toast.error("Error ao agendar a live."));
      }
    } catch (error) {
      console.log(error);
      toast.error(
        "Algo de errado aconteceu, visualize o console para mais informações"
      );
    } finally {
      if (isModal && !err) return router.push(`/live/${initialData?.id}`);
      if (!err) return router.push("/canal");
    }
  }

  const onUploadComplete = (res: UploadFileResponse<null>[]) => {
    const response = res.map((item) => ({ value: item.url }));
    replace(response);
  };

  const deleteProduct = () => {
    try {
      onDeleteLive(params.liveId)
        .then(() => toast.warning("Live deletada!"))
        .catch(() => toast.error("Error ao deletar live!"));
    } catch (error) {
      console.log(error);
      toast.error(
        "Algo de errado aconteceu, visualize o console para mais informações"
      );
    } finally {
      router.push("/canal");
    }
  };

  const title = initialData ? "Editar Live" : "Agendar Live";
  const buttonText = initialData ? "Editar" : "Agendar";
  const deleteButton = (
    <AlertModal
      description="Esta ação é irreversível. Isso irá permanentemente deletar esta
    live e remover os dados de nosso servidor."
      deleteFunction={deleteProduct}
    >
      <Button variant={"destructive"} className="flex items-center gap-2">
        <span>Deletar Live</span>
        <Trash2Icon className="w-4 h-4" />
      </Button>
    </AlertModal>
  );

  return (
    <Form {...form}>
      {!isModal && (
        <>
          <div className="flex justify-between max-w-5xl mx-auto">
            <Heading title={title} />
            {initialData && deleteButton}
          </div>
          <Separator className="max-w-5xl mx-auto" />
        </>
      )}
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn(
          "space-y-4 max-w-5xl border rounded-md p-4 mx-auto flex flex-col",
          isModal && "p-0 border-0 rounded-none"
        )}
      >
        <FormField
          control={form.control}
          name="liveTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome do produto</FormLabel>
              <FormControl>
                <Input placeholder="Live surpresa!" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-4 mb-3">
          <FormField
            control={form.control}
            name="liveDescription"
            render={({ field }) => (
              <FormItem className="basis-3/4">
                <FormLabel>Descrição da live</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Live surpresa!"
                    {...field}
                    className="max-h-56 min-h-28"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="basis-1/4 flex flex-col justify-between">
            <FormField
              control={form.control}
              name="dates.liveDateStart"
              render={({ field }) => (
                <FormItem className="basis-1/4">
                  <FormLabel>Data de início</FormLabel>
                  <FormControl>
                    <Input
                      type="datetime-local"
                      placeholder="Live surpresa!"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dates.liveDateEnd"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data de término</FormLabel>
                  <FormControl>
                    <Input
                      type="datetime-local"
                      placeholder="Live surpresa!"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="flex gap-4 mb-3">
          <div className="basis-3/4 border rounded-md p-2 flex flex-col gap-4">
            {fields.map((field, index) => (
              <FormField
                control={form.control}
                key={field.id}
                name={`liveThumbnailUrl.${index}.value`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Capa da Live (Thumbnail)</FormLabel>
                    <FormDescription>
                      Você pode dar upload em nosso servidor ou colar um link do{" "}
                      <Link
                        href={"https://imgur.com/upload"}
                        className="text-primary underline-offset-4 hover:underline"
                      >
                        imgur
                      </Link>{" "}
                      da imagem de sua preferência.
                    </FormDescription>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            <div className="border hover:border-dashed rounded-md">
              <UploadDropzone
                endpoint="thumbnailUploader"
                onClientUploadComplete={onUploadComplete}
                onUploadError={(error: Error) => {
                  alert(`ERROR! ${error.message}`);
                }}
              />
            </div>
          </div>
          <div className="basis-1/4 border rounded-md p-4">
            <FormField
              control={form.control}
              name="products"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base">Produtos</FormLabel>
                    <FormDescription>
                      Selecione pelo menos 1 produto.
                    </FormDescription>
                  </div>
                  {products.map((item) => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name="products"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={item.id}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item.id)}
                                onCheckedChange={(checked: boolean) => {
                                  return checked
                                    ? field.onChange([...field.value, item.id])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== item.id
                                        )
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {item.name}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        {!isModal && (
          <Button type="submit" className="w-fit ml-auto">
            {buttonText}
          </Button>
        )}
        {isModal && (
          <DialogClose asChild>
            <Button type="submit" className="w-fit ml-auto">
              {buttonText}
            </Button>
          </DialogClose>
        )}
      </form>
    </Form>
  );
};
