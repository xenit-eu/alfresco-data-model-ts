import QName from './QName';

interface IQNameFactory {
    createQNameFromString(qname: string): QName;
    maybeCreateQNameFromString(qname: string): QName | null;
}

export default IQNameFactory;
