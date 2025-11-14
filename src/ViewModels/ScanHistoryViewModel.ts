// store/scanStore.ts
import { create } from 'zustand';
import { TextScanFacade } from '../ModelLayer/Features/Base/CodeScan/TextScanFacade';

const scanFacade = new TextScanFacade();

interface ScanState {
    history: {
        id: number;
        content: string;
        qrcodeImg?: string;
        createdAt: string;
        type: 'text';
    }[];
    loading: boolean;
    error: string | null;
    sortOrder: 'asc' | 'desc';

    setSortOrder: (order: 'asc' | 'desc') => void;
    addScan: (content: string) => Promise<void>;
    loadHistory: () => Promise<void>;
    clearHistory: () => Promise<void>;
    addScanImage: (content: string, qrcodeImg: string) => Promise<void>;
    sortHistory: () => void;
}

export const useScanStore = create<ScanState>((set) => ({
    history: [],
    loading: false,
    error: null,
    sortOrder: 'desc',

    setSortOrder: (order: 'asc' | 'desc') => set({ sortOrder: order }),

    addScan: async (content: string) => {
        set({ loading: true, error: null });
        try {
            await scanFacade.createAndGet(content);
            await useScanStore.getState().loadHistory();
        } catch (err) {
            set({ error: 'Ошибка при сохранении сканирования', loading: false });
            throw err;
        } finally {
            set({ loading: false });
        }
    },

    loadHistory: async () => {
        set({ loading: true, error: null });
        try {
            const history = await scanFacade.getAllPlain();
            set({ history, loading: false });
        } catch (err) {
            set({ error: 'Ошибка загрузки истории', loading: false });
            throw err;
        }
    },

    clearHistory: async () => {
        set({ loading: true, error: null });
        try {
            await scanFacade.clearAll();
            set({ history: [], loading: false });
        } catch (err) {
            set({ error: 'Ошибка при очистке истории', loading: false });
            throw err;
        }
    },

    addScanImage: async (content: string, qrcodeImg: string) => {
        set({ loading: true, error: null });
        try {
            await scanFacade.createAndGet(content, qrcodeImg);
            await useScanStore.getState().loadHistory();
        } catch (err) {
            set({ error: 'Ошибка при сохранении сканирования', loading: false });
            throw err;
        } finally {
            set({ loading: false });
        }
    },
    sortHistory: (order?: 'asc' | 'desc') => {
        set((state) => {
            const sortOrder = order ?? state.sortOrder; // если передан order — используем его
            const sorted = [...state.history].sort((a, b) =>
                sortOrder === 'asc'
                    ? a.createdAt.localeCompare(b.createdAt)
                    : b.createdAt.localeCompare(a.createdAt)
            );
            return { history: sorted, sortOrder };
        });
    },


}));