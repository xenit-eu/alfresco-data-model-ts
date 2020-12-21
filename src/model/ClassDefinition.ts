import { QNameTypeTag, QNameWithTypeTag } from './QName';
import DictionaryDefinition from './DictionaryDefinition';

/**
 * @public
 */
export default interface ClassDefinition
    extends DictionaryDefinition<QNameTypeTag.CLASS> {
    readonly parent: QNameWithTypeTag<QNameTypeTag.CLASS> | null;
    readonly properties: readonly QNameWithTypeTag<QNameTypeTag.PROPERTY>[];
    readonly associations: readonly QNameWithTypeTag<
        QNameTypeTag.ASSOCIATION
    >[];
    readonly mandatoryAspects: readonly QNameWithTypeTag<QNameTypeTag.CLASS>[];
}
