import React, {SelectHTMLAttributes, DetailedHTMLProps, ChangeEvent} from 'react'
import style from './SuperSelect.module.css'

type DefaultSelectPropsType = DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>

type SuperSelectPropsType = DefaultSelectPropsType & {
    options?: any[]
    onChangeOption?: (option: any) => void
}

const SuperSelect: React.FC<SuperSelectPropsType> = (
    {
        options,
        onChange, onChangeOption,
        ...restProps
    }
) => {
    const mappedOptions: any[] = options ? options.map((el, index) => <option key ={index}>{el}</option>): []; // map options with key

    const onChangeCallback = (e: ChangeEvent<HTMLSelectElement>) => {
        console.log(e.currentTarget.value)
        let newValue = e.currentTarget.value
        // if(options && options.indexOf(newValue) !== -1){
        //     onChangeOption(options[options.indexOf(newValue)])
        // }

        onChangeOption?.(newValue)

        // onChange, onChangeOption
    }

    return (
        <select onChange={onChangeCallback} {...restProps} className={style.select}>
            {mappedOptions}
        </select>
    )
}

export default SuperSelect