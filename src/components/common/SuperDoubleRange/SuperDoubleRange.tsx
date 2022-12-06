import {Slider} from '@mui/material'
import s from '../SuperRange/SuperRange.module.css'
import React from 'react'
export type OnChangeType = {
    value1: number
    value2: number
}
type SuperDoubleRangePropsType = {
    onChangeRange?: (value: [number, number]) => void
    value?: [number, number]
    minValue?: number
    maxValue?: number
    disabled?: boolean
}

const SuperDoubleRange: React.FC<SuperDoubleRangePropsType> = (
    {
        onChangeRange, value, minValue,
        maxValue, disabled
    }) => {

    const handleChange = (
        event: Event,
        newValue: number | number[],
    ) => {
        onChangeRange && onChangeRange(newValue as [number, number])
    }
    return (
        <div className={s.range}>
            <Slider
                size="small"
                value={value}
                onChange={handleChange}
                disableSwap
                min={minValue ? minValue : 0}
                max={maxValue ? maxValue : 100}
                disabled={disabled}
            />
        </div>
    )
}

export default SuperDoubleRange