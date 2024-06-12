import { TextureLoader, RepeatWrapping } from 'three';
import OfficeCeiling from '../assets/textures/OfficeCeiling.jpg';

const loader = new TextureLoader();

const colorTexture = loader.load(OfficeCeiling);
colorTexture.wrapS = colorTexture.wrapT = RepeatWrapping;
colorTexture.repeat.set(3, 3);

export const ceilingMaterial = {
    map: colorTexture,
}