import { AcronymDto } from "../dto/acronym";
import AcronymDao from "../dao/acronym.dao";
import { CRUD } from "../../common/interfaces/crud.interface";

class AcronymService implements CRUD {
  async create(resource: AcronymDto) {
    return AcronymDao.createAcronym(resource);
  }
  async list(from: any, limit: any, search: any) {
    return AcronymDao.getAcronyms(from, limit, search);
  }

  async readAnAcronym(acronym: string) {
    return AcronymDao.getAnAcronym(acronym);
  }

  async putAnAcronym(acronym: string, resource: AcronymDto) {
    return AcronymDao.putAnAcronym(acronym, resource);
  }
  async removeAnAcronym(acronym: string) {
    return AcronymDao.removeAnAcronym(acronym);
  }
}

export default new AcronymService();
