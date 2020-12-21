import QName from './QName';

/**
 * @public
 */
export default interface IQNameFactory {
    createQNameFromString(qname: string): QName;
    maybeCreateQNameFromString(qname: string): QName | null;
}
