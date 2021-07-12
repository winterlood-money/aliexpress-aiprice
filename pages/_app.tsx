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

const MyApp = ({ Component, pageProps }) => {
    return (
        <div className="Layout">
            <Head>
                <script src="https://unpkg.com/embla-carousel"></script>
                <title>All About AliExpress - AliAll</title>
                <meta http-equiv="content-language" content="en" />

                <meta name={"viewport"} content="width=device-width, initial-scale=1" />
                <meta name="robots" content="index, follow" />

                <meta property="og:locale" content="en_US" />
                <meta property="og:site_name" content="ali.aiprice.shop"></meta>
            </Head>
            <Header />
            <div className="article">
                <Component {...pageProps} />
            </div>
        </div>
    );
};

export default MyApp;
