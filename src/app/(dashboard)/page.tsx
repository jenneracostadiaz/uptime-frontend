import { Header } from '@/components/Header';

export default async function Home() {
    return (
        <>
            <Header />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6">
                <a
                    href="/systems"
                    className="block p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                >
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Systems</h5>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                        Systems are collections of components that work together to achieve a specific goal or function
                        within an organization.
                    </p>
                </a>

                <a
                    href="/components"
                    className="block p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                >
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Components</h5>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                        Components are individual parts that can be combined to build systems or applications.
                    </p>
                </a>

                <a
                    href="/check-monitor"
                    className="block p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                >
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Check Monitor
                    </h5>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                        Check Monitor allows you to track and review the status of various system checks and components.
                    </p>
                </a>
                <a
                    href="/uptime-event"
                    className="block p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                >
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Uptime Event
                    </h5>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                        Uptime Event provides insights into the uptime and performance of your systems and components.
                    </p>
                </a>
            </div>
        </>
    );
}
