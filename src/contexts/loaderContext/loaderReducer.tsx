export interface LoaderState {
    paintings: string[]
    loading: boolean
    init: boolean
}

export type LoaderAction = 
    | { type: 'ADD_PAINTING', payload: string }
    | { type: 'REMOVE_PAINTING', payload: string }
    | { type: 'INIT' }

export const loaderReducer = (state: LoaderState, action: LoaderAction): LoaderState => {
    switch(action.type){
        case 'ADD_PAINTING':
            return { ...state, paintings: [...state.paintings, action.payload] }
        case 'REMOVE_PAINTING':
            const paintings = state.paintings.filter(painting => painting !== action.payload)
            if(paintings.length === 0) return { ...state, paintings, loading: false } 
            return { ...state, paintings }
        case 'INIT':
            return { ...state, init: false }
        default:
            return state
    }
}