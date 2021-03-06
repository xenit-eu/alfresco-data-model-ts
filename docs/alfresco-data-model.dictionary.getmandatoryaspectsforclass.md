<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@xenit/alfresco-data-model](./alfresco-data-model.md) &gt; [Dictionary](./alfresco-data-model.dictionary.md) &gt; [getMandatoryAspectsForClass](./alfresco-data-model.dictionary.getmandatoryaspectsforclass.md)

## Dictionary.getMandatoryAspectsForClass() method

Retrieves all mandatory aspects of a class, direct, inherited through parents or through mandatory aspects.

The returned classes are ordered in declaration order on the specified object, then in inheritance order with parents first.

Note that an aspect is also allowed to specify mandatory aspects and a parent aspect.

<b>Signature:</b>

```typescript
getMandatoryAspectsForClass(qname: QNameWithTypeTagConsumer<QNameTypeTag.CLASS>): ClassDefinition[];
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  qname | QNameWithTypeTagConsumer&lt;QNameTypeTag.CLASS&gt; | The qualified name of the class for which all parent classes are fetched |

<b>Returns:</b>

ClassDefinition\[\]

A list of all classes that are inherited. If no class exists for the given qname, an empty list is returned.

