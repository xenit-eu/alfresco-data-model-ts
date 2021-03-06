## API Report File for "@xenit/alfresco-data-model"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts

// Warning: (ae-forgotten-export) The symbol "DictionaryDefinition" needs to be exported by the entry point index.d.ts
// Warning: (ae-forgotten-export) The symbol "QNameTypeTag" needs to be exported by the entry point index.d.ts
//
// @public
export interface AssociationDefinition extends DictionaryDefinition<QNameTypeTag.ASSOCIATION> {
    readonly childAssociation: boolean;
    readonly protected: boolean;
    readonly sourceMandatory: boolean;
    readonly sourceMandatoryEnforced: boolean;
    readonly sourceMany: boolean;
    // Warning: (ae-forgotten-export) The symbol "QNameWithTypeTag" needs to be exported by the entry point index.d.ts
    readonly sourceName: QNameWithTypeTag<QNameTypeTag.CLASS>;
    readonly targetMandatory: boolean;
    readonly targetMandatoryEnforced: boolean;
    readonly targetMany: boolean;
    readonly targetName: QNameWithTypeTag<QNameTypeTag.CLASS>;
}

// @public (undocumented)
export namespace AssociationDefinition {
    // Warning: (ae-forgotten-export) The symbol "QNameWithTypeTagConsumer" needs to be exported by the entry point index.d.ts
    // Warning: (ae-forgotten-export) The symbol "AssociationDefinitionBuilder" needs to be exported by the entry point index.d.ts
    export function builder(name: QNameWithTypeTagConsumer<QNameTypeTag.ASSOCIATION>, sourceName: QNameWithTypeTagConsumer<QNameTypeTag.CLASS> | string, targetName: QNameWithTypeTagConsumer<QNameTypeTag.CLASS> | string): AssociationDefinitionBuilder;
    // Warning: (ae-forgotten-export) The symbol "PlainModelFromBuilder" needs to be exported by the entry point index.d.ts
    export function fromPlainModel(model: {
        name: QNameWithTypeTagConsumer<QNameTypeTag.ASSOCIATION>;
        sourceName: QNameWithTypeTagConsumer<QNameTypeTag.CLASS> | string;
        targetName: QNameWithTypeTagConsumer<QNameTypeTag.CLASS> | string;
    } & Omit<PlainModelFromBuilder<AssociationDefinitionBuilder>, 'name' | 'sourceName' | 'targetName'>): AssociationDefinition;
}

// @public
export interface ClassDefinition extends DictionaryDefinition<QNameTypeTag.CLASS> {
    readonly associations: readonly QNameWithTypeTag<QNameTypeTag.ASSOCIATION>[];
    readonly mandatoryAspects: readonly QNameWithTypeTag<QNameTypeTag.CLASS>[];
    readonly parent: QNameWithTypeTag<QNameTypeTag.CLASS> | null;
    readonly properties: readonly QNameWithTypeTag<QNameTypeTag.PROPERTY>[];
}

// @public (undocumented)
export namespace ClassDefinition {
    // Warning: (ae-forgotten-export) The symbol "ClassDefinitionBuilder" needs to be exported by the entry point index.d.ts
    export function builder(name: QNameWithTypeTagConsumer<QNameTypeTag.CLASS>): ClassDefinitionBuilder;
    export function fromPlainModel(model: {
        name: QNameWithTypeTagConsumer<QNameTypeTag.ASSOCIATION>;
    } & Omit<PlainModelFromBuilder<ClassDefinitionBuilder>, 'name'>): ClassDefinition;
}

// @public
export class Dictionary implements IDictionary {
    constructor(classes: readonly ClassDefinition[], properties: readonly PropertyDefinition[], associations: readonly AssociationDefinition[]);
    getAllAssociationsForClass(qname: QNameWithTypeTagConsumer<QNameTypeTag.CLASS>): AssociationDefinition[];
    getAllClassesForClass(qname: QNameWithTypeTagConsumer<QNameTypeTag.CLASS>): ClassDefinition[];
    getAllPropertiesForClass(qname: QNameWithTypeTagConsumer<QNameTypeTag.CLASS>): PropertyDefinition[];
    getAssociation(qname: QNameWithTypeTagConsumer<QNameTypeTag.ASSOCIATION>): AssociationDefinition | null;
    getAssociations(): readonly AssociationDefinition[];
    getChildrenForClass(qname: QNameWithTypeTagConsumer<QNameTypeTag.CLASS>): ClassDefinition[];
    getClass(qname: QNameWithTypeTagConsumer<QNameTypeTag.CLASS>): ClassDefinition | null;
    getClasses(): readonly ClassDefinition[];
    getMandatoryAspectsForClass(qname: QNameWithTypeTagConsumer<QNameTypeTag.CLASS>): ClassDefinition[];
    getParentsForClass(qname: QNameWithTypeTagConsumer<QNameTypeTag.CLASS>): ClassDefinition[];
    getProperties(): readonly PropertyDefinition[];
    getProperty(qname: QNameWithTypeTagConsumer<QNameTypeTag.PROPERTY>): PropertyDefinition;
    }

// @public
export class DictionaryCircularDependencyError extends DictionaryError {
    // @internal
    constructor(reference: QName,
    path: readonly QName[]);
    readonly path: readonly QName[];
}

// @public
export class DictionaryError extends Error {
    // @internal
    constructor(
    reference: QName, message: string);
    readonly reference: QName;
}

// @public
export class DictionaryMissingDependencyError extends DictionaryError {
    // @internal
    constructor(reference: QName,
    referrer: QName);
    readonly referrer: QName;
}

