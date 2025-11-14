import React, {useEffect} from 'react'
import { useScanStore } from '../../../../ViewModels/ScanHistoryViewModel'
import { ScanHistoryItem } from './ScanHistoryItem/ScanHistoryItem';
import styles from './ScanHistoryList.module.scss'

export const ScanHistoryList: React.FC = () => {
    const history = useScanStore(state => state.history);
    const loading = useScanStore(state => state.loading);
    const error = useScanStore(state => state.error);
    const loadHistory = useScanStore(state => state.loadHistory);

    useEffect(() => {
        loadHistory().catch(err => console.error('Error loading history:', err));
    }, [loadHistory]);

    if (loading && history.length === 0) {
        return (
            <div className="scan-history">
                <p className="text-center text-gray-500">Загрузка истории...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="scan-history">
                <p className="text-red-500 text-center">{error}</p>
            </div>
        );
    }

    if (history.length === 0) {
        return (
            <div className="scan-history">
                <p className="text-center text-gray-500">История пуста. Начните сканирование!</p>
            </div>
        );
    }
    return (
        <div className={styles.scanHistoryList}>
            {history.map(item => (
                <ScanHistoryItem
                    key={item.id}
                    id={item.id}
                    content={item.content}
                    createdAt={item.createdAt}
                    qrcodeImg={item.qrcodeImg}
                    type={item.type}
                />
            ))}
        </div>
    )
}


