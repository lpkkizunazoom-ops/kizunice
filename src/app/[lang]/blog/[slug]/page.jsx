import React from "react";
import Image from "next/image";
import { urlForImage } from "@/sanity/image";
import { getPostBySlug } from "@/sanity/client";
import { getLocalPostBySlug } from "@/lib/localBlog";
import RenderBodyContent from "@/components/ui/RenderBodyContent";

const dateFormatter = new Intl.DateTimeFormat('id', { day: 'numeric', month: 'long', weekday: "long", year: "numeric" });

const SingleBlogPage = async ({ params }) => {
  // Try to get post from Sanity first
  let post = await getPostBySlug(params.slug);
  let isLocalPost = false;
  
  // If not found in Sanity, check local posts
  if (!post) {
    post = getLocalPostBySlug(params.slug);
    if (post) {
        isLocalPost = true;
    }
  } else {
    // Check if the Sanity post is actually valid or just an empty object
     if (!post.title) {
        // Fallback or double check if it might be local (unlikely if slug didn't match, but safe guard)
        const local = getLocalPostBySlug(params.slug);
        if (local) {
            post = local;
            isLocalPost = true;
        }
     }
  }
  
  if (!post || (Object.keys(post).length === 0 && post.constructor === Object) || !post.title) {
    return (
      <article className="lg:max-w-[70rem] mx-auto py-[2rem] lg:py-[6rem] px-8">
        <h1 className="text-2xl lg:text-4xl text-center font-semibold mb-4">Post tidak ditemukan</h1>
        <p className="text-center">Maaf, artikel yang Anda cari tidak tersedia.</p>
      </article>
    );
  }

  // Double check isLocal flag from the post object itself if available
  if (post.isLocal) {
    isLocalPost = true;
  }

  const imageProps = !isLocalPost && post?.mainImage
    ? urlForImage(post?.mainImage)
    : null;
    
  // Handle local image path safely
  const localImagePath = isLocalPost && post?.mainImage?.localPath 
    ? post.mainImage.localPath 
    : null;

  // Safe date formatting
  let dateString = "";
  try {
      if (post.publishedAt) {
          const date = new Date(post.publishedAt);
          if (!isNaN(date.getTime())) {
             dateString = dateFormatter.format(date);
          }
      }
  } catch (e) {
      console.error("Date formatting error:", e);
      dateString = post.publishedAt || "";
  }
  
  return (
    <article className="lg:max-w-[70rem] mx-auto py-[2rem] lg:py-[6rem] px-8">
      <div className="flex flex-col lg:w-[65%] mx-auto mb-6">
        <h1 className="text-2xl lg:text-4xl text-center font-semibold mb-4">{post.title}</h1>
        <p className="text-center pb-1">
          <span className="font-medium">Dirilis: </span>
          {dateString}
          <span className="font-medium pl-2">oleh </span>
          {post.author?.name || "Kizuna Team"}
        </p>

      </div>

      <div className="relative z-0 mx-auto aspect-video max-w-screen-lg overflow-hidden lg:rounded-lg py-6 mb-12">
        {imageProps && (
          <Image
            priority
            src={imageProps.src}
            alt={post.mainImage?.alt || "Thumbnail"}
            loading="eager"
            fill
            sizes="100vw"
            className="object-cover rounded-md"
          />
        )}
        {localImagePath && (
          <Image
            priority
            src={localImagePath}
            alt={post.mainImage?.alt || "Thumbnail"}
            loading="eager"
            fill
            sizes="100vw"
            className="object-cover rounded-md"
          />
        )}
      </div>

      <article className="prose lg:prose-xl lg:max-w-[50rem] justify-center align-center mx-auto mb-8">
          <RenderBodyContent post={post} isLocal={isLocalPost} />
      </article>
    </article>
  );
};

export default SingleBlogPage;

// import { PortableText } from "next-sanity";
// import imageUrlBuilder from "@sanity/image-url";
// import { client } from "@/sanity/client";
// import Link from "next/link";
// import Image from "next/image";

// const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]`;

// const { projectId, dataset } = client.config();
// const urlFor = (source) =>
//   projectId && dataset
//     ? imageUrlBuilder({ projectId, dataset }).image(source)
//     : null;

// const options = { next: { revalidate: 30 } };

// export default async function PostPage({
//   params,
// }) {
//   const post = await client.fetch(POST_QUERY, params, options);
//   const postImageUrl = post.image
//     ? urlFor(post.image)?.width(550).height(310).url()
//     : null;

//   return (
//     <main className="container mx-auto min-h-screen max-w-3xl p-8 flex flex-col gap-4">
//       <Link href="/id/blog" className="hover:underline">
//         ← Back to posts
//       </Link>
     
//       <h1 className="text-4xl font-bold mb-8">{post.title}</h1>
//       <div className="relative z-0 mx-auto aspect-video max-w-screen-lg overflow-hidden lg:rounded-lg mb-4">
//         {postImageUrl && (
//           <Image
//             priority
//             src={postImageUrl}
//             alt={post.title || "Thumbnail"}
//             loading="eager"
//             fill
//             sizes="100vw"
//             className="object-cover rounded-md"
//           />
//         )}
//       </div>
//       <div className="prose">
//         <p>Published: {new Date(post.publishedAt).toLocaleDateString()}</p>
//         {Array.isArray(post.body) && <PortableText value={post.body} />}
//       </div>
//     </main>
//   );
// }