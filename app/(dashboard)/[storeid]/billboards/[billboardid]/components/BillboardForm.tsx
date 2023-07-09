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
import { Separator } from "@/components/ui/separator";
import ImageUpload from "@/components/uploadImage";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { z } from "zod";

const formSchema = z.object({
  label: z.string().min(1),
  imageUrl: z.string().min(1),
});

type FormSchemaType = z.infer<typeof formSchema>;

function BillboardForm({
  initialValue,
}: {
  initialValue: FormSchemaType | null;
}) {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const title = initialValue ? "Update Billboard" : "Create Billboard";
  const description = initialValue
    ? "Update Bullboard for your store"
    : "Create billboard for your store";
  const action = initialValue ? "Update" : "Create";

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValue || {
      label: "",
      imageUrl: "",
    },
  });

  const onSubmit = async (value: FormSchemaType) => {
    console.log(value);
    try {
      setLoading(true);
      if (initialValue) {
        await axios.patch(
          `/api/${params.storeid}/billboards/${params.billboardid}`,
          value
        );
        toast.success("Billboard updated");
        router.refresh();
      } else {
        await axios.post(`/api/${params.storeid}/billboards`, value);
        toast.success("Billboard created");
        router.refresh();
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <div className="space-y-2 mb-5">
        <Header title={title} description={description} />
        <Separator />
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-sm">
          <FormField
            name="label"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Label</FormLabel>
                <FormControl>
                  <Input placeholder="Enter billboard label" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="imageUrl"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <ImageUpload
                  disabled={loading}
                  value={field.value ? [field.value] : []}
                  onChange={(url) => field.onChange(url)}
                  onRemove={() => field.onChange("")}
                />

                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="mt-4">
            {loading && <Spinner />}
            {action}
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default BillboardForm;
