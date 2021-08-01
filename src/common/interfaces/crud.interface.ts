export interface CRUD {
  list: (from: string, limit: string, search: string) => Promise<any>;
  readAnAcronym: (acronym: string) => Promise<any>;
  create: (resource: any) => Promise<any>;
  putAnAcronym: (id: string, resource: any) => Promise<any>;
  removeAnAcronym: (id: string) => Promise<any>;
}
