"use client";

import { useStoreModal } from "@/hooks/use-store-modal";
import { useEffect } from "react";

function RootPage() {
  const { isOpen, onOpen } = useStoreModal();

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, []);
  return null;
}

export default RootPage;
