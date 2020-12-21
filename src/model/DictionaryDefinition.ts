import { QNameTypeTag, QNameWithTypeTag } from './QName';

export default interface DictionaryDefinition<
    T extends QNameTypeTag = QNameTypeTag
> {
    readonly name: QNameWithTypeTag<T>;
    readonly title: string;
    readonly description: string | null;
}
