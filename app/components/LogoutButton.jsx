'use client';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Logout error:', error.message);
    } else {
      router.push('/login?message=logged-out');
    }
  };

  return (
    <button onClick={handleLogout} className="text-red-500 hover:underline">
      Log Out
    </button>
  );
}
