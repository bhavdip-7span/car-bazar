"use client";

type SingleRangeSliderProps = {
  min: number;
  max: number;
  step?: number;
  value: number;
  onChange: (value: number) => void;
};

export default function SingleRangeSlider({
  min,
  max,
  step = 1,
  value,
  onChange,
}: SingleRangeSliderProps) {
  const percent = ((value - min) / (max - min)) * 100;

  return (
    <div className="w-full">
      <div className="flex justify-between mt-4 text-sm font-medium">
        <span>{min.toLocaleString("en-IN")}</span>
        {/* <span>{value.toLocaleString("en-IN")}</span> */}
        <span>{max.toLocaleString("en-IN")}</span>
      </div>

      <div className="relative h-2 bg-gray-200 rounded-full mt-4">
        <div
          className="absolute h-2 rounded-full bg-blue-500"
          style={{
            width: `${percent}%`,
          }}
        />

        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute top-0 left-0 w-full h-2 appearance-none bg-transparent cursor-pointer"
        />
      </div>
    </div>
  );
}
