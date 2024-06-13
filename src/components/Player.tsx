import { Triplet, useSphere } from "@react-three/cannon"
import { useFrame, useThree } from "@react-three/fiber"
import { useContext, useEffect, useRef } from "react"
import { Vector3 } from "three"
import useKeyboard from "../hooks/useKeyboard"
import { LoaderContext } from "../contexts/loaderContext/LoaderContext"
import useDetectDevice from "../hooks/useDetectDevice"

const SPEED = 5


function Player() {

    const { init } = useContext(LoaderContext)
    const { isMobile } = useDetectDevice()

    const { keyPressed } = useKeyboard()
    const { camera } = useThree()
    const [ ref, api ] = useSphere(() => ({
        mass: 1,
        type: 'Dynamic',
        position: [0, 1, 0],
    }))

    const position = useRef<Triplet>([ 0, 0, 0 ])

    useEffect(() => {
        api.position.subscribe((p: Triplet) => (position.current = p))
    }, [api.position])

    useFrame(() => {
        camera.position.copy(new Vector3(position.current[0], position.current[1], position.current[2]))
        if (init) return

        const direction = new Vector3()

        const frontVector = new Vector3(
            0,
            0,
            (keyPressed.moveForward ? -1 : 0) + (keyPressed.moveBackward ? 1 : 0)
        )

        if (keyPressed.rotateLeft || keyPressed.rotateRight) {
            if(!isMobile) return
            if (keyPressed.rotateRight && keyPressed.rotateLeft) return
            camera.rotation.y = keyPressed.rotateLeft ? camera.rotation.y + 0.05 : camera.rotation.y - 0.05       
        }

        const sideVector = new Vector3(
            (keyPressed.moveLeft ? 1 : 0) + (keyPressed.moveRight ? -1 : 0),
            0,
            0
        )

        direction
            .subVectors(frontVector, sideVector)
            .normalize()
            .multiplyScalar(SPEED)
            .applyEuler(camera.rotation)

        
        api.velocity.set(direction.x, 0, direction.z)
    })

    return (
        <>
            <object3D ref={ref}>
                <sphereGeometry args={[1, 1, 1]} attach={'geometry'} />
                <meshStandardMaterial attach={'material'} color={'#f5f5f5'} />
            </object3D>
        </>
    )
}

export default Player