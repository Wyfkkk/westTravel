import { redirect } from 'next/navigation';

export default function Page() {
  if (someCondition) {
    redirect('/login');
  }

  return <div>页面内容</div>;
} 