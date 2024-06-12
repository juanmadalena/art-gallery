import { DeviceOrientationControls, PointerLockControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import useDetectDevice from "../hooks/useDetectDevice";

function POV() {
    const { camera, gl } = useThree();
    const { isMobile } = useDetectDevice();

    return (
        <>
            {
                isMobile ?
                    <DeviceOrientationControls camera={camera} />
                :
                    <PointerLockControls camera={camera} domElement={gl.domElement} maxPolarAngle={Math.PI / 2} />
            }
        </>

    )
}

export default POV;
