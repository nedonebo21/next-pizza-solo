'use client'

import { ComponentProps, Fragment, useEffect, useState } from 'react'
import * as SliderPrimitive from '@radix-ui/react-slider'

import { cn } from '@/shared/lib/utils'

type SliderProps = {
  className?: string
  step: number
  min: number
  max: number
  values?: number[]
  onValueChange?: (values: number[]) => void
} & Omit<ComponentProps<typeof SliderPrimitive.Root>, any>

export const RangeSlider = ({
  className,
  min,
  max,
  step = 1,
  values,
  onValueChange,
  ...props
}: SliderProps) => {
  const isValuesArray = Array.isArray(values)
  const initialValue = isValuesArray ? values : [min, max]
  const [localValues, setLocalValues] = useState(initialValue)

  useEffect(() => {
    setLocalValues(isValuesArray ? values : [min, max])
  }, [min, max, values])

  const handleValueChange = (newValues: number[]) => {
    setLocalValues(newValues)
    if (onValueChange) {
      onValueChange(newValues)
    }
  }

  return (
    <SliderPrimitive.Root
      min={min}
      max={max}
      step={step}
      value={localValues}
      onValueChange={handleValueChange}
      className={cn('relative flex w-full touch-none select-none mb-6 items-center', className)}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-1 w-full grow overflow-hidden rounded-full bg-primary/20">
        <SliderPrimitive.Range className="absolute h-full bg-primary" />
      </SliderPrimitive.Track>
      {localValues.map((value, index) => {
        const horizontalLabelPosition = ((value - min) / (max - min)) * 100

        return (
          <Fragment key={index}>
            <div
              className="absolute text-center"
              style={{
                left: `calc(${horizontalLabelPosition}% + 0px)`,
                top: `10px`,
              }}
            >
              <span className="text-sm">{value}</span>
            </div>
            <SliderPrimitive.Thumb className="block h-4 w-4 rounded-full border border-primary/50 bg-white shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" />
          </Fragment>
        )
      })}
    </SliderPrimitive.Root>
  )
}
