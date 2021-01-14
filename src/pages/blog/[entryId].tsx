/** @jsxRuntime classic */
/** @jsx jsx */
import { Fragment } from "react";
import { css, jsx } from "@emotion/react";
import { NextPage, GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { getContents, getEntry } from "repositories/cms";
import { Contents } from "types/cms";
import { dayjs } from "utils/dayjs";
import cheerio from "cheerio";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";

type Props = {
  entry: Contents;
  entryId: string;
};

type Params = {
  entryId: string;
};

const styles = css`
  margin: 56px 0;

  .title {
    position: relative;
    font-size: 28px;
    width: 100%;
    padding-left: 32px;

    ::before {
      content: "";
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      width: 6px;
      background-color: var(--primary);
      border-radius: 99rem;
    }
  }
  .published-at {
    color: var(--primary-gray);
    font-size: 14px;
    margin: 16px 0 40px;
    width: 100%;
    text-align: left;
  }
  a {
    font-weight: 600;
    color: var(--primary-text);
  }
  .text {
    h2 {
      margin-bottom: 16px;

      &:not(:first-of-type) {
        margin-top: 56px;
      }
    }
    h3 {
      margin: 32px 0 12px;
    }
    strong {
      display: inline-block;
      margin-bottom: 12px;
    }
    pre {
      margin-top: 12px;
    }
    ul {
      margin-top: 16px;
      padding-left: 20px;
    }
    li {
      margin-bottom: 4px;
    }
    code {
      font-size: 15px;
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
`;

export const getStaticPaths: GetStaticPaths = async () => {
  const contents = await getContents();

  const paths = contents.map((content) => `/blog/${content.id}`);
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const entryId = (params as Params).entryId as string;
  const entry = await getEntry(entryId);

  const $ = cheerio.load(entry.text);
  $("pre code").each((_, elm) => {
    const result = hljs.highlightAuto($(elm).text());
    $(elm).html(result.value);
    $(elm).addClass("hljs");
  });

  return {
    props: {
      entry: { ...entry, text: $.html() },
      entryId,
    },
  };
};

const Article: NextPage<Props> = ({ entry, entryId }: Props) => {
  return (
    <Fragment>
      <Head>
        <title>{entry.title} | shunke07.com</title>
        <meta
          property="og:url"
          content={`https://shunke07.com/blog/${entryId}`}
        />
        <meta property="og:title" content={entry.title} />
        <meta property="og:description" content={entry.title} />
        {!!entry.thumbnail && (
          <meta property="og:image" content={entry.thumbnail.url} />
        )}
      </Head>
      <article css={styles}>
        {entry && (
          <Fragment>
            <h1 className="title">{entry.title}</h1>
            <p className="published-at">
              <time>{dayjs(entry.publishedAt).format("YYYY.MM.DD")}</time>
            </p>
            <div
              className="text"
              dangerouslySetInnerHTML={{ __html: entry.text }}
            />
          </Fragment>
        )}
      </article>
    </Fragment>
  );
};

export default Article;
