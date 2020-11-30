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

export interface ResourceIdentifier<
  ResourceType extends string = string
> {
  id: string;
  type: ResourceType;
  meta?: Meta;
}

export type HasOne<ResourceType extends string = string> = ResourceIdentifier<ResourceType>;
export type HasMany<ResourceType extends string = string> = ResourceIdentifier<ResourceType>[];

export type RelationshipData = null | ResourceIdentifier | ResourceIdentifier[];

// export interface Relationship {
//   data: RelationshipData;
//   links?: Links;
//   meta?: Meta;
// }

export interface Relationship {
  data: null | HasOne | HasMany;
  links?: Links;
  meta?: Meta;
}

// export type Relationships<
//   RelationshipTypes extends string = string
// > = Record<RelationshipTypes, Relationship>;

export type RelationshipsMap = Record<string, Relationship>;

// export interface Resource<
//   Attributes extends Record<string, any> = Record<string, any>,
//   RelationshipTypes extends string = string
// > {
//   id: string;
//   type: string;
//   attributes: Attributes;
//   relationships: Relationships<RelationshipTypes>;
//   links?: Links;
// }

export interface Resource<
  Attributes extends Record<string, any> = Record<string, any>,
  Relationships extends RelationshipsMap = RelationshipsMap
> {
  id: string;
  type: string;
  attributes: Attributes;
  relationships: Relationships;
  links?: Links;
}

export interface CollectionDocument<
  ResourceItem extends Resource = Resource
> {
  data: ResourceItem[];
  errors: never;
  included?: Resource[];
  links?: Links;
  jsonapi?: JsonApiInfo;
  meta?: Meta;
}

export interface ResourceDocument<
  ResourceItem extends Resource = Resource
> {
  data: ResourceItem;
  errors: never;
  included?: Resource[];
  links?: Links;
  jsonapi?: JsonApiInfo;
  meta?: Meta;
}

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
