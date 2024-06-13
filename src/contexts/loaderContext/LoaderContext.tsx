import { createContext, useReducer } from "react"
import { LoaderState, loaderReducer } from "./loaderReducer"

interface LoaderContextType {
    paintings: string[]
    loading: boolean
    init: boolean
    initializeGallery: () => void
    addPainting: (paintingId: string) => void
    removePainting: (paintingId: string) => void
}

const initialLoaderContext: LoaderState = {
    paintings: [],
    loading: true,
    init: true
}

export const LoaderContext = createContext({} as LoaderContextType)

export const LoaderContextProvider = ({children}: any) => {
    const [state, dispatch] = useReducer(loaderReducer, initialLoaderContext)

    const addPainting = (paintingId: string) => {
        console.log('addPainting', state.paintings)
        dispatch({type: 'ADD_PAINTING', payload: paintingId})
    }

    const removePainting = (paintingId: string) => {
        dispatch({type: 'REMOVE_PAINTING', payload: paintingId})
    }

    const initializeGallery = () => {
        dispatch({type: 'INIT'})
    }

    return (
        <LoaderContext.Provider value={{ addPainting, removePainting, initializeGallery, ...state }}>
            {children}
        </LoaderContext.Provider>
    )
}