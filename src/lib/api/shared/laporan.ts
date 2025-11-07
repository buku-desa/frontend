import apiClient from '@/lib/utils/fetcher';

export interface LaporanParams {
  by?: 'week' | 'month' | 'year';
  tahun?: number;
  start?: string;
  end?: string;
  status?: string[];
  format?: 'json' | 'pdf';
}

// Get laporan/report (untuk download PDF atau JSON)
export const getLaporan = async (params: LaporanParams): Promise<Blob | any> => {
  const response = await apiClient.get('/laporan', {
    params,
    responseType: params.format === 'pdf' ? 'blob' : 'json',
  });
  return response.data;
};

// Download laporan as PDF
export const downloadLaporanPDF = async (params: Omit<LaporanParams, 'format'>): Promise<Blob> => {
  const response = await apiClient.get('/laporan', {
    params: { ...params, format: 'pdf' },
    responseType: 'blob',
  });
  return response.data;
};
