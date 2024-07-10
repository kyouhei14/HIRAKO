import { useRouter } from "next/router";
import React from "react";
import Head from "next/head";
import MainLayout from "../../../components/ui/MainLayout";
import MangaCard from "../../../components/manga/MangaCard";
import { getMangaSearch } from '../../../src/handlers/manga';

export const getServerSideProps = async (context) => {
  const { searchId } = context.query;

  const mangaSearchData = await getMangaSearch(searchId, 24);

  return {
    props: {
      mangaSearchData,
    },
  };
};

function SearchPage({ mangaSearchData }) {
  const router = useRouter();
  const { searchId } = router.query;

  return (
    <>
      <Head>
        <title>{"Manga Search Results For: " + searchId + " - Hirako"}</title>
        <meta
          name="description"
          content="An ad-free anime streaming website aimed at minimality and responsive design. Share this with friends!"
        />
        <meta
          property="og:title"
          content={"Manga Search Results For: " + searchId + " - Hirako"}
        />
        <meta
          property="og:description"
          content="An ad-free anime streaming website aimed at minimality and responsive design. Share this with friends!"
        />
        <meta name="theme-color" content="#C4AD8A" />
        {/* Maybe change this to scan image and return main color */}
        <link rel="manifest" href="manifest.json" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" href="/android-chrome-192x192.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </Head>
      <MainLayout useHead={false} type={"manga"}>

        {mangaSearchData && (
          <>
            <div className="pt-10">
              <h1 className=" text-2xl font-bold">Search Results &gt; {searchId}</h1>

              {mangaSearchData.results.length === 0 && (
                <div className="text-center mt-10 text-2xl ">No Results Found</div>
              )}
            </div>
            <br />
            <div className="pb-10 mt-5 grid grid-cols-3 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 auto-rows-[1fr] 2xl:grid-cols-7 3xl:grid-cols-8">
              {mangaSearchData &&
                mangaSearchData.results
                  .map((manga) => (
                    <MangaCard key={manga.id} data={manga} />
                  ))}
            </div>
          </>
        )}
      </MainLayout>
    </>
  );
}

export default SearchPage;
