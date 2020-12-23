import QNameFactory from "../../src/dictionary/QNameFactory";
import { QName } from "../../src/model";

describe("QNameFactory", () => {
  const factory = new QNameFactory();
  factory.registerPrefix("custom", "custom.model");
  factory.registerPrefix("other", "other.model");
  factory.registerPrefix("cm", "http://www.alfresco.org/model/content/1.0");
  factory.registerPrefix("d", "http://www.alfresco.org/model/dictionary/1.0");

  it("Converts prefix QName strings to QNames", () => {
    const prefixQName = factory.createQNameFromString("custom:xyz");

    expect(prefixQName.localName).toEqual("xyz");
    expect(prefixQName.namespaceURI).toEqual("custom.model");
    expect(prefixQName.prefix).toEqual("custom");

    expect(QName.toPrefixString(prefixQName)).toEqual("custom:xyz");
    expect(QName.toString(prefixQName)).toEqual("{custom.model}xyz");
  });

  it("Converts full QName strings to QNames", () => {
    const prefixQName = factory.createQNameFromString("{custom.model}xyz");

    expect(prefixQName.localName).toEqual("xyz");
    expect(prefixQName.namespaceURI).toEqual("custom.model");
    expect(prefixQName.prefix).toEqual("custom");

    expect(QName.toPrefixString(prefixQName)).toEqual("custom:xyz");
    expect(QName.toString(prefixQName)).toEqual("{custom.model}xyz");
  });

  it("Throws when a non-registered prefix is used", () => {
    expect(() => factory.createQNameFromString("unknown:name")).toThrow();
  });

  it("Throws when a non-registered URI is used", () => {
    expect(() =>
      factory.createQNameFromString("{unknown.model}name")
    ).toThrow();
  });

  it("Returns null when optionally creating a QName", () => {
    expect(factory.maybeCreateQNameFromString("invalid-qname")).toBeNull();
  });
});
