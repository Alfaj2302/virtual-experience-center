/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 public/model/MapSection.gltf 
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Model(props) {
  const { nodes, materials } = useGLTF('/MapSection.gltf')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Areas.geometry} material={materials.None} />
    </group>
  )
}

useGLTF.preload('/MapSection.gltf')
