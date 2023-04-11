import Head from "next/head";
import Header from "./common/header";
import Footer from "./common/footer";
import { GlobalConfig } from "@/constants/config";
import { AppShell } from "@mantine/core";

export default function Layout({ children, pageKey, title, description, head }: { children: React.ReactNode, pageKey: string, title: string, description?: string, head?: React.ReactNode }) {
    return (
        <>
            <Head>
                <title>{`${GlobalConfig.title} - ${title}`}</title>
                {description ? <meta name="description" content={description} /> : null}
                {head}
            </Head>
            <AppShell header={<Header pageKey={pageKey} />} footer={<Footer />} >
                {children}
            </AppShell>
        </>
    );
}