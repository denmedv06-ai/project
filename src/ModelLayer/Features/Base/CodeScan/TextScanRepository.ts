import { Table } from 'dexie';
import { AbstractScanResultRepository } from '../Abstractions/AScanRepository';
import { TextScanEntity } from '../CodeScan/TextScanEntity';
import { db } from '../LocalDB'; // Импорт твоей Dexie DB (см. пример ниже)

export class TextScanRepository extends AbstractScanResultRepository<TextScanEntity> {
    protected table: Table<TextScanEntity, number> = db.textScans;

    // Свой метод: Подсчёт записей по минимальной длине контента
    async countByContentLength(minLength: number): Promise<number> {
        return await this.table
            .filter(item => item.content.length >= minLength)
            .count();
    }
}