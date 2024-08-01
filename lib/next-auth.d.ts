export declare module "next-auth" {
  interface Session {
    user: {
      _id: string;
      email: string;
      name: string;
      is_verified: boolean;
    };
    backendTokens: {
      accessToken: string;
      refreshToken: string;
      expiresIn: number;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: {
      _id: string;
      email: string;
      name: string;
      is_verified: boolean;
    };
    backendTokens: {
      accessToken: string;
      refreshToken: string;
      expiresIn: number;
    };
  }
}

export declare module "next-auth" {
  interface User {
    user: {
      _id: string;
      email: string;
      name: string;
      is_verified: boolean;
    };
    backendTokens: {
      accessToken: string;
      refreshToken: string;
      expiresIn: number;
    };
  }
}
