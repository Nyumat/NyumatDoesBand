import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import Bridge from "../components/Icons/Bridge";
import Modal from "../components/Modal";
// import cloudinary from "../utils/cloudinary";
import type { ImageProps } from "../utils/types";
import { useLastViewedPhoto } from "../utils/useLastViewedPhoto";
// import ogimage from "/public/og-image.png";

const Home: NextPage = ({ images }: { images: ImageProps[] }) => {
  const router = useRouter();
  const { photoId } = router.query;
  const [lastViewedPhoto, setLastViewedPhoto] = useLastViewedPhoto();
  const offline = true;

  const lastViewedPhotoRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    // This effect keeps track of the last viewed photo in the modal to keep the index page in sync when the user navigates back
    if (lastViewedPhoto && !photoId) {
      lastViewedPhotoRef.current.scrollIntoView({ block: "center" });
      setLastViewedPhoto(null);
    }
  }, [photoId, lastViewedPhoto, setLastViewedPhoto]);

  if (offline) {
    return (
      <div className="mx-auto flex h-screen flex-col items-center justify-center gap-12 text-white">
        <h1 className="max-w-2xl text-center text-4xl font-bold">
          NyumatDoesBand is currently offline due to Cloudinary API rate limits.
        </h1>
        <p className="text-center text-2xl font-bold">
          Please check back later.
        </p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Tom Nyuma's Marching Band Archive</title>
        {/* <meta property="og:image" content={ogimage.src} /> */}
        {/* <meta name="twitter:image" content={ogimage.src} /> */}
      </Head>
      <main className="mx-auto max-w-[1960px] p-4">
        {photoId && (
          <Modal
            images={images}
            onClose={() => {
              setLastViewedPhoto(photoId);
            }}
          />
        )}
        <div className="columns-1 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4">
          {/* h-was 629 */}
          <div className="after:content shadow-highlight after:shadow-highlight relative mb-5 flex h-[329px] flex-col items-center justify-end gap-4 overflow-hidden rounded-lg bg-white/10 px-6 pb-16 pt-64 text-center text-white after:pointer-events-none after:absolute after:inset-0 after:rounded-lg lg:pt-0">
            <div className="absolute inset-0 flex items-center justify-center opacity-20">
              <span className="flex max-h-full max-w-full items-center justify-center">
                <Bridge />
              </span>
              {/* <span className="absolute left-0 right-0 bottom-0 h-[400px] bg-gradient-to-b from-black/0 via-black to-black"></span> */}
            </div>
            {/* <Logo /> */}
            <h1 className="mb-4 mt-8 text-base font-bold uppercase tracking-widest">
              Nyumat Does Band
            </h1>
            <p className="max-w-[40ch] text-white/75 sm:max-w-[32ch]">
              Welcome to my marching band archive. Here you will find photos
              from my time in marching band from college to DCI to high school.
              I hope you enjoy!
            </p>
            <p className="max-w-[40ch] text-white/75 sm:max-w-[32ch]">
              206, Go Beavs, Go Lions, Splooie.
            </p>
            {/* <a
              className="pointer z-10 mt-6 rounded-lg border border-white bg-white px-3 py-2 text-sm font-semibold text-black transition hover:bg-white/10 hover:text-white md:mt-4"
              href="https://vercel.com/new/clone?repository-url=https://github.com/vercel/next.js/tree/canary/examples/with-cloudinary&project-name=nextjs-image-gallery&repository-name=with-cloudinary&env=NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,CLOUDINARY_API_KEY,CLOUDINARY_API_SECRET,CLOUDINARY_FOLDER&envDescription=API%20Keys%20from%20Cloudinary%20needed%20to%20run%20this%20application"
              target="_blank"
              rel="noreferrer"
            >
              Clone and Deploy
            </a> */}
          </div>
          {images.map(({ id, public_id, format, blurDataUrl }) => (
            <Link
              key={id}
              href={`/?photoId=${id}`}
              as={`/p/${id}`}
              ref={id === Number(lastViewedPhoto) ? lastViewedPhotoRef : null}
              shallow
              className="after:content after:shadow-highlight group relative mb-5 block w-full cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg"
            >
              <Image
                alt="Next.js Conf photo"
                className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
                style={{ transform: "translate3d(0, 0, 0)" }}
                placeholder="blur"
                blurDataURL={blurDataUrl}
                src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_720/${public_id}.${format}`}
                width={720}
                height={480}
                sizes="(max-width: 640px) 100vw,
                  (max-width: 1280px) 50vw,
                  (max-width: 1536px) 33vw,
                  25vw"
              />
            </Link>
          ))}
        </div>
      </main>
      <footer className="p-6 text-center text-white/80 sm:p-12">
        <p className="text-sm">
          Made with{" "}
          <span role="img" aria-label="love">
            ❤️
          </span>{" "}
          by{" "}
          <a className="underline" href="https://github.com/nyumat">
            Tom Nyuma
          </a>
        </p>
      </footer>
    </>
  );
};

export default Home;

// export async function getStaticProps() {
//   const results = await cloudinary.v2.search
//     .expression(`folder:${process.env.CLOUDINARY_FOLDER}/*`)
//     .sort_by("public_id", "desc")
//     .max_results(400)
//     .execute();
//   let reducedResults: ImageProps[] = [];

//   let i = 0;
//   for (let result of results.resources) {
//     reducedResults.push({
//       id: i,
//       height: result.height,
//       width: result.width,
//       public_id: result.public_id,
//       format: result.format,
//     });
//     i++;
//   }

//   const blurImagePromises = results.resources.map((image: ImageProps) => {
//     return getBase64ImageUrl(image);
//   });
//   const imagesWithBlurDataUrls = await Promise.all(blurImagePromises);

//   for (let i = 0; i < reducedResults.length; i++) {
//     reducedResults[i].blurDataUrl = imagesWithBlurDataUrls[i];
//   }

//   return {
//     props: {
//       images: reducedResults,
//     },
//   };
// }
