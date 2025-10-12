import { getAuth } from "@/lib/better-auth/auth";
import { toNextJsHandler } from "better-auth/next-js";

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export const GET = async (req: Request) => {
    const auth = await getAuth();
    return toNextJsHandler(auth)(req);
};

export const POST = async (req: Request) => {
    const auth = await getAuth();
    return toNextJsHandler(auth)(req);
};
