import { DeviceOrientationControls, PointerLockControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import useDetectDevice from "../hooks/useDetectDevice";
import { useContext } from "react";
import { LoaderContext } from "../contexts/loaderContext/LoaderContext";

function POV() {
    const { camera, gl } = useThree();
    const { isMobile } = useDetectDevice();
    const { paintings, init } = useContext(LoaderContext)

    return (
        <>
            {
                paintings?.length > 0 || init ? null : isMobile ?
                    <DeviceOrientationControls camera={camera} deviceOrientation={{ alpha: window.orientation, beta: 100, gamma: 0 }} />
                :
                    <PointerLockControls camera={camera} domElement={gl.domElement} maxPolarAngle={Math.PI / 2} />
            }
        </>

    )
}

export default POV;
