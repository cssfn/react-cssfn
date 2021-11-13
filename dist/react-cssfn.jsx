"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = exports.Element = exports.parseNumber = exports.setRef = exports.isTypeOf = exports.useTestSemantic = exports.useSemantic = exports.createUseSheet = exports.createUseJssSheet = void 0;
// react:
const react_1 = __importStar(require("react")); // base technology of our cssfn components
// jss:
const jss_1 = require("jss"); // base technology of our cssfn components
const cssfn_1 = require("@cssfn/cssfn"); // cssfn core
// hooks:
const styleSheetManager = new jss_1.SheetsManager(); // caches & manages styleSheets usage, attached to dom when in use and detached from dom when not in use
const createUseJssSheet = (styles) => {
    const styleSheetId = {}; // a simple object for the styleSheet's identifier (by reference)
    return () => {
        const styleSheet = ( // no need to use `useMemo` because fetching from `styleSheetManager` is inexpensive
        // take from an existing cached styleSheet (if any):
        styleSheetManager.get(styleSheetId) // inexpensive operation
            ??
                // or create a new one:
                (() => {
                    // create a new styleSheet using our pre-configured `customJss`:
                    const newStyleSheet = (0, cssfn_1.createJssSheet)(styles);
                    // register to `styleSheetManager` to be cached and also to be able to attach/detach to/from dom:
                    styleSheetManager.add(styleSheetId, newStyleSheet);
                    // here the ready to use styleSheet:
                    return newStyleSheet;
                })());
        (0, react_1.useLayoutEffect)(() => {
            // notify `styleSheetManager` that the `styleSheet` is being used
            // the `styleSheetManager` will attach the `styleSheet` to dom if one/more `styleSheet` users exist.
            styleSheetManager.manage(styleSheetId);
            // cleanups:
            return () => {
                // notify `styleSheetManager` that the `styleSheet` is no longer being used
                // the `styleSheetManager` will detach the `styleSheet` from dom if no `styleSheet` user exists.
                styleSheetManager.unmanage(styleSheetId);
            };
        }, []);
        // here the ready to use `styleSheet`'s classes:
        return styleSheet.classes;
    };
};
exports.createUseJssSheet = createUseJssSheet;
const createUseSheet = (classes) => {
    return (0, exports.createUseJssSheet)(() => (0, cssfn_1.usesCssfn)(classes));
};
exports.createUseSheet = createUseSheet;
const useSemantic = (props, options = props) => {
    const roleAbs = props.role ?? (Array.isArray(options.semanticRole) ? (options.semanticRole?.[0] ?? undefined) : (options.semanticRole ?? undefined));
    const isDesiredType = !!roleAbs && (Array.isArray(options.semanticRole) ? options.semanticRole.includes(roleAbs) : (options.semanticRole === roleAbs));
    const tagFn = props.tag ?? (isDesiredType ? (Array.isArray(options.semanticTag) ? (options.semanticTag?.[0] ?? undefined) : (options.semanticTag ?? undefined)) : undefined);
    const isSemanticTag = !!tagFn && (Array.isArray(options.semanticTag) ? options.semanticTag.includes(tagFn) : (options.semanticTag === tagFn));
    const roleFn = isDesiredType ? (isSemanticTag ? '' : roleAbs) : roleAbs; /* `''` => do not render role attribute, `undefined` => lets the BaseComponent decide the appropriate role */
    return [
        tagFn,
        roleFn,
        isDesiredType,
        isSemanticTag,
    ];
};
exports.useSemantic = useSemantic;
const useTestSemantic = (props, options) => {
    const semanticTag = (() => {
        if (!props.semanticTag)
            return options.semanticTag;
        if (props.semanticTag === options.semanticTag)
            return options.semanticTag;
        const semanticTag1 = Array.isArray(props.semanticTag) ? props.semanticTag : [props.semanticTag];
        const semanticTag2 = Array.isArray(options.semanticTag) ? options.semanticTag : [options.semanticTag];
        const intersect = semanticTag1.filter((p) => semanticTag2.includes(p));
        return (intersect.length) ? intersect : null;
    })();
    const semanticRole = (() => {
        if (!props.semanticRole)
            return options.semanticRole;
        if (props.semanticRole === options.semanticRole)
            return options.semanticRole;
        const semanticRole1 = Array.isArray(props.semanticRole) ? props.semanticRole : [props.semanticRole];
        const semanticRole2 = Array.isArray(options.semanticRole) ? options.semanticRole : [options.semanticRole];
        const intersect = semanticRole1.filter((p) => semanticRole2.includes(p));
        return (intersect.length) ? intersect : null;
    })();
    return (0, exports.useSemantic)(props, { semanticTag, semanticRole });
};
exports.useTestSemantic = useTestSemantic;
// utilities:
const isTypeOf = (element, funcComponent) => {
    return (react_1.default.isValidElement(element)
        &&
            ((element.type === funcComponent)
                ||
                    ((typeof element.type === 'function')
                        &&
                            ((element.type.prototype
                                &&
                                    funcComponent.prototype
                                &&
                                    (element.type.prototype === funcComponent.prototype))
                                ||
                                    (element.type.prototype instanceof funcComponent)))));
};
exports.isTypeOf = isTypeOf;
const setRef = (elmRef, elm) => {
    if (elmRef) {
        if (typeof (elmRef) === 'function') {
            elmRef(elm);
        }
        else {
            elmRef.current = elm;
        } // if
    } // if
};
exports.setRef = setRef;
// utilities:
const isSingleValue = (num) => (typeof (num) === 'string') || (Array.isArray(num) && (num.length === 1));
const parseNumber = (num) => {
    if (typeof (num) === 'number')
        return num;
    if (!num)
        return null;
    if (!isSingleValue(num))
        return null;
    if (!num)
        return null;
    num = Number.parseFloat(num);
    if (isNaN(num))
        return null;
    return num;
};
exports.parseNumber = parseNumber;
// react components:
const htmlPropList = [
    // All HTML Attributes
    'accept',
    'acceptCharset',
    'action',
    'allowFullScreen',
    'allowTransparency',
    'alt',
    'as',
    'async',
    'autoComplete',
    'autoFocus',
    'autoPlay',
    'capture',
    'cellPadding',
    'cellSpacing',
    'charSet',
    'challenge',
    'checked',
    'cite',
    'classID',
    'cols',
    'colSpan',
    'content',
    'controls',
    'coords',
    'crossOrigin',
    'data',
    'dateTime',
    'default',
    'defer',
    'disabled',
    'download',
    'encType',
    'form',
    'formAction',
    'formEncType',
    'formMethod',
    'formNoValidate',
    'formTarget',
    'frameBorder',
    'headers',
    'height',
    'high',
    'href',
    'hrefLang',
    'htmlFor',
    'httpEquiv',
    'integrity',
    'keyParams',
    'keyType',
    'kind',
    'label',
    'list',
    'loop',
    'low',
    'manifest',
    'marginHeight',
    'marginWidth',
    'max',
    'maxLength',
    'media',
    'mediaGroup',
    'method',
    'min',
    'minLength',
    'multiple',
    'muted',
    'name',
    'nonce',
    'noValidate',
    'open',
    'optimum',
    'pattern',
    'placeholder',
    'playsInline',
    'poster',
    'preload',
    'readOnly',
    'rel',
    'required',
    'reversed',
    'rows',
    'rowSpan',
    'sandbox',
    'scope',
    'scoped',
    'scrolling',
    'seamless',
    'selected',
    'shape',
    'size',
    'sizes',
    'span',
    'src',
    'srcDoc',
    'srcLang',
    'srcSet',
    'start',
    'step',
    'summary',
    'target',
    'type',
    'useMap',
    'value',
    'width',
    'wmode',
    'wrap',
    // Standard HTML Attributes:
    'accessKey',
    // 'className',
    'contentEditable',
    'contextMenu',
    'dir',
    'draggable',
    'hidden',
    'id',
    'lang',
    'slot',
    'spellCheck',
    'style',
    'title',
    'translate',
    // accessibilities:
    'tabIndex',
    // values:
    'defaultValue',
    // more:
    'referrerPolicy',
    'ping',
];
const isHtmlProp = (propName) => propName.startsWith('on') || propName.startsWith('aria-') || htmlPropList.includes(propName);
function Element(props) {
    // html props:
    const htmlProps = (0, react_1.useMemo)(() => {
        const htmlProps = {
            ref: props.elmRef,
        };
        for (const name in props) {
            if (isHtmlProp(name)) {
                htmlProps[name] = props[name];
            } // if
        } // for
        return htmlProps;
    }, [props]);
    // fn props:
    const [tag, role] = (0, exports.useSemantic)(props);
    const Tag = (tag ?? 'div');
    // jsx:
    return (<Tag 
    // other props:
    {...htmlProps} 
    // semantics:
    role={role || undefined} aria-label={props['aria-label'] || undefined} 
    // classes:
    className={Array.from(new Set([
            // main:
            props.mainClass,
            // additionals:
            ...(props.classes ?? []),
            // variants:
            ...(props.variantClasses ?? []),
            // states:
            ...(props.stateClasses ?? []),
        ].filter((c) => !!c))).join(' ') || undefined}>
            {props.children}
        </Tag>);
}
exports.Element = Element;
exports.default = Element;
