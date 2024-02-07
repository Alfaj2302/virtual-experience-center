import { Map } from "./Map"
import { OrbitControls } from "@react-three/drei"

export const Experience = () => {
    return (
        <>
            <OrbitControls />
            <directionalLight position={[0, 5, 30]} intensity={1} />
            <Map />
        </>
    )
}