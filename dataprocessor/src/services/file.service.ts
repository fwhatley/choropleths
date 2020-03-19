import { ApiDataModel } from '../models/api.data.model';
import {FeatureCollection, GeoJSON} from 'geojson';
const fs = require('fs');
const os = require('os');

export class FileService {

  public getFileFromRootPath(filepath: string): FeatureCollection {
    const rawData = fs.readFileSync(filepath);
    return JSON.parse(rawData);
  }

  public writeToFile(data: FeatureCollection, filepath: string): any {
    filepath = filepath.replace('.json', '_processed.json');
    fs.writeFileSync(filepath, JSON.stringify(data));
    console.log(`done writing to file: ${filepath}`);
  }
}
