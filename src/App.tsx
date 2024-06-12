import { Canvas } from "@react-three/fiber"
import Ground from "./components/Ground"
import { Physics } from "@react-three/cannon"
import Player from "./components/Player"
import POV from "./components/POV"
import Wall from "./components/Wall"
import Ceiling from "./components/Ceiling"
import { Suspense, useEffect, useState } from "react"
import MoveButtons from "./components/MoveButtons"

interface DeviceOrientationEventiOS extends DeviceOrientationEvent {
  requestPermission?: () => Promise<'granted' | 'denied'>;
}

function App() {

  const [permission, setPermission] = useState<string>('denied')

  const SIZE = 10
  const WALL_HEIGHT = 6

  const requestPermission = (DeviceOrientationEvent as unknown as DeviceOrientationEventiOS).requestPermission;

  const iOS = typeof requestPermission === 'function';

  useEffect(() => {    
    if(iOS) {
      setPermission('prompt')
      alert('iOS')
      requestPermission()
      .then(response => {
        if(response === 'granted') {
          setPermission('granted')
          window.addEventListener('deviceorientation', (event) => {
            console.log(event.alpha, event.beta, event.gamma)
          })
        }else{
          setPermission('denied')
        }
      })
      .catch((e) => {
        setPermission(JSON.stringify(e))
      })
    }
  }, [])



  return (
    <main className="select-none">
      <h1 style={{height:'10dvh'}}>
        {permission}
      </h1>
      <MoveButtons />
      <Canvas style={{height:'90dvh', width:'100dvw', border:'solid 1px black', marginTop:0}} className="select-none">
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
