import DictionaryDefinition from '../DictionaryDefinition';
import QName, {
    QNameTypeTag,
    QNameWithTypeTag,
    QNameWithTypeTagConsumer,
} from '../QName';

export default abstract class DictionaryDefinitionBuilder<
    T extends QNameTypeTag = QNameTypeTag
> {
    private readonly name: QNameWithTypeTag<T>;
    private title: string | null = null;
    private description: string | null = null;

    public constructor(
        private readonly nameTypeTag: T,
        name: QNameWithTypeTagConsumer<T>
    ) {
        this.name = QNameWithTypeTag.addTag(name, this.nameTypeTag);
    }

    /**
     * Creates a QName from a string (based on the factory that created {@link DictionaryDefinitionBuilder.name})
     * @param q - The string to create a QName for.
     * @internal
     */
    protected _createQNameFromString(q: string | QName): QName {
        if (QName.isInstance(q)) {
            return q;
        }
        return QName.createQName(this.name, q);
    }

    public withTitle(value: string): this {
        this.title = value;
        return this;
    }

    public withDescription(value: string | null): this {
        this.description = value;
        return this;
    }
    public build(): DictionaryDefinition<T> {
        return {
            name: this.name,
            title: this.title ?? this.name.localName,
            description: this.description,
        };
    }
}
