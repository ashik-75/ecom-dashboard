"use client";

import Spinner from "@/components/Spinner";
import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Billboard, Category } from "@prisma/client";
import axios from "axios";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { z } from "zod";

interface CategoryFormProps {
  billboards: Billboard[];
  initialValue: Category | null;
}

const formSchema = z.object({
  name: z.string().min(1),
  billboardId: z.string().min(1),
});

type FormValueType = z.infer<typeof formSchema>;

const CategoryForm: React.FC<CategoryFormProps> = ({
  initialValue,
  billboards,
}) => {
  const title = initialValue ? "Update Category" : "Create Category";
  const description = initialValue
    ? "Update category for store changes"
    : "create new category for your stote";
  const action = initialValue ? "Update" : "Create";

  const [loading, setLoading] = useState(false);
  const params = useParams();
  const router = useRouter();

  const form = useForm<FormValueType>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValue || {
      name: "",
      billboardId: "",
    },
  });

  const onSubmit = async (value: FormValueType) => {
    try {
      setLoading(true);
      if (initialValue) {
        await axios.patch(
          `/api/${params.storeid}/categories/${params.categoryid}`,
          value
        );
      } else {
        await axios.post(`/api/${params.storeid}/categories`, value);
      }
      router.refresh();
      router.push(`/${params.storeid}/categories`);
      toast.success("Category created!");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between">
        <Header title={title} description={description} />

        {initialValue && (
          <Button variant={"destructive"}>
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>

      <Separator className="my-5" />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-3 max-w-sm"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>

                <FormControl>
                  <Input placeholder="category name" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="billboardId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Billboard</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="select a billboard" />
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent>
                    {billboards.map((bill) => (
                      <SelectItem key={bill.id} value={bill.id}>
                        {bill.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={loading}>
            <span>{action}</span>
            {loading && <Spinner />}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CategoryForm;
