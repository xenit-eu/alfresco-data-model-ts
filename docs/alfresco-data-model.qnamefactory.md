<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@xenit/alfresco-data-model](./alfresco-data-model.md) &gt; [QNameFactory](./alfresco-data-model.qnamefactory.md)

## QNameFactory class

Creates QNames from strings

<b>Signature:</b>

```typescript
export default class QNameFactory implements IQNameFactory 
```
<b>Implements:</b> IQNameFactory

## Methods

|  Method | Modifiers | Description |
|  --- | --- | --- |
|  [createQNameFromString(qname)](./alfresco-data-model.qnamefactory.createqnamefromstring.md) |  | Creates a QName from a string. |
|  [maybeCreateQNameFromString(qname)](./alfresco-data-model.qnamefactory.maybecreateqnamefromstring.md) |  | Creates a QName from a string if possible. |
|  [registerPrefix(prefix, namespace)](./alfresco-data-model.qnamefactory.registerprefix.md) |  | Registers a new valid prefix and namespace<!-- -->It is allowed to register the same namespace with multiple different prefixes. These prefixes will be considered equivalent, but only the last registered prefix will be used when generating QNames. |
