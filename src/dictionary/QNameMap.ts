import { QName } from '../model';
import DictionaryDefinition from '../model/DictionaryDefinition';

export default class QNameMap<T extends DictionaryDefinition> {
    private backing: { [qname: string]: T } = {};

    public constructor(contents: readonly T[]) {
        for (const t of contents) {
            this.backing[QName.toString(t.name)] = t;
        }
    }

    public lookup(qname: QName): T | null {
        return this.backing[QName.toString(qname)] ?? null;
    }
}
