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

function App() {

  const { requestOrientationPermission } = useContext(PermissionContext)
  const { loading, init, initializeGallery } = useContext(LoaderContext)
  const { isMobile } = useDetectDevice()

  const SIZE = 10
  const WALL_HEIGHT = 6

  const handleInit = () => {
    requestOrientationPermission()
    initializeGallery()
  }

  return (
      <main className="select-none">
        {
          loading &&
          <div 
            style={{height:'100dvh', width:'100dvw', zIndex:100}}
            className="absolute top-0 left-0 z-100 p-2 bg-neutral-800 text-white"
          >
            <div className="h-full flex justify-center items-center">
              <h1 className="text-2xl">
                Cargando...
              </h1>
            </div>
          </div>
        }
        {
          init &&
          <div 
            style={{height:'100dvh', width:'100dvw', zIndex:50}}
            className="absolute top-0 left-0 z-100 p-2 bg-neutral-800 text-white bg-opacity-80"
          >
            <div className="h-full flex justify-center items-center flex-col">
              <div>
                <h1 className="text-2xl text-center">
                  ¡Hola!
                </h1>
                <div className="flex justify-center items-center h-full">
                  <button onClick={handleInit} className="bg-blue-950 text-white rounded-md p-3">Empezar</button>
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
                  url={"https://res.cloudinary.com/dffkajufp/image/upload/q_41/v1718239417/art/A1jK4RCeZNL._AC_UF894_1000_QL80__1_of9yga.webp"}
                  position={[0, 1.2, (SIZE/2 - 0.01)]} 
                  height={3} 
                  width={2} 
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
