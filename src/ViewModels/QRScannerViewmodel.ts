import { create } from 'zustand'
import { Html5Qrcode } from 'html5-qrcode'
import { useScanStore } from './ScanHistoryViewModel'
import { compressImage } from '../ModelLayer/Features/Base/Utils/imageCompression'

interface IQRScannerState {
    lastScan: string | null;
    scanning: boolean;
    error: string | null;
    setLastScan: (lastScan: string) => void;
    setScanning: (scanning: boolean) => void;
    setError: (error: string | null) => void;
    reset: () => void;
    startScan: () => Promise<void>;
    stopScan: () => Promise<void>;
}

export const useQRScannerViewmodel = create<IQRScannerState>((set, get) => {
    let html5QrCode: Html5Qrcode | null = null;
    let lastScanRef: string | null = null;

    const qrboxFunction = function (viewfinderWidth: number, viewfinderHeight: number) {
        let minEdgePercentage = 0.8870292;
        let minEdgeSize = Math.min(viewfinderWidth, viewfinderHeight);
        let qrboxSize = Math.floor(minEdgeSize * minEdgePercentage);
        return {
            width: qrboxSize,
            height: qrboxSize
        };
    }

    return {
        lastScan: null,
        scanning: false,
        error: null,
        setLastScan: (scan) => set({ lastScan: scan }),
        setScanning: (value) => set({ scanning: value }),
        setError: (err) => set({ error: err }),
        reset: () => {
            lastScanRef = null;
            if (html5QrCode) {
                // best-effort stop/clear on reset
                html5QrCode.stop().catch(() => { });
                html5QrCode.clear();
                html5QrCode = null;
            }
            set({ lastScan: null, scanning: false, error: null });
        },

        startScan: async () => {
            if (get().scanning) return;
            set({ error: null });

            try {
                const scanner = new Html5Qrcode("qr-reader");
                html5QrCode = scanner;

                set({ scanning: true });

                await scanner.start(
                    { facingMode: "environment" },
                    { fps: 10, qrbox: qrboxFunction },
                    async (decodedText: string) => {
                        if (decodedText !== lastScanRef) {
                            lastScanRef = decodedText;
                            set({ lastScan: decodedText });




                            try {
                                const videoElem = document.querySelector<HTMLVideoElement>('#qr-reader video');
                                if (videoElem) {
                                    const canvas = document.createElement('canvas');
                                    canvas.width = videoElem.videoWidth;
                                    canvas.height = videoElem.videoHeight;
                                    const ctx = canvas.getContext('2d');
                                    if (ctx) {
                                        ctx.drawImage(videoElem, 0, 0, canvas.width, canvas.height);
                                        const dataUrl = canvas.toDataURL('image/png');

                                        const compressedImage = await compressImage(dataUrl, 300, 0.7);
                                        
                                        console.log('QR image saved:', compressedImage);
                                        await useScanStore.getState().addScanImage(decodedText, compressedImage);
                                    }
                                }
                            } catch (imgErr) {
                                console.error('Ошибка при сохранении картинки QR:', imgErr);
                            }
                        }
                    },
                    (err) => {
                        console.warn('QR scan error:', err);
                    }
                );
            } catch (err) {
                console.error('Failed to start scanner:', err);
                set({ error: 'Выдайте разрешение на использование камеры', scanning: false });
            }
        },


        stopScan: async () => {
            if (!html5QrCode || !get().scanning) {
                set({ scanning: false });
                return;
            }

            try {
                await html5QrCode.stop();
                await html5QrCode.clear();
                console.log('Сканер остановлен');
            } catch (err) {
                console.error('Ошибка при остановке сканера:', err);
                set({ error: 'Не удалось остановить сканер' });
            } finally {
                set({ scanning: false });
                html5QrCode = null;
            }
        }
    };
});