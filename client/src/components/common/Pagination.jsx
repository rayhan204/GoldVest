import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "../ui/Button";

const Pagination = ({ page, totalPage, onPageChange }) => {
  if (!totalPage || totalPage <= 1) return null;

  return (
    <div className="flex items-center justify-between border-t border-ink-950/8 pt-4">
      <p className="text-xs text-ink-600">
        Halaman <span className="font-semibold text-ink-950">{page}</span>{" "}
        dari <span className="font-semibold text-ink-950">{totalPage}</span>
      </p>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
        >
          <ChevronLeft className="size-4" />
          Sebelumnya
        </Button>
        <Button
          variant="outline"
          size="sm"
          disabled={page >= totalPage}
          onClick={() => onPageChange(page + 1)}
        >
          Berikutnya
          <ChevronRight className="size-4" />
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
