import type { ArticleMeta } from '@/lib/types';
import { Prose } from '@/components/Prose';
import { formatDate } from '@/lib/formatDate';
import { type Metadata } from 'next';
// import { Metadata, ResolvingMetadata } from 'next'
import { getAllArticles } from '@/lib/getAllArticles';
import Codepen from '@/components/Codepen';
import { type MDXProps } from 'mdx/types';
import Comments from '@/components/Comments';
import { notFound } from 'next/navigation';
import Star from '@/components/Star';
import Title from '@/components/Title';

const components = { Codepen };

export const dynamicParams = false;

export async function generateStaticParams() {
  const articles = await getAllArticles();

  return articles.map((articles) => ({
    slug: articles.slug,
  }));
}

type Props = {
  params: { slug: string };
};

export function generateMetadata({
  params,
}: Props): // parent: ResolvingMetadata
Metadata {
  const {
    meta,
  }: {
    meta: ArticleMeta;
  } = require(`../../../../content/${params.slug}.mdx`);

  return {
    title: meta.title,
    description: meta.description,
  };
}

export default async function Page({ params }: Props) {
  try {
    const {
      default: MdxPage,
      meta,
    }: {
      default: React.ComponentType<MDXProps>;
      meta: ArticleMeta;
    } = require(`../../../../content/${params.slug}.mdx`);

    return (
      <div className="xl:relative">
        <div className="mx-auto max-w-2xl 2xl:max-w-3xl">
          <article>
            <header className="flex flex-col">
              <Title title={meta.title} className="mt-6" />

              <time
                dateTime={meta.date}
                className="md:order-first flex gap-3 items-center text-base text-east-bay-700 dark:text-stone-400 lg:text-lg"
              >
                <Star randomFill />
                <span>{formatDate(meta.date)}</span>
              </time>
            </header>
            <Prose className="text-above-stars mt-8">
              <MdxPage components={components} />
            </Prose>
            <Comments slug={params.slug} />
          </article>
        </div>
      </div>
    );
  } catch (error) {
    console.log(error);
    notFound();
  }
}
