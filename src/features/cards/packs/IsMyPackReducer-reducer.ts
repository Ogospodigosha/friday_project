const initState = {
  isMyPack1: window.localStorage.getItem('isMyPack1') || 'false',
}

type StateType = typeof initState
type ActyonType = ReturnType<typeof changeIsMyPack>
//action creator
export const changeIsMyPack = (isMyPack: 'true' | 'false') =>
  ({ type: 'CHANGE-IS-MY-PACK', isMyPack } as const)

export const IsMyPackReducer = (state: StateType = initState, action: ActyonType) => {
  switch (action.type) {
    case 'CHANGE-IS-MY-PACK':
      return { ...state, isMyPack1: action.isMyPack }
    default:
      return state
  }
}
