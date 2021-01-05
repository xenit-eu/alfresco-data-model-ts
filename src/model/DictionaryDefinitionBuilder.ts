import DictionaryDefinition from './DictionaryDefinition';
import {
    QNameTypeTag,
    QNameWithTypeTag,
    QNameWithTypeTagConsumer,
} from './QName';

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
