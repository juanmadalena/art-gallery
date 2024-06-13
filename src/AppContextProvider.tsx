import App from "./App"
import { LoaderContextProvider } from "./contexts/loaderContext/LoaderContext"


function AppContextProvider(){
    return (
        <LoaderContextProvider>
            <App />
        </LoaderContextProvider>
    )
}

export default AppContextProvider