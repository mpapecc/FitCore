// Access token lives only in memory — never written to disk
let _accessToken: string | null = null;

export const tokenStorage = {
  get: () => _accessToken,
  set: (token: string) => { _accessToken = token; },
  remove: () => { _accessToken = null; },
};

interface AccessTokenPayload {
  sub: string;
  tenantId: string;
  role: string;
  type: string;
  exp: number;
}

export function decodeAccessToken(token: string): AccessTokenPayload | null {
  try {
    const part = token.split(".")[1];
    const json = atob(part.replace(/-/g, "+").replace(/_/g, "/"));
    const payload = JSON.parse(json) as AccessTokenPayload;
    if (payload.type !== "access") return null;
    if (payload.exp * 1000 < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}
