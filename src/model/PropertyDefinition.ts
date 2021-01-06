import {
    QNameWithTypeTag,
    QNameTypeTag,
    QNameWithTypeTagConsumer,
} from './QName';
import DictionaryDefinition from './DictionaryDefinition';
import PropertyDefinitionBuilder from './builder/PropertyDefinitionBuilder';
import {
    PlainModelFromBuilder,
    default as _fromPlainModel,
} from './builder/fromPlainModel';

/**
 * Describes a property of a node.
 *
 * A property is metadata of a certain type that belongs to a node.
 *
 * @public
 */
interface PropertyDefinition
    extends DictionaryDefinition<QNameTypeTag.PROPERTY> {
    /**
     * The class (type or aspect) that defines this property
     */
    readonly container: QNameWithTypeTag<QNameTypeTag.CLASS>;

    /**
     * The default value for the property (if any) in stringified format.
     */
    readonly defaultValue: string | null;

    /**
     * The datatype for the property.
     */
    readonly dataType: QNameWithTypeTag<QNameTypeTag.DATA_TYPE>;

    /**
     * If this property can contain multiple values of the datatype.
     */
    readonly multiValued: boolean;

    /**
     * If the property is mandatory according to the datamodel.
     */
    readonly mandatory: boolean;
    /**
     * If true, data updates that would violate the mandatory requirement from {@link (PropertyDefinition:interface).mandatory} will be rejected.
     */
    readonly mandatoryEnforced: boolean;
    /**
     * Marks the property as protected, meaning that it can only be updated by the system itself, not by users.
     */
    readonly protected: boolean;
    /**
     * Marks the property as residual, meaning that it is not defined explicitly in the datamodel.
     *
     * Residual properties can be defined on a node, but they have no associated datamodel definition.
     */
    readonly residual: boolean;
    /**
     * Constraints that are applied to this property.
     *
     * Constraints limit the allowable values of a property.
     */
    readonly constraints: readonly PropertyConstraint[];
}

/** @public */
namespace PropertyDefinition {
    /**
     * Creates a builder for an {@link (PropertyDefinition:interface)}
     * @param name - The QName of the property
     * @param container - The QName of the class that contains the property
     * @param dataType - The QName of data type of the property
     * @public
     */
    export function builder(
        name: QNameWithTypeTagConsumer<QNameTypeTag.PROPERTY>,
        container: QNameWithTypeTagConsumer<QNameTypeTag.CLASS> | string,
        dataType: QNameWithTypeTagConsumer<QNameTypeTag.DATA_TYPE> | string
    ): PropertyDefinitionBuilder {
        return new PropertyDefinitionBuilder(name, container, dataType);
    }

    /**
     * Creates a {@link (PropertyDefinition:interface)} from a plain object
     * @param model - Plain object to create an PropertyDefinition from
     * @public
     */
    export function fromPlainModel(
        model: {
            name: QNameWithTypeTagConsumer<QNameTypeTag.PROPERTY>;
            container: QNameWithTypeTagConsumer<QNameTypeTag.CLASS> | string;
            dataType: QNameWithTypeTagConsumer<QNameTypeTag.DATA_TYPE> | string;
        } & PlainModelFromBuilder<PropertyDefinitionBuilder>
    ): PropertyDefinition {
        const b = builder(model.name, model.container, model.dataType);
        const clone: Partial<typeof model> = { ...model };
        delete clone.name;
        delete clone.container;
        delete clone.dataType;
        return _fromPlainModel(b, clone);
    }
}

export default PropertyDefinition;

/**
 * Known property constraint types
 * @public
 */
export enum PropertyConstraintType {
    LIST = 'LIST',
    LENGTH = 'LENGTH',
    MINMAX = 'MINMAX',
    REGEX = 'REGEX',
}

/**
 * All property constraint possibilities.
 * @public
 */
export type PropertyConstraint =
    | AnyPropertyConstraint
    | ListPropertyConstraint
    | LengthPropertyConstraint
    | NumericRangePropertyConstraint
    | RegexPropertyConstraint;

interface AnyPropertyConstraint {
    /**
     * Type of the property constraint
     */
    readonly type: string;
    /**
     * Parameter bag for the property constraint
     */
    readonly parameters: { readonly [k: string]: any };
}

/**
 * List constraint
 *
 * A list constraint specifies a number of allowed values for a property
 * @public
 */
export interface ListPropertyConstraint extends AnyPropertyConstraint {
    readonly type: PropertyConstraintType.LIST;
    readonly parameters: {
        /**
         * Allowed values according to this list constraint.
         */
        readonly allowedValues: string[];

        /**
         * If the allowed values are case-sensitively checked or not.
         */
        readonly caseSensitive: boolean;

        /**
         * Indicates of the list of allowed values is sorted or not.
         */
        readonly sorted: boolean;
    };
}

/**
 * String length constraint
 *
 * Requires the length of the property to be between two bounds.
 * @public
 */
export interface LengthPropertyConstraint extends AnyPropertyConstraint {
    readonly type: PropertyConstraintType.LENGTH;
    readonly parameters: {
        /**
         * Minimum length of the string
         */
        readonly minLength: number;
        /**
         * Maximum length of the string
         */
        readonly maxLength: number;
    };
}

/**
 * Numeric range constraint
 *
 * Requires a numeric value to be between two bounds.
 * @public
 */
export interface NumericRangePropertyConstraint extends AnyPropertyConstraint {
    readonly type: PropertyConstraintType.MINMAX;
    readonly parameters: {
        /**
         * Minimum allowed value of the property value
         */
        readonly minValue: number;

        /**
         * Maximum allowed value of the property value
         */
        readonly maxValue: number;
    };
}

/**
 * A regex constraint specifies allowed values for a property based on a regex match
 * @public
 */
export interface RegexPropertyConstraint extends AnyPropertyConstraint {
    readonly type: PropertyConstraintType.REGEX;
    readonly parameters: {
        /**
         * Regular expression against which a property value is checked
         */
        readonly expression: string;

        /**
         * True if the property value must match the regular expression to be valid
         * False if the property value must not match the regular expression to be valid
         */
        readonly requiresMatch: boolean;
    };
}
