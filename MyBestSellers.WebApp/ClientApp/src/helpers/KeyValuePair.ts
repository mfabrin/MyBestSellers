class KeyValuePair<TKey, TValue>{
    key: TKey;
    value: TValue;

    constructor(key: TKey, value: TValue) {
        this.key = key;
        this.value = value;

        return this;
    }
}

export default KeyValuePair;