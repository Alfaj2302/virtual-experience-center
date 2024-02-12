import React, { useEffect, useRef } from 'react';
import { Map } from './Map';
import { MapControls } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';

export const angleToRadians = (degrees) => {
    return (degrees * Math.PI) / 180;
};

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
            // Ensure that the Y position of the camera doesn't go below 50 or above 337.31586052580525
            camera.position.setY(Math.max(100, Math.min(camera.position.y, 337.31586052580525)));
            // camera.position.setZ(Math.max(1000, Math.min(camera.position.z, -1807.9851536299686)));
            //camera.position.setX(Math.max(200, Math.min(-2000, 2000.31586052580525)));
        };

        // Add a null check before attempting to remove the event listener
        if (controls.current) {
            controls.current.addEventListener('change', handleControlsUpdate);

            return () => {
                controls.current.removeEventListener('change', handleControlsUpdate);
            };
        }
    }, [camera]);

    // const MapControlsRef = useRef(null);

    // useFrame((state) => {
    //     if (!!MapControlsRef.current) {
    //         const { x, y } = state.mouse
    //     }
    // })

    const locationPins = [
        { position: [-1000, 150, 0] },
        { position: [-2500, 150, 450] },
    ];

    return (
        <>
            <MapControls
                ref={controls}
                maxDistance={3500}
                args={[camera, gl.domElement]}
            />
            <ambientLight intensity={1.5} />
            <directionalLight position={[0, 50, 30]} intensity={1} castShadow />
            <Map far={1} receiveShadow />
            <mesh position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                <planeGeometry args={[7000, 5000]} />
                <meshStandardMaterial color="#52576b" />
            </mesh>
            {locationPins.map((pin, index) => (
                <mesh key={index} position={pin.position} castShadow>
                    <sphereGeometry args={[50, 50]} />
                    <meshStandardMaterial attach="material" color="#ff0000" />
                </mesh>
            ))}
        </>
    );
};
