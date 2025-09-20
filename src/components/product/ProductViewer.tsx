'use client'

import { Canvas } from '@react-three/fiber'
import { 
  Environment, 
  OrbitControls, 
  PresentationControls,
  Center
} from '@react-three/drei'
import { Suspense } from 'react'
import { RotatingJacket } from '@/components/3d/RotatingJacket'

export function ProductViewer() {
  return (
    <div className="h-[600px] w-full">
      <Canvas
        shadows
        camera={{ position: [0, 0, 3], fov: 45 }}
        className="bg-primary-light dark:bg-primary-dark rounded-lg"
      >
        <Suspense fallback={null}>
          <PresentationControls
            global
            config={{ mass: 2, tension: 400 }}
            snap={{ mass: 4, tension: 300 }}
            rotation={[0, 0.3, 0]}
            polar={[-Math.PI / 3, Math.PI / 3]}
            azimuth={[-Math.PI / 1.4, Math.PI / 2]}
          >
            <Center>
              <RotatingJacket />
            </Center>
          </PresentationControls>

          <OrbitControls 
            autoRotate 
            autoRotateSpeed={2}
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 2.5}
            maxPolarAngle={Math.PI / 2.5}
          />

          <Environment preset="city" />
        </Suspense>

        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
      </Canvas>
    </div>
  )
}