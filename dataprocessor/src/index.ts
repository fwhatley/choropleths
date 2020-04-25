import { DataProcessor } from './utils/data.processor';
import { FileService } from './services/file.service';
import {UtilsService} from './services/utils.service';
const path = require('path');
const fs = require('fs');

/***
 * INSTRUCTIONS ON HOW TO USE THIS
 *   This is a geojson file processor. It grabs all geojson files given a folder and process them all.
 *
 * 1. update PATH_TO_GEOJSON_FOLDER_TO_PROCESS variable in Main class.
 *    - This is the path where your gejons live at (eg. ga_faulton.json).
 *    - The new files will have the same name with 'processed' appended like ga_faulton_processed.json
 * 2. run:
 *    - sudo npm i
 *    - sudo npm run build
 *        - This will compile all .ts files into js and place all js files into dist folder
 * 3. sudo node --max-old-space-size=8192 dist/index.js
 *        - will process all the files

 * Other helpful info
 *  - https://stackoverflow.com/questions/54137165/fatal-error-ineffective-mark-compacts-near-heap-limit-allocation-failed-javas
 *  - https://nodejs.dev/nodejs-file-paths
 */
class Main {
  public processData(): void {

    //================================== BEGIN TO BE UPDATED ==================================//
    const PATH_TO_GEOJSON_FOLDER_TO_PROCESS = 'Users/raul/Desktop/landgrid_ga2counties';
    //================================== END TO BE UPDATED ==================================//

    const ignoreFiles = ['processed', 'DS_Store', '.json.zip'];
    const directoryPath = path.join('/', PATH_TO_GEOJSON_FOLDER_TO_PROCESS);
    fs.readdir(directoryPath, (err, files) => {
      if (err) {
        return console.log('Unable to scan directory: ' + err);
      }
      files.forEach( (filename: string) => {
        if (!ignoreFiles.some((f) => filename.includes(f))) {
          if (filename.includes('.json')) {
            this.processFile(path.join('/', PATH_TO_GEOJSON_FOLDER_TO_PROCESS, '/' + filename));
          }
        }
      });
    });

  }

  private processFile(filepath: string): void {
    console.log(`processing data: assigning files random value data: ${filepath}`);

    const fileService = new FileService();
    const utilsService = new UtilsService();

    const featureCollection = fileService.getFileFromRootPath(filepath);

    featureCollection.features.forEach((f) => {
      let properties = {
        mo0value: utilsService.getRandomNumberInRange(-1, 9),
        mo6value: utilsService.getRandomNumberInRange(-1, 9),
        mo12value: utilsService.getRandomNumberInRange(-1, 9),
        mo18value: utilsService.getRandomNumberInRange(-1, 9),
        propertyId: utilsService.getRandomNumberInRange(0, 9999999),
      };
      f.properties = properties;
    });

    fileService.writeToFile(featureCollection, filepath);
  }
}

// ======== start program ===========//
const main = new Main();
main.processData();
