import apiClient from '@/lib/utils/fetcher';
import { Document } from '../shared/documents';

export interface CreateDocumentData {
  jenis_dokumen: 'peraturan_desa' | 'peraturan_kepala_desa' | 'peraturan_bersama_kepala_desa';
  nomor_ditetapkan?: string;
  tanggal_ditetapkan: string;
  tentang: string;
  keterangan?: string;
  file_upload: File;
}

export interface UpdateDocumentData {
  jenis_dokumen?: 'peraturan_desa' | 'peraturan_kepala_desa' | 'peraturan_bersama_kepala_desa';
  nomor_ditetapkan?: string;
  tanggal_ditetapkan?: string;
  tentang?: string;
  keterangan?: string;
  file_upload?: File;
}

// Create new document (Sekdes only)
export const createDocument = async (data: CreateDocumentData): Promise<{ data: Document }> => {
  const formData = new FormData();
  formData.append('jenis_dokumen', data.jenis_dokumen);
  formData.append('tanggal_ditetapkan', data.tanggal_ditetapkan);
  formData.append('tentang', data.tentang);
  if (data.nomor_ditetapkan) formData.append('nomor_ditetapkan', data.nomor_ditetapkan);
  if (data.keterangan) formData.append('keterangan', data.keterangan);
  formData.append('file_upload', data.file_upload);

  const response = await apiClient.post('/documents', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// Update document (Sekdes only - Draft/Ditolak)
export const updateDocument = async (
  id: string,
  data: UpdateDocumentData
): Promise<{ data: Document }> => {
  const formData = new FormData();
  if (data.jenis_dokumen) formData.append('jenis_dokumen', data.jenis_dokumen);
  if (data.nomor_ditetapkan) formData.append('nomor_ditetapkan', data.nomor_ditetapkan);
  if (data.tanggal_ditetapkan) formData.append('tanggal_ditetapkan', data.tanggal_ditetapkan);
  if (data.tentang) formData.append('tentang', data.tentang);
  if (data.keterangan) formData.append('keterangan', data.keterangan);
  if (data.file_upload) formData.append('file_upload', data.file_upload);

  // Laravel doesn't support PUT with FormData, so we use POST with _method override
  formData.append('_method', 'PUT');

  const response = await apiClient.post(`/documents/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// Delete document (Sekdes only - Draft/Ditolak)
export const deleteDocument = async (id: string): Promise<{ message: string }> => {
  const response = await apiClient.delete(`/documents/${id}`);
  return response.data;
};

export const downloadDocument = async (id: string): Promise<Blob> => {
  const response = await apiClient.get(`/documents/${id}/download`, {
    // Penting: beri tahu axios untuk mengharapkan file (blob), bukan JSON
    responseType: 'blob',
  });
  // response.data akan berisi file blob itu sendiri
  return response.data;
};
