import {
    ClassDefinition,
    PropertyDefinition,
    AssociationDefinition,
} from '../model';
import { QNameTypeTag, QNameWithTypeTagConsumer } from '../model/QName';

/**
 * @public
 */
export default interface IDictionary {
    getClass(
        qname: QNameWithTypeTagConsumer<QNameTypeTag.CLASS>
    ): ClassDefinition | null;
    getProperty(
        qname: QNameWithTypeTagConsumer<QNameTypeTag.PROPERTY>
    ): PropertyDefinition;
    getAssociation(
        qname: QNameWithTypeTagConsumer<QNameTypeTag.ASSOCIATION>
    ): AssociationDefinition | null;

    getAllPropertiesForClass(
        qname: QNameWithTypeTagConsumer<QNameTypeTag.CLASS>
    ): PropertyDefinition[];
    getAllAssociationsForClass(
        qname: QNameWithTypeTagConsumer<QNameTypeTag.CLASS>
    ): AssociationDefinition[];
    getAllClassesForClass(
        qname: QNameWithTypeTagConsumer<QNameTypeTag.CLASS>
    ): ClassDefinition[];

    getParentsForClass(
        qname: QNameWithTypeTagConsumer<QNameTypeTag.CLASS>
    ): ClassDefinition[];
    getMandatoryAspectsForClass(
        qname: QNameWithTypeTagConsumer<QNameTypeTag.CLASS>
    ): ClassDefinition[];

    getChildrenForClass(
        qname: QNameWithTypeTagConsumer<QNameTypeTag.CLASS>
    ): ClassDefinition[];
}
