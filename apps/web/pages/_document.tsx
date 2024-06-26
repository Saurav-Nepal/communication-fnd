import { Head, Html, Main, NextScript } from 'next/document';

const Document = () => {
    return (
        <Html lang='en' data-theme='light' suppressHydrationWarning>
            <Head>
                <link rel='manifest' href='/manifest.json' />
                <link
                    rel='icon'
                    href={
                        process.env['FAVICON']
                            ? process.env['FAVICON']
                            : '/favicon.ico'
                    }
                />
                <link
                    rel='stylesheet'
                    href='https://fonts.googleapis.com/icon?family=Material+Icons|Material+Icons+Outlined'
                />
                <link rel='preconnect' href='https://fonts.googleapis.com' />
                <link rel='preconnect' href='https://fonts.gstatic.com' />

                <link
                    href='https://fonts.googleapis.com/css2?family=Jost:wght@200;500&display=swap'
                    rel='stylesheet'
                />

                <link
                    href='https://fonts.googleapis.com/css2?family=Jost:wght@200;500&family=Rubik:wght@300;400;500;600;700;800;900&display=swap'
                    rel='stylesheet'
                />
                <link
                    rel='stylesheet'
                    href='https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css'
                />
                {/* {process.env['GOOGLE_ANALYTICS_KEY'] && (
                    <> */}
                <script
                    async
                    src={`https://www.googletagmanager.com/gtag/js?id=${
                        process.env['GOOGLE_ANALYTICS_KEY'] || 'G-D5124N37Y7'
                    }`}
                />
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                                window.dataLayer = window.dataLayer || [];
                                function gtag(){dataLayer.push(arguments);}
                                gtag('js', new Date());
                            
                                gtag('config', '${
                                    process.env['GOOGLE_ANALYTICS_KEY'] ||
                                    'G-D5124N37Y7'
                                }');
                            `,
                    }}
                />
                {/* </>
                )} */}
                <script
                    type='application/ld+json'
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            '@context': 'http://schema.org',
                            '@type': 'Organization',
                            name: 'Finnoto',
                            description:
                                'Finnoto is one-stop platform to manage business digitally. It covers the entire business cycle from adding and maintaining customer data to managing sales, purchases, expenses, inventory, and payments along with a unified dashboard.',
                            image: 'https://finnoto.com/assets/icons/finnoto-logo.png',
                            logo: 'https://finnoto.com/assets/icons/finnoto-logo.png',
                            url: 'https://finnoto.com/',
                            telephone: '091-9611470111',
                            email: 'support@finnoto.com',
                            sameAs: [
                                'https://twitter.com/finnotoSolutions',
                                'https://www.facebook.com/finnoto/',
                                // 'https://www.youtube.com/channel/UC4yKcNLCmYCRRaoNaG1Oq-A',
                                'https://www.instagram.com/finnoto/',
                            ],
                            address: {
                                '@type': 'PostalAddress',
                                streetAddress:
                                    'Finnoto Head Office, No 46/1, Bhatarahalli Villa, Virgo Nagar',
                                addressLocality: 'Bangalore',
                                postalCode: '560036',
                                addressCountry: 'India',
                            },
                        }),
                    }}
                />
            </Head>
            <body className='min-h-full overflow-auto text-base print:bg-transparent'>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
};

export default Document;
