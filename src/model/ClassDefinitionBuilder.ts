import {
    QNameTypeTag,
    QNameWithTypeTag,
    QNameWithTypeTagConsumer,
} from './QName';
import DictionaryDefinitionBuilder from './DictionaryDefinitionBuilder';
import ClassDefinition from './ClassDefinition';

export default class ClassDefinitionBuilder extends DictionaryDefinitionBuilder<
    QNameTypeTag.CLASS
> {
    parent: QNameWithTypeTag<QNameTypeTag.CLASS> | null = null;
    mandatoryAspects: readonly QNameWithTypeTag<QNameTypeTag.CLASS>[] = [];
    properties: readonly QNameWithTypeTag<QNameTypeTag.PROPERTY>[] = [];
    associations: readonly QNameWithTypeTag<QNameTypeTag.ASSOCIATION>[] = [];

    public constructor(name: QNameWithTypeTagConsumer<QNameTypeTag.CLASS>) {
        super(QNameTypeTag.CLASS, name);
    }

    public withParent(
        parent: QNameWithTypeTagConsumer<QNameTypeTag.CLASS> | null
    ): this {
        if (parent) {
            this.parent = QNameWithTypeTag.addTag(parent, QNameTypeTag.CLASS);
        } else {
            this.parent = null;
        }
        return this;
    }

    public withMandatoryAspects(
        mandatoryAspects: QNameWithTypeTagConsumer<QNameTypeTag.CLASS>[]
    ): this {
        this.mandatoryAspects = mandatoryAspects.map(q =>
            QNameWithTypeTag.addTag(q, QNameTypeTag.CLASS)
        );
        return this;
    }

    public withProperties(
        properties: QNameWithTypeTagConsumer<QNameTypeTag.PROPERTY>[]
    ): this {
        this.properties = properties.map(q =>
            QNameWithTypeTag.addTag(q, QNameTypeTag.PROPERTY)
        );
        return this;
    }

    public withAssociations(
        associations: QNameWithTypeTagConsumer<QNameTypeTag.ASSOCIATION>[]
    ): this {
        this.associations = associations.map(q =>
            QNameWithTypeTag.addTag(q, QNameTypeTag.ASSOCIATION)
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