// @public
export interface IDictionary {
    getAllAssociationsForClass(qname: QNameWithTypeTagConsumer<QNameTypeTag.CLASS>): AssociationDefinition[];
    getAllClassesForClass(qname: QNameWithTypeTagConsumer<QNameTypeTag.CLASS>): ClassDefinition[];
    getAllPropertiesForClass(qname: QNameWithTypeTagConsumer<QNameTypeTag.CLASS>): PropertyDefinition[];
    getAssociation(qname: QNameWithTypeTagConsumer<QNameTypeTag.ASSOCIATION>): AssociationDefinition | null;
    getAssociations(): readonly AssociationDefinition[];
    getChildrenForClass(qname: QNameWithTypeTagConsumer<QNameTypeTag.CLASS>): ClassDefinition[];
    getClass(qname: QNameWithTypeTagConsumer<QNameTypeTag.CLASS>): ClassDefinition | null;
    getClasses(): readonly ClassDefinition[];
    getMandatoryAspectsForClass(qname: QNameWithTypeTagConsumer<QNameTypeTag.CLASS>): ClassDefinition[];
    getParentsForClass(qname: QNameWithTypeTagConsumer<QNameTypeTag.CLASS>): ClassDefinition[];
    getProperties(): readonly PropertyDefinition[];
    getProperty(qname: QNameWithTypeTagConsumer<QNameTypeTag.PROPERTY>): PropertyDefinition;
}

// @public
export interface IQNameFactory {
    createQNameFromString(qname: string): QName;
    maybeCreateQNameFromString(qname: string): QName | null;
}

// Warning: (ae-forgotten-export) The symbol "AnyPropertyConstraint" needs to be exported by the entry point index.d.ts
//
// @public
export interface LengthPropertyConstraint extends AnyPropertyConstraint {
    // (undocumented)
    readonly parameters: {
        readonly minLength: number;
        readonly maxLength: number;
    };
    // (undocumented)
    readonly type: PropertyConstraintType.LENGTH;
}

// @public
export interface ListPropertyConstraint extends AnyPropertyConstraint {
    // (undocumented)
    readonly parameters: {
        readonly allowedValues: string[];
        readonly caseSensitive: boolean;
        readonly sorted: boolean;
    };
    // (undocumented)
    readonly type: PropertyConstraintType.LIST;
}

// @public
export interface NumericRangePropertyConstraint extends AnyPropertyConstraint {
    // (undocumented)
    readonly parameters: {
        readonly minValue: number;
        readonly maxValue: number;
    };
    // (undocumented)
    readonly type: PropertyConstraintType.MINMAX;
}

// @public
export type PropertyConstraint = AnyPropertyConstraint | ListPropertyConstraint | LengthPropertyConstraint | NumericRangePropertyConstraint | RegexPropertyConstraint;

// @public
export enum PropertyConstraintType {
    // (undocumented)
    LENGTH = "LENGTH",
    // (undocumented)
    LIST = "LIST",
    // (undocumented)
    MINMAX = "MINMAX",
    // (undocumented)
    REGEX = "REGEX"
}

// @public
export interface PropertyDefinition extends DictionaryDefinition<QNameTypeTag.PROPERTY> {
    readonly constraints: readonly PropertyConstraint[];
    readonly container: QNameWithTypeTag<QNameTypeTag.CLASS>;
    readonly dataType: QNameWithTypeTag<QNameTypeTag.DATA_TYPE>;
    readonly defaultValue: string | null;
    readonly mandatory: boolean;
    readonly mandatoryEnforced: boolean;
    readonly multiValued: boolean;
    readonly protected: boolean;
    readonly residual: boolean;
}

// @public (undocumented)
export namespace PropertyDefinition {
    // Warning: (ae-forgotten-export) The symbol "PropertyDefinitionBuilder" needs to be exported by the entry point index.d.ts
    export function builder(name: QNameWithTypeTagConsumer<QNameTypeTag.PROPERTY>, container: QNameWithTypeTagConsumer<QNameTypeTag.CLASS> | string, dataType: QNameWithTypeTagConsumer<QNameTypeTag.DATA_TYPE> | string): PropertyDefinitionBuilder;
    export function fromPlainModel(model: {
        name: QNameWithTypeTagConsumer<QNameTypeTag.PROPERTY>;
        container: QNameWithTypeTagConsumer<QNameTypeTag.CLASS> | string;
        dataType: QNameWithTypeTagConsumer<QNameTypeTag.DATA_TYPE> | string;
    } & Omit<PlainModelFromBuilder<PropertyDefinitionBuilder>, 'name' | 'container' | 'dataType'>): PropertyDefinition;
}

// @public
export interface QName {
    readonly [factorySymbol]: IQNameFactory;
    readonly localName: string;
    readonly namespaceURI: string;
    readonly prefix: string;
}

// @public
export namespace QName {
    // @internal
    export function createQName(oldQName: QName, qnameString: string): QName;
    export function equals(a: QName | null | undefined, b: QName | string | null | undefined): boolean;
    export function isInstance(a: any): a is QName;
    export function toPrefixString(qname: QName): string;
    export function toString(qname: QName): string;
}

// @public
export class QNameError extends TypeError {
    // @internal
    constructor(message: string);
}

// @public
export class QNameFactory implements IQNameFactory {
    createQNameFromString(qname: string): QName;
    maybeCreateQNameFromString(qname: string): QName | null;
    registerPrefix(prefix: string, namespace: string): void;
}

// @public
export interface RegexPropertyConstraint extends AnyPropertyConstraint {
    // (undocumented)
    readonly parameters: {
        readonly expression: string;
        readonly requiresMatch: boolean;
    };
    // (undocumented)
    readonly type: PropertyConstraintType.REGEX;
}


// (No @packageDocumentation comment for this package)

```
