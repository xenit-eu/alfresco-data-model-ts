import { QNameWithTypeTag, QNameTypeTag } from './QName';
import DictionaryDefinition from './DictionaryDefinition';

/**
 * @public
 */
export default interface PropertyDefinition
    extends DictionaryDefinition<QNameTypeTag.PROPERTY> {
    readonly container: QNameWithTypeTag<QNameTypeTag.CLASS>;
    readonly defaultValue: string | null;
    readonly dataType: QNameWithTypeTag<QNameTypeTag.DATA_TYPE>;
    readonly multiValued: boolean;
    readonly mandatory: boolean;
    readonly mandatoryEnforced: boolean;
    readonly protected: boolean;
    readonly constraints: readonly PropertyConstraint[];
}
export enum PropertyConstraintType {
    LIST = 'LIST',
    REGEX = 'REGEX',
}

export type PropertyConstraint =
    | AnyPropertyConstraint
    | ListPropertyConstraint
    | RegexPropertyConstraint;

interface AnyPropertyConstraint {
    readonly type: string;
    readonly parameters: { [k: string]: any };
}

export interface ListPropertyConstraint extends AnyPropertyConstraint {
    readonly type: PropertyConstraintType.LIST;
    readonly parameters: ListPropertyConstraintParameters;
}

interface ListPropertyConstraintParameters {
    readonly allowedValues: string[];
    readonly caseSensitive: boolean;
    readonly sorted: boolean;
}

export interface RegexPropertyConstraint extends AnyPropertyConstraint {
    readonly type: PropertyConstraintType.REGEX;
    readonly parameters: RegexPropertyConstraintParameters;
}

interface RegexPropertyConstraintParameters {
    readonly requiresMatch: boolean;
    readonly expression: string;
}
