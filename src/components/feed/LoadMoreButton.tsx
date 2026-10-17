"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { ChevronDown } from "lucide-react";

export function LoadMoreButton({
  onClick,
  disabled,
}: {
  onClick: () => void;
  disabled?: boolean;
}) {
  const [loading, setLoading] = useState(false);

  function handleClick() {
    setLoading(true);
    onClick();
    setTimeout(() => setLoading(false), 500);
  }

  return (
    <div className="mt-8 flex justify-center">
      <Button
        onClick={handleClick}
        disabled={disabled || loading}
        className="group min-w-[140px] shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
      >
        {loading ? (
          <LoadingSpinner size="sm" label="Loading..." />
        ) : (
          <span className="inline-flex items-center gap-1.5">
            Load more
            <ChevronDown size={15} className="transition-transform group-hover:translate-y-0.5" />
          </span>
        )}
      </Button>
    </div>
  );
}
