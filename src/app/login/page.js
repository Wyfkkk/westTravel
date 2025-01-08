'use client';

import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = () => {
    // 登录逻辑
    router.push('/dashboard');
  };

  return (
    <div>
      {/* 登录表单 */}
    </div>
  );
} 