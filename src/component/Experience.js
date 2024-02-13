import React, { useEffect, useRef, useState } from 'react';
import { MapControls, PerspectiveCamera } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { Map } from './Map';

export const Experience = () => {
    const { camera, gl } = useThree();
    const controls = useRef();
    const [showAnchor, setShowAnchor] = useState(false);
    const [anchorPosition, setAnchorPosition] = useState({ x: 0, y: 0 });
    const [hoveredSphere, setHoveredSphere] = useState(null);

    useEffect(() => {
        camera.position.set(-1960.4805421048945, Math.max(837.31586052580525, 50), -2307.9851536299686);
    }, [camera]);

    useEffect(() => {
        const handleControlsUpdate = () => {
            camera.position.setY(Math.max(100, Math.min(camera.position.y, 990.31586052580525)));
        };

        if (controls.current) {
            controls.current.addEventListener('change', handleControlsUpdate);

            return () => {
                controls.current.removeEventListener('change', handleControlsUpdate);
            };
        }
    }, [camera]);

    const handleSphereHover = (index, event) => {
        const { clientX, clientY } = event;
        setHoveredSphere(index);
        setShowAnchor(true);
        setAnchorPosition({ x: clientX, y: clientY });
    };

    const handleSphereLeave = () => {
        setHoveredSphere(null);
        setShowAnchor(false);
    };

    const locationPins = [
        { position: [-1000, 200, 0], link: 'https://example.com/1' },
        { position: [-2500, 150, 450], link: 'https://example.com/2' },
        { position: [-2500, 300, 450], link: 'https://example.com/3' },
        { position: [-500, 250, 750], link: 'https://example.com/4' },
        { position: [-3000, 100, -550], link: 'https://example.com/5' },
        { position: [-2300, 300, -600], link: 'https://example.com/6' },
        { position: [-1800, 500, -650], link: 'https://example.com/7' },
        { position: [-1000, 300, -1550], link: 'https://example.com/8' },
        { position: [-2800, 300, -1550], link: 'https://example.com/9' },
    ];

    return (
        <>
        <PerspectiveCamera/>
            <MapControls ref={controls} maxDistance={3500} args={[camera, gl.domElement]} />
            <ambientLight intensity={1.5} />
            <directionalLight position={[0, 50, 30]} intensity={1} castShadow />

            <Map />

            {/* Ground plane */}
            <mesh position={[0, -5, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                <planeGeometry args={[7000, 5000]} />
                <meshStandardMaterial color="#52576b" />
            </mesh>

            {/* Sphere location pins */}
            {locationPins.map((pin, index) => (
                <mesh
                    key={index}
                    position={pin.position}
                    castShadow
                    onPointerOver={(event) => handleSphereHover(index, event)}
                    onPointerOut={() => handleSphereLeave()}
                >
                    <sphereGeometry args={[50, 50]} />
                    <meshStandardMaterial attach="material" color="#ff0000" />
                </mesh>
            ))}

            {/* Anchor tag in the center of the screen */}
            {showAnchor && hoveredSphere !== null && (
                <div
                    style={{
                        position: 'absolute',
                        top: anchorPosition.y,
                        left: anchorPosition.x,
                        transform: 'translate(-50%, -50%)',
                        zIndex: 1000,
                    }}
                >
                    <a href={locationPins[hoveredSphere].link} style={{ color: 'white', textDecoration: 'none' }}>
                        Click me!
                    </a>
                </div>
            )}

        </>
    );
};
