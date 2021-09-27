export interface IStorageValue {
  value(): string;
  default(): string;
  fromJson(json: { [s: string]: string }): IStorageValue;
}
