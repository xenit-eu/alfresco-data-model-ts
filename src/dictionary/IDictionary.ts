import {
    ClassDefinition,
    PropertyDefinition,
    AssociationDefinition,
} from '../model';
import QName, { QNameTypeTag, QNameWithTypeTagConsumer } from '../model/QName';

function makeUnique2<T>(
    items: readonly T[],
    cmp: (a: T, b: T) => boolean
): T[] {
    return items.filter(
        (value, i, arr) => arr.findIndex((value2) => cmp(value, value2)) === i
    );
}

/**
 * Base class for errors thrown by dictionary operations
 * @public
 */
export class DictionaryError extends Error {
    /**
     * @internal
     * @param reference - The qname whose lookup resulted in an error
     * @param message - The full exception message
     */
    public constructor(
        /**
         * The QName whose lookup resulted in an error
         * @public
         */
        public readonly reference: QName,
        message: string
    ) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = new.target.name;
    }
}

/**
 * This error indicates a circular dependency in the inheritance or mandatory aspect chain
 * @public
 */
export class DictionaryCircularDependencyError extends DictionaryError {
    /**
     * @internal
     * @param reference - The qname whose lookup resulted in a cycle being detected
     * @param path - The other qnames that are part of the circular dependency chain
     */
    public constructor(
        reference: QName,
        /**
         * The other QNames that are part of the circular dependency chain
         * @public
         */
        public readonly path: readonly QName[]
    ) {
        super(
            reference,
            'Circular dependency on class ' +
                QName.toPrefixString(reference) +
                ': ' +
                makeUnique2(path, QName.equals)
                    .concat([reference])
                    .map((c) => QName.toPrefixString(c))
                    .join(' -> ')
        );
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = new.target.name;
    }
}

/**
 * This error indicates a missing dependency in the inheritance or mandatory aspect chain
 * @public
 */
export class DictionaryMissingDependencyError extends DictionaryError {
    /**
     * @internal
     * @param reference - The qname that does not resolve to an object
     * @param referrer - The qname that referred to the nonexisting object
     */
    public constructor(
        reference: QName,
        /**
         * The QName that referred to the nonexisting object
         * @public
         */
        public readonly referrer: QName
    ) {
        super(
            reference,
            'Class ' +
                QName.toPrefixString(reference) +
                ' (referred to by ' +
                QName.toPrefixString(referrer) +
                ') does not exist.'
        );
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = new.target.name;
    }
}

/**
 * Metadata Model Dictionary that provides access to metadata models
 * @public
 */
export default interface IDictionary {
    /**
     * Retrieves a type or aspect definition by it's qname
     *
     * @param qname - The qualified name of the class to fetch
     * @returns A class definition, or null when no class exists for the requested qname
     */
    getClass(
        qname: QNameWithTypeTagConsumer<QNameTypeTag.CLASS>
    ): ClassDefinition | null;

    /**
     * Retrieves all known classes
     *
     * @returns A list of all class definitions
     */
    getClasses(): readonly ClassDefinition[];

    /**
     * Retrieves a property definition by it's qname
     *
     * @param qname - The qualified name of the property to fetch
     * @returns A property definition, or a generated residual property when no property exists for the requested qname
     */
    getProperty(
        qname: QNameWithTypeTagConsumer<QNameTypeTag.PROPERTY>
    ): PropertyDefinition;

    /**
     * Retrieves all known properties
     *
     * @returns A list of all known property definitions
     */
    getProperties(): readonly PropertyDefinition[];

    /**
     * Retrieves an association definition by it's qname
     *
     * @param qname - The qualified name of the association to fetch
     * @returns An association definition, or null when no association exists for the requested qname
     */
    getAssociation(
        qname: QNameWithTypeTagConsumer<QNameTypeTag.ASSOCIATION>
    ): AssociationDefinition | null;

    /**
     * Retrieves all known associations
     *
     * @returns A list of all known association definitions
     */
    getAssociations(): readonly AssociationDefinition[];

