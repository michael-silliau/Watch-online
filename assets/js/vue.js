// data
const products = [
  {
    id: 1,
    description: "Quarz Luxe",
    price: 120,
    img: "assets/img/quarz-luxe.JPG",
  },
  {
    id: 2,
    description: "Curren Business",
    price: 200,
    img: "assets/img/curren-business.JPG",
  },
  {
    id: 3,
    description: "Curren Sport",
    price: 500,
    img: "assets/img/curren-sport.JPG",
  },
  {
    id: 4,
    description: "Jaragar Racing",
    price: 800,
    img: "assets/img/jaragar-racing.JPG",
  },
  {
    id: 5,
    description: "Liges Hommes",
    price: 300,
    img: "assets/img/liges-hommes.JPG",
  },
  {
    id: 6,
    description: "Maserati Mechanical",
    price: 650,
    img: "assets/img/maserati-mechanical.JPG",
  },
  {
    id: 7,
    description: "Montre Mecanique",
    price: 250,
    img: "assets/img/montre-mecanique.JPG",
  },
  {
    id: 8,
    description: "Brand Designer",
    price: 280,
    img: "assets/img/brand-designer.JPG",
  },
  {
    id: 9,
    description: "Relogio Masculino",
    price: 400,
    img: "assets/img/relogio-masculino.JPG",
  },
  {
    id: 10,
    description: "Tissot Multifunction",
    price: 290,
    img: "assets/img/tissot-multifunction.JPG",
  },
  {
    id: 11,
    description: "Hip Hop Gold",
    price: 870,
    img: "assets/img/hiphop-gold.JPG",
  },
  {
    id: 12,
    description: "Mesh Genova",
    price: 600,
    img: "assets/img/mesh-genova.JPG",
  },
];

//component

const Home = {
  template: "#home",
  name: "Home",
  data: () => {
    return {
      products,
      searchKey: "",
      liked: [],
      cart: [],
    };
  },
  computed: {
    //filtre l'input en fonction des datas en minuscules this = home/products ,
    filteredList() {
      return this.products.filter((product) => {
        return product.description
          .toLowerCase()
          .includes(this.searchKey.toLowerCase());
      });
    },
    getLikeCookie() {
      let cookieValue = JSON.parse($cookies.get("like")); //analyse la chaine de caractere json
      cookieValue == null ? (this.liked = []) : (this.liked = cookieValue);
    },
    cartTotalAmount() {
      let total = 0;
      for (let item in this.cart) {
        total = total + this.cart[item].quantity * this.cart[item].price; //
      }
      return total;
    },
    itemTotalAmount() {
      let itemTotal = 0;
      for (let item in this.cart) {
        itemTotal = itemTotal + this.cart[item].quantity; //
      }
      return itemTotal;
    },
  },
  methods: {
    setLikeCookie() {
      //ecoute l'evenement
      $cookies.set("like", JSON.stringify(this.liked)); //transforme en json
    },
    addToCart(product) {
      // check if already in array  si id est egale a l id que tu rajoute increment de 1
      for (let i = 0; i < this.cart.length; i++) {
        if (this.cart[i].id === product.id) {
          return this.cart[i].quantity++;
        }
      }
      this.cart.push({
        id: product.id,
        img: product.img,
        description: product.description,
        price: product.price,
        quantity: 1,
      });
    },
    cartPlusOne(product) {
      product.quantity = product.quantity + 1;
    },
    cartMinusOne(product, id) {
      if (product.quantity == 1) {
        this.cartRemoveItem(id);
      } else {
        product.quantity = product.quantity - 1;
      }
    },
    cartRemoveItem(id) {
      this.cart.splice(id, 1);
    },
  },
  mounted: () => {
    this.getLikeCookie; //a chaque lancement de page , il lance getlikecookie
  },
};
const UserSettings = {
  template: "<h1>UserSettings</h1>",
  name: "User Settings",
};
const WatchList = {
  template: "<h1>WatchList</h1>",
  name: "Watch List",
};
const ShoppingCart = {
  template: "<h1>ShoppingCart</h1>",
  name: "Shopping Cart",
};

//router
const routes = [
  {
    path: "/",
    component: Home,
    name: "Home",
  },
  {
    path: "/user-settings",
    component: UserSettings,
    name: "User Settings",
  },
  {
    path: "/watch-list",
    component: WatchList,
    name: "WatchList",
  },
  {
    path: "/shopping-cart",
    component: ShoppingCart,
    name: "ShoppingCart",
  },
];

// 3. Créez l'instance de routeur et passez l'option `routes`
// Vous pouvez passer des options supplémentaires ici, mais passons
// reste simple pour l'instant.
const router = VueRouter.createRouter({
  // 4. Indiquez l'implémentation de l'historique à utiliser. Nous utilisons ici l'historique de hachage pour plus de simplicité.
  history: VueRouter.createWebHashHistory(),
  routes, // abréviation de `routes : routes`
});

// 5. Créez et montez l'instance racine.
const app = Vue.createApp({});
// Assurez-vous d'_utiliser_ l'instance du routeur pour faire le
// toute l'application est compatible avec le routeur.
app.use(router);

app.mount("#app");
