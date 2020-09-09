const { protocol, hostname, port } = window.location;
const apiBaseUrl = `${protocol}//${hostname}${port ? `:${port}` : ''}`;

export default {
  // ======================================================
  // Overrides when NODE_ENV === 'test'
  // ======================================================
  test: () => ({
    apiBaseUrl: 'http://localhost',
  }),

  // ======================================================
  // Overrides when NODE_ENV === 'development'
  // ======================================================
  development: () => ({
    apiBaseUrl: `${protocol}//${hostname}:3000`,
  }),

  // ======================================================
  // Overrides when NODE_ENV === 'production'
  // ======================================================
  production: () => ({
    apiBaseUrl,
  }),
};
