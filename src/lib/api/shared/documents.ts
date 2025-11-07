import apiClient from '@/lib/utils/fetcher';

export interface Document {
  id: string;
  jenis_dokumen: 'peraturan_desa' | 'peraturan_kepala_desa' | 'peraturan_bersama_kepala_desa';
  nomor_ditetapkan?: string;
  tanggal_ditetapkan: string;
  tentang: string;
  keterangan?: string;
  nomor_diundangkan?: number;
  tanggal_diundangkan?: string;
  file_upload?: string;
  status: 'Draft' | 'Disetujui' | 'Ditolak' | 'Arsip';
  created_at: string;
  updated_at: string;
}

export interface DocumentsResponse {
  data: Document[];
  meta: {
    page: number;
    total: number;
  };
}

// Get all documents
export const getDocuments = async (params?: {
  status?: string;
  jenis_dokumen?: string;
  search?: string;
  per_page?: number;
  page?: number;
}): Promise<DocumentsResponse> => {
  const response = await apiClient.get('/documents', { params });
  return response.data;
};

// Get single document
export const getDocument = async (id: string): Promise<{ data: Document }> => {
  const response = await apiClient.get(`/documents/${id}`);
  return response.data;
};

// Download document
export const downloadDocument = async (id: string): Promise<Blob> => {
  const response = await apiClient.get(`/documents/${id}/download`, {
    responseType: 'blob',
  });
  return response.data;
};

// Get download URL for viewing
export const getDocumentDownloadUrl = (id: string): string => {
  const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
  const token = localStorage.getItem('authToken');
  return `${baseURL}/documents/${id}/download?token=${token}`;
};
