import { PointerLockControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

function POV() {
    const { camera, gl } = useThree();

    return (
        <PointerLockControls
            camera={camera}
            domElement={gl.domElement}
        />
    )
}

export default POV;
