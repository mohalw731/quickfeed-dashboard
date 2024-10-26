import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronUp, ChevronDown, Clock, LucideIcon } from "lucide-react";

const sortOptions = [
  { icon: ChevronUp, value: "newest", title: "Newest" },
  { icon: ChevronDown, value: "oldest", title: "Oldest" },
  { icon: Clock, value: "last7days", title: "Last 7 days" },
  { icon: Clock, value: "last30days", title: "Last 30 days" },
];

type SortType = "newest" | "oldest" | "last7days" | "last30days";

export function SortSelect({ sort, setSort }: { sort: SortType, setSort: (type: SortType) => void }) {
  return (
   <div >
     <Select value={sort} onValueChange={setSort}>
      <SelectTrigger className="bg-transparent border-none focus:ring-0 ">
        <div><SelectValue placeholder="Sort by" /></div>
      </SelectTrigger>
      <SelectContent className="bg-background/80 dark:bg-background/20 backdrop-blur-lg border-none">
        {sortOptions.map((item) => (
          <SelectItem key={item.value} value={item.value} className="hover:bg-background/90 dark:hover:bg-background/30 focus:bg-background/90 dark:focus:bg-background/30">
            <div className="flex items-center gap-1 mr-1 justify-between w-full">
              <span>{item.title}</span>
              <item.icon className="h-4 w-4 text-muted-foreground" />
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
   </div>
  );
}
