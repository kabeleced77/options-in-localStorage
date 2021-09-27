export interface IStorageValue {
  value(): string;
  defaultValue(): string;
  fromJson(json: { [s: string]: string }): IStorageValue;
}
