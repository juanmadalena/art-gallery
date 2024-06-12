import { usePlane } from "@react-three/cannon"
import { goundMaterial } from "../textures/groundTexture"
import { Mesh } from "three"
import { Ref } from "react"

type GroundProps = {
    size: number
}

function Ground({ size }: GroundProps) {
    const [ref] = usePlane(() => ({ 
        rotation: [- Math.PI / 2, 0, 0], 
        position: [0, 0, 0]
    }))


    return (
        <>
            <mesh 
                ref={ref as Ref<Mesh>}
            >
                <planeGeometry args={[ size, size, 1 ]} attach={'geometry'} />
                <meshBasicMaterial attach={'material'} 
                    map={goundMaterial.map} 
                />
            </mesh>
        </>
    )
}


export default Ground
