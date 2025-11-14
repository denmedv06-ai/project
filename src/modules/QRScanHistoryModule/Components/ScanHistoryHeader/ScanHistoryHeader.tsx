import React from 'react'
import styles from './ScanHistoryHeader.module.scss'
import { useScanStore } from '../../../../ViewModels/ScanHistoryViewModel'

export const ScanHistoryHeader: React.FC = () => {
    const history = useScanStore(state => state.history);
    const sortOrder = useScanStore(state => state.sortOrder);
    const setSortOrder = useScanStore(state => state.setSortOrder);
    const sortHistory = useScanStore(state => state.sortHistory);

    const handleSortClick = () => {
        const newOrder = sortOrder === 'desc' ? 'asc' : 'desc';
        setSortOrder(newOrder);
        sortHistory();
    };
    return (
        <div className={styles.mainContainer}>
            <div className={styles.headerContainer}>
                <h2>Scan History</h2>
                <button onClick={handleSortClick}>
                    {sortOrder === 'desc' ? 'Newest first' : 'Older first'}
                </button>
            </div>
            {history.length > 0 ? (
                <div className={styles.countContainer}>
                    <p>{history.length} items</p>
                </div>
            ) : (
                <div className={styles.countContainer}>
                    <p>No results yet</p>
                </div>
            )}
        </div>
    )
}
