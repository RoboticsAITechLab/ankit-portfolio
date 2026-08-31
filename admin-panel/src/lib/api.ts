const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://ankit-portfolio-t68o.onrender.com/api/v1";

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  count?: number;
}

export function getAuthToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("admin_token");
}

export function setAuthToken(token: string): void {
  if (typeof window !== "undefined") {
    localStorage.setItem("admin_token", token);
  }
}

export function removeAuthToken(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem("admin_token");
  }
}

export async function adminFetch<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;
  const token = getAuthToken();

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    const res = await fetch(url, {
      ...options,
      headers,
      cache: "no-store",
    });

    if (res.status === 401 && typeof window !== "undefined" && !endpoint.includes("/auth/login")) {
      removeAuthToken();
      window.location.href = "/login";
    }

    const data = await res.json();
    return data;
  } catch (error: any) {
    console.error(`[ADMIN API ERROR] ${url}:`, error.message);
    return {
      success: false,
      message: error.message || "Failed to communicate with API server.",
    };
  }
}

// 1. Auth APIs
export async function adminLogin(email: string, password: string) {
  return adminFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export async function getAdminProfile() {
  return adminFetch("/auth/me");
}

// 2. Projects APIs
export async function getAdminProjects() {
  return adminFetch("/projects");
}

export async function createAdminProject(project: any) {
  return adminFetch("/projects", {
    method: "POST",
    body: JSON.stringify(project),
  });
}

export async function deleteAdminProject(id: string) {
  return adminFetch(`/projects/${id}`, {
    method: "DELETE",
  });
}

// 3. Certifications APIs
export async function getAdminCertifications() {
  return adminFetch("/certifications");
}

export async function createAdminCertification(cert: any) {
  return adminFetch("/certifications", {
    method: "POST",
    body: JSON.stringify(cert),
  });
}

export async function deleteAdminCertification(id: string) {
  return adminFetch(`/certifications/${id}`, {
    method: "DELETE",
  });
}

// 4. AI Lab APIs
export async function getAdminAiExperiments() {
  return adminFetch("/ai-lab");
}

export async function createAdminAiExperiment(exp: any) {
  return adminFetch("/ai-lab", {
    method: "POST",
    body: JSON.stringify(exp),
  });
}

export async function deleteAdminAiExperiment(id: string) {
  return adminFetch(`/ai-lab/${id}`, {
    method: "DELETE",
  });
}

// 5. Messages APIs
export async function getAdminMessages() {
  return adminFetch("/messages");
}

export async function markMessageAsRead(id: string) {
  return adminFetch(`/messages/${id}/read`, {
    method: "PATCH",
  });
}

export async function deleteAdminMessage(id: string) {
  return adminFetch(`/messages/${id}`, {
    method: "DELETE",
  });
}

// 6. Analytics APIs
export async function getAdminAnalytics() {
  return adminFetch("/analytics");
}

// 7. Settings APIs
export async function getAdminSettings() {
  return adminFetch("/settings");
}

export async function updateAdminSettings(key: string, value: any) {
  return adminFetch(`/settings/${key}`, {
    method: "PUT",
    body: JSON.stringify({ value }),
  });
}
