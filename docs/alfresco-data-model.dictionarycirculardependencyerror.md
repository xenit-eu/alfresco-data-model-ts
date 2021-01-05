<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@xenit/alfresco-data-model](./alfresco-data-model.md) &gt; [DictionaryCircularDependencyError](./alfresco-data-model.dictionarycirculardependencyerror.md)

## DictionaryCircularDependencyError class

This error indicates a circular dependency in the inheritance or mandatory aspect chain

<b>Signature:</b>

```typescript
export declare class DictionaryCircularDependencyError extends DictionaryError 
```
<b>Extends:</b> [DictionaryError](./alfresco-data-model.dictionaryerror.md)

## Remarks

The constructor for this class is marked as internal. Third-party code should not call the constructor directly or create subclasses that extend the `DictionaryCircularDependencyError` class.

## Properties

|  Property | Modifiers | Type | Description |
|  --- | --- | --- | --- |
|  [path](./alfresco-data-model.dictionarycirculardependencyerror.path.md) |  | readonly QName\[\] | The other QNames that are part of the circular dependency chain |
