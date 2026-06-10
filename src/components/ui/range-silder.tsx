"use client";

type RangeSliderProps = {
  min: number;
  max: number;
  step?: number;
  value: [number, number];

  onChange: (value: [number, number]) => void;
};

export default function RangeSlider({
  min,
  max,
  step = 1,
  value,
  onChange,
}: RangeSliderProps) {
  const minPercent = ((value[0] - min) / (max - min)) * 100;
  const maxPercent = ((value[1] - min) / (max - min)) * 100;

  return (
    <>
      <div className="w-full">
        <div className="flex justify-between mt-4 text-sm font-medium">
          <span>{value[0].toLocaleString("en-IN")}</span>
          <span>{value[1].toLocaleString("en-IN")}</span>
        </div>
        <div className="relative h-2 bg-gray-200 rounded-full mt-4">
          {/* Selected Range */}
          <div
            className="absolute h-2 rounded-full bg-blue-500"
            style={{
              left: `${minPercent}%`,
              width: `${maxPercent - minPercent}%`,
            }}
          />

          {/* Min Thumb */}
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value[0]}
            onChange={(e) => {
              const newMin = Number(e.target.value);

              onChange([Math.min(newMin, value[1] - step), value[1]]);
            }}
            className="absolute top-0 left-0 w-full h-2 appearance-none bg-transparent pointer-events-none"
          />

          {/* Max Thumb */}
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value[1]}
            onChange={(e) => {
              const newMax = Number(e.target.value);

              onChange([value[0], Math.max(newMax, value[0] + step)]);
            }}
            className="absolute top-0 left-0 w-full h-2 appearance-none bg-transparent pointer-events-none"
          />
        </div>
      </div>
    </>
  );
}
