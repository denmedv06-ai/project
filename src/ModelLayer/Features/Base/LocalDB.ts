
import Dexie, { Table } from 'dexie';
import { TextScanEntity } from './CodeScan/TextScanEntity';

export interface ILocalDB {
    textScans: Table<TextScanEntity, number>;
}


export class LocalDB extends Dexie {
    textScans!: Table<TextScanEntity, number>;

    constructor() {
        super('LocalDB');

        this.version(1).stores({
            textScans: '++id, content, createdAt',
        });

        this.textScans = this.table('textScans');
    }
}

export const db = new LocalDB();