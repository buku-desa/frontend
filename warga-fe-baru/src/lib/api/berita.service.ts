import api from './config';

// Backend document structure
export interface Document {
  id: string;
  nomor_urut: number;
  jenis_dokumen: string;
  nomor_ditetapkan: string;
  tanggal_ditetapkan: string | null;
  tentang: string;
  tanggal_diundangkan: string | null;
  nomor_diundangkan: number | null;
  keterangan: string | null;
  file_upload: string;
  file_url: string;
  status: string;
  created_at: string;
  updated_at: string;
}

// Map to frontend Berita interface for compatibility
export interface Berita {
  id: number;
  title: string;
  date: string;
  description: string;
  url: string;
  image?: string;
  created_at?: string;
  updated_at?: string;
}

export interface BeritaResponse {
  data: Berita[];
  message?: string;
  meta?: {
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
  };
}

// Helper function to map Document to Berita
const mapDocumentToBerita = (doc: Document): Berita => ({
  id: parseInt(doc.id),
  title: doc.tentang,
  date: doc.tanggal_ditetapkan || doc.created_at,
  description: `${doc.jenis_dokumen} - Nomor: ${doc.nomor_ditetapkan}${doc.keterangan ? ' | ' + doc.keterangan : ''}`,
  url: doc.file_url,
  created_at: doc.created_at,
  updated_at: doc.updated_at,
});

/**
 * Get all berita/news articles (mapped from documents)
 */
export const getAllBerita = async (): Promise<Berita[]> => {
  try {
    const response = await api.get<{ data: Document[] }>('/documents');
    const documents = response.data.data || [];
    return documents.map(mapDocumentToBerita);
  } catch (error) {
    console.error('Error fetching berita:', error);
    throw error;
  }
};

/**
 * Get single berita by ID (mapped from document)
 */
export const getBeritaById = async (id: number): Promise<Berita> => {
  try {
    const response = await api.get<{ data: Document }>(`/documents/${id}`);
    return mapDocumentToBerita(response.data.data);
  } catch (error) {
    console.error(`Error fetching berita ${id}:`, error);
    throw error;
  }
};

/**
 * Create new berita (admin only) - Not supported in current backend
 */
export const createBerita = async (data: Omit<Berita, 'id'>): Promise<Berita> => {
  throw new Error('Create berita not supported. Use document creation instead.');
};

/**
 * Update berita (admin only) - Not supported in current backend
 */
export const updateBerita = async (id: number, data: Partial<Berita>): Promise<Berita> => {
  throw new Error('Update berita not supported. Use document update instead.');
};

/**
 * Delete berita (admin only) - Not supported in current backend
 */
export const deleteBerita = async (id: number): Promise<void> => {
  throw new Error('Delete berita not supported. Use document deletion instead.');
};
