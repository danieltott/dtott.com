import type { ArticleMeta } from '@/lib/types';
import { Prose } from '@/components/Prose';
import { formatDate } from '@/lib/formatDate';
import { Metadata } from 'next';
// import { Metadata, ResolvingMetadata } from 'next'
import { getAllArticles } from '@/lib/getAllArticles';
import Codepen from '@/components/Codepen';
import { type MDXProps } from 'mdx/types';

const components = { Codepen };

export async function generateStaticParams() {
  const articles = await getAllArticles();

  return articles.map((articles) => ({
    slug: articles.slug,
  }));
}

type Props = {
  params: { slug: string };
};

export async function generateMetadata({
  params,
}: Props): // parent: ResolvingMetadata
Promise<Metadata> {
  const {
    meta,
  }: {
    meta: ArticleMeta;
  } = require(`../../../content/${params.slug}.mdx`);

  return {
    title: meta.title,
    description: meta.description,
  };
}

export default async function Page({ params }: Props) {
  const {
    default: MdxPage,
    meta,
  }: {
    default: React.ComponentType<MDXProps>;
    meta: ArticleMeta;
  } = require(`../../../content/${params.slug}.mdx`);
  return (
    <div className="xl:relative">
      <div className="mx-auto max-w-2xl">
        <article>
          <header className="flex flex-col">
            <h1 className="font-title mt-6 text-4xl tracking-tight sm:text-5xl">
              {meta.title}
            </h1>
            <time
              dateTime={meta.date}
              className="order-first flex items-center text-base text-zinc-400 dark:text-zinc-500"
            >
              <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
              <span className="ml-3">{formatDate(meta.date)}</span>
            </time>
          </header>
          <Prose className="mt-8">
            <MdxPage components={components} />
          </Prose>
        </article>
      </div>
    </div>
  );
}
