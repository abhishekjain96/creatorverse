// File: src/app/api/team/invite/route.js (Final Token-based Auth)
import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function POST(request) {
  // 1. Get the secret token from the request header
  const authHeader = request.headers.get('Authorization');
  if (!authHeader) {
    return NextResponse.json({ error: 'Authorization header is missing.' }, { status: 401 });
  }
  const token = authHeader.split(' ')[1]; // Bearer <token>

  // 2. Create a Supabase client and verify the user with the token
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
  const { data: { user: owner }, error: userAuthError } = await supabase.auth.getUser(token);

  if (userAuthError || !owner) {
    return NextResponse.json({ error: 'You must be logged in to invite members.' }, { status: 401 });
  }

  // --- The rest of the logic is the same ---
  const { email: emailToInvite } = await request.json();
  if (!emailToInvite) {
    return NextResponse.json({ error: 'Email is required.' }, { status: 400 });
  }
  if (emailToInvite.toLowerCase() === owner.email.toLowerCase()) {
    return NextResponse.json({ error: "You cannot invite yourself." }, { status: 400 });
  }

  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );

  try {
    const { data: { users }, error: userError } = await supabaseAdmin.auth.admin.listUsers({ email: emailToInvite });
    if (userError || !users || users.length === 0) {
      return NextResponse.json({ error: 'User with this email not found on CreatorVerse.' }, { status: 404 });
    }
    const userToInvite = users[0];

    const { data: team, error: teamError } = await supabase.from('teams').select('id').eq('owner_id', owner.id).single();
    if (teamError || !team) {
      return NextResponse.json({ error: 'Could not find your team.' }, { status: 500 });
    }

    const { error: insertError } = await supabaseAdmin.from('team_members').insert({ team_id: team.id, user_id: userToInvite.id, role: 'editor' });
    if (insertError) {
      if (insertError.code === '23505') {
        return NextResponse.json({ error: 'This user is already on your team.' }, { status: 409 });
      }
      throw insertError;
    }

    return NextResponse.json({ success: true, message: 'User invited successfully.' });
  } catch (error) {
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}