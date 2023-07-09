"use client";

import { useStoreModal } from "@/hooks/use-store-modal";
import { cn } from "@/lib/utils";
import { ArrowUpDownIcon, Check, PlusCircle } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

interface StoreSwitcherProps {
  items: { name: string; id: string }[];
}

function StoreSwitcher({ items }: StoreSwitcherProps) {
  const { onOpen } = useStoreModal();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const params = useParams();

  const currentStore = items.find((item) => item.id === params.storeid);
  const formattedStores = items.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  const onSelectStore = (store: { label: string; value: string }) => {
    router.push(`/${store.value}`);
    setOpen(false);
  };
  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger>
          <Button
            variant={"outline"}
            role="combobox"
            size={"sm"}
            className="w-[200px] justify-between border-dashed"
          >
            <span className="text-sm">{currentStore?.name}</span>
            <ArrowUpDownIcon className="h-4 w-4 text-muted-foreground" />
          </Button>
        </PopoverTrigger>

        <PopoverContent align="start" className="p-0 w-[200px]">
          <Command>
            <CommandInput placeholder="Search Store ..." className="h-9" />

            <CommandList>
              <CommandEmpty>No Store Found</CommandEmpty>

              <CommandGroup>
                {formattedStores.map((store) => (
                  <CommandItem onSelect={() => onSelectStore(store)}>
                    {store.label}

                    <Check
                      className={cn(
                        "h-4 w-4 ml-auto",
                        store.value === currentStore?.id
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup>
                <CommandItem
                  onSelect={() => {
                    onOpen();
                    setOpen(false);
                  }}
                  className="space-x-4"
                >
                  <PlusCircle className="h-4 w-4" />
                  <span>Create Store</span>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default StoreSwitcher;
