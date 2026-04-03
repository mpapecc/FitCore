import type { BookableClass } from "../../../pages/member/book/bookClassData";
import { CalendarGrid } from "../../schedule/CalendarGrid";
import BookableClassCard from "./BookableClassCard";

interface BookClassGridProps {
  classes: BookableClass[];
  onBook:  (gymClass: BookableClass) => void;
}

export default function BookClassGrid({ classes, onBook }: BookClassGridProps) {
  return (
    <CalendarGrid
      classes={classes}
      renderCard={(gymClass) => (
        <BookableClassCard gymClass={gymClass} onBook={onBook} />
      )}
    />
  );
}
