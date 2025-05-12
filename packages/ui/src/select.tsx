"use client";
interface SelectProps  {
  onSelect: (value: string) => void;
  options: {
    key: string;
    value: string;
  }[];
}
export const Select = ({
  options,
  onSelect,
}: SelectProps) => {
  return (
    <select
      onChange={(e) => {
        onSelect(e.target.value);
      }}
      className="file:text-foreground placeholder:text-muted-foreground bg-gray-100 selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
    >
      {options.map((option) => (
        <option value={option.key}>{option.value}</option>
      ))}
    </select>
  );
};
