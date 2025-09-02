export const config = {
  development: {
    port: 3000,
    baseUrl: 'http://localhost:3000',
    apiUrl: 'http://localhost:3000/api',
  },
  production: {
    port: process.env.PORT || 3000,
    baseUrl: process.env.NEXTAUTH_URL || 'https://tickbase.xyz',
    apiUrl: `${process.env.NEXTAUTH_URL || 'https://tickbase.xyz'}/api`,
  },
}

export const getConfig = () => {
  const env = process.env.NODE_ENV || 'development'
  return config[env as keyof typeof config]
}
