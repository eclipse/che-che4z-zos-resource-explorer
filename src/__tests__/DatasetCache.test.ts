import { DatasetCache, PATH_SEPARATOR } from "../service/DatasetCache";
import { ZDatasetNode, ZNode, createFilterPath } from "../ui/tree/DatasetTreeModel";
import { Connection } from "../model/Connection";
import { Dataset, Filter } from "../model/DSEntities";

describe("DatasetCache", () => {
    describe("Base Logic", () => {
        const path = "element.id";
        const node: ZNode = new ZNode(path);

        it("should return cached objec", () => {
            const cache: DatasetCache = new DatasetCache();
            cache.cache(path + PATH_SEPARATOR, node);
            expect(cache.loadFromCache(path)).toEqual([node]);
        });
        it("should not return cached object after invalidate", () => {
            const cache: DatasetCache = new DatasetCache();
            cache.cache(path + PATH_SEPARATOR, node);
            cache.invalidate([]);
            expect(cache.loadFromCache(path)).toBeUndefined();
        });
        it("should not return cached object after reset cache", () => {
            const cache: DatasetCache = new DatasetCache();
            cache.cache(path + PATH_SEPARATOR, node);
            cache.reset();
            expect(cache.loadFromCache(path)).toBeUndefined();
        });
        it("should not return cached object after reset path", () => {
            const cache: DatasetCache = new DatasetCache();
            cache.cache(path + PATH_SEPARATOR, node);
            cache.reset(path);
            expect(cache.loadFromCache(path)).toBeUndefined();
        });
    });
    describe("Type specific logic", () => {
        const connection: Connection = {name :"connection", url: "http://localhost:123123/", username: "userName"};
        const filter: Filter = {name: "filter", value: "value"};
        const prefix: string = createFilterPath(connection, filter);
        const dataset: Dataset = generateDataset("TEST.DS");
        const datasetNode: ZDatasetNode = new ZDatasetNode(dataset, connection, prefix);

        it("should not return cached dataset after host reset", () => {
            const cache: DatasetCache = new DatasetCache();
            cache.cache(datasetNode.path + PATH_SEPARATOR, datasetNode);
            cache.resetHost(connection);
            expect(cache.loadFromCache(prefix)).toBeUndefined();
        });
        it("should not return cached dataset after host reset filter", () => {
            const cache: DatasetCache = new DatasetCache();
            cache.cache(datasetNode.path + PATH_SEPARATOR, datasetNode);
            cache.resetFilter(connection, filter);
            expect(cache.loadFromCache(prefix)).toBeUndefined();
        });
    });
});

function generateDataset(name: string): Dataset {
    return {
        allocatedSize: 0,
        allocationUnit: "",
        averageBlock: 0,
        blockSize: 0,
        catalogName: "",
        creationDate: "",
        dataSetOrganization: "",
        deviceType: "",
        directoryBlocks: 0,
        expirationDate: "",
        migrated: false,
        name,
        primary: 0,
        recordFormat: "",
        recordLength: 0,
        secondary: 0,
        used: 0,
        volumeSerial: "",
    }
}
    // public getItemCollapsState(path: string) {
    //     return this._treeState[path] ? this._treeState[path] : vscode.TreeItemCollapsibleState.Collapsed;
    // }
    // public setCollapsState(path: string, state: vscode.TreeItemCollapsibleState): void {
    //     this._treeState[path] = state;
    // }