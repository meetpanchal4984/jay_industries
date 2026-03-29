/**
 * Resolves the backend API URL dynamically based on the current environment.
 * If running on localhost and accessing via an IP address (mobile testing), 
 * it automatically switches the backend host to match the frontend host.
 */
export const resolveBackendUrl = (path) => {
  if (!path) return '';
  
  // If the path is already a full URL, return it
  if (path.startsWith('http')) return path;
  
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
  
  // Handle relative paths from the backend (ensure they start with /)
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  
  // Dynamic host detection for local network testing (mobile devices)
  if (typeof window !== 'undefined' && apiUrl.includes('localhost')) {
    const currentHost = window.location.hostname;
    if (currentHost !== 'localhost' && currentHost !== '127.0.0.1') {
      // Replace localhost with the current IP/hostname but keep the port (8000)
      const dynamicApiUrl = apiUrl.replace('localhost', currentHost);
      return `${dynamicApiUrl}${normalizedPath}`;
    }
  }
  
  // Standard case (production or simple local dev)
  // Ensure no double slashes if apiUrl ends with / and normalizedPath starts with /
  const base = apiUrl.endsWith('/') ? apiUrl.slice(0, -1) : apiUrl;
  return `${base}${normalizedPath}`;
};
