import IQNameFactory from '../model/IQNameFactory';
import QName, { factorySymbol } from '../model/QName';

class QNameError extends TypeError {
    public constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = new.target.name;
    }
}
export default class QNameFactory implements IQNameFactory {
    private prefixToNamespace: { [pfx: string]: string } = {};
    private namespaceToPrefix: { [ns: string]: string } = {};

    public registerPrefix(prefix: string, namespace: string) {
        this.prefixToNamespace[prefix] = namespace;
        this.namespaceToPrefix[namespace] = prefix;
    }

    private getNamespaceFromPrefix(prefix: string): string {
        const ns = this.prefixToNamespace[prefix];
        if (!ns) {
            throw new QNameError('Prefix ' + prefix + ' is not registered');
        }
        return ns;
    }

    private getPrefixFromNamespace(ns: string): string {
        const pfx = this.namespaceToPrefix[ns];
        if (!pfx) {
            throw new QNameError('Namespace ' + ns + ' is not registered');
        }
        return pfx;
    }

    private createQnameFromParts(
        namespaceURI: string,
        prefix: string,
        localName: string
    ): QName {
        return {
            localName,
            prefix,
            namespaceURI,
            [factorySymbol]: this,
        };
    }

    public createQNameFromString(qname: string): QName {
        if (qname[0] === '{') {
            // Long Qname
            const [ns, localName] = qname.substr(1).split('}', 2);
            const prefix = this.getPrefixFromNamespace(ns);
            return this.createQnameFromParts(ns, prefix, localName);
        } else if (qname.indexOf(':') !== -1) {
            // Short Qname
            const [prefix, localName] = qname.split(':', 2);
            const ns = this.getNamespaceFromPrefix(prefix);
            return this.createQnameFromParts(ns, prefix, localName);
        } else {
            throw new QNameError('String ' + qname + ' is not a valid QName');
        }
    }

    public maybeCreateQNameFromString(qname: string): QName | null {
        try {
            return this.createQNameFromString(qname);
        } catch (e) {
            if (e instanceof QNameError) {
                return null;
            }
            throw e;
        }
    }
}
