import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="description"
            content="See pictures from Tom Nyuma's (Nyumat) Band Career."
          />
          <meta property="og:site_name" content="nextjsconf-pics.vercel.app" />
          <meta
            property="og:description"
            content="See pictures from Tom Nyuma's (Nyumat) Band Career."
          />
          <meta
            property="og:title"
            content="Tom Nyuma's Marching Band Archive"
          />
          <meta name="twitter:card" content="summary_large_image" />
          <meta
            name="twitter:title"
            content="Tom Nyuma's Marching Band Archive"
          />
          <meta
            name="twitter:description"
            content="See pictures from Tom Nyuma's Band Career."
          />
        </Head>
        <body className="bg-black antialiased">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
