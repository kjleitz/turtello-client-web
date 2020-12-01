export type Meta = Record<string, any>;

export interface JsonApiInfo {
  version: string;
  meta?: Meta;
}

export interface DetailedLink {
  href: string;
  meta?: Meta;
}

export type Link = string | DetailedLink;

export interface Links {
  self: Link;
  related?: Link;
}

export interface ErrorLinks {
  about: Link;
}

export interface ResourceIdentifier<Type extends string = string> {
  id: string;
  type: Type;
  meta?: Meta;
}

export interface OptionalHasOneRelationship<Type extends string = string> {
  data: null | ResourceIdentifier<Type>;
  links?: Links;
  meta?: Meta;
}

export interface HasOneRelationship<Type extends string = string> {
  data: ResourceIdentifier<Type>;
  links?: Links;
  meta?: Meta;
}

export interface HasManyRelationship<Type extends string = string> {
  data: ResourceIdentifier<Type>[];
  links?: Links;
  meta?: Meta;
}

export type Relationship<
  Type extends string = string
> = HasOneRelationship<Type> | HasManyRelationship<Type>;

export type Attributes = Record<string, any>;

export interface Resource<
  T extends string = string,
  A extends Attributes = Attributes,
  R = Record<string, Relationship> | undefined
> {
  id: string;
  type: T;
  attributes: A;
  relationships: R;
  links?: Links;
}

export interface CollectionDocument<R = Resource> {
  data: R[];
  errors: never;
  included?: Resource[];
  links?: Links;
  jsonapi?: JsonApiInfo;
  meta?: Meta;
}

export interface ResourceDocument<R = Resource> {
  data: R;
  errors: never;
  included?: Resource[];
  links?: Links;
  jsonapi?: JsonApiInfo;
  meta?: Meta;
}

export type ResponseDocument<R = Resource> = ResourceDocument<R> | CollectionDocument<R>;

export interface ErrorSource {
  pointer: string;
  parameter?: string;
}

export interface ErrorDetail {
  status: string;
  code: string;
  title: string;
  detail: string;
  source?: ErrorSource;
  id?: string;
  links?: ErrorLinks;
  meta?: Meta;
}

export interface ErrorDocument {
  data: never;
  errors: ErrorDetail[];
  included: never;
  links?: Links;
  jsonapi?: JsonApiInfo;
  meta?: Meta;
}
