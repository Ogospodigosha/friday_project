
const InitState = {
    isLoading: false
}
export type IntitStateType = typeof InitState
export const loadingReducer = (state: IntitStateType = InitState, action: ActionsType):IntitStateType =>{
        switch (action.type) {
            case "CHANGE-LOADING":
                return {...state, isLoading: action.isLoading}
            default:
                return  state
        }
}

export const changeLoadingAC = (isLoading: boolean) => ({type: 'CHANGE-LOADING', isLoading}as const)


type ActionsType = | ReturnType<typeof changeLoadingAC>