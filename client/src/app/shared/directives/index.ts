export * from './imageLoader';
export * from './inertLink';
export * from './patternInput';
export * from './filterInput';

import { ImageLoader } from './imageLoader';
import { InertLink } from './inertLink';
import { PatternInput } from './patternInput';
import { DebounceInput } from './filterInput';

export const SHARED_DIRECTIVES = [
    ImageLoader,
    InertLink,
    PatternInput,
    DebounceInput
];
