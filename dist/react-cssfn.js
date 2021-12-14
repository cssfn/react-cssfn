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
const sheetManager = new SheetsManager(); // caches & manages sheets usage, attached to dom when in use and detached from dom when not in use
let sheetCounter = 0;
export const createUseJssSheet = (styles) => {
    const sheetIdObj = {}; // a simple object for the sheet's identifier (by reference)
    const sheetId = (++sheetCounter);
    return () => {
        const sheet = ( // no need to use `useMemo` because fetching from `sheetManager` is inexpensive
        // take from an existing cached sheet (if any):
        sheetManager.get(sheetIdObj) // inexpensive operation
            ??
                // or create a new one:
                (() => {
                    // create a new sheet using our pre-configured `customJss`:
                    const newSheet = createJssSheet(styles, sheetId.toString(36));
                    // register to `sheetManager` to be cached and also to be able to attach/detach to/from dom:
                    sheetManager.add(sheetIdObj, newSheet);
                    // here the ready to use sheet:
                    return newSheet;
                })());
        useIsomorphicLayoutEffect(() => {
            // notify `sheetManager` that the `sheet` is being used
            // the `sheetManager` will attach the `sheet` to dom if one/more `sheet` users exist.
            sheetManager.manage(sheetIdObj);
            // cleanups:
            return () => {
                // notify `sheetManager` that the `sheet` is no longer being used
                // the `sheetManager` will detach the `sheet` from dom if no `sheet` user exists.
                sheetManager.unmanage(sheetIdObj);
            };
        }, []);
        // here the ready to use `sheet`'s classes:
        return sheet.classes;
    };
};
export const createUseSheet = (classes) => {
    return createUseJssSheet(() => usesCssfn(classes));
};
