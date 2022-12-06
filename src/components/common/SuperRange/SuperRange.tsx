import { Slider } from '@mui/material';
import React from 'react'
import s from '../SuperRange/SuperRange.module.css'


type SuperRangePropsType = {
    onChangeRange?: (value: number) => void
    onChangeRange2?: (value: number) => void
    value1?: number
    value2?: number
    minValue?: number
    maxValue?: number
    disabled?: boolean
};

const SuperRange: React.FC<SuperRangePropsType> = (
    {
        onChangeRange, value1,
        value2, onChangeRange2, minValue,
        maxValue, disabled
    }
) => {

    const handleChange = (event: Event, newValue: number | number[]) => {
        onChangeRange && onChangeRange(newValue as number)
        if (value1 && value2 && value2 < value1 + 2 && value2 !== 100) {
            onChangeRange2 && onChangeRange2(value1)
        }
    }

    return (
        <div className={s.range}>
            <Slider
                size="small"
                value={value1}
                onChange={handleChange}
                min={minValue ? minValue : 0}
                max={maxValue ? maxValue : 100}
                disabled={disabled}
            />
        </div>
    )
}

export default SuperRange