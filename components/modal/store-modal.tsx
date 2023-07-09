import { useStoreModal } from "@/hooks/use-store-modal";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { z } from "zod";
import Spinner from "../Spinner";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import Modal from "../ui/modal";

const formSchema = z.object({
  name: z.string().min(1),
});

type FormSchemaType = z.infer<typeof formSchema>;

function StoreModal() {
  const [loading, setLoading] = useState(false);
  const { isOpen, onClose } = useStoreModal();
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const { handleSubmit, control } = form;

  const onSubmit = async (value: FormSchemaType) => {
    try {
      setLoading(true);
      const response = await axios.post("/api/store", value);
      console.log(response.data);
      toast.success("Store created!");
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="Open new store"
        description="Add a new product to merge something new"
      >
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormField
              control={control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>

                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Store name ..."
                      {...field}
                    />
                  </FormControl>

                  <FormDescription>Create new store</FormDescription>

                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-x-2 mt-2">
              <Button
                type="button"
                onClick={onClose}
                size={"sm"}
                variant={"outline"}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button disabled={loading} type="submit" size={"sm"}>
                {loading && <Spinner />}
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </Modal>
    </div>
  );
}

export default StoreModal;
