// import { DataProcessor } from './utils/data.processor';
// import { FileService } from './services/file.service';
// import {UtilsService} from './services/utils.service';
// const path = require('path');
// const fs = require('fs');

// /***
//  * run with: sudo npm run dev
//  * When running with node dist/index.js, make sure the asssets folder is ../../ instead of ../
//  * run with:  node --max-old-space-size=8192 index.js to heap limit errors
//  * https://stackoverflow.com/questions/54137165/fatal-error-ineffective-mark-compacts-near-heap-limit-allocation-failed-javas
//  *
//  */
// class Main {
//   public processData(): void {
//     const rootFolder = '../src/assets';

//       // point folder with root path: https://nodejs.dev/nodejs-file-paths
//     const pathToFolderToProcess = 'Users/raul/Desktop/landgrid_geojson';
//     // const pathToFolderToProcess = '/Users/raul/Desktop/github/mapbox/data';

//     const ignoreFiles = ['processed', 'DS_Store', '.json.zip'];
//     const directoryPath = path.join('/', pathToFolderToProcess);
//     fs.readdir(directoryPath, (err, files) => {
//       if (err) {
//         return console.log('Unable to scan directory: ' + err);
//       }
//       files.forEach( (filename: string) => {
//         if (!ignoreFiles.some((f) => filename.includes(f))) {
//           this.processFile(path.join('/', pathToFolderToProcess, '/' + filename));
//         }
//       });
//     });

//   }

//   private processFile(filepath: string): void {
//     console.log(`processing data: assigning files random value data: ${filepath}`);

//     const fileService = new FileService();
//     const utilsService = new UtilsService();

//     const featureCollection = fileService.getFileFromRootPath(filepath);

//     featureCollection.features.forEach((f) => {
//       // f.properties.value = utilsService.getRandomNumberInRange(0, 9);
//       f.properties = { value: utilsService.getRandomNumberInRange(0, 9) };
//     });

//     fileService.writeToFile(featureCollection, filepath);
//   }
// }

// // start program
// const main = new Main();
// main.processData();


const Parser = require('stream-json/Parser');
const parser = new Parser();

const fs = require('fs');

let objectCounter = 0;
parser.on('data', data => console.log(data));
parser.on('end', () => console.log(`Found ${objectCounter} objects.`));

fs.createReadStream('../data/ak_anchorage.json').pipe(parser);
