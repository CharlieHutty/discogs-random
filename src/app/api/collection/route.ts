import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import OAuth from 'oauth-1.0a';
import crypto from 'crypto';

declare module 'next-auth' {
  interface Session {
    oauth_token?: string;
    oauth_token_secret?: string;
  }
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.oauth_token || !session?.oauth_token_secret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const username = session.user?.name;
  if (!username) {
    return NextResponse.json({ error: 'Username missing' }, { status: 400 });
  }

  const url = `https://api.discogs.com/users/${username}/collection/folders/0/releases`;

  const oauth = new OAuth({
    consumer: {
      key: process.env.DISCOGS_ID!,
      secret: process.env.DISCOGS_SECRET!,
    },
    signature_method: 'HMAC-SHA1',
    hash_function(base_string, key) {
      return crypto.createHmac('sha1', key).update(base_string).digest('base64');
    },
  });

  const authHeader = oauth.toHeader(
    oauth.authorize(
      { url, method: 'GET' },
      { key: session.oauth_token, secret: session.oauth_token_secret },
    ),
  );

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: authHeader.Authorization,
        'User-Agent': 'randomiser/1.0',
      },
    });

    if (!response.ok) {
      throw new Error(`Discogs API error: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}
