import { QNameTypeTag, QNameWithTypeTag } from './QName';
import DictionaryDefinition from './DictionaryDefinition';

export enum ClassDefinitionKind {
    ASPECT,
    TYPE,
}
export default interface ClassDefinition
    extends DictionaryDefinition<QNameTypeTag.CLASS> {
    readonly kind: ClassDefinitionKind;
    readonly parent: QNameWithTypeTag<QNameTypeTag.CLASS> | null;
    readonly properties: readonly QNameWithTypeTag<QNameTypeTag.PROPERTY>[];
    readonly associations: readonly QNameWithTypeTag<
        QNameTypeTag.ASSOCIATION
    >[];
    readonly mandatoryAspects: readonly QNameWithTypeTag<QNameTypeTag.CLASS>[];
}

export interface AspectDefinition extends ClassDefinition {
    readonly kind: ClassDefinitionKind.ASPECT;
}

export interface TypeDefinition extends ClassDefinition {
    readonly kind: ClassDefinitionKind.TYPE;
}
