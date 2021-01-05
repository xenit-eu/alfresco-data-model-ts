<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@xenit/alfresco-data-model](./alfresco-data-model.md) &gt; [PropertyDefinition](./alfresco-data-model.propertydefinition.md)

## PropertyDefinition interface

Describes a property of a node.

A property is metadata of a certain type that belongs to a node.

<b>Signature:</b>

```typescript
export default interface PropertyDefinition extends DictionaryDefinition<QNameTypeTag.PROPERTY> 
```
<b>Extends:</b> DictionaryDefinition&lt;QNameTypeTag.PROPERTY&gt;

## Properties

|  Property | Type | Description |
|  --- | --- | --- |
|  [constraints](./alfresco-data-model.propertydefinition.constraints.md) | readonly [PropertyConstraint](./alfresco-data-model.propertyconstraint.md)<!-- -->\[\] | Constraints that are applied to this property.<!-- -->Constraints limit the allowable values of a property. |
|  [container](./alfresco-data-model.propertydefinition.container.md) | QNameWithTypeTag&lt;QNameTypeTag.CLASS&gt; | The class (type or aspect) that defines this property |
|  [dataType](./alfresco-data-model.propertydefinition.datatype.md) | QNameWithTypeTag&lt;QNameTypeTag.DATA\_TYPE&gt; | The datatype for the property. |
|  [defaultValue](./alfresco-data-model.propertydefinition.defaultvalue.md) | string \| null | The default value for the property (if any) in stringified format. |
|  [mandatory](./alfresco-data-model.propertydefinition.mandatory.md) | boolean | If the property is mandatory according to the datamodel. |
|  [mandatoryEnforced](./alfresco-data-model.propertydefinition.mandatoryenforced.md) | boolean | If true, data updates that would violate the mandatory requirement from [PropertyDefinition.mandatory](./alfresco-data-model.propertydefinition.mandatory.md) will be rejected. |
|  [multiValued](./alfresco-data-model.propertydefinition.multivalued.md) | boolean | If this property can contain multiple values of the datatype. |
|  [protected](./alfresco-data-model.propertydefinition.protected.md) | boolean | Marks the property as protected, meaning that it can only be updated by the system itself, not by users. |
|  [residual](./alfresco-data-model.propertydefinition.residual.md) | boolean | Marks the property as residual, meaning that it is not defined explicitly in the datamodel.<!-- -->Residual properties can be defined on a node, but they have no associated datamodel definition. |
