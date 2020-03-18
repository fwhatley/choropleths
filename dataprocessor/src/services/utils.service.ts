
export class UtilsService {

  /**
   * get number between min (inclusive) and max (exclusive)
   */
    public getRandomNumberInRange(min: number, max: number): number {
        return Math.floor(
          Math.random() * (max - min) + min
        );
    }

}
