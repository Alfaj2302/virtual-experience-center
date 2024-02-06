import { MeshNormalMaterial } from "three"
import { Map } from "./Map"
import { OrbitControls } from "@react-three/drei"

export const Experience = () => {
    return (
        <>
            <OrbitControls />
            {/* <ambientLight intensity={4}/> */}
            <directionalLight position={[0, 5, 30]} intensity={1} />
            <Map />
        </>
    )
}