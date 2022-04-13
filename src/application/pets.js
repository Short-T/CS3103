
Vue.component('Pet', {
    props: ['petName', 'petSpecies'],
    template: `<span class="text-left"> 
        <h4>{{petName}}</h4>
        <p>{{petSpecies}}</p>

    </span>`
})
Vue.component('PetList', {
    template: `<span>
        <ul>
            <li v-for="pet in pets">
                <Pet v-bind:petName="pet.petName" v-bind:petSpecies="pet.petSpecies"></Pet>
            </li>
        </ul>
    </span>
        `,
        props: ['loggedIn'],
    // data() {
    //     return {
    //         pets: [{
    //             petName: 'Monikier',
    //             petSpecies: 'Cat'
    //         }, {
    //             petName: 'Sylvester',
    //             petSpecies: 'Cat'
    //         }, {
    //             petName: 'Tweety',
    //             petSpecies: 'Cannary'
    //         }]
    //     }
    // },
    data : {
        pets: [],
    },
    mounted() {
        axios
        .get(this.serviceURL+"/"+ loggedIn +"/pets")
        .then(response =>  {
          if (this.authenticated == true) {
            this.petsData = response.data.pets;
          }
        })
        .catch(e => {
          alert("Unable to retrieve your pet data");
          console.log(e);
        });
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
Vue.component('uploadPage',{
    template: `
        <section>
        <form>
            <input type="file" id="myFile" name="filename">
            <input type="submit" value="submit" v-on:click="upload">
        </form>
        </section>
    `,
    methods: {
        upload() {
            this.$parent.uploadImage('form');
        }
    }
})
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
                <h2 v-on:click="postView()"><i class="bi-plus-square"></i> Post </h2>
            </div>
        </div>
        <div class="row m-2"></div>
        <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#userPets" aria-expanded="false" aria-controls="userPets">
Your Pets
</button>
        <div class="collapse p-2" id="userPets">
            <div class="card card-body">
                <h2 v-on:click="petList()">
                    <i class="bi-square"></i> Show
                </h2>
                <h2 v-on:click="petAddView()">
                    <i class="bi-plus-square "></i> Add
                </h2>
                <h2 v-on:click="petDeleteView()">
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
    `,
    methods: {
        petList() {
            this.$parent.goPetList(true);
        },
        postView() {
            this.$parent.goPostForm();
        },
        petAddView() {
            this.$parent.goAddPet();
        },
        petDeleteView() {
            this.$parent.goDeletePet();
        }
    }
})
var vm = new Vue({
    el: `#app`,
    data: {
        serviceURL: "https://cs3103.cs.unb.ca:43075",
        authenticated: false,
        home: true,
        profile: false,
        petList: false,
        userPets: false,
        userPosts: false,
        postForm: false,
        addPet: false,
        deletePet: false,
        imagesData: null,
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
            ImagePath: "",
            ImageTitle: "",
            ImageDescription: ""
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
       <section v-if="authenticated">
          <div class="relative">
             <div class="row bg-dark text-white m-2">
                <nav class="nav nav-tabs">
                   <div class="col-4 col-lg-2">
                      <a href="#" class="nav-item nav-link" v-on:click="goHome()">
                         <h2><i class="bi-house-door"></i> Home</h2>
                      </a>
                   </div>
                   <div class="col-1 col-lg-1"></div>
                   <div class="col-4 col-lg-4">
                      <a href="#" class="nav-item nav-link" v-on:click="goProfile()">
                         <h2><i class="bi-person"></i> Profile</h2>
                      </a>
                   </div>
                   <div class="col-0 col-lg-3"></div>
                   <div class="col-3 col-lg-2 text-dark">
                   <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" data-bs-target="#menu" aria-haspopup="true" aria-expanded="false" aria-controls="userPets">
                   <h2><i class="bi-menu"></i> Menu</h2>
                 </button>
               <div class="dropdown-menu" id="menu">
                         <div class="card card-body">
                            <h2 v-on:click="logout()">
                               Logout
                            </h2>
                            <h2>Info</h2>
                            <h2 v-on:click="goPetList(false)">Pets</h2>
                            <h2 v-on:click="goUserPosts()">Posts</h2>
                         </div>
                      </div>
                   </div>
                </nav>
             </div>
          </div>
          <section v-if="home">
            <div class="row bg-light text-dark m-2">
                <userHome></userHome>
            </div>
          </section>
          <section v-if="profile">
            <h1> Profile will be displayed here </h1>
          </section>
          <section v-if="petList">
            <div v-if="petsData != null" id="petsList">
                <div v-if="userPets == true">
                    <h1> Your pets :  </h1>
                    <ul>
                        <div v-for="pet in petsData">
                            <div class="list-of-pets" v-if="pet.UserId == loggedIn">
                                {{pet.PetName}} the {{pet.PetBreed}} {{pet.PetSpecies}}, {{pet.PetAge}} years old
                            </div>
                        </div>
                    </ul>
                </div>
                <div v-else>
                    <h1> List of ALL pets </h1>
                    <ul>
                        <div v-for="pet in petsData">
                            <div class="list-of-pets">
                                {{pet.PetName}} the {{pet.PetBreed}} {{pet.PetSpecies}}, {{pet.PetAge}} years old
                            </div>
                        </div>
                    </ul>
                </div>
            </div>
            <div v-else>
                <h2> Pets could not be displayed </h2>
                <button type="button" v-on:click="goPetList(false)" class="btn btn-outline-primary">Try again</button>
            </div>
            </section>
            <section v-if="userPosts">
            <h1> List of user posts will be displayed here </h1>
            </section>
            <section v-if="postForm">
                <uploadPage></uploadPage>
            </section>
            <section v-if="addPet">
                <div class="tay-form-style">
  			       <form action=TODO>
    				<label for="petName">Pet Name</label>
    				<input type="text" v-model="textinput" class="form-control" placeholder="your pets name...">

    				<label for="age">Pet Age</label>
    				<input type="number" v-model="textinput" class="form-control" placeholder="your pets age (in human years)...">
    
    				<label for="species">Pet Species</label>
    				<input type="text" v-model="textinput" class="form-control" placeholder="your pets species...">
    
    				<label for="breed">Pet Breed</label>
    				<input type="text" v-model="textinput" class="form-control" placeholder="your pets breed...">
    
  
    				<input type="submit" value="Submit"> 
  			</form>
		</div>
            </section>
            <section v-if="deletePet">
                <h1> Form to delete pet will be displayed here </h1>
            </section>
          </section>
       </section>
       <section v-if="!authenticated">
             <div class="form-group text-center">
                <input class="col-4 mx-auto form-control" type="text" name="username" v-model="input.username" placeholder="Username" />
                <input class="col-4 mx-auto form-control" type="password" name="password" v-model="input.password" placeholder="Password" />
                <button class="col-4 btn btn-outline-success" type="button" v-on:click="login()">Login</button>
             </div>
       </section>
       <div class="footer text-center">
       <h1>Contact</h1>
       - - - - ldavids2@unb.ca - - - - tshort1@unb.ca - - - - tcampbe6@unb.ca - - - -
       <br> Copyright 2022
       </div>

    </div>
    </div>
        `,
        mounted: function() {
            axios
            .get(this.serviceURL+"/signin")
            .then(response => {
              if (response.data.status == "success") {
                this.authenticated = true;
                this.loggedIn = response.data.user_id;
              }
            })
            .catch(error => {
                this.authenticated = false;
                console.log(error);
            }); 
        },
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
        // alert("No magic on the server yet. You'll have to write the logout code there.");
            axios
            .delete(this.serviceURL+"/signin")
            .then(response => {
                this.authenticated = false;
                this.loggedIn = null;
                document.getElementById("form-group").reset()

            })
            .catch(e => {
                console.log(e);
            });
        },
    fetchImages() {
        axios
        .get(this.serviceURL+"/pets/<int:petId>/images")
        .then(response => {
            this.imagesData = response.data.images;
        })
        .catch(e => {
          alert("Unable to load the Image data");
          console.log(e);
        });
      },
      goHome() {
          this.home = true;
          this.profile = false;
          this.petList = false;
          this.userPets = false;
          this.userPosts = false;
          this.postForm = false;
          this.addPet = false;
          this.deletePet = false;
      },
      goProfile() {
          this.home = false;
          this.profile = true;
          this.petList = false;
          this.userPets = false;
          this.userPosts = false;
          this.postForm = false;
          this.addPet = false;
          this.deletePet = false;
      },
      goPetList(isUser) {
        this.home = false;
        this.profile = false;
        this.petList = true;
        this.userPosts = false;
        this.postForm = false;
        this.addPet = false;
        this.deletePet = false;
        this.userPets = isUser;
        axios
        .get(this.serviceURL+"/pets")
        .then(response =>  {
            this.petsData = response.data.pets;
        })
        .catch(e => {
            alert("Unable to retrieve your pet data");
            console.log(e);
        });
      },
      goUserPosts() {
        this.home = false;
        this.profile = false;
        this.petList = false;
        this.userPets = false;
        this.userPosts = true;
        this.postForm = false;
        this.addPet = false;
        this.deletePet = false;
      },
      goPostForm() {
        this.home = false;
        this.profile = false;
        this.petList = false;
        this.userPets = false;
        this.userPosts = false;
        this.postForm = true;
        this.addPet = false;
        this.deletePet = false;
      },
      goAddPet() {
        this.home = false;
        this.profile = false;
        this.petList = false;
        this.userPets = false;
        this.userPosts = false;
        this.postForm = false;
        this.addPet = true;
        this.deletePet = false;
      },
      goDeletePet() {
        this.home = false;
        this.profile = false;
        this.petList = false;
        this.userPets = false;
        this.userPosts = false;
        this.postForm = false;
        this.addPet = false;
        this.deletePet = true;
      },
      uploadImage(form) {
            axios
            .post(this.serviceURL+"/static", {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            })
            .then(response => {
                console.log(res);
            })
            .catch(e => {
                alert("There was a problem uploading your image");
                console.log(e);
            });
            }
        },
    /**fetchPets() {
      axios
      .get(this.serviceURL+"/pets")
      .then(response =>  {
            this.petsData = response.data.pets;
      })
      .catch(e => {
        alert("Unable to retrieve your pet data");
        console.log(e);
      });
    }*/
        // postImage(form) {
        //     uploadImage(form);
        //     axios
        //     .post(this.serviceURL+"/pets/<int:petId>/images", {

        //     }
        // }
});
