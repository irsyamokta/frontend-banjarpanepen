import { ReactNode } from "react";
import PageMeta from "./PageMeta";

interface PageShellProps {
    title: string;
    description: string;
    children: ReactNode;
}

export default function PageShell({ title, description, children }: PageShellProps) {
    return (
        <>
            <PageMeta title={title} description={description} />
            <main className="max-w-6xl mx-auto px-4 py-6 space-y-6 mt-24">
                {children}
            </main>
        </>
    );
}
