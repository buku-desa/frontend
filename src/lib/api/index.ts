// Re-export everything from the new organized structure
// This file maintains backward compatibility

// Auth
export * from './shared/auth';

// Documents (shared)
export * from './shared/documents';

// Documents (sekdes)
export {
  createDocument as createSekdesDocument,
  updateDocument as updateSekdesDocument,
  deleteDocument as deleteSekdesDocument,
  downloadDocument as downloadSekdesDocument,
  // ...export other sekdes functions explicitly as needed
} from './sekdes/documents';

export type {
  CreateDocumentData,
  UpdateDocumentData,
} from "./sekdes/documents";

// Archives
export * from './shared/archives';
export * from './sekdes/archives';

// Activity Logs
export * from './shared/activityLogs';

// Laporan/Reports
export * from './shared/laporan';
