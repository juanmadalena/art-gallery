import { useContext, useEffect, useState } from "react"
import { MeshBasicMaterial, TextureLoader } from "three"
import { LoaderContext } from "../contexts/loaderContext/LoaderContext"

type PaintingProps = {
    url: string
    position: [number, number, number]
    height: number
    width: number
    rotation?: [number, number, number]
}

function Painting({url, position, height, width, rotation}: PaintingProps){

    const { addPainting, removePainting } = useContext(LoaderContext)

    const [paintingMaterial, setPaintingMaterial] = useState<MeshBasicMaterial>()

    useEffect(() => {
        addPainting(url)
        const textureLoader = new TextureLoader()
        textureLoader.load(url, (texture) => {
            setPaintingMaterial(new MeshBasicMaterial({ map: texture }))
            removePainting(url)
        })

    }, [])

    return (
        <>
        {
            paintingMaterial &&
            <mesh position={position} rotation={rotation}>
                <planeGeometry args={[ width, height, 1 ]} attach={'geometry'} />
                <meshBasicMaterial attach={'material'} map={paintingMaterial?.map}  />
            </mesh>
        }

        </>
    )
}

export default Painting