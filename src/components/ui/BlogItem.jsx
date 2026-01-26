import Link from 'next/link'
import React from 'react'
import Image from "next/image";
import { urlForImage } from "@/sanity/image";

const dateFormatter = new Intl.DateTimeFormat('id', { day: 'numeric', month: 'long', weekday: "long", year: "numeric" });

const BlogItem = ({ blog }) => {
    // Check if it's a local blog post based on isLocal flag or structure
    const isLocal = blog.isLocal || (blog.mainImage && blog.mainImage.localPath);

    let imageSrc = null;
    let imageAlt = "Thumbnail";

    if (isLocal && blog.mainImage?.localPath) {
        imageSrc = blog.mainImage.localPath;
        imageAlt = blog.mainImage.alt || blog.title;
    } else if (blog.mainImage) {
        const imageProps = urlForImage(blog.mainImage);
        imageSrc = imageProps?.src;
        imageAlt = blog.mainImage.alt || "Thumbnail";
    }

    const date = new Date(blog.publishedAt)
    return (
        <Link href={`/id/blog/${blog.slug.current}`} className='block bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 hover:shadow-lg transition-all duration-300 overflow-hidden'>

            <article>
                {imageSrc && (
                    <div className="relative w-full h-48 overflow-hidden">
                        <Image
                            priority
                            src={imageSrc}
                            alt={imageAlt}
                            loading="eager"
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                )}
                <div className="p-5">
                    <h3 className="mb-3 text-xl font-bold tracking-tight text-gray-700 line-clamp-2">{blog.title}</h3>
                    <p className="font-normal text-sm text-gray-500">
                        {dateFormatter.format(date)}
                    </p>
                </div>
            </article>

        </Link>
    )
}

export default BlogItem