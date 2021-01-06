import {
    QNameTypeTag,
    QNameWithTypeTag,
    QNameWithTypeTagConsumer,
} from '../QName';
import DictionaryDefinitionBuilder from './DictionaryDefinitionBuilder';
import AssociationDefinition from '../AssociationDefinition';

export default class AssociationDefinitionBuilder extends DictionaryDefinitionBuilder<QNameTypeTag.ASSOCIATION> {
    private sourceName: QNameWithTypeTag<QNameTypeTag.CLASS>;
    private sourceMany: boolean = false;
    private sourceMandatory: boolean = false;
    private sourceMandatoryEnforced: boolean = false;
    private targetName: QNameWithTypeTag<QNameTypeTag.CLASS>;
    private targetMany: boolean = true;
    private targetMandatory: boolean = false;
    private targetMandatoryEnforced: boolean = false;
    private protected: boolean = false;
    private childAssociation: boolean = false;

    public constructor(
        name: QNameWithTypeTagConsumer<QNameTypeTag.ASSOCIATION>,
        sourceName: QNameWithTypeTagConsumer<QNameTypeTag.CLASS> | string,
        targetName: QNameWithTypeTagConsumer<QNameTypeTag.CLASS> | string
    ) {
        super(QNameTypeTag.ASSOCIATION, name);
        this.sourceName = QNameWithTypeTag.addTag(
            this._createQNameFromString(sourceName),
            QNameTypeTag.CLASS
        );
        this.targetName = QNameWithTypeTag.addTag(
            this._createQNameFromString(targetName),
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
