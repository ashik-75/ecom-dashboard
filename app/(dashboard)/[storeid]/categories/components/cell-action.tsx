"use client";

import DeleteModal from "@/components/modal/delete-modal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import axios from "axios";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { CategoryColumnType } from "./columns";

function CellAction({ id: categoryId }: CategoryColumnType) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const params = useParams();
  const router = useRouter();

  const oncopy = (value: string) => {
    navigator.clipboard.writeText(value);
  };

  const onConfirm = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeid}/categories/${categoryId}`);
      router.refresh();
      router.push(`/${params.storeid}/categories`);

      toast.success("Category deleted");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const onClose = () => setIsOpen(false);

  return (
    <div>
      <DeleteModal
        loading={loading}
        isOpen={isOpen}
        onConfirm={onConfirm}
        onClose={onClose}
      />
      <DropdownMenu>
        <DropdownMenuTrigger>
          <MoreHorizontal className="h-4 w-4" />
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => oncopy(categoryId)}>
            <Copy className="h-4 w-4 mr-2" />
            <span className="text-muted-foreground">Copy </span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              router.push(`/${params.storeid}/categories/${categoryId}`)
            }
          >
            <Edit className="h-4 w-4 mr-2" />
            <span className="text-muted-foreground">Update </span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsOpen(true)}>
            <Trash className="h-4 w-4 mr-2" />
            <span className="text-muted-foreground">Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default CellAction;
