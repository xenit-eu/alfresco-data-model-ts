import QName from './QName';

/**
 * An error thrown when a QName can not be created from a string
 * @public
 */
export class QNameError extends TypeError {
    /**
     * @internal
     * @param message - The error message
     */
    public constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = new.target.name;
    }
}

/**
 * Factory that creates QName objects from fully-qualified QName strings or prefixed QName strings.
 * @public
 */
export default interface IQNameFactory {
    /**
     * Creates a QName from a string.
     * @param qname - String to create a QName from
     * @throws {@link QNameError}
     * This exception is thrown when an error occurs when creating a QName.
     * This can happen because of e.g.: Invalid syntax, a namespace URI or prefix that does not exist, ...
     */
    createQNameFromString(qname: string): QName;

    /**
     * Creates a QName from a string if possible.
     * @param qname - String to create a QName from
     * @returns A QName if it can be created, or `null` if something goes wrong when creating a QName.
     */
    maybeCreateQNameFromString(qname: string): QName | null;
}
