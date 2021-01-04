import { QNameTypeTag, QNameWithTypeTag } from './QName';

/**
 * Basic properties for a datamodel definition.
 */
export default interface DictionaryDefinition<
    T extends QNameTypeTag = QNameTypeTag
> {
    /**
     * The QName of the datamodel entity
     */
    readonly name: QNameWithTypeTag<T>;
    /**
     * A human-readable name for the datamodel entity
     */
    readonly title: string;

    /**
     * A human-readable longer description for the datamodel entity
     */
    readonly description: string | null;
}
