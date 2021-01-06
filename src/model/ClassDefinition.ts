import {
    QNameTypeTag,
    QNameWithTypeTag,
    QNameWithTypeTagConsumer,
} from './QName';
import DictionaryDefinition from './DictionaryDefinition';
import ClassDefinitionBuilder from './builder/ClassDefinitionBuilder';
import {
    PlainModelFromBuilder,
    default as _fromPlainModel,
} from './builder/fromPlainModel';

/**
 * Describes a class for a node.
 *
 * A class is a type or an aspect that can be applied to a node.
 *
 * @public
 */
interface ClassDefinition extends DictionaryDefinition<QNameTypeTag.CLASS> {
    /**
     * Parent class from which this class inherits.
     *
     * Similar to inheritance in code, a node that has this class applied also has the parent classes applied.
     *
     * @remarks
     * Note that parents must be the same kind of class (type or aspect) as this class.
     *
     * For types, a parent is normally always specified, except for `sys:base`, which is the base class of the type hierarchy.
     * For aspects, a parent is usually not specified, but it is possible to specify an other aspect as parent.
     */
    readonly parent: QNameWithTypeTag<QNameTypeTag.CLASS> | null;

    /**
     * Mandatory aspects for this class.
     *
     * Mandatory aspects are automatically also applied to a node when this class is applied.
     *
     * @remarks
     * Although mandatory aspects are usually specified on a type, it is also possible to specify mandatory aspects on an aspect.
     *
     * Only aspects can be specified here, a type can not be a mandatory aspect.
     */
    readonly mandatoryAspects: readonly QNameWithTypeTag<QNameTypeTag.CLASS>[];

    /**
     * Properties that are declared by this class.
     */
    readonly properties: readonly QNameWithTypeTag<QNameTypeTag.PROPERTY>[];

    /**
     * Associations that are declared by this class.
     */
    readonly associations: readonly QNameWithTypeTag<QNameTypeTag.ASSOCIATION>[];
}

/**
 * @public
 */
namespace ClassDefinition {
    /**
     * Creates a builder for a {@link (ClassDefinition:interface)}
     * @param name - The QName of the class
     * @public
     */
    export function builder(
        name: QNameWithTypeTagConsumer<QNameTypeTag.CLASS>
    ): ClassDefinitionBuilder {
        return new ClassDefinitionBuilder(name);
    }

    /**
     * Creates a {@link (ClassDefinition:interface)} from a plain object
     * @param model - Plain object to create an ClassDefinition from
     * @public
     */
    export function fromPlainModel(
        model: {
            name: QNameWithTypeTagConsumer<QNameTypeTag.ASSOCIATION>;
        } & PlainModelFromBuilder<ClassDefinitionBuilder>
    ): ClassDefinition {
        const b = builder(model.name);
        const clone: Partial<typeof model> = { ...model };
        delete clone.name;
        return _fromPlainModel(b, clone);
    }
}

export default ClassDefinition;
