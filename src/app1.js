import axios from 'axios';
export default {
  
  data() {
    return {
      posts: []
    };
  },
  async created() {
    try {
      alert("adffd");
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
      this.posts = response.data;
    } catch (error) {
      console.error(error);
    }
  }
};





const { createApp } = Vue

createApp({
  el: "#usersVueApp",
    data() {
      
       
        return {
          name: "",
          email: "",
          product: "",
          confirmed: false,
          appliedCoupon: null,
          couponCode: "" , 
          totalCost:"",
          seats: [],
          coupons: [
              {
                code: "100TAKAOFF",
                discount: 100
              },
              {
                code: "200TAKAOFF",
                discount: 200
              }
            ],
            seatStates: {
                available: {
                    text: "Available",
                    color: "#fff"
                },
                selected: {
                    text: "Selected",
                    color: "#00ff00"
                },
                booked: {
                    text: "Booked",
                    color: "gray"
                },
                sold: {
                    text: "Sold",
                    color: "#ff0000"
                }
            },
            // seats: [
            //     {
            //         name: "A1",
            //         type: "available",
            //         price: 500
            //     },
            //     {
            //         name: "A2",
            //         type: "available",
            //         price: 500
            //     },
            //     {
            //         name: "A3",
            //         type: "available",
            //         price: 500
            //     },
            //     {
            //         name: "A4",
            //         type: "sold",
            //         price: 500
            //     },
                
             
            // ]
        };
    },
    async created() {
      try {
    
        const response = await axios.get('https://test.lakanarentals.com/api/tours');
        this.seats = response.data;
      } catch (error) {
       
        console.error(error);
      }
    },
   
    computed: {
      selectedSeats() {
        let ss = this.seats.filter(item => item.type === "selected");
       
        return ss;
      },

      totalCost() {
        let tc = 0;
        this.selectedSeats.forEach((seat) => {
          tc += seat.price;
        });
        
        if (this.appliedCoupon !== null) {
          tc = tc - this.appliedCoupon.discount;
        }
        return tc;
      }
    },

    methods: {
      handleClick(i) {
        let clickedSeat = this.seats[i];

        if(clickedSeat.type === "sold" || clickedSeat.type === "booked") {
          alert("This seat is already sold or booked.");
          return;
        }

        if(clickedSeat.type == "available" && this.selectedSeats.length > 1) {
          alert("You can not select more than 3 seats.");
          return;
        }

          clickedSeat.type =
          clickedSeat.type === "selected" ? "available" : "selected";
          console.log(clickedSeat);
      },

      confirm() {
        if (!this.name || !this.email) {
          alert("Please, enter full names and email.")
          return;
        }

        if (this.email.length < 5) {
          alert("Email Too Short!!!.");
          return;
        }
        alert("data is sent to db");
        
           axios.post('/email/request-verification', { email: this.userEmail })
            .then(response => {
                alert(response.data.message);
            })
            .catch(error => {
                alert(error);
          });
        this.confirmed = true;
      },
      validateEmail(value){
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value))
    {
      this.msg['email'] = '';
    } else{
      this.msg['email'] = 'Please enter a valid email address';
    } 
      },


      requestVerification: function() {
        axios.post('/email/request-verification', { email: this.userEmail })
            .then(response => {
                alert(response.data.message);
            })
            .catch(error => {
                alert(error.response.data.message);
            });
       },

      resetData() {
        if(this.confirmed == true) {
          this.name = "";
          this.email = "";
          //this.password = "";
          this.confirmed = false;
          this.appliedCoupon = null;

          this.seats.forEach((seat) => {
            if (seat.type === "selected") {
              seat.type = "sold";
            }
          });
        }
      }
    },

    watch: {
      // couponCode(newValue) {
      //   if (newValue.length === 10) {
      //     let searchedCoupons = this.coupons.filter(
      //       (item) => item.code === newValue
      //     );

      //     if (searchedCoupons.length === 1) {
      //       this.appliedCoupon = searchedCoupons[0];
      //       this.couponCode = "";
      //       alert("Congratulation! You have got discount TK. " + this.appliedCoupon.discount);
            
      //     }
      //     else {
      //       alert("Coupon is not valid!");
      //     }
      //   }  
      // },
      email(newValue) {
        // binding this to the data value in the email input
        this.email = newValue;
        this.validateEmail(newValue);
      },
      mobile(newValue, oldValue) {
        if (isNaN(newValue)) {
          alert("Enter valid mobile number.");
          this.mobile = oldValue;
        }

        if (newValue.length > 11) {
          alert("Enter 11 digit mobile number.");
          this.mobile = oldValue;
        }
      }
    }
}).mount('#app');