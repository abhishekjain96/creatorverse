// File: src/app/api/get-download-url/route.js
import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const { filePath } = await request.json();

  if (!filePath) {
    return NextResponse.json({ error: 'File path is required.' }, { status: 400 });
  }

  // Create a new Supabase client with the service role key for admin privileges
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    { auth: { persistSession: false } }
  );

  // Create a signed URL for the private file
  const { data, error } = await supabaseAdmin.storage
    .from('products')
    .createSignedUrl(filePath, 60); // The URL will be valid for 60 seconds

  if (error) {
    console.error('Error creating signed URL:', error);
    return NextResponse.json({ error: 'Could not create download link.' }, { status: 500 });
  }

  return NextResponse.json({ signedURL: data.signedUrl });
}