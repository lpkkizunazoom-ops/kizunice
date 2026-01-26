import fs from 'fs';
import path from 'path';

// Get all local blog posts from the content/blogs directory
export function getLocalPosts() {
    const blogsDirectory = path.join(process.cwd(), 'src/content/blogs');

    // Check if directory exists
    if (!fs.existsSync(blogsDirectory)) {
        return [];
    }

    const fileNames = fs.readdirSync(blogsDirectory);
    const posts = fileNames
        .filter(fileName => fileName.endsWith('.json'))
        .map(fileName => {
            const filePath = path.join(blogsDirectory, fileName);
            const fileContents = fs.readFileSync(filePath, 'utf8');
            const post = JSON.parse(fileContents);

            return {
                _id: `local-${post.slug}`,
                title: post.title,
                slug: { current: post.slug },
                publishedAt: post.publishedAt,
                author: { name: post.author },
                mainImage: post.mainImage ? { localPath: post.mainImage, alt: post.title } : null,
                body: post.body,
                excerpt: post.excerpt,
                isLocal: true, // Flag to identify local posts
            };
        })
        .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

    return posts;
}

// Get a single local post by slug
export function getLocalPostBySlug(slug) {
    const blogsDirectory = path.join(process.cwd(), 'src/content/blogs');
    const filePath = path.join(blogsDirectory, `${slug}.json`);

    if (!fs.existsSync(filePath)) {
        return null;
    }

    const fileContents = fs.readFileSync(filePath, 'utf8');
    const post = JSON.parse(fileContents);

    return {
        _id: `local-${post.slug}`,
        title: post.title,
        slug: { current: post.slug },
        publishedAt: post.publishedAt,
        author: { name: post.author },
        mainImage: post.mainImage ? { localPath: post.mainImage, alt: post.title } : null,
        body: post.body,
        excerpt: post.excerpt,
        isLocal: true,
    };
}
