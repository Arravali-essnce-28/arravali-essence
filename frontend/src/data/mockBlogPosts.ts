interface BlogPost {
  title: string;
  slug: { current: string };
  excerpt: string;
  publishedAt: string;
  author: string;
  mainImage: any;
  categories: string[];
  body: any;
}

export const mockBlogPosts: BlogPost[] = [
  {
    title: "The Art of Spice Blending: Creating Perfect Flavor Combinations",
    slug: { current: "art-of-spice-blending" },
    excerpt: "Discover the secrets behind creating perfectly balanced spice blends that will elevate your cooking to new heights. Learn about flavor profiles, pairing principles, and professional techniques.",
    publishedAt: "2024-12-15T10:00:00Z",
    author: "Chef Maria Rodriguez",
    mainImage: {
      _type: "image",
      url: "https://images.unsplash.com/photo-1519996529931-28324d5a630e?w=800"
    },
    categories: ["Spice Blends", "Cooking Tips", "Flavor"],
    body: [
      {
        _type: "block",
        style: "h2",
        children: [{ text: "Understanding Flavor Profiles", _type: "span", marks: [] }]
      },
      {
        _type: "block",
        children: [{ text: "Creating the perfect spice blend is both an art and a science. It requires understanding how different flavors interact and complement each other. In this comprehensive guide, we'll explore the fundamental principles of spice blending that professional chefs use to create memorable dishes.", _type: "span", marks: [] }]
      }
    ]
  },
  {
    title: "Turmeric: The Golden Spice with Amazing Health Benefits",
    slug: { current: "turmeric-health-benefits" },
    excerpt: "Explore the incredible health benefits of turmeric, from its anti-inflammatory properties to its role in traditional medicine. Learn how to incorporate this golden spice into your daily routine.",
    publishedAt: "2024-12-10T14:30:00Z",
    author: "Dr. James Chen",
    mainImage: {
      _type: "image",
      url: "https://images.unsplash.com/photo-1582734158340-b3c5c5b0c9b1?w=800"
    },
    categories: ["Health", "Turmeric", "Wellness"],
    body: [
      {
        _type: "block",
        style: "h2",
        children: [{ text: "The Power of Curcumin", _type: "span", marks: [] }]
      },
      {
        _type: "block",
        children: [{ text: "Turmeric has been used for thousands of years in traditional medicine, and modern science is now confirming what ancient healers knew all along. The active compound curcumin is responsible for most of turmeric's health benefits.", _type: "span", marks: [] }]
      }
    ]
  },
  {
    title: "Cardamom: The Queen of Spices in Your Kitchen",
    slug: { current: "cardamom-queen-spices" },
    excerpt: "Discover why cardamom is called the 'Queen of Spices' and learn how to use this aromatic pod in both sweet and savory dishes. From Scandinavian baking to Indian curries, cardamom adds unique flavor.",
    publishedAt: "2024-12-05T09:15:00Z",
    author: "Priya Sharma",
    mainImage: {
      _type: "image",
      url: "https://images.unsplash.com/photo-1608142947417-5d0535b9e7c5?w=800"
    },
    categories: ["Cardamom", "Cooking", "Baking"],
    body: [
      {
        _type: "block",
        style: "h2",
        children: [{ text: "Types of Cardamom", _type: "span", marks: [] }]
      },
      {
        _type: "block",
        children: [{ text: "There are two main types of cardamom: green and black. Green cardamom has a more delicate, sweet flavor, while black cardamom is smoky and intense. Each type has its own special place in the culinary world.", _type: "span", marks: [] }]
      }
    ]
  },
  {
    title: "Cinnamon: From Ancient Medicine to Modern Kitchen",
    slug: { current: "cinnamon-ancient-modern" },
    excerpt: "Journey through the fascinating history of cinnamon, from its use in ancient Egyptian medicine to its place in modern kitchens worldwide. Learn about different varieties and their unique characteristics.",
    publishedAt: "2024-11-28T16:45:00Z",
    author: "Michael Thompson",
    mainImage: {
      _type: "image",
      url: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800"
    },
    categories: ["Cinnamon", "History", "Cooking"],
    body: [
      {
        _type: "block",
        style: "h2",
        children: [{ text: "Ceylon vs Cassia", _type: "span", marks: [] }]
      },
      {
        _type: "block",
        children: [{ text: "Not all cinnamon is created equal. Ceylon cinnamon, known as 'true cinnamon', has a delicate, sweet flavor with complex notes, while cassia cinnamon is more robust and commonly found in supermarkets.", _type: "span", marks: [] }]
      }
    ]
  },
  {
    title: "Creating Your Own Curry Powder: A Step-by-Step Guide",
    slug: { current: "homemade-curry-powder" },
    excerpt: "Learn how to create your own signature curry powder blend at home. We'll cover the essential spices, toasting techniques, and storage tips that will make your homemade blend better than store-bought.",
    publishedAt: "2024-11-20T11:00:00Z",
    author: "Sarah Johnson",
    mainImage: {
      _type: "image",
      url: "https://images.unsplash.com/photo-1519996529931-28324d5a630e?w=800"
    },
    categories: ["DIY", "Curry", "Spice Blends"],
    body: [
      {
        _type: "block",
        style: "h2",
        children: [{ text: "Essential Ingredients", _type: "span", marks: [] }]
      },
      {
        _type: "block",
        children: [{ text: "A great curry powder starts with high-quality ingredients. We'll explore the core spices that form the foundation of most curry blends and how to balance them for perfect flavor.", _type: "span", marks: [] }]
      }
    ]
  }
];

export const mockCategories = ["Spice Blends", "Cooking Tips", "Health", "Turmeric", "Wellness", "Cardamom", "Baking", "Cinnamon", "History", "DIY", "Curry", "Flavor"];
