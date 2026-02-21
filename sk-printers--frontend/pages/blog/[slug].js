import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/layout/Layout';
import { FaClock, FaUser, FaCalendar, FaTag, FaArrowLeft } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function BlogPost() {
  const router = useRouter();
  const { slug } = router.query;

  const post = {
    title: 'Top 10 Packaging Tips for E-commerce Businesses',
    slug: 'top-10-packaging-tips-ecommerce',
    excerpt: 'Learn how to choose the right packaging for your e-commerce products.',
    content: `
      <h2>Introduction</h2>
      <p>Packaging is crucial for e-commerce success. Here are our top 10 tips to help you choose the best packaging for your products.</p>
      
      <h2>1. Choose the Right Box Size</h2>
      <p>Selecting the correct box size prevents product damage and reduces shipping costs. Too large boxes waste space and materials, while too small boxes risk damaging your products.</p>
      
      <h2>2. Consider Box Strength</h2>
      <p>3-ply boxes work well for lightweight items, 5-ply for medium weight, and 7-ply for heavy items. Always match the box strength to your product weight.</p>
      
      <h2>3. Use Proper Cushioning</h2>
      <p>Protect your products with appropriate cushioning materials. Bubble wrap, air pillows, or paper padding can prevent damage during transit.</p>
      
      <h2>4. Brand Your Packaging</h2>
      <p>Custom printed boxes create a memorable unboxing experience and reinforce your brand identity. It's an investment that pays off in customer loyalty.</p>
      
      <h2>5. Think Sustainability</h2>
      <p>Use recyclable materials and minimize excess packaging. Customers appreciate eco-friendly businesses.</p>
      
      <h2>6. Test Your Packaging</h2>
      <p>Before ordering in bulk, test your packaging with actual products to ensure it protects well and looks professional.</p>
      
      <h2>7. Optimize for Shipping Costs</h2>
      <p>Dimensional weight pricing means that lighter, smaller packages cost less to ship. Choose packaging that minimizes both weight and size.</p>
      
      <h2>8. Include Clear Handling Instructions</h2>
      <p>Labels like "Fragile," "This Side Up," or "Handle with Care" help ensure your packages are treated properly.</p>
      
      <h2>9. Seal Securely</h2>
      <p>Use quality packing tape and seal all seams thoroughly. Water-activated tape provides extra security.</p>
      
      <h2>10. Get Samples First</h2>
      <p>Always request samples before placing large orders. This lets you verify quality and make necessary adjustments.</p>
      
      <h2>Conclusion</h2>
      <p>Great packaging protects your products, delights customers, and represents your brand. Contact SK Printers for custom packaging solutions tailored to your e-commerce needs.</p>
    `,
    author: { name: 'SK Printers Team', avatar: '' },
    category: 'packaging-tips',
    tags: ['e-commerce', 'packaging', 'tips', 'business'],
    readTime: 5,
    publishedAt: '2024-02-10',
    featuredImage: { url: '/images/blog-featured.jpg', alt: 'Packaging tips' },
  };

  const relatedPosts = [
    { title: 'How to Choose Between 3-Ply, 5-Ply, and 7-Ply Boxes', slug: 'choose-boxes', readTime: 8 },
    { title: 'Sustainable Packaging Guide', slug: 'sustainable-packaging', readTime: 6 },
    { title: 'Custom Printing Options for Boxes', slug: 'custom-printing', readTime: 4 },
  ];

  return (
    <Layout>
      <Head>
        <title>{post.title} - SK Printers Blog</title>
        <meta name="description" content={post.excerpt} />
      </Head>

      <div className="bg-gray-50 py-4">
        <div className="container-custom">
          <Link href="/blog" className="inline-flex items-center text-primary-600 hover:text-primary-700">
            <FaArrowLeft className="mr-2" />
            Back to Blog
          </Link>
        </div>
      </div>

      <article className="section-padding">
        <div className="container-custom max-w-4xl">
          <div className="h-96 bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl mb-8 flex items-center justify-center">
            <FaTag size={80} className="text-gray-400" />
          </div>

          <div className="mb-4">
            <span className="px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold">
              Packaging Tips
            </span>
          </div>

          <motion.h1 
            className="text-4xl md:text-5xl font-black mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {post.title}
          </motion.h1>

          <div className="flex flex-wrap gap-6 text-gray-600 mb-8 pb-8 border-b">
            <div className="flex items-center">
              <FaUser className="mr-2" />
              {post.author.name}
            </div>
            <div className="flex items-center">
              <FaCalendar className="mr-2" />
              {new Date(post.publishedAt).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
            <div className="flex items-center">
              <FaClock className="mr-2" />
              {post.readTime} min read
            </div>
          </div>

          <div 
            className="prose prose-lg max-w-none mb-12"
            dangerouslySetInnerHTML={{ __html: post.content }}
            style={{ lineHeight: '1.8' }}
          />

          <div className="mb-12">
            <h3 className="font-bold mb-4">Tags:</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, i) => (
                <span 
                  key={i}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 mb-12">
            <h3 className="font-bold mb-4">Share this article:</h3>
            <div className="flex gap-4">
              <a href="#" className="btn btn-outline">Twitter</a>
              <a href="#" className="btn btn-outline">Facebook</a>
              <a href="#" className="btn btn-outline">LinkedIn</a>
            </div>
          </div>

          <div className="bg-primary-50 rounded-xl p-8 mb-12">
            <div className="flex items-start gap-4">
              <div className="w-20 h-20 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold flex-shrink-0">
                SK
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">{post.author.name}</h3>
                <p className="text-gray-700">
                  The SK Printers team brings years of experience in packaging solutions, 
                  helping businesses choose the right corrugated boxes for their needs.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-6">Related Articles</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost, i) => (
                <div key={i} className="card hover:shadow-lg transition-shadow">
                  <h4 className="font-bold mb-2">{relatedPost.title}</h4>
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <FaClock className="mr-2" />
                    {relatedPost.readTime} min read
                  </div>
                  <Link href={`/blog/${relatedPost.slug}`} className="text-primary-600 hover:text-primary-700 font-semibold">
                    Read More →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </article>

      <section className="section-padding bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-4">Need Custom Packaging?</h2>
          <p className="text-xl mb-8">Get a quote for your packaging requirements</p>
          <Link href="/get-quote" className="btn bg-white text-primary-700 hover:bg-gray-100 text-lg px-8 py-4">
            Get Free Quote
          </Link>
        </div>
      </section>
    </Layout>
  );
}
