import { DatePicker } from "@/components/DatePickerPage/DatePicker";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen items-center justify-center">
      <DatePicker />
    </main>
  );
}
