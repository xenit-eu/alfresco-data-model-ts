import {
    QNameTypeTag,
    QNameWithTypeTag,
    QNameWithTypeTagConsumer,
} from '../QName';
import DictionaryDefinitionBuilder from './DictionaryDefinitionBuilder';
import ClassDefinition from '../ClassDefinition';

export default class ClassDefinitionBuilder extends DictionaryDefinitionBuilder<QNameTypeTag.CLASS> {
    private parent: QNameWithTypeTag<QNameTypeTag.CLASS> | null = null;
    private mandatoryAspects: readonly QNameWithTypeTag<QNameTypeTag.CLASS>[] = [];
    private properties: readonly QNameWithTypeTag<QNameTypeTag.PROPERTY>[] = [];
    private associations: readonly QNameWithTypeTag<QNameTypeTag.ASSOCIATION>[] = [];

    public constructor(name: QNameWithTypeTagConsumer<QNameTypeTag.CLASS>) {
        super(QNameTypeTag.CLASS, name);
    }

    public withParent(
        parent: QNameWithTypeTagConsumer<QNameTypeTag.CLASS> | string | null
    ): this {
        if (parent) {
            this.parent = QNameWithTypeTag.addTag(
                this._createQNameFromString(parent),
                QNameTypeTag.CLASS
            );
        } else {
            this.parent = null;
        }
        return this;
    }

    public withMandatoryAspects(
        mandatoryAspects: (
            | QNameWithTypeTagConsumer<QNameTypeTag.CLASS>
            | string
        )[]
    ): this {
        this.mandatoryAspects = mandatoryAspects.map((q) =>
            QNameWithTypeTag.addTag(
                this._createQNameFromString(q),
                QNameTypeTag.CLASS
            )
        );
        return this;
    }

    public withProperties(
        properties: (QNameWithTypeTagConsumer<QNameTypeTag.PROPERTY> | string)[]
    ): this {
        this.properties = properties.map((q) =>
            QNameWithTypeTag.addTag(
                this._createQNameFromString(q),
                QNameTypeTag.PROPERTY
            )
        );
        return this;
    }

    public withAssociations(
        associations: (
            | QNameWithTypeTagConsumer<QNameTypeTag.ASSOCIATION>
            | string
        )[]
    ): this {
        this.associations = associations.map((q) =>
            QNameWithTypeTag.addTag(
                this._createQNameFromString(q),
                QNameTypeTag.ASSOCIATION
            )
        );
        return this;
    }

    public build(): ClassDefinition {
        return {
            ...super.build(),
            parent: this.parent,
            mandatoryAspects: this.mandatoryAspects,
            properties: this.properties,
            associations: this.associations,
        };
    }
}
