import Head from "next/head";
import Header from "./common/header";
import Footer from "./common/footer";

export default function Layout({ children, title, description, head }: { children: React.ReactNode, title: string, description?: string, head?: React.ReactNode }) {
    return (
        <>
            <Head>
                <title>{title}</title>
                {description ? <meta name="description" content={description} /> : null}
                {head}
            </Head>
            <Header />
            <main>{children}</main>
            <Footer />
        </>
    );
}