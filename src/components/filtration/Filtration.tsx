import down from './icons/down.svg'
import up from './icons/up.svg'

type PropsType = {
  filter: string
  onClick: (newSort: string) => void
  value: string
}
const change = (filter: string, up: string, down: string) => {
  return filter === up ? down : up
}

export const Filtration = (props: PropsType) => {
  const setUp = '0' + props.value
  const setDown = '1' + props.value

  const icon = props.filter === setUp ? up : down
  const onClickHandler = () => {
    props.onClick(change(props.filter, setUp, setDown))
  }

  return (
    <span onClick={onClickHandler}>
      <img src={icon} alt={'up'} />
    </span>
  )
}
