import { Button } from "@/components/ui/button";

const filterButtons: { type: FilterType; label: string; className: string }[] = [
  { type: "all", label: "All", className: "bg-blue-500 hover:bg-blue-600" },
  { type: "good", label: "Good", className: "bg-[#343A40] dark:bg-[#E2E2E2]" },
  { type: "okay", label: "Okay", className: "bg-[#343A40] dark:bg-[#E2E2E2]" },
  { type: "bad", label: "Bad", className: "bg-[#343A40] dark:bg-[#E2E2E2]" },
];

type FilterType = "all" | "bad" | "okay" | "good"



export function FilterButtons({ filter, setFilter }: { filter: FilterType; setFilter: (type: FilterType) => void }) {
  return (
    <div className="flex gap-2">
      {filterButtons.map((button) => (
        <Button
          key={button.type}
          className={`${button.className} rounded-lg ${filter === button.type ? "font-bold" : ""}`}
          onClick={() => setFilter(button.type)}
        >
          {button.label}
        </Button>
      ))}
    </div>
  );
}
