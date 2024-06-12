import { Canvas } from "@react-three/fiber"
import Ground from "./components/Ground"
import { Physics } from "@react-three/cannon"
import Player from "./components/Player"
import POV from "./components/POV"
import Wall from "./components/Wall"
import Ceiling from "./components/Ceiling"
import { Suspense } from "react"
import MoveButtons from "./components/MoveButtons"

function App() {

  const SIZE = 10
  const WALL_HEIGHT = 6

  return (
    <main className="select-none">
      <MoveButtons />
      <Canvas style={{height:'100vh', width:'100vw', border:'solid 1px black', marginTop:0}} className="select-none">
        <Suspense fallback={null}>
            <Physics>
              <POV />
              <Ceiling size={SIZE} />
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
