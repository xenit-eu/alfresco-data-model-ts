import {
    QNameTypeTag,
    QNameWithTypeTag,
    QNameWithTypeTagConsumer,
} from '../QName';
import DictionaryDefinitionBuilder from './DictionaryDefinitionBuilder';
import PropertyDefinition, { PropertyConstraint } from '../PropertyDefinition';

export default class PropertyDefinitionBuilder extends DictionaryDefinitionBuilder<QNameTypeTag.PROPERTY> {
    private container: QNameWithTypeTag<QNameTypeTag.CLASS>;
    private defaultValue: string | null = null;
    private dataType: QNameWithTypeTag<QNameTypeTag.DATA_TYPE>;
    private multiValued: boolean = false;
    private mandatory: boolean = false;
    private mandatoryEnforced: boolean = false;
    private protected: boolean = false;
    private residual: boolean = false;
    private constraints: readonly PropertyConstraint[] = [];

    public constructor(
        name: QNameWithTypeTagConsumer<QNameTypeTag.PROPERTY>,
        container: QNameWithTypeTagConsumer<QNameTypeTag.CLASS> | string,
        dataType: QNameWithTypeTagConsumer<QNameTypeTag.DATA_TYPE> | string
    ) {
        super(QNameTypeTag.PROPERTY, name);
        this.container = QNameWithTypeTag.addTag(
            this._createQNameFromString(container),
            QNameTypeTag.CLASS
        );
        this.dataType = QNameWithTypeTag.addTag(
            this._createQNameFromString(dataType),
            QNameTypeTag.DATA_TYPE
        );
    }

    public withDefaultValue(defaultValue: string | null): this {
        this.defaultValue = defaultValue;
        return this;
    }

    public withMultiValued(multiValued: boolean): this {
        this.multiValued = multiValued;
        return this;
    }

    public withMandatory(mandatory: boolean): this {
        this.mandatory = mandatory;
        return this;
    }

    public withMandatoryEnforced(mandatoryEnforced: boolean): this {
        this.mandatoryEnforced = mandatoryEnforced;
        return this;
    }

    public withProtected(protected_: boolean): this {
        this.protected = protected_;
        return this;
    }

    public withResidual(residual: boolean): this {
        this.residual = residual;
        return this;
    }

    public withConstraints(constraints: readonly PropertyConstraint[]): this {
        this.constraints = constraints;
        return this;
    }

    public build(): PropertyDefinition {
        return {
            ...super.build(),
            container: this.container,
            defaultValue: this.defaultValue,

            dataType: this.dataType,

            multiValued: this.multiValued,

            mandatory: this.mandatory,
            mandatoryEnforced: this.mandatoryEnforced,
            protected: this.protected,
            residual: this.residual,
            constraints: this.constraints,
        };
    }
}
