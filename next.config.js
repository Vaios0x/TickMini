/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    esmExternals: 'loose',
  },
  // Deshabilitar el prerendering estático para evitar problemas
  output: 'standalone',
  // Configuración para evitar problemas de build
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  webpack: (config, { isServer }) => {
    // Resolver problemas con AppKit y WalletConnect
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
      crypto: false,
      stream: false,
      url: false,
      zlib: false,
      http: false,
      https: false,
      assert: false,
      os: false,
      path: false,
    }

    // Resolver problemas de módulos
    config.module.rules.push({
      test: /\.m?js$/,
      resolve: {
        fullySpecified: false,
      },
    })

    // Agregar externals para evitar problemas
    config.externals = config.externals || []
    config.externals.push('pino-pretty', 'lokijs', 'encoding')

    return config
  },
  // Configuración para AppKit
  transpilePackages: ['@reown/appkit', '@reown/appkit-adapter-wagmi'],
}

module.exports = nextConfig
