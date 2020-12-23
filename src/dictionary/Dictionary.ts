import {
    AssociationDefinition,
    ClassDefinition,
    IQNameFactory,
    PropertyDefinition,
    QName,
} from '../model';
import {
    QNameWithTypeTagConsumer,
    QNameTypeTag,
    QNameWithTypeTag,
} from '../model/QName';
import IDictionary from './IDictionary';
import QNameCache from './QNameCache';
import QNameMap from './QNameMap';

/**
 * @public
 */
export class DictionaryError extends Error {
    /**
     * @internal
     */
    public constructor(public readonly reference: QName, message: string) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = new.target.name;
    }
}

/**
 * @public
 */
export class DictionaryCircularDependencyError extends DictionaryError {
    /**
     * @internal
     */
    public constructor(
        reference: QName,
        public readonly path: readonly QName[]
    ) {
        super(
            reference,
            'Circular dependency on class ' +
                QName.toPrefixString(reference) +
                ': ' +
                makeUnique2(path, QName.equals)
                    .concat([reference])
                    .map(c => QName.toPrefixString(c))
                    .join(' -> ')
        );
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = new.target.name;
    }
}

/**
 * @public
 */
export class DictionaryMissingDependencyError extends DictionaryError {
    /**
     * @internal
     */
    public constructor(reference: QName, public readonly referrer: QName) {
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
 * Remove duplicates out of the array, preferring the first occurence of an item
 */
function makeUnique<T>(items: readonly T[]): T[] {
    return items.filter((value, i, arr) => arr.indexOf(value) === i);
}
function makeUnique2<T>(
    items: readonly T[],
    cmp: (a: T, b: T) => boolean
): T[] {
    return items.filter(
        (value, i, arr) => arr.findIndex(value2 => cmp(value, value2)) === i
    );
}

/**
 * @public
 */
export default class Dictionary implements IDictionary {
    private readonly classes: QNameMap<ClassDefinition>;
    private readonly properties: QNameMap<PropertyDefinition>;
    private readonly associations: QNameMap<AssociationDefinition>;

    private readonly parentsCache: QNameCache<
        QNameWithTypeTag<QNameTypeTag.CLASS>[]
    > = new QNameCache();

    private readonly childrenCache: QNameCache<
        QNameWithTypeTag<QNameTypeTag.CLASS>[]
    > = new QNameCache();
    private readonly residualPropertiesCache: QNameCache<
        PropertyDefinition
    > = new QNameCache();

    public constructor(
        classes: readonly ClassDefinition[],
        properties: readonly PropertyDefinition[],
        associations: readonly AssociationDefinition[],
        private readonly qnameFactory: IQNameFactory
    ) {
        this.classes = new QNameMap(classes);
        this.properties = new QNameMap(properties);
        this.associations = new QNameMap(associations);
    }
    public getClass(
        qname: QNameWithTypeTagConsumer<QNameTypeTag.CLASS>
    ): ClassDefinition | null {
        QNameWithTypeTag.assertTag(qname, QNameTypeTag.CLASS);
        return this.classes.lookup(qname);
    }

    public getProperty(
        qname: QNameWithTypeTagConsumer<QNameTypeTag.PROPERTY>
    ): PropertyDefinition {
        QNameWithTypeTag.assertTag(qname, QNameTypeTag.PROPERTY);

        const prop =
            this.properties.lookup(qname) ??
            this.residualPropertiesCache.get(qname);

        if (prop) {
            return prop;
        }

        const residualProp = {
            name: QNameWithTypeTag.addTag(qname, QNameTypeTag.PROPERTY),
            container: QNameWithTypeTag.addTag(
                this.qnameFactory.createQNameFromString('sys:base'),
                QNameTypeTag.CLASS
            ),
            dataType: QNameWithTypeTag.addTag(
                this.qnameFactory.createQNameFromString('d:any'),
                QNameTypeTag.DATA_TYPE
            ),
            title: qname.localName,
            constraints: [],
            defaultValue: null,
            description: 'Residual property ' + QName.toPrefixString(qname),
            mandatory: false,
            mandatoryEnforced: false,
            multiValued: true,
            protected: false,
            residual: true,
        };
        this.residualPropertiesCache.put(qname, residualProp);
        return residualProp;
    }

    public getAssociation(
        qname: QNameWithTypeTagConsumer<QNameTypeTag.ASSOCIATION>
    ): AssociationDefinition | null {
        QNameWithTypeTag.assertTag(qname, QNameTypeTag.ASSOCIATION);
        return this.associations.lookup(qname);
    }

    public getAllClassesForClass(
        qname: QNameWithTypeTagConsumer<QNameTypeTag.CLASS>
    ): ClassDefinition[] {
        QNameWithTypeTag.assertTag(qname, QNameTypeTag.CLASS);
        return this.getAllClassesForClass0(qname, []);
    }

    private getAllClassesForClass0(
        qname: QNameWithTypeTagConsumer<QNameTypeTag.CLASS>,
        visited: readonly QName[]
    ): ClassDefinition[] {
        if (visited.findIndex(q => QName.equals(qname, q)) !== -1) {
            throw new DictionaryCircularDependencyError(qname, visited);
        }
        const newVisited = visited.concat([qname]);

        const allClasses: ClassDefinition[] = [];
        const parents = this.getParentsForClass(qname);

        for (const parent of parents) {
            newVisited.push(parent.name);
            const myAspects = parent.mandatoryAspects.flatMap(aspect =>
                this.getAllClassesForClass0(aspect, newVisited)
            );
            allClasses.push(parent, ...myAspects);
        }

        return makeUnique(allClasses);
    }

    public getAllPropertiesForClass(
        qname: QNameWithTypeTagConsumer<QNameTypeTag.CLASS>
    ): PropertyDefinition[] {
        QNameWithTypeTag.assertTag(qname, QNameTypeTag.CLASS);

        const allClasses = this.getAllClassesForClass(qname);

        return allClasses
            .flatMap(c => c.properties)
            .map(p => this.getProperty(p));
    }

    public getAllAssociationsForClass(
        qname: QNameWithTypeTagConsumer<QNameTypeTag.CLASS>
    ): AssociationDefinition[] {
        QNameWithTypeTag.assertTag(qname, QNameTypeTag.CLASS);

        const allClasses = this.getAllClassesForClass(qname);

        return allClasses
            .flatMap(c => c.associations)
            .map(a => this.getAssociation(a)!);
    }

    public getParentsForClass(
        qname: QNameWithTypeTagConsumer<QNameTypeTag.CLASS>
    ): ClassDefinition[] {
        QNameWithTypeTag.assertTag(qname, QNameTypeTag.CLASS);

        const cachedParents = this.parentsCache.get(qname);
        if (cachedParents) {
            return cachedParents.map(q => this.getClass(q)!);
        }

        let parentQName: QName | null = qname;
        const parents: ClassDefinition[] = [];
        while (parentQName) {
            let definition = this.getClass(parentQName);
            if (!definition) {
                if (parents.length === 0) {
                    return [];
                }
                throw new DictionaryMissingDependencyError(
                    parentQName,
                    parents[parents.length - 1].name
                );
            }
            if (parents.indexOf(definition) !== -1) {
                throw new DictionaryCircularDependencyError(
                    parentQName,
                    parents.map(c => c.name)
                );
            }
            parents.push(definition);
            parentQName = definition.parent;
        }
        parents.reverse();
        this.parentsCache.put(
            qname,
            parents.map(p => p.name)
        );
        return parents;
    }

    public getMandatoryAspectsForClass(
        qname: QNameWithTypeTagConsumer<QNameTypeTag.CLASS>
    ): ClassDefinition[] {
        QNameWithTypeTag.assertTag(qname, QNameTypeTag.CLASS);
        const allMandatoryAspects = this.getParentsForClass(qname).flatMap(cl =>
            cl.mandatoryAspects.flatMap(asp => {
                const allClasses = this.getAllClassesForClass(asp);
                if (allClasses.length === 0) {
                    throw new DictionaryMissingDependencyError(asp, cl.name);
                }
                return allClasses;
            })
        );
        return makeUnique(allMandatoryAspects);
    }

    public getChildrenForClass(
        qname: QNameWithTypeTagConsumer<QNameTypeTag.CLASS>
    ): ClassDefinition[] {
        const cachedChildren = this.childrenCache.get(qname);
        if (cachedChildren) {
            return cachedChildren.map(q => this.getClass(q)!);
        }

        const myself = this.getClass(qname);
        if (!myself) {
            return [];
        }

        const children = [];

        for (const clazz of this.classes.all()) {
            if (this.getParentsForClass(clazz.name).indexOf(myself) !== -1) {
                children.push(clazz);
            }
        }

        this.childrenCache.put(
            qname,
            children.map(c => c.name)
        );

        return children;
    }
}
