import DictionaryDefinition from './DictionaryDefinition';
import { QNameTypeTag, QNameWithTypeTag } from './QName';

export default interface AssociationDefinition
    extends DictionaryDefinition<QNameTypeTag.ASSOCIATION> {
    readonly sourceName: QNameWithTypeTag<QNameTypeTag.CLASS>;
    readonly sourceMany: boolean;
    readonly sourceMandatory: boolean;
    readonly sourceMandatoryEnforced: boolean;

    readonly targetName: QNameWithTypeTag<QNameTypeTag.CLASS>;
    readonly targetMany: boolean;
    readonly targetMandatory: boolean;
    readonly targetMandatoryEnforced: boolean;

    readonly protected: boolean;
    readonly childAssociation: boolean;
}
