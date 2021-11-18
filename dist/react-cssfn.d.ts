import { Classes, Styles } from 'jss';
import type { Factory, ProductOrFactory } from '@cssfn/types';
import { ClassList } from '@cssfn/cssfn';
export declare const createUseJssSheet: <TClassName extends string = string>(styles: ProductOrFactory<Styles<TClassName, unknown, undefined>>) => Factory<Classes<TClassName>>;
export declare const createUseSheet: <TClassName extends string = string>(classes: ProductOrFactory<ClassList<TClassName>>) => Factory<Classes<TClassName>>;
