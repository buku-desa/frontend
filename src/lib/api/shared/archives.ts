import apiClient from '@/lib/utils/fetcher';
import { Document } from './documents';

export interface Archive {
  id: string;
  id_dokumen: string;
  id_user: string;
  nomor_arsip?: string;
  tanggal_arsip: string;
  keterangan?: string;
  document?: Document;
  created_at: string;
  updated_at: string;
}

export interface ArchivesResponse {
  data: Archive[];
  meta: {
    page: number;
    total: number;
  };
}

export interface CreateArchiveData {
  id_dokumen: string;
  keterangan?: string;
}

// Get all archives
export const getArchives = async (params?: {
  search?: string;
  per_page?: number;
  page?: number;
}): Promise<ArchivesResponse> => {
  const response = await apiClient.get('/archives', { params });
  return response.data;
};

// Get single archive
export const getArchive = async (id: string): Promise<{ data: Archive }> => {
  const response = await apiClient.get(`/archives/${id}`);
  return response.data;
};

// Create archive (archive a document)
export const createArchive = async (data: CreateArchiveData): Promise<{ data: Archive }> => {
  const response = await apiClient.post('/archives', data);
  return response.data;
};


