// react:
import { useEffect, useLayoutEffect, } from 'react'; // base technology of our cssfn components
// jss:
import { SheetsManager, } from 'jss'; // base technology of our cssfn components
import { 
// styles:
createJssSheet, 
// cssfn hooks:
usesCssfn, } from '@cssfn/cssfn'; // cssfn core
// others libs:
import { isBrowser, } from 'is-in-browser';
// hooks:
const useIsomorphicLayoutEffect = isBrowser ? useLayoutEffect : useEffect;
const styleSheetManager = new SheetsManager(); // caches & manages styleSheets usage, attached to dom when in use and detached from dom when not in use
export const createUseJssSheet = (styles) => {
    const styleSheetId = {}; // a simple object for the styleSheet's identifier (by reference)
    return () => {
        const styleSheet = ( // no need to use `useMemo` because fetching from `styleSheetManager` is inexpensive
        // take from an existing cached styleSheet (if any):
        styleSheetManager.get(styleSheetId) // inexpensive operation
            ??
                // or create a new one:
                (() => {
                    // create a new styleSheet using our pre-configured `customJss`:
                    const newStyleSheet = createJssSheet(styles);
                    // register to `styleSheetManager` to be cached and also to be able to attach/detach to/from dom:
                    styleSheetManager.add(styleSheetId, newStyleSheet);
                    // here the ready to use styleSheet:
                    return newStyleSheet;
                })());
        useIsomorphicLayoutEffect(() => {
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
export const createUseSheet = (classes) => {
    return createUseJssSheet(() => usesCssfn(classes));
};
