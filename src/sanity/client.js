import { createClient } from "next-sanity";
import {
    postquery,
    limitquery,
    paginatedquery,
    configQuery,
    singlequery,
    pathquery,
    allauthorsquery,
    authorsquery,
    postsbyauthorquery,
    postsbycatquery,
    catpathquery,
    catquery,
    getAll,
    searchquery
  } from "./groq";
  
import { apiVersion, dataset, projectId, useCdn } from "./config";

export const client = createClient({ projectId, dataset, apiVersion, useCdn });


export async function getAllPosts() {
    if (client) {
      return (await client.fetch(postquery)) || [];
    }
    return [];
  }
  
  export async function getSettings() {
    if (client) {
      return (await client.fetch(configQuery)) || [];
    }
    return [];
  }
  
  export async function getPostBySlug(slug) {
    if (client) {
      return (await client.fetch(singlequery, { slug })) || {};
    }
    return {};
  }
  
  export async function getAllPostsSlugs() {
    if (client) {
      const slugs = (await client.fetch(pathquery)) || [];
      return slugs.map(slug => ({ slug }));
    }
    return [];
  }
  // Author
  export async function getAllAuthorsSlugs() {
    if (client) {
      const slugs = (await client.fetch(authorsquery)) || [];
      return slugs.map(slug => ({ author: slug }));
    }
    return [];
  }
  
  export async function getAuthorPostsBySlug(slug) {
    if (client) {
      return (await client.fetch(postsbyauthorquery, { slug })) || {};
    }
    return {};
  }
  
  export async function getAllAuthors() {
    if (client) {
      return (await client.fetch(allauthorsquery)) || [];
    }
    return [];
  }
  
  // Category
  
  export async function getAllCategories() {
    if (client) {
      const slugs = (await client.fetch(catpathquery)) || [];
      return slugs.map(slug => ({ category: slug }));
    }
    return [];
  }
  
  export async function getPostsByCategory(slug) {
    if (client) {
      return (await client.fetch(postsbycatquery, { slug })) || {};
    }
    return {};
  }
  
  export async function getTopCategories() {
    if (client) {
      return (await client.fetch(catquery)) || [];
    }
    return [];
  }
  
  export async function getPaginatedPosts({ limit, pageIndex = 0 }) {
    if (client) {
      return (
        (await client.fetch(paginatedquery, {
          pageIndex: pageIndex,
          limit: limit
        })) || []
      );
    }
    return [];
  }