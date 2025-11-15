import apiClient from '@/lib/utils/fetcher';

export interface ActivityLog {
  id: string;
  id_user: string;
  id_dokumen?: string;
  aktivitas: string;
  waktu_aktivitas: string;
  keterangan?: string;
  user?: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
  created_at: string;
  updated_at: string;
}

export interface ActivityLogsResponse {
  data: {
    activity_logs: ActivityLog[];
  };
  meta: {
    code: number;
    status: string;
    message: string;
    pagination: {
      total: number;
      count: number;
      per_page: number;
      current_page: number;
      total_pages: number;
    };
  };
}

// Get all activity logs
export const getActivityLogs = async (params?: {
  user_id?: string;
  dokumen_id?: string;
  date_from?: string;
  date_to?: string;
  search?: string;
  page?: number;
}): Promise<ActivityLogsResponse> => {
  const response = await apiClient.get('/activity-logs', { params });
  return response.data;
};

// Get single activity log
export const getActivityLog = async (id: string): Promise<{ data: ActivityLog }> => {
  const response = await apiClient.get(`/activity-logs/${id}`);
  return response.data;
};
