/* tslint:disable */

import { LoggerService } from './logger.service';
import { LoopBackAuth } from './auth.service';
import { ErrorHandler } from './error.service';
import { JSONSearchParams } from './search.params';
import { BaseLoopBackApi } from './base.service';

export * from './logger.service';
export * from './auth.service';
export * from './error.service';
export * from './search.params';
export * from './base.service';

import { ACTIONS_PROVIDERS } from "./actions";
import { GUARDS } from "./guards";

export const APP_CORE_API_PROVIDERS = [
    LoggerService,
    LoopBackAuth,
    ErrorHandler,
    JSONSearchParams,
    BaseLoopBackApi,
    ...ACTIONS_PROVIDERS,
    ...GUARDS
]