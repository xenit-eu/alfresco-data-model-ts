import {
    QNameTypeTag,
    QNameWithTypeTag,
    QNameWithTypeTagConsumer,
} from './QName';
import DictionaryDefinitionBuilder from './DictionaryDefinitionBuilder';
import AssociationDefinition from './AssociationDefinition';

export default class AssociationDefinitionBuilder extends DictionaryDefinitionBuilder<
    QNameTypeTag.ASSOCIATION
> {
    sourceName: QNameWithTypeTag<QNameTypeTag.CLASS>;
    sourceMany: boolean = false;
    sourceMandatory: boolean = false;
    sourceMandatoryEnforced: boolean = false;
    targetName: QNameWithTypeTag<QNameTypeTag.CLASS>;
    targetMany: boolean = true;
    targetMandatory: boolean = false;
    targetMandatoryEnforced: boolean = false;
    protected: boolean = false;
    childAssociation: boolean = false;

    public constructor(
        name: QNameWithTypeTagConsumer<QNameTypeTag.ASSOCIATION>,
        sourceName: QNameWithTypeTagConsumer<QNameTypeTag.CLASS>,
        targetName: QNameWithTypeTagConsumer<QNameTypeTag.CLASS>
    ) {
        super(QNameTypeTag.ASSOCIATION, name);
        this.sourceName = QNameWithTypeTag.addTag(
            sourceName,
            QNameTypeTag.CLASS
        );
        this.targetName = QNameWithTypeTag.addTag(
            targetName,
            QNameTypeTag.CLASS
        );
    }

    public withSourceMany(sourceMany: boolean): this {
        this.sourceMany = sourceMany;
        return this;
    }

    public withSourceMandatory(sourceMandatory: boolean): this {
        this.sourceMandatory = sourceMandatory;
        return this;
    }

    public withSourceMandatoryEnforced(sourceMandatoryEnforced: boolean): this {
        this.sourceMandatoryEnforced = sourceMandatoryEnforced;
        return this;
    }

    public withTargetMany(targetMany: boolean): this {
        this.targetMany = targetMany;
        return this;
    }

    public withTargetMandatory(targetMandatory: boolean): this {
        this.targetMandatory = targetMandatory;
        return this;
    }

    public withTargetMandatoryEnforced(targetMandatoryEnforced: boolean): this {
        this.targetMandatoryEnforced = targetMandatoryEnforced;
        return this;
    }

    public withProtected(protected_: boolean): this {
        this.protected = protected_;
        return this;
    }

    public withChildAssociation(childAssociation: boolean): this {
        this.childAssociation = childAssociation;
        return this;
    }

    public build(): AssociationDefinition {
        return {
            ...super.build(),
            sourceName: this.sourceName,
            sourceMany: this.sourceMany,
            sourceMandatory: this.sourceMandatory,
            sourceMandatoryEnforced: this.sourceMandatoryEnforced,
            targetName: this.targetName,
            targetMany: this.targetMany,
            targetMandatory: this.targetMandatory,
            targetMandatoryEnforced: this.targetMandatoryEnforced,

            protected: this.protected,
            childAssociation: this.childAssociation,
        };
    }
}
