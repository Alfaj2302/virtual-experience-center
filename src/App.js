import './App.css';
import { Canvas } from '@react-three/fiber';
import { Experience } from './component/Experience';

function App() {
  return (
    <Canvas camera={{ fov: 400, near: 1.1, far: 7000, position: [20, 0, 100] }}>
      <Experience />
    </Canvas>
  );
}

export default App;
