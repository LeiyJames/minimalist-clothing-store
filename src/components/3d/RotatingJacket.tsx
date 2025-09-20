'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Box, Cylinder } from '@react-three/drei'
import * as THREE from 'three'

export function RotatingJacket() {
  const jacketRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (jacketRef.current) {
      // Smooth rotation
      jacketRef.current.rotation.y = THREE.MathUtils.lerp(
        jacketRef.current.rotation.y,
        (state.mouse.x * Math.PI) / 10,
        0.075
      )
      jacketRef.current.rotation.x = THREE.MathUtils.lerp(
        jacketRef.current.rotation.x,
        (state.mouse.y * Math.PI) / 10,
        0.075
      )
    }
  })

  return (
    <group ref={jacketRef} dispose={null}>
      {/* Main body of the jacket */}
      <Box args={[1.2, 1.5, 0.4]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#2A2A2A" roughness={0.7} metalness={0.3} />
      </Box>

      {/* Shoulders */}
      <Box args={[1.6, 0.3, 0.5]} position={[0, 0.6, 0]}>
        <meshStandardMaterial color="#2A2A2A" roughness={0.7} metalness={0.3} />
      </Box>

      {/* Collar */}
      <Box args={[0.8, 0.2, 0.3]} position={[0, 0.7, 0]} rotation={[0.3, 0, 0]}>
        <meshStandardMaterial color="#2A2A2A" roughness={0.7} metalness={0.3} />
      </Box>

      {/* Sleeves */}
      <Box args={[0.3, 0.8, 0.3]} position={[-0.75, 0.2, 0]}>
        <meshStandardMaterial color="#2A2A2A" roughness={0.7} metalness={0.3} />
      </Box>
      <Box args={[0.3, 0.8, 0.3]} position={[0.75, 0.2, 0]}>
        <meshStandardMaterial color="#2A2A2A" roughness={0.7} metalness={0.3} />
      </Box>

      {/* Buttons */}
      <Cylinder args={[0.05, 0.05, 0.05]} position={[0, 0.3, 0.21]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
      </Cylinder>
      <Cylinder args={[0.05, 0.05, 0.05]} position={[0, 0, 0.21]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
      </Cylinder>
      <Cylinder args={[0.05, 0.05, 0.05]} position={[0, -0.3, 0.21]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
      </Cylinder>
    </group>
  )
}