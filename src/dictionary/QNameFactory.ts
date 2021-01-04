import IQNameFactory, { QNameError } from '../model/IQNameFactory';
import QName, { factorySymbol } from '../model/QName';

/**
 * Creates QNames from strings
 * @public
 */
export default class QNameFactory implements IQNameFactory {
    private prefixToNamespace: { [pfx: string]: string } = {};
    private namespaceToPrefix: { [ns: string]: string } = {};

    /**
     * Registers a new valid prefix and namespace
     *
     * It is allowed to register the same namespace with multiple different prefixes.
     * These prefixes will be considered equivalent, but only the last registered prefix will be used when generating QNames.
     *
     * @param prefix - The prefix to register
     * @param namespace - The namespace to register and associate with the prefix
     * @throws {@link QNameError}
     * This exception is thrown when a prefix is already configured and would be overwritten with a different namespace URI
     */
    public registerPrefix(prefix: string, namespace: string) {
        const existingNamespace = this.prefixToNamespace[prefix];
        if (existingNamespace && existingNamespace !== namespace) {
            throw new QNameError(
                'Prefix ' +
                    prefix +
                    ' is already registered with an other namespace'
            );
        }
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

    /**
     * {@inheritDoc IQNameFactory.createQNameFromString}
     */
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

    /**
     * {@inheritDoc IQNameFactory.maybeCreateQNameFromString}
     */
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
