import AssociationDefinitionBuilder from './builder/AssociationDefinitionBuilder';
import {
    PlainModelFromBuilder,
    default as _fromPlainModel,
} from './builder/fromPlainModel';
import DictionaryDefinition from './DictionaryDefinition';
import {
    QNameTypeTag,
    QNameWithTypeTag,
    QNameWithTypeTagConsumer,
} from './QName';

/**
 * Describes an association between two nodes
 *
 * An association is a link between two nodes.
 *
 * There are two kinds of associations: parent-child association and source-target association.
 * Both are represented by the same structure, distinguished by the value of {@link (AssociationDefinition:interface).childAssociation}.
 *
 * The source and target of the association reference a class (type or aspect) which that side has to implement.
 * Both sides of an association can be single- or multi-valued and can optionally be mandatory(enforced).
 *
 * @public
 */
interface AssociationDefinition
    extends DictionaryDefinition<QNameTypeTag.ASSOCIATION> {
    /**
     * The source class of the association. This is the side that defines the association in the Alfresco datamodel.
     *
     * For a source-target association, this is the source.
     * For a parent-child association, this is the parent.
     *
     */
    readonly sourceName: QNameWithTypeTag<QNameTypeTag.CLASS>;
    /**
     * If the source of the association can be multiple nodes or not.
     *
     * If the source (parent) of a child association has multiple nodes, only one of those can be the primary parent association.
     */
    readonly sourceMany: boolean;
    /**
     * If the source of the association is mandatory according to the datamodel.
     */
    readonly sourceMandatory: boolean;
    /**
     * If the mandatoryness of the source of the association is enforced.
     *
     * If true, data updates that would violate the requirement from {@link (AssociationDefinition:interface).sourceMandatory} will be rejected.
     */
    readonly sourceMandatoryEnforced: boolean;

    /**
     * The target class of the association.
     *
     * For a source-target association, this is the target.
     * For a parent-child association, this is the child.
     *
     */
    readonly targetName: QNameWithTypeTag<QNameTypeTag.CLASS>;
    /**
     * If the target of the association can be multiple nodes or not.
     */
    readonly targetMany: boolean;
    /**
     * If the target of the association is mandatory according to the datamodel.
     */
    readonly targetMandatory: boolean;
    /**
     * If the mandatoryness of the target of the association is enforced.
     *
     * If true, data updates that would violate the requirement from {@link (AssociationDefinition:interface).targetMandatory} will be rejected.
     */
    readonly targetMandatoryEnforced: boolean;

    /**
     * Marks the association as protected, meaning that it can only be updated by the system itself, not by users.
     */
    readonly protected: boolean;
    /**
     * If this association is a parent-child association instead of a source-target association.
     */
    readonly childAssociation: boolean;
}

/**
 * @public
 */
namespace AssociationDefinition {
    /**
     * Creates a builder for an {@link (AssociationDefinition:interface)}
     * @param name - The QName of the association
     * @param sourceName - The QName of the source class
     * @param targetName - The QName of the target class
     * @public
     */
    export function builder(
        name: QNameWithTypeTagConsumer<QNameTypeTag.ASSOCIATION>,
        sourceName: QNameWithTypeTagConsumer<QNameTypeTag.CLASS> | string,
        targetName: QNameWithTypeTagConsumer<QNameTypeTag.CLASS> | string
    ): AssociationDefinitionBuilder {
        return new AssociationDefinitionBuilder(name, sourceName, targetName);
    }

    /**
     * Creates an {@link (AssociationDefinition:interface)} from a plain object
     * @param model - Plain object to create an AssociationDefinition from
     * @public
     */
    export function fromPlainModel(
        model: {
            name: QNameWithTypeTagConsumer<QNameTypeTag.ASSOCIATION>;
            sourceName: QNameWithTypeTagConsumer<QNameTypeTag.CLASS> | string;
            targetName: QNameWithTypeTagConsumer<QNameTypeTag.CLASS> | string;
        } & Omit<
            PlainModelFromBuilder<AssociationDefinitionBuilder>,
            'name' | 'sourceName' | 'targetName'
        >
    ): AssociationDefinition {
        const b = builder(model.name, model.sourceName, model.targetName);
        const clone: Partial<typeof model> = { ...model };
        delete clone.name;
        delete clone.sourceName;
        delete clone.targetName;
        return _fromPlainModel(b, clone);
    }
}

export default AssociationDefinition;
