import { useBox } from "@react-three/cannon";
import { WallMaterial } from "../textures/wallTexture";
import { Mesh } from "three";
import { Ref } from "react";


type WallProps = {
    position: [number, number, number],
    height: number,
    width: number,
    rotation?: [number, number, number]
}

function Wall({ position, height, width, rotation = [0, 0, 0] }: WallProps) {

    const [ref] = useBox(() => ({
        mass: 0,
        position: position,
        args: [ width, height, 0.00001 ],
        rotation: rotation
    }));

    return (
        <>
            <mesh ref={ref as Ref<Mesh>}>
                <boxGeometry args={[ width, height, 0.00001 ]} attach={'geometry'} />
                <meshBasicMaterial attach={'material'} 
                    map={WallMaterial.map} 
                />
            </mesh>
        </>
    );
}

export default Wall;