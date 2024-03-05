let elementsel=document.querySelector(".elements");
let cartitemsel=document.querySelector(".offcanvas-body");
let subtotalel=document.querySelector(".subtotal");
let itemsincartel=document.querySelector(".btn-light span");
const products=[
    {
        id:1,
        name:"Haldiram's Sev Bhujiya",
        desc:"Snacks & Munchies",
        stock:10,
        price:18,
        qty:0
    },
    {
        id:2,
        name:"NutriChoice Digestive",
        desc:"Bakery & Buiscuits",
        stock:8,
        price:24,
        qty:0
    },
    {
        id:3,
        name:"Cadbury 5 Star Chocolate",
        desc:"Bakery & Buiscuits",
        stock:9,
        price:32,
        qty:0
    },
    {
        id:4,
        name:"Onion Flavour Potato",
        desc:"Snacks & Munchies",
        stock:10,
        price:3,
        qty:0
    },
    {
        id:5,
        name:"Salted instant popcorn",
        desc:"Instant food",
        stock:5,
        price:13,
        qty:0
    },
    {
        id:6,
        name:"Blueberry Greek Yogurt",
        desc:"Dairy, Bread & Eggs",
        stock:6,
        price:18,
        qty:0
    },
    {
        id:7,
        name:"Britannia Cheese Slices",
        desc:"Dairy, Bread & Eggs",
        stock:7,
        price:24,
        qty:0
    },
    {
        id:8,
        name:"Kellog's original cereals",
        desc:"Instant Food",
        stock:8,
        price:32,
        qty:0
    },
    {
        id:9,
        name:"Slurrp Millet Chocolate",
        desc:"Snacks & Munchies",
        stock:9,
        price:3,
        qty:0
    },
    {
        id:10,
        name:"Amul Butter - 500g",
        desc:"Dairy, Bread & Eggs",
        stock:10,
        price:13,
        qty:0
    }
]
function displayproducts()
{
    products.forEach((product)=>{
        elementsel.innerHTML+=`
        <div class="col-md-2">
        <div class="card">
        <div class="card-body">
          
          <img src="images/${product.id}.jpg" height="140" width="140">
          <div class="d-flex justify-content-center d-none">
            <div class="p-2"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
              <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
              <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
            </svg></div>
            <div class="p-2"><i class="fa-regular fa-heart"></i></div>
            <div class="p-2"><i class="fa-solid fa-arrow-right-arrow-left"></i></div>
          </div>
          
          <p class="card-text text-muted">${product.desc}</p>
          <a href="details.html"><p style="font-size:15px;">${product.name}</p></a>
          <div class="d-flex" style="font-size:12px;">
          <i class="fa-solid fa-star text-warning"></i><i class="fa-solid fa-star text-warning"></i><i class="fa-solid fa-star text-warning"></i><i class="fa-solid fa-star text-warning"></i><i class="fa-solid fa-star-half-stroke text-warning"></i>
          <p class="text-muted">4.5(149)</p>         
          </div>
          <div class="d-flex" style="font-size:12px;">
            <p>$${product.price}</p><p class="text-muted flex-grow-1">$24</p> 
            <button type="button" class="btn btn-sm btn-success" onclick="addtocart(${product.id})">+ Add</button>        
          </div>
        </div>
      </div>
      </div>    
  </div>`;
    });
}
displayproducts();
let cart=JSON.parse(localStorage.getItem("CART")) || [];
updatecart();
function addtocart(id)
{
    // check if product already exist
    if(cart.some((item)=>item.id===id))
    {
        changeqty("plus",id);
    }
    else
    {
        const item=products.find((product)=>product.id===id);
    cart.push({
        ...item,
        qty:1
    });
    
    }
   updatecart(); 
}
function updatecart()
{
    rendercartitems();
    rendersubtotal();
    localStorage.setItem("CART",JSON.stringify(cart));
}
function rendercartitems()
{
    cartitemsel.innerHTML="";
    cart.forEach((item)=>{
cartitemsel.innerHTML+=`
                  <table class="table w-100">
                  <tbody>
                    <tr><td><img src="images/${item.id}.jpg" height=50 width=50></td>
                    <td><p style="font-size:13px;">${item.name}</p></td>
                    <td>$${item.price}</td>
                    <td><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash-circle" viewBox="0 0 16 16" onclick="changeqty('minus',${item.id})">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                    <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
                  </svg> ${item.qty} <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16" onclick="changeqty('plus',${item.id})">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                  </svg></td>
                    <td><i class="fa-solid fa-trash text-primary" onclick="removeitem(${item.id})"></i></td>
                  </tr></tbody></table>`

    })
}
function changeqty(action,id)
{
    cart=cart.map((item)=>{
        let qty=item.qty;
        if(item.id===id)
        {
            if(action==="minus" && qty>1)
            {
                qty--;
            }
            else if(action==="plus" && qty<item.stock)
            {
                qty++;
            }
        }
        return {
            ...item,
            qty,
        };
    })
    updatecart();
}
function rendersubtotal()
{
    let totalprice=0,totalitems=0;
    cart.forEach((item)=>{
        totalprice+=item.price*item.qty;
        totalitems+=item.qty;
    });
    subtotalel.innerHTML=`Subtotal(${totalitems} items):$${totalprice.toFixed(2)}`
    itemsincartel.innerHTML= totalitems;            
}
function removeitem(id)
{
    cart=cart.filter((item)=>item.id!==id);
    updatecart();
}

