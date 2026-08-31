const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://ankit-portfolio-t68o.onrender.com/api/v1";

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  count?: number;
  services?: any;
}

export async function fetchApi<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;

  const defaultHeaders: HeadersInit = {
    "Content-Type": "application/json",
  };

  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
      next: { revalidate: 60 }, // ISR cache for fast public loading
    });

    const data = await res.json();
    return data;
  } catch (error: any) {
    console.error(`[API FETCH ERROR] ${url}:`, error.message);
    return {
      success: false,
      message: error.message || "Network error. Failed to reach API server.",
    };
  }
}

// 1. Projects API
export async function getProjects(params?: { category?: string; featured?: boolean }) {
  let query = "";
  if (params) {
    const searchParams = new URLSearchParams();
    if (params.category) searchParams.append("category", params.category);
    if (params.featured !== undefined) searchParams.append("featured", String(params.featured));
    const qs = searchParams.toString();
    if (qs) query = `?${qs}`;
  }
  return fetchApi(`/projects${query}`);
}

export async function getProjectBySlug(slug: string) {
  return fetchApi(`/projects/${slug}`);
}

// 2. Certifications API
export async function getCertifications() {
  return fetchApi("/certifications");
}

// 3. AI Lab API
export async function getAiExperiments() {
  return fetchApi("/ai-lab");
}

// 4. Contact Message Submission
export async function sendContactMessage(payload: {
  name: string;
  email: string;
  subject?: string;
  message: string;
}) {
  return fetchApi("/contact", {
    method: "POST",
    body: JSON.stringify(payload),
    cache: "no-store",
  });
}

// 5. Analytics Tracking
export async function trackAnalyticsEvent(payload: {
  event_type: string;
  path: string;
  referrer?: string;
  metadata?: Record<string, any>;
}) {
  return fetchApi("/analytics/track", {
    method: "POST",
    body: JSON.stringify(payload),
    cache: "no-store",
  });
}
