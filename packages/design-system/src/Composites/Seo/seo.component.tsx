import { API_CONSTANTS } from '@finnoto/core';
import Head from 'next/head';

interface SEO_PROPS {
    url?: string;
    title?: string;
    description?: string;
    image?: string;
    openGraphType?: string;
}

export const SEO = (props: SEO_PROPS) => {
    const {
        title = API_CONSTANTS.SITE_NAME,
        description = API_CONSTANTS.SITE_DESCRIPTION,
        image,
    } = props;
    return (
        <Head>
            <title>{title}</title>
            <meta name='description' content={description} />
            <meta itemProp='name' content={title} />
            <meta itemProp='description' content={description} />
            <meta itemProp='image' content={image} />
            {socialTags(props).map(({ name, content }) => {
                return <meta key={name} name={name} content={content} />;
            })}
        </Head>
    );
};

const socialTags = ({
    openGraphType = 'website',
    url = API_CONSTANTS.SITE_HOST,
    title = API_CONSTANTS.SITE_NAME,
    description = API_CONSTANTS.SITE_DESCRIPTION,
    image,
    createdAt,
    updatedAt,
}: any) => {
    const metaTags = [
        { name: 'twitter:card', content: 'summary_large_image' },
        //   {
        //     name: "twitter:site",
        //     content:
        //       settings &&
        //       settings.meta &&
        //       settings.meta.social &&
        //       settings.meta.social.twitter,
        //   },
        { name: 'twitter:title', content: title },
        { name: 'twitter:description', content: description },
        //   {
        //     name: "twitter:creator",
        //     content:
        //       settings &&
        //       settings.meta &&
        //       settings.meta.social &&
        //       settings.meta.social.twitter,
        //   },
        { name: 'twitter:image:src', content: image },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'og:title', content: title },
        { name: 'og:type', content: openGraphType },
        { name: 'og:url', content: url },
        { name: 'og:image', content: image },
        { name: 'og:description', content: description },
        {
            name: 'og:site_name',
            content: API_CONSTANTS.SITE_NAME,
        },
        {
            name: 'og:published_time',
            content: createdAt || new Date().toISOString(),
        },
        {
            name: 'og:modified_time',
            content: updatedAt || new Date().toISOString(),
        },
    ];

    return metaTags;
};
