import { types } from "util";
import { ViewContainerRef } from "@angular/core";

export class WindowContainer {
    public static container: ViewContainerRef = null;
}

export const isArray = (object: any): object is any[] => {
    return Array.isArray(object)
};

export const isRegExp = (object: any): object is RegExp => {
    return types.isRegExp(object)
};

export const isDate = (object: any): object is Date => {
    return types.isDate(object)
};

export const isError = (object: any): object is Error => {
    return types.isNativeError(object)
};

export const isBoolean = (object: any): object is boolean => {
    return typeof object === 'boolean'
};

export const isFunction = (object: any): boolean => {
    return typeof object === 'function'
};

export const isNull = (object: any): object is null => {
    return object === null
};

export const isNullOrUndefined = (object: any): object is null | undefined => {
    return object === null || object === undefined
};

export const isNumber = (object: any): object is number => {
    return typeof object === 'number'
};

export const isObject = (object: any): boolean => {
    return object !== null && typeof object === 'object'
};

export const isPrimitive = (object: any): boolean => {
    return (typeof object !== 'object' && typeof object !== 'function') || object === null
};

export const isString = (object: any): object is string => {
    return typeof object === 'string'
};

export const isSymbol = (object: any): object is symbol => {
    return typeof object === 'symbol'
};

export const isUndefined = (object: any): object is undefined => {
    return object === undefined
};
 
