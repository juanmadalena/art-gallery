import { ceilingMaterial } from "../textures/ceilingTexture"

type CeilingMaterialProps = {
    size: number
}

function Ceiling({ size }: CeilingMaterialProps) {

    return (
        <>
            <mesh position={[0, 3.5, 0]} rotation={[- Math.PI / 2, Math.PI, 0]} >
                <planeGeometry args={[ size, size, 1 ]} attach={'geometry'} />
                <meshBasicMaterial attach={'material'} 
                    map={ceilingMaterial.map}
                />
            </mesh>
        </>
    )
}


export default Ceiling
