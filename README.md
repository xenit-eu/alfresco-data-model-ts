# Alfresco Datamodel for Typescript

This Typescript library provides access to the Alfresco metadata model.

## Usage

This library defines a set of interfaces for classes (types & aspects), properties and associations.

The whole data model should be loaded from Alfresco and then inserted into a [`Dictionary`](docs/alfresco-data-model.dictionary.md) object.

Retrieving the data from Alfresco and converting it to the proper representation is outside the scope of this package.

```ts
import { QNameFactory, IDictionary, Dictionary } from "@xenit/alfresco-data-model";

async function getDictionary(): IDictionary {

    const qnameFactory = new QNameFactory();
    for(const namespace of await getNamespacesAndPrefixes()) {
        qnameFactory.registerPrefix(namespace.prefix, namespace.uri);
    }
    const dictionary: IDictionary = new Dictionary(await getClasses(), await getProperties(), await getAssociations(), qnameFactory);
    return dictionary;
}
```

## Continuous integration

Tests and releases are performed with Github Actions.

To create a new release, simply tag a commit with a version and push.
Tags must start with `v`, followed by a version number.

* Release versions are published to npm with the `latest` dist-tag.
* Pre-release versions are published to npm with the `next` dist-tag.
