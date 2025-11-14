// TextScanFacade.ts
import { AbstractScanResultFacade } from '../Abstractions/AScanFacade';
import { TextScanRepository } from './TextScanRepository';
import { TextScanEntity } from './TextScanEntity';

export class TextScanFacade extends AbstractScanResultFacade<TextScanEntity> {
    constructor() {
        super(new TextScanRepository());
    }

    private toPlain(entity: TextScanEntity): {
        id: number;
        content: string;
        qrcodeImg?: string;
        createdAt: string;
        type: 'text';
    } {
        return {
            id: entity.id,
            content: entity.content,
            qrcodeImg: entity.qrcodeImg,
            createdAt: new Date(entity.createdAt).toISOString(),
            type: 'text',
        };
    }

    async createAndGet(content: string, qrcodeImg?: string) {
        const result = await super.create(content, qrcodeImg);
        return this.toPlain(result);
    }

    async getAllPlain() {
        const entities = await super.getAll();
        return entities.map(e => this.toPlain(e));
    }


    async getByIdPlain(id: number) {
        const entity = await super.getById(id);
        return entity ? this.toPlain(entity) : null;
    }

    async bulkCreatePlain(items: { content: string; qrcodeImg?: string }[]) {
        const entities = await super.bulkCreate(items);
        return entities.map(e => this.toPlain(e));
    }
}