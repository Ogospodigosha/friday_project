import downIcon from './icons/down.svg'
import upIcon from './icons/up.svg'

type PropsType = {
  sort: string
  onClick: (newSort: string) => void
  value: string
}
export const change = (sort: string, up: string, down: string) => {
  return sort === up ? down : up
}

export const UniversalSort = (props: PropsType) => {
  const up = '0' + props.value
  const down = '1' + props.value

  const icon = props.sort === up ? upIcon : downIcon
  const onClickHandler = () => {
    props.onClick(change(props.sort, up, down))
  }

  return (
    <span onClick={onClickHandler}>
      <img src={icon} alt={'up'} />
    </span>
  )
}
