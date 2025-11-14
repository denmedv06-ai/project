export abstract class ScanResultEntity {
    id!: number;               
    content!: string;          
    qrcodeImg?: string;        
    createdAt!: number;          

    constructor(content: string, qrcodeImg?: string) {
        this.content = content;
        this.qrcodeImg = qrcodeImg;
        this.createdAt = Date.now();
    }
}
