
Vue.component('Pet', {
    props: ['petName', 'petSpecies'],
    template: `<span class="text-left"> 
        <h4>{{PetName}}</h4>
        <p>{{PetSpecies}}</p>

    </span>`
})
Vue.component('Pet-List', {
    template: `<span>
        <ul>
            <li v-for="pet in pets">
                <Pet :petName="pet.petName" :petSpecies="pet.petSpecies"></Pet>
            </li>
        </ul>
    </span>
        `,
    data() {
        return {
            pets: [{
                petName: 'Cleo',
                petSpecies: 'Cat'
            }, {
                petName: 'Sylvester',
                petSpecies: 'Cat'
            }, {
                petName: 'Tweety',
                petSpecies: 'Cannary'
            }]
        }
    }
})
Vue.component('post', {
    props: ['url', 'title', 'description'],
    template: '<span class="text-center"><h3> {{title}} </h3> <img v-bind:src="url" width="100%" height="40%"/><p>{{description}}</p></span>'

});

Vue.component('Post-List', {
    template: `
<ul>
<li v-for="r in results">
<post :title="r.title" :url="r.url" :description="r.description"></post>
</li>
</ul>
`,
    data() {
        return {
            results: [{
                url: 'static/Cat1.jpg',
                title: 'On a Log',
                description: 'Yes, bow to me peasants'
            }, {
                url: 'https://www.oakridgepointingdogs.com/wp-content/uploads/2016/04/english_Pointer.jpg',
                title: 'It is over there',
                description: 'Showing my human where the destardly squirrel is'
            },
            {
                url: 'static/Sylvester.jpg',
                title: 'Holding my humans hand',
                description: 'Settle down human'
            }
            ]
        };
    }
});
Vue.component('userHome', {
    template: `
    <section>
    <div class="col-4">
        <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#userProfile" aria-expanded="false" aria-controls="userProfile">
User Profile
</button>
        <div class="collapse p-2" id="userProfile">
            <div class="card card-body">
                <h2><i class="bi-search"></i> Search</h2>
                <h2><i class="bi-plus-square"></i> Post </h2>
            </div>
        </div>
        <div class="row m-2"></div>
        <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#userPets" aria-expanded="false" aria-controls="userPets">
Your Pets
</button>
        <div class="collapse p-2" id="userPets">
            <div class="card card-body">
                <h2>
                    <i class="bi-square"></i> Show
                </h2>
                <h2>
                    <i class="bi-plus-square "></i> Add
                </h2>
                <h2>
                    <i class="bi-dash-square"></i> Remove
                </h2>
            </div>
        </div>
    </div>
    
    <div class="col-8 col-md-5" id="feed">
        <span><Post-List></Post-List></span>
    </div>
    <div class="col-0 col-md-3" id="bio">
        <p>Pet Bio will go here</p>
    </div>
</span>
</section>
    `
})
var vm = new Vue({
    el: `#app`,
    data: {
        serviceURL: "https://cs3103.cs.unb.ca:43075",
        authenticated: false,
        petsData: null,
        loggedIn: null,
        input: {
            username: "",
            password: ""
        },
        selectedPet: {
            petSpecies: "",
            petBreed: "",
            petName: "",
            petAge: ""
        },
        selectedImage: {
            ImageFileExtension: "", 
            ImageFileName: "",
            ImagePath: ""
        },
        selectedPost: {
            caption: ""
        }
    },
    template: `
    <div class="container-fluid">
    <div class="absolute">
    <div class="row bg-light p-2 m-2">
       <div class="login">
          <div class="col-12 text-center">
             <h1> Pets </h1>
          </div>
       </div>
       </div>
       <!--The main Body of the page-->
       <section v-if="!authenticated">
          <div class="relative">
             <div class="row bg-dark text-white m-2">
                <nav class="nav nav-tabs">
                   <div class="col-4 col-lg-2">
                      <a href="#" class="nav-item nav-link">
                         <h2><i class="bi-house-door"></i> Home</h2>
                      </a>
                   </div>
                   <div class="col-1 col-lg-1"></div>
                   <div class="col-4 col-lg-4">
                      <a href="#" class="nav-item nav-link">
                         <h2><i class="bi-person"></i> Profile</h2>
                      </a>
                   </div>
                   <div class="col-0 col-lg-3"></div>
                   <div class="col-3 col-lg-2 text-dark">
                      <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#menu" aria-expanded="false" aria-controls="userPets">
                         <h2><i class="bi-menu"></i> Menu</h2>
                      </button>
                      <div class="collapse" id="menu">
                         <div class="card card-body">
                            <h2>
                               Logout
                            </h2>
                            <h2>Info</h2>
                            <h2>Pets</h2>
                            <h2>Posts</h2>
                         </div>
                      </div>
                   </div>
                </nav>
             </div>
          </div>
          <div class="row bg-light text-dark m-2">
             <userHome></userHome>
          </div>
       </section>
       <section v-if="authenticated">
          <div>
             <div class="form-group text-center">
                <input class="col-4 mx-auto form-control" type="text" name="username" v-model="input.username" placeholder="Username" />
                <input class="col-4 mx-auto form-control" type="password" name="password" v-model="input.password" placeholder="Password" />
                <button class="col-4 btn btn-outline-success" type="button" v-on:click="login()">Login</button>
             </div>
       </section>
       <div class="footer text-center">
       <h1>Contact</h1>
       ldavids2@unb.ca
       <br> tshort1@unb.ca
       <br> tcampbe6@unb.ca
       <br> Copyright 2022
       </div>

    </div>
        `,
    methods: {
        login() {
if (this.input.username != "" && this.input.password != "") {
axios
.post(this.serviceURL+"/signin", {
    "username": this.input.username,
    "password": this.input.password
})
.then(response => {
    if (response.data.status == "success") {
      this.authenticated = true;
      this.loggedIn = response.data.user_id;
    }
})
.catch(e => {
    alert("The username or password was incorrect, try again");
    this.input.password = "";
    console.log(e);
});
} else {
alert("A username and password must be present");
}
},


logout() {
    alert("No magic on the server yet. You'll have to write the logout code there.");
    axios
    .delete(this.serviceURL+"/signin")
    .then(response => {
    location.reload();
    })
    .catch(e => {
    console.log(e);
    });
    },
        }
});
