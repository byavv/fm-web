import { Identity } from './identity';
import { ExtHttp } from './extHttp';
import { Api } from './backEndApi';
import { AuthApi } from './authBackEndApi';
import { ResponseHandler } from './responseHandler';
import { AppController } from './appController';
import { STORAGE_PROVIDERS } from './storage';

//import { APP_CORE_API_PROVIDERS } from './core';
import { APP_CUSTOM_API_PROVIDERS } from './custom';

export * from './identity';
export * from './extHttp';
export * from './backEndApi';
export * from './responseHandler';
export * from './appController';
export * from './authBackEndApi';
export * from './storage';
//export * from './core';
export * from './custom';

export var SHARED_SERVICES: Array<any> = [
    ExtHttp,
    Identity,//<! TODO: remove
    Api,//<! TODO: remove
    ResponseHandler,//<! TODO: remove
    AppController,
    AuthApi, //<! TODO: remove
    ...STORAGE_PROVIDERS,
  //  ...APP_CORE_API_PROVIDERS,
    ...APP_CUSTOM_API_PROVIDERS,
];
