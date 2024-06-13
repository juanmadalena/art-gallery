import App from "./App"
import { LoaderContextProvider } from "./contexts/loaderContext/LoaderContext"
import { PermissionContextProvider } from "./contexts/permissionContext/PermissionContext"


function AppContextProvider(){
    return (
        <PermissionContextProvider>
            <LoaderContextProvider>
                <App />
            </LoaderContextProvider>
        </PermissionContextProvider>
    )
}

export default AppContextProvider