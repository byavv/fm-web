export * from './controls/colorPicker/colorPicker';
export * from './controls/optionPicker/optionPicker';
export * from './footer/footer';
export * from './header/header';
export * from './loader/loader';

import { ColorPickerControl } from './controls/colorPicker/colorPicker';
import { OptionsPickerControl } from './controls/optionPicker/optionPicker';
import { Footer } from './footer/footer';
import { Header } from './header/header';
import { LoaderComponent } from './loader/loader';

export const SHARED_COMPONENTS = [
    ColorPickerControl,
    OptionsPickerControl,
    Footer,
    Header,
    LoaderComponent
];
