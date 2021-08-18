import acronymJson from "../acronym/acronym.json";
import shortId from "shortid";

const seedData = () => {
  let seedArray: any = [];
  acronymJson.map((data) => {
    const _id: string = shortId.generate();
    seedArray.push({
      _id,
      acronym: Object.keys(data).toString(),
      definition: Object.values(data).toString(),
    });
  });
  return seedArray;
};

export const acronym = seedData();
