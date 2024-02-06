import logo from './logo.svg';
import './App.css';
import { Canvas } from '@react-three/fiber';
import { Experience } from './component/Experience';

function App() {
  return (
    <Canvas>
        <Experience/>
    </Canvas>
  );
}

export default App;
