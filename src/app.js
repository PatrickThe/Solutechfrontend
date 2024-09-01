const { createApp } = Vue

createApp({
  el: "#usersVueApp",
  data() {
    return {
      name: "",
      email: "",
      confirmed: false,
      appliedCoupon: null,
      couponCode: "",
      clickedSeats: [], // Array to store clicked seat details
      seats: [],
      items:[],
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
      }
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
      return this.seats.filter(item => item.type === "selected");
    },
    totalCost() {
      let tc = 0;
      this.selectedSeats.forEach((seat) => {
        tc += seat.price;
      });

      if (this.appliedCoupon !== null) {
        tc -= this.appliedCoupon.discount;
      }
      return tc;
    }
  },
  methods: {
    handleClick(i) {
      let clickedSeat = this.seats[i];

      if (clickedSeat.type === "sold" || clickedSeat.type === "booked") {
        alert("This seat is already sold or booked.");
        return;
      }

      if (clickedSeat.type === "available" && this.selectedSeats.length >= 3) { // Allow selection of up to 3 seats
        alert("You can not select more than 3 seats.");
        return;
      }

      if (clickedSeat.type === "selected") {
        // Remove seat from clickedSeats array
        this.clickedSeats = this.clickedSeats.filter(seat => seat.id !== clickedSeat.id);
      } else {
        // Add seat to clickedSeats array
        this.clickedSeats.push(clickedSeat);
      }
      
      clickedSeat.type = clickedSeat.type === "selected" ? "available" : "selected";
      console.log(clickedSeat);
    },
    confirm() {
      if (!this.name || !this.email) {
        alert("Please, enter full names and email.");
        return;
      }

      if (this.email.length < 5) {
        alert("Email Too Short!!!");
        return;
      }

      console.log("Data is sent to DB:");
      
      const formData = new FormData();

      const fd = new FormData();
      fd.append('name', this.name);
      fd.append('email', this.email);
      fd.append('seats', JSON.stringify(this.clickedSeats)); // Pass the array of clicked seats
      
      
      

    console.log(fd);
      

      axios.post('https://test.lakanarentals.com/api/tours',fd, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        console.log('Data sent successfully', response.data);
      })
      .catch(error => {
        console.error('Error sending data', error.response ? error.response.data : error.message);
      });

      this.confirmed = true;
    },
    resetData() {
      if (this.confirmed) {
        this.name = "";
        this.email = "";
        this.confirmed = false;
        this.appliedCoupon = null;

        this.seats.forEach((seat) => {
          if (seat.type === "selected") {
            seat.type = "sold";
          }
        });

        // Clear clickedSeats array
        this.clickedSeats = [];
      }
    }
  },
  watch: {
    // Implement couponCode watcher if needed
  }
}).mount('#app');
