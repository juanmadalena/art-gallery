import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { useContext, useRef } from "react"
import { LoaderContext } from "../contexts/loaderContext/LoaderContext"

gsap.registerPlugin()

export const LoadingComponent = () => {

    const loadingContainer = useRef<HTMLDivElement>(null)

    const { loading } = useContext(LoaderContext)
  
    useGSAP( () => {
      if (!loading) {
        gsap.to(loadingContainer.current, {opacity:0, duration:2, delay:2.6})
        gsap.to(loadingContainer.current, {display:'none', duration:0, delay:4.6})
      }
  
    }, [loading])

    return (
        <div 
          ref={loadingContainer}
          style={{position:'absolute', height:'100dvh', width:'100dvw', zIndex:100}}
          className="absolute top-0 left-0 z-100 p-2 bg-neutral-950 text-white"
        >
          <div className="h-full flex justify-center items-center">
            <h1 className="text-2xl">
              Loading...
            </h1>
          </div>
        </div>    
    )
}
