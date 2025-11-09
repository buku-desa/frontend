import api from './config';

export interface Dokumen {
  id: number;
  nomor: string;
  judul: string;
  tanggal: string;
  url: string;
  status?: string;
  jenis?: string;
  created_at?: string;
  updated_at?: string;
}

export interface DokumenResponse {
  data: Dokumen[];
  message?: string;
  meta?: {
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
  };
}

/**
 * Get all dokumen/documents
 */
export const getAllDokumen = async (): Promise<Dokumen[]> => {
  try {
    const response = await api.get<DokumenResponse>('/documents');
    return response.data.data || [];
  } catch (error) {
    console.error('Error fetching dokumen:', error);
    throw error;
  }
};

/**
 * Get single dokumen by ID
 */
export const getDokumenById = async (id: number): Promise<Dokumen> => {
  try {
    const response = await api.get<{ data: Dokumen }>(`/documents/${id}`);
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching dokumen ${id}:`, error);
    throw error;
  }
};

/**
 * Create new dokumen (admin only)
 */
export const createDokumen = async (formData: FormData): Promise<Dokumen> => {
  try {
    const response = await api.post<{ data: Dokumen }>('/documents', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.data;
  } catch (error) {
    console.error('Error creating dokumen:', error);
    throw error;
  }
};

/**
 * Update dokumen (admin only)
 */
export const updateDokumen = async (id: number, formData: FormData): Promise<Dokumen> => {
  try {
    const response = await api.post<{ data: Dokumen }>(`/documents/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.data;
  } catch (error) {
    console.error(`Error updating dokumen ${id}:`, error);
    throw error;
  }
};

/**
 * Delete dokumen (admin only)
 */
export const deleteDokumen = async (id: number): Promise<void> => {
  try {
    await api.delete(`/documents/${id}`);
  } catch (error) {
    console.error(`Error deleting dokumen ${id}:`, error);
    throw error;
  }
};

/**
 * Download dokumen PDF
 */
export const downloadDokumen = async (id: number): Promise<Blob> => {
  try {
    const response = await api.get(`/documents/${id}/download`, {
      responseType: 'blob',
    });
    return response.data;
  } catch (error) {
    console.error(`Error downloading dokumen ${id}:`, error);
    throw error;
  }
};
