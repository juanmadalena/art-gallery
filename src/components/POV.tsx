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
                    <PointerLockControls camera={camera} domElement={gl.domElement} maxPolarAngle={Math.PI / 2} />
                :
                    <DeviceOrientationControls camera={camera} />
            }
        </>

    )
}

export default POV;
