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
import Modal from "@/components/ui/modal";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { z } from "zod";

interface SettingsFormProps {
  store: {
    name: string;
  };
}

const formSchema = z.object({
  name: z.string().min(1),
});

type SchemaType = z.infer<typeof formSchema>;

function SettingsForm({ store }: SettingsFormProps) {
  const [open, setOpen] = useState(false);
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const form = useForm<SchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: store?.name,
    },
  });

  const onSubmit = async (payload: SchemaType) => {
    try {
      setLoading(true);
      const response = await axios.patch(
        `/api/store/${params.storeid}`,
        payload
      );
      router.refresh();
      toast.success("Store updated");
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const deleteStore = async () => {
    try {
      setDeleteLoading(true);
      await axios.delete(`/api/store/${params.storeid}`);
      toast.success("store deleted");
      router.refresh();
      router.push("/");
    } catch (error) {
      toast.error("something went wrong");
    } finally {
      setDeleteLoading(false);
    }
  };
  return (
    <div>
      <Modal
        isOpen={open}
        description="are you sure to delete store"
        title="Delete store"
        onClose={() => setOpen(false)}
      >
        <div className="space-x-2">
          <Button variant={"outline"} onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={deleteStore}
            variant={"destructive"}
            disabled={deleteLoading}
          >
            {deleteLoading && <Spinner />}
            <span>Delete</span>
          </Button>
        </div>
      </Modal>
      <div className="flex justify-between">
        <Header title="Settings" description="Manage your store by own" />

        <Button
          onClick={() => setOpen(true)}
          variant={"destructive"}
          size={"sm"}
        >
          <Trash className="h-5 w-5" />
        </Button>
      </div>
      <Separator className="mt-2" />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="max-w-sm space-y-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Store Name</FormLabel>

                <FormControl>
                  <Input placeholder="store name" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          ></FormField>

          <Button disabled={loading}>
            {loading && <Spinner />}
            <span>Update Store</span>
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default SettingsForm;
