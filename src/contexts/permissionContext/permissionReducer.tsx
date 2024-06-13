export interface PermissionState {
    permission: 'prompt' | 'granted' | 'denied' | 'error' | 'notIOS'
}

export type PermissionAction = 
    | { type: 'CHANGE_PERMISSION', payload: 'prompt' | 'granted' | 'denied' | 'error' | 'notIOS' }

export const permissionReducer = (state: PermissionState, action: PermissionAction): PermissionState => {
    switch(action.type){
        case 'CHANGE_PERMISSION':
            return { ...state, permission: action.payload }
        default:
            return state
    }
}