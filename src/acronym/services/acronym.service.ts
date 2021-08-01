import { PutAcronymDto } from "../dto/put.acronym.dto";
import { CreateAcronymDto } from "../dto/create.acronym.dto";
import AcronymDao from "../dao/acronym.dao";
import { CRUD } from "../../common/interfaces/crud.interface";

class AcronymService implements CRUD {
  async create(resource: CreateAcronymDto) {
    return AcronymDao.createAcronym(resource);
  }
  async list(from: any, limit: any, search: any) {
    return AcronymDao.getAcronyms(from, limit, search);
  }

  async readAnAcronym(acronym: string) {
    return AcronymDao.getAnAcronym(acronym);
  }

  async putAnAcronym(acronym: string, resource: PutAcronymDto) {
    return AcronymDao.putAnAcronym(acronym, resource);
  }
  async removeAnAcronym(acronym: string) {
    return AcronymDao.removeAnAcronym(acronym);
  }
}

export default new AcronymService();
