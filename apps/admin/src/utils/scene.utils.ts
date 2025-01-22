import { SceneComponent } from '@/types';

import { IsDevelopment } from './system.utils';

const registeredScenes: SceneComponent = {};

const RegisterScene = (key: string, element: React.FC) => {
    if (!registeredScenes[key] || IsDevelopment()) {
        registeredScenes[key] = element;
    }
};

const GetScene = (key: string) => {
    return registeredScenes[key] || null;
};

export { registeredScenes, RegisterScene, GetScene };
