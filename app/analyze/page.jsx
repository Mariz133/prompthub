import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import AnalyzePageClient from './AnalyzePageClient';

export default async function AnalyzePage() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    // Add a slight delay before redirecting
    await new Promise((resolve) => setTimeout(resolve, 500)); // 500ms delay
    redirect('/login?message=login-required');
  }

  return <AnalyzePageClient />;
}