// pages/sitemap.xml.js
const EXTERNAL_DATA_URL = 'https://www.skprinters.com';

function generateSiteMap(blogs, products) {
  const today = new Date().toISOString();
  
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
           xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
           xmlns:xhtml="http://www.w3.org/1999/xhtml"
           xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
           xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
           xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
     
     <!-- Homepage -->
     <url>
       <loc>${EXTERNAL_DATA_URL}</loc>
       <lastmod>${today}</lastmod>
       <changefreq>daily</changefreq>
       <priority>1.0</priority>
     </url>
     
     <!-- About -->
     <url>
       <loc>${EXTERNAL_DATA_URL}/about</loc>
       <lastmod>${today}</lastmod>
       <changefreq>monthly</changefreq>
       <priority>0.8</priority>
     </url>
     
     <!-- Products -->
     <url>
       <loc>${EXTERNAL_DATA_URL}/products</loc>
       <lastmod>${today}</lastmod>
       <changefreq>weekly</changefreq>
       <priority>0.9</priority>
     </url>
     
     <!-- Blog -->
     <url>
       <loc>${EXTERNAL_DATA_URL}/blog</loc>
       <lastmod>${today}</lastmod>
       <changefreq>weekly</changefreq>
       <priority>0.8</priority>
     </url>
     
     <!-- Contact -->
     <url>
       <loc>${EXTERNAL_DATA_URL}/contact</loc>
       <lastmod>${today}</lastmod>
       <changefreq>monthly</changefreq>
       <priority>0.7</priority>
     </url>
     
     <!-- Get Quote -->
     <url>
       <loc>${EXTERNAL_DATA_URL}/get-quote</loc>
       <lastmod>${today}</lastmod>
       <changefreq>monthly</changefreq>
       <priority>0.9</priority>
     </url>
     
     <!-- Careers -->
     <url>
       <loc>${EXTERNAL_DATA_URL}/careers</loc>
       <lastmod>${today}</lastmod>
       <changefreq>monthly</changefreq>
       <priority>0.6</priority>
     </url>
     
     <!-- Privacy Policy -->
     <url>
       <loc>${EXTERNAL_DATA_URL}/privacy-policy</loc>
       <lastmod>${today}</lastmod>
       <changefreq>yearly</changefreq>
       <priority>0.3</priority>
     </url>
     
     <!-- Terms -->
     <url>
       <loc>${EXTERNAL_DATA_URL}/terms</loc>
       <lastmod>${today}</lastmod>
       <changefreq>yearly</changefreq>
       <priority>0.3</priority>
     </url>
     
     ${blogs
       .map((blog) => {
         return `
     <url>
       <loc>${EXTERNAL_DATA_URL}/blog/${blog.slug}</loc>
       <lastmod>${new Date(blog.updatedAt || blog.createdAt).toISOString()}</lastmod>
       <changefreq>monthly</changefreq>
       <priority>0.7</priority>
     </url>
       `;
       })
       .join('')}
   </urlset>
 `;
}

export async function getServerSideProps({ res }) {
  try {
    // Fetch blog posts
    const blogsRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs`);
    const blogsData = await blogsRes.json();
    const blogs = blogsData.data || [];

    const sitemap = generateSiteMap(blogs);

    res.setHeader('Content-Type', 'text/xml');
    res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate');
    res.write(sitemap);
    res.end();

    return {
      props: {},
    };
  } catch (error) {
    console.error('Sitemap generation error:', error);
    
    // Return minimal sitemap on error
    const minimalSitemap = generateSiteMap([]);
    res.setHeader('Content-Type', 'text/xml');
    res.write(minimalSitemap);
    res.end();
    
    return {
      props: {},
    };
  }
}

export default function Sitemap() {
  return null;
}