    /**
     * Retrieves all properties that are present on a node of a certain class, including inherited properties and properties on mandatory aspects
     *
     * The properties are returned from this function are ordered by the class in which they appear, then in the order that they are declared in the class.
     *
     * @throws {@link DictionaryCircularDependencyError} when a circular reference is detected between classes
     * @throws {@link DictionaryMissingDependencyError} when a missing reference is detected between classes
     *
     * @see {@link IDictionary.getAllClassesForClass} This method is used to determine all classes that are parents or mandatory aspects
     * @param qname - The qualified name of the class for which all properties are fetched
     * @returns A list of all property definitions. If no class exists for the given qname, an empty list is returned
     */
    getAllPropertiesForClass(
        qname: QNameWithTypeTagConsumer<QNameTypeTag.CLASS>
    ): PropertyDefinition[];

    /**
     * Retrieves all associations that are present on a node of a certain class, including inherited associations and properties on mandatory aspects
     *
     * The associations are returned from this function are ordered by the class in which they appear, then in the order that they are declared in the class.
     *
     * @throws {@link DictionaryCircularDependencyError} when a circular reference is detected between classes
     * @throws {@link DictionaryMissingDependencyError} when a missing reference is detected between classes
     *
     * @see {@link IDictionary.getAllClassesForClass} This method is used to determine all classes that are parents or mandatory aspects
     * @param qname - The qualified name of the class for which all associations are fetched
     * @returns A list of all association definitions. If no class exists for the given qname, an empty list is returned
     */
    getAllAssociationsForClass(
        qname: QNameWithTypeTagConsumer<QNameTypeTag.CLASS>
    ): AssociationDefinition[];

    /**
     * Retrieves all classes that are present on a node of a certain class, either directly, through inheritance or through specified mandatory aspects.
     *
     * The returned classes are ordered in inheritance order (parents first), with mandatory aspects of a class immediately after the class that declares them.
     *
     * @throws {@link DictionaryCircularDependencyError} when a circular reference is detected between classes
     * @throws {@link DictionaryMissingDependencyError} when a missing reference is detected between classes
     *
     * @param qname - The qualified name of the class for which all classes are fetched
     * @returns A list of all classes that are inherited or a mandatory aspect. If no class exists for the given qname, an empty list is returned.
     */
    getAllClassesForClass(
        qname: QNameWithTypeTagConsumer<QNameTypeTag.CLASS>
    ): ClassDefinition[];

    /**
     * Retrieves all parent classes.
     *
     * The returned classes are ordered in inheritance order with parents first.
     *
     * @throws {@link DictionaryCircularDependencyError} when a circular reference is detected between classes
     * @throws {@link DictionaryMissingDependencyError} when a missing reference is detected between classes
     *
     * @see {@link IDictionary.getChildrenForClass} for the inverse operation
     * @param qname - The qualified name of the class for which all parent classes are fetched
     * @returns A list of all classes that are inherited. If no class exists for the given qname, an empty list is returned.
     */
    getParentsForClass(
        qname: QNameWithTypeTagConsumer<QNameTypeTag.CLASS>
    ): ClassDefinition[];

    /**
     * Retrieves all mandatory aspects of a class, direct, inherited through parents or through mandatory aspects.
     *
     * The returned classes are ordered in declaration order on the specified object, then in inheritance order with parents first.
     *
     * Note that an aspect is also allowed to specify mandatory aspects and a parent aspect.
     *
     * @throws {@link DictionaryCircularDependencyError} when a circular reference is detected between classes
     * @throws {@link DictionaryMissingDependencyError} when a missing reference is detected between classes
     *
     * @see {@link IDictionary#getAllClassesForClass} This method is used to determine all classes that are parents or mandatory aspects
     * @param qname - The qualified name of the class for which all parent classes are fetched
     * @returns A list of all classes that are inherited. If no class exists for the given qname, an empty list is returned.
     */
    getMandatoryAspectsForClass(
        qname: QNameWithTypeTagConsumer<QNameTypeTag.CLASS>
    ): ClassDefinition[];

    /**
     * Retrieves all child classes.
     *
     * A child class is any class that has the requested class somewhere in the parent chain.
     *
     * The returned classes are in no particular order.
     *
     * @see {@link IDictionary.getParentsForClass} for the inverse operation
     *
     * @param qname - The qualified name of the class for which all child classes are fetched
     * @returns A list of all classes that are children. If no class exists for the given qname, an empty list is returned.
     */
    getChildrenForClass(
        qname: QNameWithTypeTagConsumer<QNameTypeTag.CLASS>
    ): ClassDefinition[];
}
