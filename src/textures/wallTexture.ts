import { TextureLoader, RepeatWrapping } from 'three';
import ConcreteWall from '../assets/textures/ConcreteWall.jpg';

const loader = new TextureLoader();

const colorTexture = loader.load(ConcreteWall);
colorTexture.wrapS = colorTexture.wrapT = RepeatWrapping;
colorTexture.repeat.set(2, 2);

export const WallMaterial = {
    map: colorTexture,
}