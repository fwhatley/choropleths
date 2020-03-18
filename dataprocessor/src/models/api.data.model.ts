export class ApiDataModel {
    public apiType: string;
    public apiName: string;
    public apiKey: string;
    public method: string;
    public path: string;

    constructor(values: any = {}) {
        this.apiType = values.apiType || '';
        this.apiName = values.apiName || '';
        this.apiKey = values.apiKey || '';
        this.method = values.method || '';
        this.path = values.path || '';
    }

    public getPathParameters(): string[] {

        let regex1 = RegExp('{.*?}','g');
        let array1 = null;
        let params = []

        while ((array1 = regex1.exec(this.path)) !== null) {
            // console.log(`FREDY - Found ${array1[0]}. Next starts at ${regex1.lastIndex}.`);
            params.push(array1[0].slice(1,-1)); // add after removing {}
            // expected output: "Found foo. Next starts at 9."
            // expected output: "Found foo. Next starts at 19."
        }

        return params;
    }
}
