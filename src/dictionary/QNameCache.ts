import { QName } from '../model';

/**
 * @internal
 */
export default class QNameCache<T> {
    private storage: { [qname: string]: T } = {};

    public put(qname: QName, value: T): void {
        this.storage[QName.toString(qname)] = value;
    }

    public get(qname: QName): T | null {
        return this.storage[QName.toString(qname)] ?? null;
    }
}
