import { ClassDefinition } from '../../src';
import Dictionary from '../../src/dictionary/Dictionary';
import IDictionary from '../../src/dictionary/IDictionary';
import QNameFactory from '../../src/dictionary/QNameFactory';
import QName, { QNameTypeTag, QNameWithTypeTag } from '../../src/model/QName';

describe('Dictionary', () => {
    const qnameFactory = new QNameFactory();
    qnameFactory.registerPrefix(
        'sys',
        'http://www.alfresco.org/model/system/1.0'
    );
    qnameFactory.registerPrefix(
        'cm',
        'http://www.alfresco.org/model/content/1.0'
    );
    qnameFactory.registerPrefix(
        'd',
        'http://www.alfresco.org/model/dictionary/1.0'
    );
    qnameFactory.registerPrefix('test', 'http://www.xenit.eu/test/1.0');

    const dictionary: IDictionary = new Dictionary(
        [
            ClassDefinition.fromPlainModel({
                name: qnameFactory.createQNameFromString("sys:base"),
                title: "System base",
                description: "System base object",
                mandatoryAspects: [
                    'sys:referenceable',
                    'sys:localized',
                ]
            }),
            {
                name: QNameWithTypeTag.addTag(
                    qnameFactory.createQNameFromString('sys:referenceable'),
                    QNameTypeTag.CLASS
                ),
                title: 'Referenceable',
                description: null,
                associations: [],
                mandatoryAspects: [],
                parent: null,
                properties: [
                    QNameWithTypeTag.addTag(
                        qnameFactory.createQNameFromString(
                            'sys:store-protocol'
                        ),
                        QNameTypeTag.PROPERTY
                    ),
                    QNameWithTypeTag.addTag(
                        qnameFactory.createQNameFromString(
                            'sys:store-identifier'
                        ),
                        QNameTypeTag.PROPERTY
                    ),
                    QNameWithTypeTag.addTag(
                        qnameFactory.createQNameFromString('sys:node-uuid'),
                        QNameTypeTag.PROPERTY
                    ),
                    QNameWithTypeTag.addTag(
                        qnameFactory.createQNameFromString('sys:node-dbid'),
                        QNameTypeTag.PROPERTY
                    ),
                ],
            },
            {
                name: QNameWithTypeTag.addTag(
                    qnameFactory.createQNameFromString('sys:localized'),
                    QNameTypeTag.CLASS
                ),
                title: 'Translation',
                description: null,
                associations: [],
                mandatoryAspects: [],
                parent: null,
                properties: [
                    QNameWithTypeTag.addTag(
                        qnameFactory.createQNameFromString('sys:locale'),
                        QNameTypeTag.PROPERTY
                    ),
                ],
            },
            {
                name: QNameWithTypeTag.addTag(
                    qnameFactory.createQNameFromString('cm:cmobject'),
                    QNameTypeTag.CLASS
                ),
                title: 'Object',
                description: null,
                associations: [],
                mandatoryAspects: [
                    QNameWithTypeTag.addTag(
                        qnameFactory.createQNameFromString('cm:auditable'),
                        QNameTypeTag.CLASS
                    ),
                ],
                parent: QNameWithTypeTag.addTag(
                    qnameFactory.createQNameFromString('sys:base'),
                    QNameTypeTag.CLASS
                ),
                properties: [
                    QNameWithTypeTag.addTag(
                        qnameFactory.createQNameFromString('cm:name'),
                        QNameTypeTag.PROPERTY
                    ),
                ],
            },
            {
                name: QNameWithTypeTag.addTag(
                    qnameFactory.createQNameFromString('cm:auditable'),
                    QNameTypeTag.CLASS
                ),
                title: 'Auditable',
                description: null,
                associations: [],
                mandatoryAspects: [],
                parent: null,
                properties: [
                    QNameWithTypeTag.addTag(
                        qnameFactory.createQNameFromString('cm:created'),
                        QNameTypeTag.PROPERTY
                    ),
                    QNameWithTypeTag.addTag(
                        qnameFactory.createQNameFromString('cm:creator'),
                        QNameTypeTag.PROPERTY
                    ),
                    QNameWithTypeTag.addTag(
                        qnameFactory.createQNameFromString('cm:modified'),
                        QNameTypeTag.PROPERTY
                    ),
                    QNameWithTypeTag.addTag(
                        qnameFactory.createQNameFromString('cm:modifier'),
                        QNameTypeTag.PROPERTY
                    ),
                    QNameWithTypeTag.addTag(
                        qnameFactory.createQNameFromString('cm:accessed'),
                        QNameTypeTag.PROPERTY
                    ),
                ],
            },
            {
                name: QNameWithTypeTag.addTag(
                    qnameFactory.createQNameFromString('cm:folder'),
                    QNameTypeTag.CLASS
                ),
                title: 'Folder',
                description: null,
                associations: [
                    QNameWithTypeTag.addTag(
                        qnameFactory.createQNameFromString('cm:contains'),
                        QNameTypeTag.ASSOCIATION
                    ),
                ],
                mandatoryAspects: [],
                parent: QNameWithTypeTag.addTag(
                    qnameFactory.createQNameFromString('cm:cmobject'),
                    QNameTypeTag.CLASS
                ),
                properties: [],
            },
            {
                name: QNameWithTypeTag.addTag(
                    qnameFactory.createQNameFromString('cm:content'),
                    QNameTypeTag.CLASS
                ),
                title: 'Content',
                description: null,
                associations: [],
                mandatoryAspects: [],
                parent: QNameWithTypeTag.addTag(
                    qnameFactory.createQNameFromString('cm:cmobject'),
                    QNameTypeTag.CLASS
                ),
                properties: [
                    QNameWithTypeTag.addTag(
                        qnameFactory.createQNameFromString('cm:content'),
                        QNameTypeTag.PROPERTY
                    ),
                ],
            },
            {
                name: QNameWithTypeTag.addTag(
                    qnameFactory.createQNameFromString('cm:titled'),
                    QNameTypeTag.CLASS
                ),
                title: 'Titled',
                description: null,
                associations: [],
                mandatoryAspects: [],
                parent: null,
                properties: [
                    QNameWithTypeTag.addTag(
                        qnameFactory.createQNameFromString('cm:title'),
                        QNameTypeTag.PROPERTY
                    ),
                    QNameWithTypeTag.addTag(
                        qnameFactory.createQNameFromString('cm:description'),
                        QNameTypeTag.PROPERTY
                    ),
                ],
            },
            {
                name: QNameWithTypeTag.addTag(
                    qnameFactory.createQNameFromString('cm:author'),
                    QNameTypeTag.CLASS
                ),
                title: 'Author',
                description: null,
                associations: [],
                mandatoryAspects: [],
                parent: null,
                properties: [
                    QNameWithTypeTag.addTag(
                        qnameFactory.createQNameFromString('cm:author'),
                        QNameTypeTag.PROPERTY
                    ),
                ],
            },
            {
                name: QNameWithTypeTag.addTag(
                    qnameFactory.createQNameFromString('cm:dublincore'),
                    QNameTypeTag.CLASS
                ),
                title: 'Dublin core',
                description: null,
                associations: [],
                mandatoryAspects: [
                    QNameWithTypeTag.addTag(
                        qnameFactory.createQNameFromString('cm:auditable'),
                        QNameTypeTag.CLASS
                    ),
                    QNameWithTypeTag.addTag(
                        qnameFactory.createQNameFromString('cm:author'),
                        QNameTypeTag.CLASS
                    ),
                ],
                parent: QNameWithTypeTag.addTag(
                    qnameFactory.createQNameFromString('cm:titled'),
                    QNameTypeTag.CLASS
                ),
                properties: [
                    QNameWithTypeTag.addTag(
                        qnameFactory.createQNameFromString('cm:publisher'),
                        QNameTypeTag.PROPERTY
                    ),
                    QNameWithTypeTag.addTag(
                        qnameFactory.createQNameFromString('cm:contributor'),
                        QNameTypeTag.PROPERTY
                    ),
                    QNameWithTypeTag.addTag(
                        qnameFactory.createQNameFromString('cm:type'),
                        QNameTypeTag.PROPERTY
                    ),
                    QNameWithTypeTag.addTag(
                        qnameFactory.createQNameFromString('cm:identifier'),
                        QNameTypeTag.PROPERTY
                    ),
                    QNameWithTypeTag.addTag(
                        qnameFactory.createQNameFromString('cm:dcsource'),
                        QNameTypeTag.PROPERTY
                    ),
                    QNameWithTypeTag.addTag(
                        qnameFactory.createQNameFromString('cm:coverage'),
                        QNameTypeTag.PROPERTY
                    ),
                    QNameWithTypeTag.addTag(
                        qnameFactory.createQNameFromString('cm:rights'),
                        QNameTypeTag.PROPERTY
                    ),
                    QNameWithTypeTag.addTag(
                        qnameFactory.createQNameFromString('cm:subject'),
                        QNameTypeTag.PROPERTY
                    ),
                ],
            },
            {
                name: QNameWithTypeTag.addTag(
                    qnameFactory.createQNameFromString('test:testClass'),
                    QNameTypeTag.CLASS
                ),
                title: 'Test Class',
                description: null,
                associations: [],
                parent: QNameWithTypeTag.addTag(
                    qnameFactory.createQNameFromString('cm:content'),
                    QNameTypeTag.CLASS
                ),
                mandatoryAspects: [
                    QNameWithTypeTag.addTag(
                        qnameFactory.createQNameFromString('cm:dublincore'),
                        QNameTypeTag.CLASS
                    ),
                ],
                properties: [],
            },
        ],
        [
            {
                name: QNameWithTypeTag.addTag(
                    qnameFactory.createQNameFromString('cm:name'),
                    QNameTypeTag.PROPERTY
                ),
                title: 'Name',
                container: QNameWithTypeTag.addTag(
                    qnameFactory.createQNameFromString('cm:cmobject'),
                    QNameTypeTag.CLASS
                ),
                constraints: [],
                dataType: QNameWithTypeTag.addTag(
                    qnameFactory.createQNameFromString('d:text'),
                    QNameTypeTag.DATA_TYPE
                ),
                defaultValue: null,
                description: null,
                mandatory: true,
                mandatoryEnforced: true,
                multiValued: false,
                protected: false,
                residual: false,
            },
        ],
        [
            {
                name: QNameWithTypeTag.addTag(
                    qnameFactory.createQNameFromString('cm:contains'),
                    QNameTypeTag.ASSOCIATION
                ),
                title: '',
                description: null,
                childAssociation: true,
                protected: false,
                sourceName: QNameWithTypeTag.addTag(
                    qnameFactory.createQNameFromString('cm:folder'),
                    QNameTypeTag.CLASS
                ),
                sourceMandatory: false,
                sourceMandatoryEnforced: false,
                sourceMany: true,
                targetName: QNameWithTypeTag.addTag(
                    qnameFactory.createQNameFromString('sys:base'),
                    QNameTypeTag.CLASS
                ),
                targetMandatory: false,
                targetMandatoryEnforced: false,
                targetMany: true,
            },
        ]
    );

    it('#getClass()', () => {
        const clazz = dictionary.getClass(
            qnameFactory.createQNameFromString('cm:cmobject')
        );
        expect(clazz).not.toBe(null);
        expect(QName.toPrefixString(clazz!.name!)).toBe('cm:cmobject');
        expect(QName.toPrefixString(clazz!.parent!)).toBe('sys:base');
        expect(clazz!.title).toBe('Object');
        expect(clazz).toBe(
            dictionary.getClass(
                qnameFactory.createQNameFromString('cm:cmobject')
            )
        );

        expect(
            dictionary.getClass(
                qnameFactory.createQNameFromString('cm:nonexistent')
            )
        ).toBe(null);
    });

    it('#getClasses()', () => {
        const classes = dictionary.getClasses();
        expect(classes.map(c => QName.toPrefixString(c.name)).sort()).toEqual([
            'sys:base',
            'sys:referenceable',
            'sys:localized',
            'cm:cmobject',
            'cm:auditable',
            'cm:folder',
            'cm:content',
            'cm:titled',
            'cm:author',
            'cm:dublincore',
            'test:testClass'
        ].sort());
    });

    it('#getProperty()', () => {
        const prop = dictionary.getProperty(
            qnameFactory.createQNameFromString('cm:name')
        );
        expect(prop).not.toBe(null);
        expect(QName.toPrefixString(prop.container)).toBe('cm:cmobject');
        expect(prop.title).toBe('Name');
        expect(prop.residual).toBe(false);
        expect(prop).toBe(
            dictionary.getProperty(
                qnameFactory.createQNameFromString('cm:name')
            )
        );

        const nonExistingProp = dictionary.getProperty(
            qnameFactory.createQNameFromString('cm:residualProp')
        );
        expect(nonExistingProp).not.toBe(null);
        expect(QName.toPrefixString(nonExistingProp.container)).toBe(
            'sys:base'
        );
        expect(nonExistingProp.title).toBe('residualProp');
        expect(nonExistingProp.residual).toBe(true);

        expect(nonExistingProp).toBe(
            dictionary.getProperty(
                qnameFactory.createQNameFromString('cm:residualProp')
            )
        );
    });

    it('#getProperties()', () => {
        const props = dictionary.getProperties();
        expect(props.map(p => QName.toPrefixString(p.name))).toEqual([
            'cm:name'
        ]);
    });

    it('#getAssociation()', () => {
        const assoc = dictionary.getAssociation(
            qnameFactory.createQNameFromString('cm:contains')
        );
        expect(assoc).not.toBe(null);
        expect(QName.toPrefixString(assoc!.sourceName)).toBe('cm:folder');
        expect(QName.toPrefixString(assoc!.targetName)).toBe('sys:base');
        expect(assoc).toBe(
            dictionary.getAssociation(
                qnameFactory.createQNameFromString('cm:contains')
            )
        );

        expect(
            dictionary.getAssociation(
                qnameFactory.createQNameFromString('cm:nonexistent')
            )
        ).toBe(null);
    });

    it('#getAssociations()', () => {
        const assocs = dictionary.getAssociations();
        expect(assocs.map(a => QName.toPrefixString(a.name))).toEqual([
            'cm:contains'
        ]);
    });

    it('#getAllClassesForClass()', () => {
        const baseClasses = dictionary.getAllClassesForClass(
            qnameFactory.createQNameFromString('sys:base')
        );

        expect(baseClasses.map(c => QName.toPrefixString(c.name))).toEqual([
            'sys:base',
            'sys:referenceable',
            'sys:localized',
        ]);

        const folderClasses = dictionary.getAllClassesForClass(
            qnameFactory.createQNameFromString('cm:folder')
        );

        expect(folderClasses.map(c => QName.toPrefixString(c.name))).toEqual([
            'sys:base',
            'sys:referenceable',
            'sys:localized',
            'cm:cmobject',
            'cm:auditable',
            'cm:folder',
        ]);

        const testClasses = dictionary.getAllClassesForClass(
            qnameFactory.createQNameFromString('test:testClass')
        );

        expect(testClasses.map(c => QName.toPrefixString(c.name))).toEqual([
            'sys:base',
            'sys:referenceable',
            'sys:localized',
            'cm:cmobject',
            'cm:auditable',
            'cm:content',
            'test:testClass',
            'cm:titled',
            'cm:dublincore',
            'cm:author',
        ]);
    });

    it('#getAllPropertiesForClass()', () => {
        const props = dictionary.getAllPropertiesForClass(
            qnameFactory.createQNameFromString('cm:folder')
        );

        expect(props.map(p => QName.toPrefixString(p.name))).toEqual([
            'sys:store-protocol',
            'sys:store-identifier',
            'sys:node-uuid',
            'sys:node-dbid',
            'sys:locale',
            'cm:name',
            'cm:created',
            'cm:creator',
            'cm:modified',
            'cm:modifier',
            'cm:accessed',
        ]);

        const testProps = dictionary.getAllPropertiesForClass(
            qnameFactory.createQNameFromString('test:testClass')
        );
        expect(testProps.map(p => QName.toPrefixString(p.name))).toEqual([
            'sys:store-protocol',
            'sys:store-identifier',
            'sys:node-uuid',
            'sys:node-dbid',
            'sys:locale',
            'cm:name',
            'cm:created',
            'cm:creator',
            'cm:modified',
            'cm:modifier',
            'cm:accessed',
            'cm:content',
            'cm:title',
            'cm:description',
            'cm:publisher',
            'cm:contributor',
            'cm:type',
            'cm:identifier',
            'cm:dcsource',
            'cm:coverage',
            'cm:rights',
            'cm:subject',
            'cm:author',
        ]);
    });

    it('#getAllAssociationsForClass()', () => {
        const assocs = dictionary.getAllAssociationsForClass(
            qnameFactory.createQNameFromString('cm:folder')
        );

        expect(assocs).toEqual([
            dictionary.getAssociation(
                qnameFactory.createQNameFromString('cm:contains')
            ),
        ]);
    });

    it('#getParentsForClass()', () => {
        const parents = dictionary.getParentsForClass(
            qnameFactory.createQNameFromString('cm:folder')
        );
        expect(parents.map(c => QName.toPrefixString(c.name))).toEqual([
            'sys:base',
            'cm:cmobject',
            'cm:folder',
        ]);
    });

    it('#getMandatoryAspectsForClass()', () => {
        const mandatoryAspects = dictionary.getMandatoryAspectsForClass(
            qnameFactory.createQNameFromString('cm:folder')
        );
        expect(
            mandatoryAspects.map(c => QName.toPrefixString(c.name))
        ).toEqual(['sys:referenceable', 'sys:localized', 'cm:auditable']);

        const testClasses = dictionary.getMandatoryAspectsForClass(
            qnameFactory.createQNameFromString('test:testClass')
        );

        expect(testClasses.map(c => QName.toPrefixString(c.name))).toEqual([
            'sys:referenceable',
            'sys:localized',
            'cm:auditable',
            'cm:titled',
            'cm:dublincore',
            'cm:author',
        ]);
    });

    it('#getChildrenForClass()', () => {
        const folderChildren = dictionary.getChildrenForClass(qnameFactory.createQNameFromString('cm:folder'));
        expect(folderChildren.map(c => QName.toPrefixString(c.name)))
            .toEqual([
                'cm:folder'
            ]);
        const cmobjectChildren = dictionary.getChildrenForClass(qnameFactory.createQNameFromString('cm:cmobject'))
            .map(c => QName.toPrefixString(c.name));
        expect(cmobjectChildren).toContain('cm:cmobject');
        expect(cmobjectChildren).toContain('cm:folder');
        expect(cmobjectChildren).toContain('cm:content');
        expect(cmobjectChildren).toContain('test:testClass');
        expect(cmobjectChildren).toHaveLength(4);
    })

    describe('Broken dictionary', () => {
        const dictionary = new Dictionary(
            [
                {
                    name: QNameWithTypeTag.addTag(
                        qnameFactory.createQNameFromString('test:circular'),
                        QNameTypeTag.CLASS
                    ),
                    title: 'Circular',
                    description: null,
                    associations: [],
                    mandatoryAspects: [],
                    parent: QNameWithTypeTag.addTag(
                        qnameFactory.createQNameFromString('test:circular'),
                        QNameTypeTag.CLASS
                    ),
                    properties: [],
                },
                {
                    name: QNameWithTypeTag.addTag(
                        qnameFactory.createQNameFromString('test:circular1'),
                        QNameTypeTag.CLASS
                    ),
                    title: 'Circular 1',
                    description: null,
                    associations: [],
                    mandatoryAspects: [],
                    parent: QNameWithTypeTag.addTag(
                        qnameFactory.createQNameFromString('test:circular2'),
                        QNameTypeTag.CLASS
                    ),
                    properties: [],
                },
                {
                    name: QNameWithTypeTag.addTag(
                        qnameFactory.createQNameFromString('test:circular2'),
                        QNameTypeTag.CLASS
                    ),
                    title: 'Circular 2',
                    description: null,
                    associations: [],
                    mandatoryAspects: [],
                    parent: QNameWithTypeTag.addTag(
                        qnameFactory.createQNameFromString('test:circular1'),
                        QNameTypeTag.CLASS
                    ),
                    properties: [],
                },
                {
                    name: QNameWithTypeTag.addTag(
                        qnameFactory.createQNameFromString('test:dangling1'),
                        QNameTypeTag.CLASS
                    ),
                    title: 'Dangling 1',
                    description: null,
                    associations: [],
                    mandatoryAspects: [],
                    parent: QNameWithTypeTag.addTag(
                        qnameFactory.createQNameFromString('test:dangling2'),
                        QNameTypeTag.CLASS
                    ),
                    properties: [],
                },
                {
                    name: QNameWithTypeTag.addTag(
                        qnameFactory.createQNameFromString(
                            'test:circularAspect1'
                        ),
                        QNameTypeTag.CLASS
                    ),
                    title: 'Circular Aspect 1',
                    description: null,
                    associations: [],
                    mandatoryAspects: [
                        QNameWithTypeTag.addTag(
                            qnameFactory.createQNameFromString(
                                'test:circularAspect2'
                            ),
                            QNameTypeTag.CLASS
                        ),
                    ],
                    parent: null,
                    properties: [],
                },
                {
                    name: QNameWithTypeTag.addTag(
                        qnameFactory.createQNameFromString(
                            'test:circularAspect2'
                        ),
                        QNameTypeTag.CLASS
                    ),
                    title: 'Circular Aspect 2',
                    description: null,
                    associations: [],
                    mandatoryAspects: [
                        QNameWithTypeTag.addTag(
                            qnameFactory.createQNameFromString(
                                'test:circularAspect1'
                            ),
                            QNameTypeTag.CLASS
                        ),
                    ],
                    parent: null,
                    properties: [],
                },
                {
                    name: QNameWithTypeTag.addTag(
                        qnameFactory.createQNameFromString(
                            'test:circularAspectParent1'
                        ),
                        QNameTypeTag.CLASS
                    ),
                    title: 'Circular Aspect Parent 1',
                    description: null,
                    associations: [],
                    mandatoryAspects: [
                        QNameWithTypeTag.addTag(
                            qnameFactory.createQNameFromString(
                                'test:circularAspectParent2'
                            ),
                            QNameTypeTag.CLASS
                        ),
                    ],
                    parent: null,
                    properties: [],
                },
                {
                    name: QNameWithTypeTag.addTag(
                        qnameFactory.createQNameFromString(
                            'test:circularAspectParent2'
                        ),
                        QNameTypeTag.CLASS
                    ),
                    title: 'Circular Aspect Parent 2',
                    description: null,
                    associations: [],
                    mandatoryAspects: [],
                    parent: QNameWithTypeTag.addTag(
                        qnameFactory.createQNameFromString(
                            'test:circularAspectParent1'
                        ),
                        QNameTypeTag.CLASS
                    ),
                    properties: [],
                },
                {
                    name: QNameWithTypeTag.addTag(
                        qnameFactory.createQNameFromString(
                            'test:danglingAspect1'
                        ),
                        QNameTypeTag.CLASS
                    ),
                    title: 'Dangling Aspect 1',
                    description: null,
                    associations: [],
                    mandatoryAspects: [
                        QNameWithTypeTag.addTag(
                            qnameFactory.createQNameFromString(
                                'test:danglingAspect2'
                            ),
                            QNameTypeTag.CLASS
                        ),
                    ],
                    parent: null,
                    properties: [],
                },
            ],
            [],
            []
        );

        it('Handles a circular reference', () => {
            expect(() => {
                dictionary.getParentsForClass(
                    qnameFactory.createQNameFromString('test:circular')
                );
            }).toThrowErrorMatchingInlineSnapshot(
                `"Circular dependency on class test:circular: test:circular -> test:circular"`
            );
            expect(() => {
                dictionary.getParentsForClass(
                    qnameFactory.createQNameFromString('test:circular1')
                );
            }).toThrowErrorMatchingInlineSnapshot(
                `"Circular dependency on class test:circular1: test:circular1 -> test:circular2 -> test:circular1"`
            );

            expect(() => {
                dictionary.getMandatoryAspectsForClass(
                    qnameFactory.createQNameFromString('test:circularAspect1')
                );
            }).toThrowErrorMatchingInlineSnapshot(
                `"Circular dependency on class test:circularAspect2: test:circularAspect2 -> test:circularAspect1 -> test:circularAspect2"`
            );

            expect(() => {
                dictionary.getMandatoryAspectsForClass(
                    qnameFactory.createQNameFromString(
                        'test:circularAspectParent1'
                    )
                );
            }).toThrowErrorMatchingInlineSnapshot(
                `"Circular dependency on class test:circularAspectParent2: test:circularAspectParent2 -> test:circularAspectParent1 -> test:circularAspectParent2"`
            );

            expect(() => {
                dictionary.getChildrenForClass(qnameFactory.createQNameFromString('test:circular1'))
            }).toThrowError();
        });

        it('Handles a reference to a nonexisting class', () => {
            expect(() => {
                dictionary.getParentsForClass(
                    qnameFactory.createQNameFromString('test:dangling1')
                );
            }).toThrowErrorMatchingInlineSnapshot(
                `"Class test:dangling2 (referred to by test:dangling1) does not exist."`
            );
            expect(() => {
                dictionary.getMandatoryAspectsForClass(
                    qnameFactory.createQNameFromString('test:danglingAspect1')
                );
            }).toThrowErrorMatchingInlineSnapshot(
                `"Class test:danglingAspect2 (referred to by test:danglingAspect1) does not exist."`
            );

            expect(() => {
                dictionary.getChildrenForClass(qnameFactory.createQNameFromString('test:dangling1'))
            }).toThrowError();
        });
    });
});
