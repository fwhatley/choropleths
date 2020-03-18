import { DataProcessor } from './utils/data.processor';
import { FileService } from './services/file.service';
import {UtilsService} from './services/utils.service';

/***
 * run with: sudo npm run dev
 * When running with node dist/index.js, make sure the asssets folder is ../../ instead of ../
 * run with:  node --max-old-space-size=8192 index.js to heap limit errors
 * https://stackoverflow.com/questions/54137165/fatal-error-ineffective-mark-compacts-near-heap-limit-allocation-failed-javas
 *
 */
class Main {
  public processData(): void {
    const rootFolder = '../src/assets';

    // this.processFile(`${rootFolder}/parcels/ga_dekalb.geojson`);
    // this.processFile(`${rootFolder}/parcels/ga_forsyth.geojson`);
    // this.processFile(`${rootFolder}/parcels/ga_fulton.geojson`);

    // this.processFile(`${rootFolder}/neighborhood_n3.geojson`);

    // this.processFile(`${rootFolder}/countyCrime.geojson`);
    // this.processFile(`${rootFolder}/countyPrices.geojson`);

    this.processFile(`${rootFolder}/statePrices.geojson`);
  }

  private processFile(filepath: string): void {
    console.log(`processing data: assigning files random value data: ${filepath}`);

    const fileService = new FileService();
    const utilsService = new UtilsService();

    const featureCollection = fileService.getFile(filepath);

    featureCollection.features.forEach((f) => {
      f.properties.value = utilsService.getRandomNumberInRange(0, 1000);
    });

    fileService.writeToFile(featureCollection, filepath);
  }
}

// start program
const main = new Main();
main.processData();






