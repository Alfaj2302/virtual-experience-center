import React, { useEffect, useRef } from 'react';
import { Map } from './Map';
import { MapControls } from '@react-three/drei';
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
            <MapControls
                ref={controls}
                maxDistance={3500}
                args={[camera, gl.domElement]}
            />
            <ambientLight intensity={1.5} />
            <directionalLight position={[0, 30, 30]} intensity={1} />
            <Map far={1}/>
            <mesh position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                <planeGeometry args={[7000, 5000]} />
                <meshStandardMaterial color="#52576b" />
            </mesh>
            {/* Add circles for location pins */}
            <mesh position={[100, 0.1, 100]} receiveShadow>
                <circleGeometry args={[5, 32]} />
                <meshStandardMaterial color="red" />
            </mesh>
            <mesh position={[-200, 0.1, -300]} receiveShadow>
                <circleGeometry args={[5, 32]} />
                <meshStandardMaterial color="blue" />
            </mesh>
            {/* Add more circles with different positions and colors as needed */}
        </>
    );
};
