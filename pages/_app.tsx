import Head from "next/head";
import Header from "component/Header";

// LIBS CSS
import "react-alice-carousel/lib/alice-carousel.css";

// CSS
import "styles/Header.scss";
import "styles/Layout.scss";
import "styles/ProductSlide.scss";
import "styles/CategorySlide.scss";
import "styles/CategoryBox.scss";
import "styles/Category.scss";
import "styles/CategoryPage.scss";
import "styles/ProductDetail.scss";
const googleAnalyticsTag = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', 'G-D3756NB4S4');
`;
const MyApp = ({ Component, pageProps }) => {
    return (
        <div className="Layout">
            <Head>
                <meta name="google-site-verification" content="3vdcbQ-kpzHyXCDVh2Qxi9rfB4YcPzgOv2CPoRx3p4o" />
                <script async src="https://www.googletagmanager.com/gtag/js?id=G-D3756NB4S4"></script>
                <script dangerouslySetInnerHTML={{ __html: googleAnalyticsTag }}></script>
                <meta name="naver-site-verification" content="50e02d1d9c5566aecc136ff83f465dcb0cff32f2" />
                <meta name="msvalidate.01" content="D6A67E754ABDD8C96AF1B1CDCDE1AD99" />

                <script src="https://unpkg.com/embla-carousel"></script>
                <title>All About AliExpress - AliAll</title>
                <meta http-equiv="content-language" content="en" />

                <meta name={"viewport"} content="width=device-width, initial-scale=1" />
                <meta name="robots" content="index, follow" />

                <meta property="og:locale" content="en_US" />
                <meta property="og:site_name" content="aliall.shop"></meta>
            </Head>
            <Header />
            <div className="article">
                <Component {...pageProps} />
            </div>
        </div>
    );
};

export default MyApp;
