/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { NextPage, GetStaticProps } from "next";
import Head from "next/head";
import { getContents } from "repositories/cms";
import { Contents } from "types/cms";
//
import { Works } from "components/Works";
import { EntryList } from "components/EntryList";
import MailIcon from "../../public/assets/svg/mail.svg";

const styles = css`
  section {
    margin: 56px 0;

    > h1 {
      color: var(--primary);
      margin-bottom: 16px;
      padding-bottom: 4px;
      border-bottom: 2px solid var(--primary);
      letter-spacing: 0.03em;
    }
  }
  .profile {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 56px 0 -32px;

    .thumbnail {
      object-fit: cover;
      width: 80px;
      height: 80px;
      margin-bottom: 16px;
    }
  }
  .link-buttons {
    a {
      display: inline-block;
      box-sizing: content-box;
      padding: 0 8px;
      width: 32px;
      height: 32px;
      border-radius: 50%;

      :hover {
        opacity: 0.6;
        transition-duration: 0.25s;
      }
      img {
        width: 32px;
        height: 32px;
        border-radius: 50%;

        &.github {
          padding: 2px;
        }
        &.twitter {
          object-fit: none;
        }
      }
    }
  }

  .biography {
    > .skills {
      font-weight: bold;
      margin: 12px 0 4px;
    }
    > ul {
      padding-left: 20px;
    }
  }

  .mail {
    display: flex;
    align-items: center;

    > svg {
      margin-right: 4px;
      color: var(--primary-grey);
    }
  }
`;

type Props = {
  contents: Contents[];
};

export const getStaticProps: GetStaticProps = async () => {
  const contents = await getContents();

  return {
    props: { contents },
  };
};

const Home: NextPage<Props> = ({ contents }: Props) => {
  return (
    <div css={styles}>
      <Head>
        <title>shunke07.me</title>
        <meta name="twitter:card" content="summary" />
        <meta
          name="twitter:url"
          content="https://shunke07.me"
          key="twitter:url"
        />
        <meta name="twitter:title" content="shunke07.me" key="twitter:title" />
        <meta
          name="twitter:description"
          content="Shunke is Software Developer, Web Front-End Developer in Tokyo."
          key="twitter:description"
        />
        <meta
          name="twitter:image"
          content="/icons/icon-512x512.png"
          key="twitter:image"
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="shunke07.me" key="og:title" />
        <meta
          property="og:description"
          content="Shunke is Software Developer, Web Front-End Developer in Tokyo."
          key="og:description"
        />
        <meta property="og:site_name" content="shunke07.me" />
        <meta property="og:url" content="https://shunke07.me" key="og:url" />
        <meta
          property="og:image"
          content="/icons/icon-512x512.png"
          key="og:image"
        />
      </Head>

      <div className="profile">
        <picture>
          <source srcSet="/assets/images/icon.webp" type="image/webp" />
          <img
            className="thumbnail"
            src="/assets/images/icon.png"
            alt="プロフィール画像"
            width="80"
            height="80"
          />
        </picture>
        <div className="link-buttons">
          <a
            href="https://github.com/shunke07"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className="github"
              src="/assets/svg/github-logo.svg"
              alt="GitHubアイコン"
              width="32"
              height="32"
            />
          </a>
          <a
            href="https://twitter.com/shunke07"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className="twitter"
              src="/assets/svg/twitter-logo.svg"
              alt="Twitterアイコン"
              width="32"
              height="32"
            />
          </a>
        </div>
      </div>

      <section className="biography">
        <h1>About</h1>
        <p>Software Developer / Web Front-End Developer in Tokyo</p>
        <p className="skills">Skills:</p>
        <ul>
          <li>JavaScript (ES2015+)</li>
          <li>TypeScript</li>
          <li>Vue.js / Nuxt.js</li>
          <li>React / Next.js</li>
          <li>Firebase</li>
        </ul>
      </section>

      <section>
        <h1>Blog</h1>
        <EntryList contents={contents} />
      </section>

      <section>
        <h1>Portfolio</h1>
        <Works />
      </section>

      <section>
        <h1>Contact</h1>
        <p className="mail">
          <MailIcon title="メールアイコン" />
          contact[At]shunke07.me
        </p>
      </section>
    </div>
  );
};

export default Home;
