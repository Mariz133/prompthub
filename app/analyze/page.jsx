import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import AnalyzePageClient from './AnalyzePageClient';

export default async function AnalyzePage() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Add a slight delay or check session carefully
  if (!user) {
    // Wait briefly to avoid flicker? Or just redirect immediately but client should handle it
    redirect('/login?message=login-required');
  }

  return <AnalyzePageClient />;
}
