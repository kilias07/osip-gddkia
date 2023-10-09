import fs from "fs";
import { join } from "path";
const roadFilesDirectory = join(process.cwd(), "road-files");

export const revalidate = 3600;

const getAllRoadsResults = async () => {
  const roadFiles = fs.readdirSync(roadFilesDirectory);
  const roadsResults = roadFiles.map((roadFile) => {
    const roadFileContent = fs.readFileSync(
      join(roadFilesDirectory, roadFile),
      "utf-8"
    );
    const roadResult = JSON.parse(roadFileContent);
    return roadResult;
  });
  return roadsResults;
};

const ShowResults = async () => {
  const roadsResults = await getAllRoadsResults();
  console.log(roadsResults);
  return (
    <div>
      to jest road number <span>adssa</span>
    </div>
  );
};

export default ShowResults;
