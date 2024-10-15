import { Canvas } from "@react-three/fiber"
import Ground from "./components/Ground"
import { Physics } from "@react-three/cannon"
import Player from "./components/Player"
import POV from "./components/POV"
import Wall from "./components/Wall"
import Ceiling from "./components/Ceiling"
import { Suspense, useContext } from "react"
import MoveButtons from "./components/MoveButtons"
import Painting from "./components/Painting"
import { LoaderContext } from "./contexts/loaderContext/LoaderContext"
import { PermissionContext } from "./contexts/permissionContext/PermissionContext"
import RotationButtons from "./components/RotationButtons"
import useDetectDevice from "./hooks/useDetectDevice"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { LoadingComponent } from "./components/LoadingComponent"


gsap.registerPlugin()


function App() {
  const SIZE = 10
  const WALL_HEIGHT = 6

  const { requestOrientationPermission } = useContext(PermissionContext)
  const { init, initializeGallery } = useContext(LoaderContext)
  const { isMobile } = useDetectDevice()

  const handleInit = () => {
    requestOrientationPermission()
    initializeGallery()
  }

  return (
      <main className="select-none">
        <LoadingComponent />
        {
          init &&
          <div 
            style={{height:'100dvh', width:'100dvw', zIndex:50}}
            className="absolute top-0 left-0 z-100 p-2 bg-neutral-900 text-white bg-opacity-95"
          >
            <div className="h-full flex justify-center items-center flex-col">
              <div>
                <h1 className="text-4xl text-center mb-12 pb-4">
                  Welcome to the gallery!
                </h1>
                <p className="text-lg mb-4">Instructions:</p>
                <ul className="list-disc list-inside">
                  <li className="text-regular mb-2">Use the buttons 
                    {
                      isMobile ? 
                      <span className="font-semibold"> 
                        {" "}
                        below
                        {" "}
                      </span>
                      :
                      <span className="font-semibold"> 
                        {" "}
                        W, A, S, D
                        {" "}
                      </span>
                    }
                      to move around the gallery.</li>
                    {
                      !isMobile &&
                      <li className="text-regular mb-2">Click on the screen and use the mouse to look around.</li>
                    }
                    {
                      isMobile &&
                      <>
                        <li className="text-regular mb-2">Allow the device to use motion sensors.</li>
                        <li className="text-regular mb-2">Move your phone to see the gallery</li>
                      </>

                    }
                  {/* <li className="text-regular mb-2">Click on the paintings to get more details</li> */}
                  <li className="text-regular mb-2">Enjoy the paintings!</li>
                </ul>
                <div className="flex justify-center items-center mt-12">
                  <button onClick={handleInit} className="bg-blue-600 text-white rounded-md py-3 px-6 hover:bg-blue-800 transition-colors">
                    <span className="font-semibold">                    
                      Start
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        }
        <MoveButtons />
        {
          isMobile &&
          <RotationButtons />
        }
        <Canvas id="canvas" style={{height:'100dvh', width:'100dvw', border:'solid 1px black', marginTop:0, zIndex:1}} className="select-none">
          <Suspense fallback={null}>
              <Physics>
                <POV />
                <Ceiling size={SIZE} />
                <Painting 
                  url={"https://res.cloudinary.com/dffkajufp/image/upload/q_41/v1718239417/art/A1jK4RCeZNL._AC_UF894_1000_QL80__1_of9yga.webp"}
                  position={[-3, 1.2, -(SIZE/2 - 0.01)]} height={3} width={2} />
                <Painting 
                  url={"https://res.cloudinary.com/dffkajufp/image/upload/v1718239191/art/Claude_Monet_-_Woman_with_a_Parasol_-_Madame_Monet_and_Her_Son_-_Google_Art_Project_1_co9sjo.webp"}
                  position={[2.5, 1.2, -(SIZE/2 - 0.01)]} height={3} width={2} />
                <Painting 
                  url={"https://res.cloudinary.com/dffkajufp/image/upload/v1729028099/art/sorolla_gglmjx.jpg"}
                  position={[0, 1.2, (SIZE/2 - 0.01)]} 
                  height={3} 
                  width={5} 
                  rotation={[0, Math.PI, 0]}  
                />
                <Painting 
                  url={"https://res.cloudinary.com/dffkajufp/image/upload/v1718239884/art/Vincent_van_Gogh_-_Wheat_Field_with_Cypresses__National_Gallery_version__1_snz5ti.webp"}
                  position={[-(SIZE/2 - 0.01), 1.2, 0]} 
                  height={3} 
                  width={4.2} 
                  rotation={[0, Math.PI / 2, 0]}  
                />
                <Painting 
                  url={"https://res.cloudinary.com/dffkajufp/image/upload/v1718239878/art/s-l1200_1_h0wvwf.webp"}
                  position={[(SIZE/2 - 0.01), 1.2, 0]} 
                  height={3} 
                  width={4.2} 
                  rotation={[0, -Math.PI / 2, 0]}  
                />
                <Wall position={[0, 0.5, SIZE/2]} height={WALL_HEIGHT} width={SIZE} />
                <Wall position={[0, 0.5, -(SIZE/2)]} height={WALL_HEIGHT} width={SIZE} />
                <Wall position={[SIZE/2, 0.5, 0]} height={WALL_HEIGHT} width={SIZE} rotation={[ 0, Math.PI / 2, 0 ]} />
                <Wall position={[-(SIZE/2), 0.5, 0]} height={WALL_HEIGHT} width={SIZE} rotation={[ 0, Math.PI / 2, 0 ]} />
                <Player />
                <Ground size={SIZE} />
              </Physics>
          </Suspense>
        </Canvas>
      </main>
  )
}

export default App
