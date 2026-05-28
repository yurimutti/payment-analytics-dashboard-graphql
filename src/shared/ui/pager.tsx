import { Link } from "@tanstack/react-router";
import { usePaginatorContext } from "@/shared/hooks/use-paginator";
import { Button } from "./button";

interface PagerProps {
  to: string;
  total: number;
  pageSize: number;
  currentPage: number;
}

export function Pager({ to, total, pageSize, currentPage }: PagerProps) {
  const ctx = usePaginatorContext();
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  return (
    <div className="flex w-full items-center justify-between">
      <p className="text-xs text-muted-foreground">
        Page {currentPage} of {totalPages} — {total} total
      </p>
      <div className="flex gap-2">
        {ctx.paginatorType === "link" && ctx.prevSearch && (
          // biome-ignore lint/suspicious/noExplicitAny: search is dynamic per route consumer
          <Link to={to} search={ctx.prevSearch as any}>
            <Button variant="outline" size="sm" className="cursor-pointer">
              Prev
            </Button>
          </Link>
        )}
        {ctx.paginatorType === "link" && ctx.nextSearch && (
          // biome-ignore lint/suspicious/noExplicitAny: search is dynamic per route consumer
          <Link to={to} search={ctx.nextSearch as any}>
            <Button variant="outline" size="sm" className="cursor-pointer">
              Next
            </Button>
          </Link>
        )}
        {ctx.paginatorType === "click" && (
          <>
            <Button
              variant="outline"
              size="sm"
              className="cursor-pointer"
              onClick={ctx.loadPreviousPage}
              disabled={!ctx.hasPreviousPage}
            >
              Prev
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="cursor-pointer"
              onClick={ctx.loadNextPage}
              disabled={!ctx.hasNextPage}
            >
              Next
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
