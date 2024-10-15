import { createContext, useReducer } from "react"
import { permissionReducer, PermissionState } from "./permissionReducer"

interface PermissionContextType {
    permission: 'prompt' | 'granted' | 'denied' | 'error' | 'notIOS'
    requestOrientationPermission: () => void
}

const initialPermissionContext: PermissionState = {
    permission: 'prompt',
}

interface DeviceOrientationEventiOS extends DeviceOrientationEvent {
    requestPermission?: () => Promise<'granted' | 'denied'>;
}

const requestPermission = (DeviceOrientationEvent as unknown as DeviceOrientationEventiOS).requestPermission;

const iOS = typeof requestPermission === 'function';

export const PermissionContext = createContext({} as PermissionContextType)

export const PermissionContextProvider = ({children}: any) => {
    const [state, dispatch] = useReducer(permissionReducer, initialPermissionContext)

    const changePermission = (permission: 'prompt' | 'granted' | 'denied' | 'error' | 'notIOS') => {
        dispatch({type: 'CHANGE_PERMISSION', payload: permission})
    }

    const requestOrientationPermission = () => {
        if(!iOS) return changePermission('notIOS')
        
        requestPermission()
        .then(response => {
            if(response === 'granted') {
            changePermission('granted')
            }else{
            changePermission('denied')
            }
        })
        .catch((e) => {
            changePermission('error')
        })
    }

    return (
        <PermissionContext.Provider value={{ requestOrientationPermission, ...state }}>
            {children}
        </PermissionContext.Provider>
    )
}