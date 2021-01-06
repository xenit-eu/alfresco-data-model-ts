import invariant from 'tiny-invariant';
import IQNameFactory from './IQNameFactory';

// @internal
export const factorySymbol = Symbol('QNameFactory');

/**
 * A QName is the fully qualified name of a type, aspect, property, association, ...
 *
 * A QName consists of a namespace URI, a prefix (that is a shorter alias for the namespace URI) and a local name.
 * @public
 */
interface QName {
    /**
     * Namespace URI of the QName
     */
    readonly namespaceURI: string;
    /**
     * Namespace prefix of the QName
     */
    readonly prefix: string;

    /**
     * Local name of the QName
     */
    readonly localName: string;

    /**
     * Internal reference to the factory that created the QName
     */
    readonly [factorySymbol]: IQNameFactory;
}

/**
 * Functions that operate on a QName instance
 * @public
 */
namespace QName {
    /**
     * Creates a fully-qualified string of a QName
     *
     * A fully-qualified string consists of the namespace URI and the local name of the QName
     *
     * @param qname - The QName to convert to a string
     */
    export function toString(qname: QName): string {
        return '{' + qname.namespaceURI + '}' + qname.localName;
    }

    /**
     * Creates a prefix string of a QName
     *
     * A prefix string consists of the prefix and the local name of the QName
     *
     * @param qname - The QName to convert to a string
     */
    export function toPrefixString(qname: QName): string {
        return qname.prefix + ':' + qname.localName;
    }

    /**
     * Creates a QName from a string
     * @param oldQName - The QName from which we can get a factory to create a new QName
     * @param qnameString - The QName to create in string format
     * @internal
     */
    export function createQName(oldQName: QName, qnameString: string): QName {
        return oldQName[factorySymbol].createQNameFromString(qnameString);
    }

    function maybeCreateQName(
        oldQName: QName,
        qnameString: string
    ): QName | null {
        return oldQName[factorySymbol].maybeCreateQNameFromString(qnameString);
    }

    /**
     * Checks if two QNames are equal.
     * @param a - The first QName to compare
     * @param b - The second QName to compare. This may also be a string, in which case it will be parsed as a QName.
     */
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

    /**
     * Checks if something is a QName object
     * @param a - Something to check
     */
    export function isInstance(a: any): a is QName {
        return typeof a === 'object' && !!a[factorySymbol];
    }
}

export default QName;

const typeTagSymbol = Symbol();

/**
 * Type tag that indicates what the QName refers to
 * @internal
 */
export enum QNameTypeTag {
    CLASS,
    ASSOCIATION,
    PROPERTY,
    DATA_TYPE,
    OTHER,
    UNKNOWN,
}

/**
 * A QName with an embedded type tag that indicates what the QName refers to
 */
interface QNameWithTypeTag<T extends QNameTypeTag = QNameTypeTag>
    extends QName {
    // @internal
    readonly [typeTagSymbol]: T;
}

/**
 * Consumer-side for a QName with an embedded type tag
 *
 * This also allows for a plain QName without a type tag or a QName with an unkown type tag to be used.
 */
export type QNameWithTypeTagConsumer<T extends QNameTypeTag> =
    | QName
    | QNameWithTypeTag<T | QNameTypeTag.UNKNOWN>;

/**
 * Functions to operate on QNames with a type tag
 * @internal
 */
namespace QNameWithTypeTag {
    export function addTag<T extends QNameTypeTag>(
        q: QName,
        tag: T
    ): QNameWithTypeTag<T> {
        invariant(QName.isInstance(q));
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
        invariant(QName.isInstance(q));
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
        invariant(QName.isInstance(q));
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
