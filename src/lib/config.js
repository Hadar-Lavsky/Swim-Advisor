// src/lib/config.js
// Centralized configuration and environment validation

/**
 * Validates required environment variables and provides typed config
 */
class Config {
  constructor() {
    this.validateEnv();
  }

  validateEnv() {
    const required = {
      REACT_APP_SUPABASE_URL: process.env.REACT_APP_SUPABASE_URL,
      REACT_APP_SUPABASE_ANON_KEY: process.env.REACT_APP_SUPABASE_ANON_KEY,
    };

    const missing = Object.entries(required)
      .filter(([_, value]) => !value)
      .map(([key]) => key);

    if (missing.length > 0) {
      throw new Error(
        `Missing required environment variables:\n${missing.join('\n')}\n\n` +
        'Please copy env.example to .env.local and fill in the values.'
      );
    }
  }

  // Supabase configuration
  get supabase() {
    return {
      url: process.env.REACT_APP_SUPABASE_URL,
      anonKey: process.env.REACT_APP_SUPABASE_ANON_KEY,
    };
  }

  // API configuration
  get api() {
    return {
      url: process.env.REACT_APP_API_URL || 'http://localhost:8000',
      timeout: parseInt(process.env.REACT_APP_API_TIMEOUT || '30000', 10),
      uploadTimeout: parseInt(process.env.REACT_APP_UPLOAD_TIMEOUT || '60000', 10),
    };
  }

  // Feature flags
  get features() {
    return {
      videoAnalysis: process.env.REACT_APP_ENABLE_VIDEO_ANALYSIS === 'true',
      mockData: process.env.REACT_APP_ENABLE_MOCK_DATA === 'true',
    };
  }

  // Upload settings
  get upload() {
    return {
      maxVideoSizeMB: parseInt(process.env.REACT_APP_MAX_VIDEO_SIZE_MB || '100', 10),
      allowedFormats: (process.env.REACT_APP_ALLOWED_VIDEO_FORMATS || 'mp4,mov,avi').split(','),
    };
  }

  // Environment info
  get environment() {
    return process.env.REACT_APP_ENVIRONMENT || 'development';
  }

  get isDevelopment() {
    return this.environment === 'development';
  }

  get isProduction() {
    return this.environment === 'production';
  }
}

// Export singleton instance
export const config = new Config();

