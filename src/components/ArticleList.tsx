import { Card } from '@/components/Card';
import { formatDate } from '@/lib/formatDate';
import { ArticleListItem } from '@/lib/types';
import { getAllArticles } from '@/lib/getAllArticles';
import { notFound } from 'next/navigation';
import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
} from '@heroicons/react/20/solid';
import Link from 'next/link';
import clsx from 'clsx';

export default function ArticleList({
  articles,
}: {
  articles: Awaited<ReturnType<typeof getArticles>>;
}) {
  const { meta, articles: list } = articles;
  return (
    <>
      {list.map((article) => (
        <article
          className="md:grid md:grid-cols-4 md:items-baseline"
          key={article.slug}
        >
          <Card className="md:col-span-3">
            <Card.Title href={`/thoughts/${article.slug}`}>
              {article.title}
            </Card.Title>
            <Card.Eyebrow
              as="time"
              dateTime={article.date}
              className="md:hidden"
              decorate
            >
              {formatDate(article.date)}
            </Card.Eyebrow>
            <Card.Description>
              {article.summary ? article.summary : <p>{article.description}</p>}
            </Card.Description>
            <Card.Cta>Read article</Card.Cta>
          </Card>
          <Card.Eyebrow
            as="time"
            dateTime={article.date}
            className="mt-1 hidden md:block"
          >
            {formatDate(article.date)}
          </Card.Eyebrow>
        </article>
      ))}

      <nav className="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0">
        <div className="-mt-px flex w-0 flex-1">
          {meta.prev && (
            <Link
              href={`/thoughts/page/${meta.prev}`}
              className="inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
            >
              <ArrowLongLeftIcon
                className="mr-3 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              Previous
            </Link>
          )}
        </div>
        <div className="hidden md:-mt-px md:flex">
          {meta.pages.map((page) => (
            <Link
              key={page}
              href={`/thoughts/page/${page}`}
              className={clsx(
                'inline-flex items-center border-t-2 px-4 pt-4',
                page === meta.page
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700'
              )}
            >
              {page}
            </Link>
          ))}
        </div>
        <div className="-mt-px flex w-0 flex-1 justify-end">
          {meta.next && (
            <Link
              href={`/thoughts/page/${meta.next}`}
              className="inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
            >
              Next
              <ArrowLongRightIcon
                className="ml-3 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Link>
          )}
        </div>
      </nav>
    </>
  );
}

export async function getArticles(pageSlug?: string) {
  const page = pageSlug ? parseInt(pageSlug) : 1;
  const perPage = 10;

  const articles = await getAllArticles();

  const meta: {
    page: number;
    total: number;
    totalPages: number;
    pages: number[];
    prev: number | null;
    next: number | null;
  } = {
    page,
    prev: page > 1 ? page - 1 : null,
    next: page < Math.ceil(articles.length / perPage) ? page + 1 : null,
    total: articles.length,
    totalPages: Math.ceil(articles.length / perPage),
    pages: [],
  };

  for (let i = 1; i <= meta.totalPages; i++) {
    meta.pages.push(i);
  }

  if (page > Math.ceil(articles.length / perPage)) {
    notFound();
  }

  return {
    meta,
    articles: articles.slice((page - 1) * perPage, page * perPage),
  };
}