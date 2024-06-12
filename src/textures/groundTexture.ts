import { TextureLoader, RepeatWrapping } from 'three';
import WoodFloor from '../assets/textures/WoodFloor.jpg';

const loader = new TextureLoader();

const colorTexture = loader.load(WoodFloor);
colorTexture.wrapS = colorTexture.wrapT = RepeatWrapping;
colorTexture.repeat.set(8, 8);

export const goundMaterial = {
    map: colorTexture,
}