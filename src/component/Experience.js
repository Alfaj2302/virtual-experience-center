import React, { useEffect, useRef } from 'react';
import { Map } from './Map';
import { OrbitControls } from '@react-three/drei';
import { useThree } from '@react-three/fiber';

export const Experience = () => {
    const { camera, gl } = useThree();
    const controls = useRef();

    // Set the initial camera position
    useEffect(() => {
        camera.position.set(-1760.4805421048945, Math.max(337.31586052580525, 50), -1807.9851536299686);
    }, [camera]);

    // Adjust controls during updates
    useEffect(() => {
        const handleControlsUpdate = () => {
            // Ensure that the Y position of the camera doesn't go below 50
            camera.position.setY(Math.max(camera.position.y, 50));
        };

        // Add a null check before attempting to remove the event listener
        if (controls.current) {
            controls.current.addEventListener('change', handleControlsUpdate);

            return () => {
                controls.current.removeEventListener('change', handleControlsUpdate);
            };
        }
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
