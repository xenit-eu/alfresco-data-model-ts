import { QNameWithTypeTag, QNameTypeTag } from './QName';
import DictionaryDefinition from './DictionaryDefinition';

/**
 * Describes a property of a node.
 *
 * A property is metadata of a certain type that belongs to a node.
 *
 * @public
 */
export default interface PropertyDefinition
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
     * If true, data updates that would violate the mandatory requirement from {@link PropertyDefinition.mandatory} will be rejected.
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

/**
 * Known property constraint types
 */
export enum PropertyConstraintType {
    LIST = 'LIST',
    LENGTH = 'LENGTH',
    MINMAX = 'MINMAX',
    REGEX = 'REGEX',
}

/**
 * All property constraint possibilities.
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
 */
export interface ListPropertyConstraint extends AnyPropertyConstraint {
    readonly type: PropertyConstraintType.LIST;
    readonly parameters: ListPropertyConstraintParameters;
}

interface ListPropertyConstraintParameters {
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
}

/**
 * String length constraint
 *
 * Requires the length of the property to be between two bounds.
 */
export interface LengthPropertyConstraint extends AnyPropertyConstraint {
    readonly type: PropertyConstraintType.LENGTH;
    readonly parameters: LengthPropertyConstraintParameters;
}

interface LengthPropertyConstraintParameters {
    /**
     * Minimum length of the string
     */
    readonly minLength: number;
    /**
     * Maximum length of the string
     */
    readonly maxLength: number;
}

/**
 * Numeric range constraint
 *
 * Requires a numeric value to be between two bounds.
 */
export interface NumericRangePropertyConstraint extends AnyPropertyConstraint {
    readonly type: PropertyConstraintType.MINMAX;
    readonly parameters: NumericRangePropertyConstraintParameters;
}

interface NumericRangePropertyConstraintParameters {
    /**
     * Minimum allowed value of the property value
     */
    readonly minValue: number;

    /**
     * Maximum allowed value of the property value
     */
    readonly maxValue: number;
}

/**
 * A regex constraint specifies allowed values for a property based on a regex match
 */
export interface RegexPropertyConstraint extends AnyPropertyConstraint {
    readonly type: PropertyConstraintType.REGEX;
    readonly parameters: RegexPropertyConstraintParameters;
}

interface RegexPropertyConstraintParameters {
    /**
     * Regular expression against which a property value is checked
     */
    readonly expression: string;

    /**
     * True if the property value must match the regular expression to be valid
     * False if the property value must not match the regular expression to be valid
     */
    readonly requiresMatch: boolean;
}
