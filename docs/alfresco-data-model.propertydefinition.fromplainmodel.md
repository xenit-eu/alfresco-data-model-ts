<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@xenit/alfresco-data-model](./alfresco-data-model.md) &gt; [PropertyDefinition](./alfresco-data-model.propertydefinition.md) &gt; [fromPlainModel](./alfresco-data-model.propertydefinition.fromplainmodel.md)

## PropertyDefinition.fromPlainModel() function

Creates a [PropertyDefinition](./alfresco-data-model.propertydefinition.md) from a plain object

<b>Signature:</b>

```typescript
function fromPlainModel(model: {
        name: QNameWithTypeTagConsumer<QNameTypeTag.PROPERTY>;
        container: QNameWithTypeTagConsumer<QNameTypeTag.CLASS> | string;
        dataType: QNameWithTypeTagConsumer<QNameTypeTag.DATA_TYPE> | string;
    } & PlainModelFromBuilder<PropertyDefinitionBuilder>): PropertyDefinition;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  model | { name: QNameWithTypeTagConsumer&lt;QNameTypeTag.PROPERTY&gt;; container: QNameWithTypeTagConsumer&lt;QNameTypeTag.CLASS&gt; \| string; dataType: QNameWithTypeTagConsumer&lt;QNameTypeTag.DATA\_TYPE&gt; \| string; } &amp; PlainModelFromBuilder&lt;PropertyDefinitionBuilder&gt; | Plain object to create an PropertyDefinition from |

<b>Returns:</b>

PropertyDefinition
