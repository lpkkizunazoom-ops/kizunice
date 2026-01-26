// import { getPosts } from "@/sanity/sanity-utils";
// import BlogItem from "@/components/ui/BlogItem";

// export default async function Blog() {
//   const posts = await getPosts();
//   return (
//     <section className="lg:max-w-[80rem] mx-auto py-[4rem] lg:py-[6rem]" id="program" >
//       <div className="flex flex-col justify-center items-center px-8 mb-[4rem]">
//           <div className="text-center lg:px-12 lg:max-w-3xl lg:mt-[-4em] md:mt-[-2em] mb-8">
//               <h1 className="text-primary font-semibold my-6 w-full leading-snug !text-4xl lg:max-w-4xl lg:!text-7xl">
//                   <span className="text-secondary">Blog</span> Kizuna
//               </h1>
//           </div>
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-6">
//               {posts?.length > 0 ? (
//                 posts.map((post, i) => <BlogItem key={i} blog={post} />)
//               ) : (
//                 <p>No posts found</p>
//               )}
//           </div>
//       </div>
//     </section>
//   );
// }

import Link from "next/link";
import { client } from "@/sanity/client";
import BlogItem from "@/components/ui/BlogItem";
import { getLocalPosts } from "@/lib/localBlog";

const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id, title, slug, publishedAt, mainImage}`;

const options = { next: { revalidate: 30 } };

export default async function IndexPage() {
  // Fetch posts from Sanity
  const sanityPosts = await client.fetch(POSTS_QUERY, {}, options);

  // Get local posts from JSON files
  const localPosts = getLocalPosts();

  // Combine and sort all posts by date (newest first)
  const posts = [...(sanityPosts || []), ...localPosts].sort(
    (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
  );

  return (
    <section className="container mx-auto min-h-screen max-w-3xl p-8 lg:max-w-[80rem] mx-auto py-4 lg:py-[6rem]">
      <div className="flex flex-col justify-center items-center px-0 lg:px-8 mb-[2rem]">
        <div className="text-center px-0 lg:px-12 lg:max-w-3xl lg:mt-[-4em] md:mt-[-2em] mb-8">
          <h1 className="text-primary font-semibold my-6 w-full leading-snug !text-4xl lg:max-w-4xl lg:!text-7xl">
            <span className="text-secondary">Blog</span> Kizuna
          </h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {posts?.length > 0 ? (
            posts.map((post, i) => <BlogItem key={i} blog={post} />)
          ) : (
            <p className="text-gray-500 col-span-full text-center py-8">No posts found</p>
          )}
        </div>
      </div>
      {/* <h1 className="text-4xl font-bold mb-8">Posts</h1>
      <ul className="flex flex-col gap-y-4">
        {posts.map((post) => (
          <li className="hover:underline" key={post._id}>
            <Link href={`/id/blog/${post.slug.current}`}>
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p>{new Date(post.publishedAt).toLocaleDateString()}</p>
            </Link>
          </li>
        ))}
      </ul> */}
    </section>
  );
}