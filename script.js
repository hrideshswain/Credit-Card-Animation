new Vue({
    el: "#app",
    data() {
        return {
            currentCardBackground: null, // MODIFIED: Start with null
            cardName: "",
            cardNumber: "",
            cardMonth: "",
            cardYear: "",
            cardCvv: "",
            minCardYear: new Date().getFullYear(),
            amexCardMask: "#### ###### #####",
            otherCardMask: "#### #### #### ####",
            cardNumberTemp: "",
            isCardFlipped: false,
            focusElementStyle: null,
            isInputFocused: false
        };
    },
    mounted() {
        // ADDED: Logic for random background
        // TODO: Add your background image filenames to this list!
        const backgrounds = ['bg1.jpeg', 'bg2.jpeg', 'bg3.jpeg', 'bg4.jpeg',
          'bg5.jpeg','bg6.jpeg','bg7.jpeg', 'bg8.jpeg', 'bg9.jpeg', 'bg10.jpeg',
          'bg11.jpeg', 'bg12.jpeg', 'bg13.jpeg', 'bg14.jpeg',
          'bg15.jpeg','bg16.jpeg','bg17.jpeg', 'bg18.jpeg', 'bg19.jpeg', 'bg20.jpeg',
          'bg21.jpeg','bg22.jpeg', 'bg23.jpeg', 'bg24.jpeg','bg25.jpeg'];
        const randomIndex = Math.floor(Math.random() * backgrounds.length);
        this.currentCardBackground = backgrounds[randomIndex];

        // This is to keep the original logic for cardNumber
        this.cardNumberTemp = this.otherCardMask;
        document.getElementById("cardNumber").focus();
    },
    computed: {
        getCardType() {
            let number = this.cardNumber;
            let re = new RegExp("^4");
            if (number.match(re) != null) return "visa";

            re = new RegExp("^(34|37)");
            if (number.match(re) != null) return "amex";

            re = new RegExp("^5[1-5]");
            if (number.match(re) != null) return "mastercard";

            re = new RegExp("^6011");
            if (number.match(re) != null) return "discover";
            
            re = new RegExp('^9792')
            if (number.match(re) != null) return 'troy'

            return ""; // default type
        },
        generateCardNumberMask() {
            return this.getCardType === "amex" ? this.amexCardMask : this.otherCardMask;
        },
        minCardMonth() {
            if (this.cardYear === this.minCardYear) return new Date().getMonth() + 1;
            return 1;
        }
    },
    watch: {
        cardYear() {
            if (this.cardMonth < this.minCardMonth) {
                this.cardMonth = "";
            }
        }
    },
    methods: {
        flipCard(status) {
            this.isCardFlipped = status;
        },
        focusInput(e) {
            this.isInputFocused = true;
            let target = e.target;
            let el = this.$refs[target.dataset.ref];
            this.focusElementStyle = {
                width: `${target.offsetWidth}px`,
                height: `${target.offsetHeight}px`,
                transform: `translateX(${target.offsetLeft}px) translateY(${target.offsetTop}px)`
            }
        },
        blurInput() {
            let vm = this;
            setTimeout(() => {
                if (!vm.isInputFocused) {
                    vm.focusElementStyle = null;
                }
            }, 300);
            vm.isInputFocused = false;
        }
    }
});
