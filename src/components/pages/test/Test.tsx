import React, { useState } from 'react'

import SuperButton from '../../common/SuperButton/SuperButton'
import SuperCheckbox from '../../common/SuperCheckbox/SuperCheckbox'
import SuperDoubleRange, { OnChangeType } from '../../common/SuperDoubleRange/SuperDoubleRange'
import SuperEditableSpan from '../../common/SuperEditableSpan/SuperEditableSpan'
import SuperInputText from '../../common/SuperInputText/SuperInputText'
import SuperRadio from '../../common/SuperRadio/SuperRadio'
import SuperRange from '../../common/SuperRange/SuperRange'
import SuperSelect from '../../common/SuperSelect/SuperSelect'

export const Test = () => {
  const min = 0
  const max = 100
  const arr = ['x', 'y', 'z']

  const [value1, setValue1] = useState<number>(min)
  const [value2, setValue2] = useState<number>(max)
  const [editableSpanText, setEditableSpanText] = useState<string>('Change me')
  const [optionValue, onChangeOption] = useState<string>(arr[1])

  const onChangeRange = (valueSlide: number) => {
    setValue1(valueSlide)
  }

  const onChangeDoubleRange = ({ value1, value2 }: OnChangeType) => {
    setValue1(value1)
    setValue2(value2)
  }

  return (
    <div style={{ marginLeft: '45%' }}>
      <div>
        <SuperInputText />
      </div>
      <div>
        <SuperButton>Hello</SuperButton>
      </div>
      <div>
        <SuperCheckbox />
      </div>
      <div>
        <SuperEditableSpan value={editableSpanText} onChangeText={setEditableSpanText} />
      </div>
      <div>
        <SuperSelect options={arr} value={optionValue} onChangeOption={onChangeOption} />
      </div>
      <div>
        <SuperRadio
          name={'radio'}
          options={arr}
          value={optionValue}
          onChangeOption={onChangeOption}
        />
      </div>
      <div>
        <SuperRange value1={value1} onChangeRange={onChangeRange} />
      </div>
      <div>
        <SuperDoubleRange
          onChangeRange={value => {
            setValue1(value[0])
            setValue2(value[1])
          }}
          value={[value1, value2]}
        />
      </div>
    </div>
  )
}
