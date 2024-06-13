import { DeviceOrientationControls, PointerLockControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import useDetectDevice from "../hooks/useDetectDevice";
import { useContext } from "react";
import { LoaderContext } from "../contexts/loaderContext/LoaderContext";
import { PermissionContext } from "../contexts/permissionContext/PermissionContext";

function POV() {
    const { camera, gl } = useThree();
    const { isMobile } = useDetectDevice();
    const { init, } = useContext(LoaderContext)
    const { permission } = useContext(PermissionContext)

    return (
        <>
            {
                init ? null : isMobile && permission === 'granted' ?
                    <DeviceOrientationControls camera={camera} deviceOrientation={{ alpha: window.orientation, beta: 100, gamma: 0 }} />
                    :
                    <PointerLockControls camera={camera} domElement={gl.domElement} maxPolarAngle={Math.PI / 2} />
            }
        </>

    )
}

export default POV;
