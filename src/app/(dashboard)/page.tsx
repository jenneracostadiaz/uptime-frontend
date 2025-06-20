import { auth } from '@/app/api/auth/[...nextauth]/route';
import { Header } from '@/components/Header';
import { redirect } from 'next/navigation';

export default async function Home() {
    const session = await auth();

    if (!session) {
        redirect('/login');
    }

    return (
        <>
            <Header />
            <h1>Dashboard</h1>
            <p>Bienvenido, {session.user?.name}!</p>
            <p>Tu email es: {session.user?.email}</p>
        </>
    );
}
