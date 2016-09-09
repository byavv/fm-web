import { UserApi } from './User';
import { MakerApi } from './Maker';
import { CarApi } from './Car';
import { EngineTypeApi } from './EngineType';
import { ProfileApi } from './Profile';
import { ImageApi } from './Image';

export * from './User';
export * from './Maker';
export * from './Car';
export * from './EngineType';
export * from './Profile';
export * from './Image';

export const APP_CUSTOM_API_PROVIDERS = [
    UserApi, MakerApi, CarApi, EngineTypeApi, ProfileApi, ImageApi
];
