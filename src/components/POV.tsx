import { DeviceOrientationControls, OrbitControls, PointerLockControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import useDetectDevice from "../hooks/useDetectDevice";

function POV() {
    const { camera, gl } = useThree();
    const { isMobile } = useDetectDevice();

    return (
        <>
            {
                isMobile ?
                    <OrbitControls camera={camera} domElement={gl.domElement} />
                :
                    <DeviceOrientationControls camera={camera} />
            }
        </>

    )
}

export default POV;
