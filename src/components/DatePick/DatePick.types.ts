export interface DatePickProps {
  setUsersDate: (date: Date) => void;
}

export interface DateState {
  day: number | null;
  month: number | null;
  year: string;
}
