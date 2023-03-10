const { ApolloServer, gql } = require("apollo-server");

const products = [
  {
    id: "53a0724c-a416-4cac-ae45-bfaedce1f147",
    name: "Steel Pot",
    description: "Silver steel pot that is perfect for cooking",
    quantity: 230,
    price: 42.44,
    image:
      "https://static-01.daraz.com.bd/p/1feaade4220978dc9066a458e5a99e1e.png",
    onSale: false,
    categoryId: "c01b1ff4-f894-4ef2-b27a-22aacc2fca70",
  },
  {
    id: "c2af9adc-d0b8-4d44-871f-cef66f86f7f6",
    name: "Salad Bowl",
    description: "Round wooden bowl perfect for tossing and making salads",
    quantity: 33,
    price: 53.5,
    image:
      "https://static-01.daraz.com.bd/p/1feaade4220978dc9066a458e5a99e1e.png",
    onSale: false,
    categoryId: "c01b1ff4-f894-4ef2-b27a-22aacc2fca70",
  },
  {
    id: "2c931e7e-510f-49e5-aed6-d6b44087e5a1",
    name: "Spoon",
    description: "Small and delicate spoon",
    quantity: 4266,
    price: 1.33,
    image:
      "https://static-01.daraz.com.bd/p/4c4c2594b5bc6d812140d6eaf2180a1a.jpg",
    onSale: true,
    categoryId: "c01b1ff4-f894-4ef2-b27a-22aacc2fca70",
  },
  {
    id: "404daf2a-9b97-4b99-b9af-614d07f818d7",
    name: "Shovel",
    description: "Grey rounded shovel for digging",
    quantity: 753,
    price: 332,
    image:
      "https://static-01.daraz.com.bd/p/mdc/ccb7c7906054ad3a131ba5b30c1eac69.jpg",
    onSale: false,
    categoryId: "d914aec0-25b2-4103-9ed8-225d39018d1d",
  },
  {
    id: "6379c436-9fad-4b3f-a427-2d7241f5c1b1",
    name: "Fertilizer",
    description: "Nitrogen based fertitlizer",
    quantity: 53453,
    price: 23.11,
    image:
      "https://static-01.daraz.com.bd/p/2b1aa36ae2234f4b4e78b5eb2ed2dd3c.jpg",
    onSale: true,
    categoryId: "d914aec0-25b2-4103-9ed8-225d39018d1d",
  },
  {
    id: "f01bcdec-6783-464e-8f9e-8416830f7569",
    name: "Basketball",
    description: "Outdoor or indoor basketball",
    quantity: 128,
    price: 59.99,
    image:
      "https://static-01.daraz.com.bd/p/be3d2787738ff58a6f54265f6b0a9969.jpg",
    onSale: true,
    categoryId: "34115aac-0ff5-4859-8f43-10e8db23602b",
  },
  {
    id: "a4824a31-5c83-42af-8c1b-6e2461aae1ef",
    name: "Golf Clubs",
    description: "Good for golfing",
    quantity: 3,
    price: 427.44,
    image:
      "https://static-01.daraz.com.bd/p/be3d2787738ff58a6f54265f6b0a9969.jpg",
    onSale: false,
    categoryId: "34115aac-0ff5-4859-8f43-10e8db23602b",
  },
  {
    id: "b553085a-a7e0-4c9b-8a12-f971919c3683",
    name: "Baseball Gloves",
    description: "Professional catcher gloves",
    quantity: 745,
    price: 77.0,
    image:
      "https://static-01.daraz.com.bd/p/be3d2787738ff58a6f54265f6b0a9969.jpg",
    onSale: true,
    categoryId: "d914aec0-25b2-4103-9ed8-225d39018d1d",
  },
  {
    id: "47bf3941-9c8b-42c0-9c72-7f3985492a5b",
    name: "Soccer Ball",
    description: "Round ball",
    quantity: 734,
    price: 93.44,
    image:
      "https://static-01.daraz.com.bd/p/be3d2787738ff58a6f54265f6b0a9969.jpg",
    onSale: false,
    categoryId: "d914aec0-25b2-4103-9ed8-225d39018d1d",
  },
];

const categories = [
  {
    id: "c01b1ff4-f894-4ef2-b27a-22aacc2fca70",
    name: "Kitchen",
  },
  {
    id: "34115aac-0ff5-4859-8f43-10e8db23602b",
    name: "Garden",
  },
  {
    id: "d914aec0-25b2-4103-9ed8-225d39018d1d",
    name: "Sports",
  },
];

const typeDefs = gql`
  type Query {
    userNames: [String!]!
    products: [Product!]!
    product(id: ID!): Product
    categories: [Category!]!
    category(id: ID!): Category
  }

  type Product {
    id: ID!
    name: String!
    description: String!
    quantity: Int!
    price: Float!
    image: String
    onSale: Boolean!
    category: Category!
  }
  type Category {
    id: ID!
    name: String!
    products: [Product!]!
  }
`;

const resolvers = {
  Query: {
    userNames: () => {
      return ["Rahim", "Karim", "Tamim"];
    },

    // product resolvers
    products: () => {
      return products;
    },
    product: (parent, args, context) => {
      const { id } = args;
      const product = products.find((product) => product.id === id);

      if (!product) {
        return null;
      }
      return product;
    },

    // category resolvers
    categories: () => {
      return categories;
    },
    category: (parent, args, context) => {
      const { id } = args;
      const category = categories.find((data) => data.id === id);

      if (!category) {
        return null;
      }
      return category;
    },
  },

  // Product resolver
  Product: {
    category: (parent, args, context) => {
      const categoryId = parent.categoryId;
      return categories.find((category) => category.id === categoryId);
    },
  },
  // Category resolver
  Category: {
    products: (parent, args, context) => {
      console.log(parent);
      // parent use korle parent er id pabo
      const categoryId = parent.id;
      return products.filter((product) => product.categoryId === categoryId);
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const PORT = 8800;

server.listen().then(({ url }) => {
  console.log(`Server is running on port ${url}`);
});
// server.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
