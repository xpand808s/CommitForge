export function hasDatabaseUrl() {
  return Boolean(process.env.DATABASE_URL);
}

export function getAuthSecret() {
  if (process.env.AUTH_SECRET) {
    return process.env.AUTH_SECRET;
  }

  if (process.env.NODE_ENV !== "production") {
    return "commitforge-dev-secret";
  }

  return undefined;
}
