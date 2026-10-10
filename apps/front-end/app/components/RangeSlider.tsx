'use client'

interface RangeSliderProps {
  label: string
  min: number
  max: number
  step?: number
  value: [number, number]
  onChange: (value: [number, number]) => void
  formatValue?: (value: number) => string
}

/**
 * Range Slider
 *
 * @param {RangeSliderProps} {
 *   label,
 *   min,
 *   max,
 *   step = 1,
 *   value,
 *   onChange,
 *   formatValue = (value) => value.toString(),
 * }
 * @return {*}
 */
const RangeSlider = ({
  label,
  min,
  max,
  step = 1,
  value,
  onChange,
  formatValue = (value) => value.toString(),
}: RangeSliderProps) => {
  const [minValue, maxValue] = value

  const minPercent = ((minValue - min) / (max - min)) * 100
  const maxPercent = ((maxValue - min) / (max - min)) * 100

  const handleMinChange = (newValue: number) =>
    onChange([Math.min(newValue, maxValue - step), maxValue])

  const handleMaxChange = (newValue: number) =>
    onChange([minValue, Math.max(newValue, minValue + step)])

  return (
    <div className="w-full">
      {/* Label */}
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">{label}</span>

        <span className="text-sm text-gray-600">
          {formatValue(minValue)} – {formatValue(maxValue)}
        </span>
      </div>

      {/* Slider */}
      <div className="relative h-6">
        {/* Track */}
        <div className="absolute top-1/2 h-1 w-full -translate-y-1/2 rounded-full bg-gray-200" />

        {/* Selected range */}
        <div
          className="absolute top-1/2 h-1 -translate-y-1/2 rounded-full bg-blue-600"
          style={{
            left: `${minPercent}%`,
            right: `${100 - maxPercent}%`,
          }}
        />

        {/* Minimum thumb */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={minValue}
          onChange={(e) => handleMinChange(Number(e.target.value))}
          className="range-input"
        />

        {/* Maximum thumb */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={maxValue}
          onChange={(e) => handleMaxChange(Number(e.target.value))}
          className="range-input"
        />
      </div>
    </div>
  )
}

export default RangeSlider
