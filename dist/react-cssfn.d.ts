import { default as React } from 'react';
import { Classes, Styles } from 'jss';
import type { Optional, SingleOrArray, Factory, ProductOrFactory } from '@cssfn/types';
import { ClassList } from '@cssfn/cssfn';
export declare type Tag = keyof JSX.IntrinsicElements;
export declare type Role = React.AriaRole;
export declare type SemanticTag = SingleOrArray<Optional<Tag>>;
export declare type SemanticRole = SingleOrArray<Optional<Role>>;
export declare const createUseJssSheet: <TClassName extends string = string>(styles: ProductOrFactory<Styles<TClassName, unknown, undefined>>) => Factory<Classes<TClassName>>;
export declare const createUseSheet: <TClassName extends string = string>(classes: ProductOrFactory<ClassList<TClassName>>) => Factory<Classes<TClassName>>;
export interface SemanticOptions {
    semanticTag?: SemanticTag;
    semanticRole?: SemanticRole;
}
export interface SemanticProps extends SemanticOptions, React.AriaAttributes {
    tag?: Tag;
    role?: Role;
}
export declare const useSemantic: (props: SemanticProps, options?: SemanticOptions) => readonly [keyof JSX.IntrinsicElements | undefined, React.AriaRole | undefined, boolean, boolean];
export declare const useTestSemantic: (props: SemanticProps, options: SemanticOptions) => readonly [keyof JSX.IntrinsicElements | undefined, React.AriaRole | undefined, boolean, boolean];
export declare const isTypeOf: <TProps>(element: React.ReactNode, funcComponent: React.JSXElementConstructor<TProps>) => element is React.ReactElement<TProps, React.JSXElementConstructor<TProps>>;
export declare const setRef: <TElement extends HTMLElement>(elmRef: React.Ref<TElement> | undefined, elm: TElement | null) => void;
export declare const parseNumber: (num: number | string | ReadonlyArray<string> | null | undefined) => number | null;
export interface ElementProps<TElement extends HTMLElement = HTMLElement> extends React.DOMAttributes<TElement>, SemanticProps {
    style?: React.CSSProperties;
    elmRef?: React.Ref<TElement>;
    id?: string;
    mainClass?: Optional<string>;
    classes?: Optional<string>[];
    variantClasses?: Optional<string>[];
    stateClasses?: Optional<string>[];
}
export declare function Element<TElement extends HTMLElement = HTMLElement>(props: ElementProps<TElement>): JSX.Element;
export { Element as default };
