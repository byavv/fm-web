import { ExtHttp } from './extHttp';
import { AppController } from './appController';
import { APP_CUSTOM_API_PROVIDERS } from './custom';

export * from './extHttp';
export * from './appController';
export * from './custom';

export var SHARED_SERVICES: Array<any> = [
    ExtHttp,
    AppController,
    ...APP_CUSTOM_API_PROVIDERS,
];
