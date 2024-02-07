import React, { useEffect, useRef } from 'react';
import { Map } from './Map';
import { OrbitControls } from '@react-three/drei';
import { useThree } from '@react-three/fiber';

export const Experience = () => {
    const { camera, gl } = useThree();
    const controls = useRef();

    // Set the initial camera position and rotation
    camera.position.set(-1760.4805421048945, 337.31586052580525, -1807.9851536299686); // Adjust the values based on your scene dimensions
    camera.rotation.set(-Math.PI / 2, 0, 0); // Rotating the camera to look down

    useEffect(() => {
        const handleControlsUpdate = () => {
            console.log(camera.position);
        };

        controls.current.addEventListener('change', handleControlsUpdate);

        return () => {
            controls.current.removeEventListener('change', handleControlsUpdate);
        };
    }, [camera]);

    return (
        <>
            <OrbitControls
                ref={controls}
                args={[camera, gl.domElement]}
            />
            <directionalLight position={[0, 5, 30]} intensity={1} />
            <Map />
        </>
    );
};
