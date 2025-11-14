export async function compressImage(
    base64: string,
    maxWidth = 300,
    quality = 0.8
): Promise<string> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d')!;

            // Масштабируем
            const scale = Math.min(1, maxWidth / img.width);
            canvas.width = img.width * scale;
            canvas.height = img.height * scale;

            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            // Сжимаем
            const compressed = canvas.toDataURL('image/jpeg', quality);
            resolve(compressed);
        };
        img.onerror = reject;
        img.src = base64;
    });
}