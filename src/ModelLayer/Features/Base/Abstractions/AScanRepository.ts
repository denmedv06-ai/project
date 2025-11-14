import { Table, UpdateSpec } from 'dexie';
import { ScanResultEntity } from './AScanEntity';

export abstract class AbstractScanResultRepository<T extends ScanResultEntity> {
    protected abstract table: Table<T, number>;

    // Создание записи
    async create(entity: Omit<T, 'id' | 'createdAt'>): Promise<number> {
        const newEntity = {
            ...entity,
            createdAt: Date.now(),
        } as T;

        return await this.table.add(newEntity);
    }

    // Получение всех записей
    async findAll(): Promise<T[]> {
        return await this.table.toArray();
    }

    // Получение по ID
    async findById(id: number): Promise<T | undefined> {
        return await this.table.get(id);
    }

    // Обновление записи
    async update(id: number, updates: UpdateSpec<T>): Promise<number> {
        return await this.table.update(id, updates);
    }

    // Удаление записи
    async delete(id: number): Promise<void> {
        await this.table.delete(id);
    }

    // Удаление всех записей
    async clear(): Promise<void> {
        await this.table.clear();
    }

    // Поиск по содержимому (частичное совпадение)
    async searchByContent(query: string): Promise<T[]> {
        const lowerQuery = query.toLowerCase();
        return await this.table
            .filter(item => item.content.toLowerCase().includes(lowerQuery))
            .toArray();
    }

    async bulkCreate(entities: Omit<T, 'id' | 'createdAt'>[]): Promise<number[]> {
        const withDate = entities.map(e => ({ ...e, createdAt: Date.now() } as T));
        return (await this.table.bulkAdd(withDate, { allKeys: true })) as number[];
    }

    /** Обновить множество записей по ID */
    async bulkUpdate(updates: { id: number; changes: UpdateSpec<T> }[]): Promise<number> {
        const specs = updates.reduce((acc, { id, changes }) => {
            acc[id] = changes;
            return acc;
        }, {} as Record<number, UpdateSpec<T>>);

        return await this.table.bulkUpdate(Object.entries(specs).map(([id, changes]) => ({
            key: Number(id),
            changes,
        })));
    }

    /** Удалить по списку ID */
    async bulkDelete(ids: number[]): Promise<void> {
        await this.table.bulkDelete(ids);
    }

    /** Вставить или обновить (по id) */
    async bulkPut(entities: T[]): Promise<number[]> {
        return (await this.table.bulkPut(entities, { allKeys: true })) as number[];
    }

    async getByIds(ids: number[]): Promise<T[]> {
        return await this.table.where('id').anyOf(ids).toArray();
    }

    async getAllEntities(): Promise<T[]> {
        return await this.table.toArray();
    }
}