import Head from "next/head";
import Header from "./common/header";
import Footer from "./common/footer";
import { GlobalConfig } from "@/constants/config";

export default function Layout({ children, pageKey, title, description, head }: { children: React.ReactNode, pageKey: string, title: string, description?: string, head?: React.ReactNode }) {
    return (
        <>
            <Head>
                <title>{`${GlobalConfig.title} - ${title}`}</title>
                {description ? <meta name="description" content={description} /> : null}
                {head}
            </Head>
            <Header pageKey={pageKey} />
            <main>{children}</main>
            <Footer />
        </>
    );
}