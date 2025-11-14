// AScanFacade.ts
import { AbstractScanResultRepository } from './AScanRepository';
import { ScanResultEntity } from './AScanEntity';
import { UpdateSpec } from 'dexie';

export abstract class AbstractScanResultFacade<T extends ScanResultEntity> {
    constructor(protected repository: AbstractScanResultRepository<T>) { }

    async create(content: string, qrcodeImg?: string): Promise<T> {
        const id = await this.repository.create({ content, qrcodeImg } as Omit<T, 'id' | 'createdAt'>);
        return (await this.repository.findById(id))!;
    }

    async getAll(): Promise<T[]> {
        return await this.repository.getAllEntities();
    }

    async getById(id: number): Promise<T | null> {
        const result = await this.repository.findById(id);
        return result ?? null;
    }

    // Исправлено: UpdateSpec<T>
    async update(id: number, updates: UpdateSpec<T>): Promise<T | null> {
        const count = await this.repository.update(id, updates);
        return count > 0 ? await this.getById(id) : null;
    }

    async delete(id: number): Promise<boolean> {
        try {
            await this.repository.delete(id);
            return true;
        } catch {
            return false;
        }
    }

    async search(query: string): Promise<T[]> {
        return await this.repository.searchByContent(query);
    }

    async clearAll(): Promise<void> {
        await this.repository.clear();
    }

    // === BULK: Используем новые методы репозитория ===
    async bulkCreate(items: { content: string; qrcodeImg?: string }[]): Promise<T[]> {
        const ids = await this.repository.bulkCreate(
            items as Omit<T, 'id' | 'createdAt'>[]
        );
        return await this.repository.getByIds(ids);
    }

    async bulkUpdate(updates: { id: number; changes: UpdateSpec<T> }[]): Promise<T[]> {
        await this.repository.bulkUpdate(
            updates.map(u => ({ id: u.id, changes: u.changes }))
        );
        const updatedIds = updates.map(u => u.id);
        return await this.repository.getByIds(updatedIds);
    }

    async bulkDelete(ids: number[]): Promise<void> {
        await this.repository.bulkDelete(ids);
    }

    async bulkPut(entities: T[]): Promise<T[]> {
        const ids = await this.repository.bulkPut(entities);
        return await this.repository.getByIds(ids);
    }
}