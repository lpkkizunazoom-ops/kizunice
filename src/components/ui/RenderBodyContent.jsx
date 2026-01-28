import { PortableText } from "@portabletext/react";
import { getImageDimensions } from "@sanity/asset-utils";
import { urlForImage } from "@/sanity/image";
import Image from "next/image";

const ImageComponent = ({ value, isInline }) => {
  const { width, height } = getImageDimensions(value);
  return (
    <div className="my-10 overflow-hidden rounded-[15px]">
      <Image
        src={
          urlForImage(value.mainImage)
        }
        width={width}
        height={height}
        alt={value.alt || "blog image"}
        loading="lazy"
        style={{
          display: isInline ? "inline-block" : "block",
          aspectRatio: width / height,
        }}
      />
    </div>
  );
};

const Table = ({ value }) => {
  return (
    <div className="my-10">
      <table>
        <tbody>
          {value.rows.map((row) => (
            <tr key={row._key}>
              {row.cells.map((cell, key) => (
                <td
                  key={key}
                  className="first-of-type:bg-gray-100 max-w-[100px]"
                >
                  <span className="px-4">{cell}</span>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const components = {
  ImageComponent,
  Table,
};

// Component to render local blog content (JSON format)
const RenderLocalContent = ({ body }) => {
  if (!Array.isArray(body)) return null;

  return (
    <>
      {body.map((block, index) => {
        switch (block.type) {
          case 'heading':
            return <h2 key={index} className="text-2xl font-semibold mt-8 mb-4">{block.content}</h2>;
          case 'paragraph':
            return <p key={index} className="mb-4 leading-relaxed text-gray-700">{block.content}</p>;
          case 'list':
            return (
              <ul key={index} className="list-disc list-inside mb-4 ml-4">
                {block.items?.map((item, i) => (
                  <li key={i} className="mb-2 text-gray-700">{item}</li>
                ))}
              </ul>
            );
          case 'image':
            return (
              <div key={index} className="my-8">
                <img
                  src={block.src}
                  alt={block.alt || "Blog image"}
                  className="w-full h-auto rounded-lg shadow-md"
                />
                {block.caption && (
                  <p className="text-center text-sm text-gray-500 mt-2 italic">{block.caption}</p>
                )}
              </div>
            );
          default:
            return <p key={index} className="mb-4">{block.content}</p>;
        }
      })}
    </>
  );
};

const RenderBodyContent = ({ post, isLocal = false }) => {
  // Auto-detect if content is simple JSON array (local format) even if isLocal flag is missed.
  // We check if it's an array and the first item has 'type': 'paragraph' or 'heading', which is our local structure.
  const isLikelyLocal = Array.isArray(post?.body) && post.body.length > 0 &&
    (post.body[0].type === 'paragraph' || post.body[0].type === 'heading' || typeof post.body[0].content === 'string');

  // If it's a local post or auto-detected local format
  if (isLocal || isLikelyLocal) {
    return <RenderLocalContent body={post?.body} />;
  }

  // Otherwise, use Sanity's PortableText
  return (
    <>
      <PortableText value={post?.body} components={components} />
    </>
  );
};

export default RenderBodyContent;