import invariant from 'tiny-invariant';
import IQNameFactory from './IQNameFactory';

// @internal
export const factorySymbol = Symbol('QNameFactory');

/**
 * @public
 */
interface QName {
    readonly prefix: string;
    readonly namespaceURI: string;
    readonly localName: string;

    readonly [factorySymbol]: IQNameFactory;
}

/**
 * @public
 */
namespace QName {
    export function toString(qname: QName): string {
        return '{' + qname.namespaceURI + '}' + qname.localName;
    }
    export function toPrefixString(qname: QName): string {
        return qname.prefix + ':' + qname.localName;
    }

    function maybeCreateQName(
        oldQName: QName,
        qnameString: string
    ): QName | null {
        return oldQName[factorySymbol].maybeCreateQNameFromString(qnameString);
    }

    export function equals(
        a: QName | null | undefined,
        b: QName | string | null | undefined
    ): boolean {
        if (!a || !b) {
            return false;
        }
        if (typeof b === 'string') {
            b = maybeCreateQName(a, b);
        }
        if (!b) {
            return false;
        }
        return a.localName === b.localName && a.namespaceURI === b.namespaceURI;
    }

    export function isInstance(a: any): a is QName {
        return typeof a === 'object' && !!a[factorySymbol];
    }
}

export default QName;

const typeTagSymbol = Symbol();

// @internal
export enum QNameTypeTag {
    CLASS,
    ASSOCIATION,
    PROPERTY,
    DATA_TYPE,
    OTHER,
    UNKNOWN,
}

interface QNameWithTypeTag<T extends QNameTypeTag = QNameTypeTag>
    extends QName {
    // @internal
    readonly [typeTagSymbol]: T;
}

namespace QNameWithTypeTag {
    export function addTag<T extends QNameTypeTag>(
        q: QName,
        tag: T
    ): QNameWithTypeTag<T> {
        if (!isInstance(q) || hasTag(q, QNameTypeTag.UNKNOWN)) {
            return {
                ...q,
                [typeTagSymbol]: tag,
            };
        } else {
            assertTag(q, tag);
            return q;
        }
    }

    export function isInstance(a: any): a is QNameWithTypeTag {
        return typeof a === 'object' && !!a[typeTagSymbol];
    }

    function hasTag<T extends QNameTypeTag>(
        q: QName,
        tag: T
    ): q is QNameWithTypeTag<T> {
        if (!isInstance(q)) {
            return true;
        }
        const typeTag = q[typeTagSymbol];
        if (typeTag === QNameTypeTag.UNKNOWN) {
            return true;
        }
        return typeTag === tag;
    }

    export function assertTag<T extends QNameTypeTag>(
        q: QName,
        tag: T
    ): asserts q is QNameWithTypeTag<T> {
        if (!isInstance(q)) return;
        invariant(
            hasTag(q, tag),
            'Expected qname to point to type ' +
                QNameTypeTag[tag] +
                ', but it points to a type of ' +
                QNameTypeTag[q[typeTagSymbol]]
        );
    }
}
export { QNameWithTypeTag };
