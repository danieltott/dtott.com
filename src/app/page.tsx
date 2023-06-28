import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/components/Card';
import { Container } from '@/components/Container';
import { GitHubIcon, TwitterIcon } from '@/components/SocialIcons';
import logoVC from '@/app/projects/logos/virtual-coffee.png';
import logoMalleys from '@/app/projects/logos/malleys.png';
import { formatDate } from '@/lib/formatDate';
// import { generateRssFeed } from '@/lib/generateRssFeed';
import { getAllArticles } from '@/lib/getAllArticles';
import type { SvgElementProps, LinkHref, ArticleListItem } from '@/lib/types';
import { Metadata } from 'next';
import avatarImage from '@/images/avatar.jpg';
import { RssIcon } from '@heroicons/react/20/solid';

function BriefcaseIcon(props: SvgElementProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M2.75 9.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z"
        className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500"
      />
      <path
        d="M3 14.25h6.249c.484 0 .952-.002 1.316.319l.777.682a.996.996 0 0 0 1.316 0l.777-.682c.364-.32.832-.319 1.316-.319H21M8.75 6.5V4.75a2 2 0 0 1 2-2h2.5a2 2 0 0 1 2 2V6.5"
        className="stroke-zinc-400 dark:stroke-zinc-500"
      />
    </svg>
  );
}

function Article({ article }: { article: ArticleListItem }) {
  return (
    <Card as="article">
      <Card.Title href={`/thoughts/${article.slug}`}>
        {`${article.title}`}
      </Card.Title>
      <Card.Eyebrow as="time" dateTime={article.date} decorate>
        {formatDate(article.date)}
      </Card.Eyebrow>
      <Card.Description>
        {article.summary ? (
          <div
            className="my-0 [&>*:first-child]:mt-0 [&>*:last-child]:mb-0"
            dangerouslySetInnerHTML={{ __html: article.summary }}
          />
        ) : (
          <p>{article.description}</p>
        )}
      </Card.Description>
      <Card.Cta>Read article</Card.Cta>
    </Card>
  );
}

function SocialLink({
  icon: Icon,
  ...props
}: React.ComponentProps<typeof Link> & {
  icon: React.ComponentType<SvgElementProps> | typeof RssIcon;
}) {
  return (
    <Link className="group -m-1 p-1" {...props}>
      <Icon className="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300" />
    </Link>
  );
}

function Resume() {
  let resume: {
    company: string;
    title: string;
    logo: any;
    start:
      | string
      | {
          label: string;
          dateTime: number;
        };
    end:
      | string
      | {
          label: string;
          dateTime: number;
        };
  }[] = [
    {
      company: 'Daniel T Ott, LLC',
      title: 'Owner',
      logo: avatarImage,
      start: '2005',
      end: {
        label: 'Present',
        dateTime: new Date().getFullYear(),
      },
    },
    {
      company: 'VirtualCoffeeIO',
      title: 'Org Maintainer',
      logo: logoVC,
      start: '2020',
      end: {
        label: 'Present',
        dateTime: new Date().getFullYear(),
      },
    },
    {
      company: `Malley's Chocolates`,
      title: 'Ice Cream Parlor Piano Player',
      logo: logoMalleys,
      start: '1997',
      end: '1998',
    },
  ];

  return (
    <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100 md:text-base lg:text-lg">
        <BriefcaseIcon className="h-6 w-6 flex-none" />
        <span className="ml-3">Work</span>
      </h2>
      <ol className="mt-6 space-y-4">
        {resume.map((role, roleIndex) => (
          <li key={roleIndex} className="flex gap-4">
            <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
              <Image src={role.logo} alt="" className="h-7 w-7 rounded-full" />
            </div>
            <dl className="flex flex-auto flex-wrap gap-x-2">
              <dt className="sr-only">Company</dt>
              <dd className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100 md:text-base lg:text-lg">
                {role.company}
              </dd>
              <dt className="sr-only">Role</dt>
              <dd className="text-xs text-zinc-500 dark:text-zinc-400 md:text-sm lg:text-base">
                {role.title}
              </dd>
              <dt className="sr-only">Date</dt>
              <dd
                className="ml-auto text-xs text-zinc-400 dark:text-zinc-500 md:text-sm lg:text-base"
                aria-label={`${
                  typeof role.start === 'string' ? role.start : role.start.label
                } until ${
                  typeof role.end === 'string' ? role.end : role.end.label
                }`}
              >
                <time
                  dateTime={
                    typeof role.start === 'string'
                      ? role.start
                      : role.start.label
                  }
                >
                  {typeof role.start === 'string'
                    ? role.start
                    : role.start.label}
                </time>{' '}
                <span aria-hidden="true">—</span>{' '}
                <time
                  dateTime={
                    typeof role.end === 'string' ? role.end : role.end.label
                  }
                >
                  {typeof role.end === 'string' ? role.end : role.end.label}
                </time>
              </dd>
            </dl>
          </li>
        ))}
      </ol>
    </div>
  );
}

export const metadata: Metadata = {
  title: `Dan Ott ~ Full-Stack Design and Development`,
  description:
    'I&rsquo;m Dan, an independent developer and designer based in Cleveland, Ohio. I&rsquo;ve been working with clients since 2005 to plan, design, and implement their ideas. I also am an org maintainer at VirtualCoffee.io.',
};

export default async function HomePage() {
  const articles = await getAllArticles(4);

  return (
    <>
      <Container className="mt-9">
        <div className="max-w-2xl">
          <h1 className="font-heading text-4xl text-zinc-800 dark:text-zinc-100 sm:text-5xl">
            Full-Stack Design and Development
          </h1>
          <div className="prose mt-6 md:prose-lg lg:prose-xl">
            <p>
              I&rsquo;m Dan, an independent developer and designer based in
              Cleveland, Ohio. I&rsquo;ve been working with clients since 2005
              to plan, design, and implement their ideas. I also am an org
              maintainer at{' '}
              <a href="https://virtualcoffee.io">Virtual Coffee</a>.
            </p>
          </div>
          <div className="mt-6 flex gap-6">
            <SocialLink
              href="https://twitter.com/danieltott"
              aria-label="Follow on Twitter"
              icon={TwitterIcon}
            />
            <SocialLink
              href="https://github.com/danieltott"
              aria-label="Follow on GitHub"
              icon={GitHubIcon}
            />
            <SocialLink
              href="https://dtott.com/thoughts/feed.rss"
              aria-label="Subscribe to RSS feed"
              icon={RssIcon}
            />
          </div>
        </div>
      </Container>
      {/* <Photos /> */}
      <Container className="mt-24 md:mt-28">
        <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
          <div className="flex flex-col gap-16">
            {articles.map((article) => (
              <Article key={article.slug} article={article} />
            ))}
          </div>
          <div className="space-y-10 lg:pl-16 xl:pl-24">
            {/* <Newsletter /> */}
            <Resume />
          </div>
        </div>
      </Container>
    </>
  );
}
