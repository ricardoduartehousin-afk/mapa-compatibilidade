const ENV = {
  get mode() {
    return import.meta.env.NEXT_PUBLIC_ENV || import.meta.env.VITE_ENV || 'production';
  },
  get isDevelopment() {
    return this.mode === 'development';
  },
  get isProduction() {
    return this.mode === 'production';
  },
  get paywallEnabled() {
    const val = import.meta.env.NEXT_PUBLIC_PAYWALL ?? import.meta.env.VITE_PAYWALL ?? (this.isDevelopment ? 'false' : 'true');
    return val === 'true';
  },
  get devToolsEnabled() {
    const val = import.meta.env.NEXT_PUBLIC_DEVTOOLS ?? import.meta.env.VITE_DEVTOOLS ?? (this.isDevelopment ? 'true' : 'false');
    return val === 'true';
  },
};

export default ENV;
