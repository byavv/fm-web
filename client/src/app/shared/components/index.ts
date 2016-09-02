export * from "./controls/colorPicker/colorPicker";
export * from "./controls/optionPicker/optionPicker";
export * from "./footer/footer";
export * from "./header/header";
export * from "./loader/loader";

import { ImageLoader } from "./imageLoader";
import { InertLink } from "./inertLink";
import { PatternInput } from "./patternInput";
import { DebounceInput } from "./filterInput";

export const SHARED_DIRECTIVES = [
    ImageLoader,
    InertLink,
    PatternInput,
    DebounceInput
]