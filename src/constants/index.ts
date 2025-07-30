export const SUPPORTED_FILE_TYPES = ['.pdf', '.txt', '.docx', '.doc'];

export const AUDIO_DURATIONS = {
  short: { label: 'Short (2-3 minutes)', value: 'short' },
  medium: { label: 'Medium (5-7 minutes)', value: 'medium' },
  long: { label: 'Long (10-15 minutes)', value: 'long' }
} as const;

export const FILE_UPLOAD_CONFIG = {
  maxFileSize: 10 * 1024 * 1024, // 10MB
  maxFiles: 10,
  acceptedTypes: SUPPORTED_FILE_TYPES
};