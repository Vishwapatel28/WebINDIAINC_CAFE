////DARK MODE SCRIPTT



let darkmode = localStorage.getItem('darkmode');
    const themeSwitch = document.getElementById('theme-switch');

    const enableDarkmode = () => {
      document.body.classList.add('darkmode');
      localStorage.setItem('darkmode', 'active');
    };

    const disableDarkmode = () => {
      document.body.classList.remove('darkmode');
      localStorage.setItem('darkmode', null);
    };

    if (darkmode === "active") enableDarkmode();

    themeSwitch.addEventListener("click", () => {
      darkmode = localStorage.getItem('darkmode');
      darkmode !== "active" ? enableDarkmode() : disableDarkmode();
    });








const holidays = {
    "2025-01-14": "Uttarayan",
    "2025-01-15": "Uttarayan",
    "2025-02-26": "Maha Shivaratri",
    "2025-03-14": "Holi",
    "2025-06-27": "Rath Yatra",
    "2025-08-09": "Raksha Bandhan",
    "2025-08-15": "Independence Day",
    "2025-08-16": "Janmashtami",
    "2025-10-02": "Dussehra",
    "2025-10-20": "Diwali",
    "2025-10-22": "Diwali New Year",
    "2025-12-25": "Christmas Day"
};

// Calculate working days excluding weekends and holidays
function calculateWorkingDays(startDate, endDate, isOneTime) {
    if (isOneTime) return 1; // For one-time booking, always return 1 day
    
    const startUTC = Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
    const endUTC = Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());
    
    let count = 0;
    let curDate = new Date(startUTC);
    
    while (curDate <= endDate) {
        const dayOfWeek = curDate.getDay();
        const dateString = curDate.toISOString().split('T')[0];
        
        if (dayOfWeek !== 0 && dayOfWeek !== 6 && !holidays[dateString]) {
            count++;
        }
        curDate.setDate(curDate.getDate() + 1);
    }
    return count;
}

// Update the payment amount based on meal type and subscription
function updatePaymentAmount(mealType) {
    const startDateInput = document.getElementById(mealType + '-date');
    const endDateInput = document.getElementById(mealType + '-order-end-date');
    
    if (!startDateInput) return;
    
    const startDate = new Date(startDateInput.value);
    
    const isOneTime = document.querySelector('input[name="' + (mealType === 'lunch' ? 'radio1' : 'radio3') + '"]:checked').value === 'One-Time Booking';
    
    const endDate = isOneTime ? startDate : new Date(endDateInput.value);
    
    if (!startDateInput.value) {
        document.getElementById('proceed-payment-btn-' + mealType).textContent = `Proceed To Pay`;
        return;
    }
    
    if (isNaN(startDate)) {
        document.getElementById('proceed-payment-btn-' + mealType).textContent = `Invalid Date`;
        return;
    }
    
    if (!isOneTime && (!endDateInput.value || isNaN(endDate))) {
        document.getElementById('proceed-payment-btn-' + mealType).textContent = `Select End Date`;
        return;
    }
    
    const selectedMeal = document.querySelector('input[name="radio2"]:checked');
const mealPrice = selectedMeal ? parseFloat(selectedMeal.getAttribute('data-price')) : 0;

    
    const workingDays = calculateWorkingDays(startDate, endDate, isOneTime);
    const totalAmount = workingDays * mealPrice;
    
    document.getElementById('proceed-payment-btn-' + mealType).textContent = `Proceed To Pay ₹${totalAmount.toFixed(2)}`;

}



///////////////////// by default it is showing price for lunch and dinner//////////////////////////


window.onload = function () {

    // Initialize lunch section


    // Trigger updatePaymentAmount on page load with default meal type
    const defaultSelectedMeal = document.querySelector('input[name="radio2"]:checked');
    if (defaultSelectedMeal) {
        updatePaymentAmount('lunch'); // Pass default meal type
    }

    // Initialize dinner section
    
    const defaultDinnerMeal = document.querySelector('input[name="radio3"]:checked'); // Assuming radio4 is for dinner selection
    if (defaultDinnerMeal) {
        updatePaymentAmount('dinner');
    }
};




// Event listener for changes in meal selection and dates
document.addEventListener('change', function(event) {
    const target = event.target;
    
    if (target.id === 'lunch-date' || target.id === 'lunch-order-end-date') {
        updatePaymentAmount('lunch');
    }
    else if (target.id === 'dinner-date' || target.id === 'dinner-order-end-date') {
        updatePaymentAmount('dinner');
    }
    
    if (target.name === 'radio1' || target.name === 'radio3') {
        const mealType = target.name === 'radio1' ? 'lunch' : 'dinner';
        updatePaymentAmount(mealType);
        
        const endDateInput = document.getElementById(mealType + '-order-end-date');
        if (endDateInput) {
            endDateInput.style.display = target.value === 'One-Time Booking' ? 'none' : 'block';
        }
    }
    
    if (target.name === 'radio2') {
        updatePaymentAmount('lunch');
    }
});

// Initial update calls
updatePaymentAmount('lunch');
updatePaymentAmount('dinner');










    
        

//////////---------IMAGE POPU AND CLOSE ------??/////////////////


    function openPopup(imageSrc) {
    let img = document.getElementById("popup-img");
    img.src = imageSrc;
    document.getElementById("popup").style.display = "flex";
    document.body.classList.add("modal-open"); // Disable background scrolling
}

function closePopup() {
    document.getElementById("popup").style.display = "none";
    let img = document.getElementById("popup-img");
    img.src = ""; // Reset image
    document.body.classList.remove("modal-open"); // Enable scrolling again
}

// Close when clicking outside the image
document.getElementById("popup").addEventListener("click", function(event) {
    if (event.target === this) {
        closePopup();
    }
});


//////////-------------LUNCH HOLIDAYS------------------///////////////////


document.addEventListener("DOMContentLoaded", function () {

    const holidayDates = {
        "2025-01-14": "Uttarayan",
        "2025-01-15": "Uttarayan",
        "2025-02-26": "Maha Shivaratri",
        "2025-03-14": "Holi",
        "2025-06-27": "Rath Yatra",
        "2025-08-09": "Raksha Bandhan",
        "2025-08-15": "Independence Day",
        "2025-08-16": "Janmashtami",
        "2025-10-02": "Dussehra",
        "2025-10-20": "Diwali",
        "2025-10-22": "Diwali New Year",
        "2025-12-25": "Christmas Day"
    };

    function setTodayDate(dateInput) {
        let today = new Date();
        let formattedDate = today.toISOString().split('T')[0];
        dateInput.value = formattedDate;
        dateInput.setAttribute("value", formattedDate);
    }

    function disableRestrictedDates(event, popupId) {
        let selectedDate = event.target.value;
        let selectedDay = new Date(selectedDate).getDay();

        if (selectedDay === 0 || selectedDay === 6) 
        {
            showPopup("Weekends Mode: ON. Orders Mode: OFF. See you on Monday! 😎", popupId);
            event.target.value = "";
            return;
        }

        if (holidayDates[selectedDate]) {
            showPopup(`It's ${holidayDates[selectedDate]}! No orders today - time to relax and celebrate! 🎉`, popupId);
            event.target.value = "";
            return;
        }

        document.getElementById(popupId).style.display = "none";
    }

    function showPopup(message, popupId) {
        const popupBox = document.getElementById(popupId);
        const popupMessage = popupBox.querySelector("p");
        popupMessage.textContent = message;
        popupBox.style.display = "flex";

        const closeBtnId = popupId.replace("popup-box", "close-btn");
        document.getElementById(closeBtnId).addEventListener("click", function () {
            popupBox.style.display = "none";
        });
    }

    // --- Lunch Section ---
    const lunchDateInput = document.getElementById("lunch-date");
    const nameInputLunch = document.getElementById("name-input-lunch");
    const proceedPaymentBtnLunch = document.getElementById("proceed-payment-btn-lunch");
    const popupBoxLunch = document.getElementById("popup-box-lunch");

    setTodayDate(lunchDateInput);
    lunchDateInput.addEventListener("change", (event) => disableRestrictedDates(event, "popup-box-lunch"));

    proceedPaymentBtnLunch.addEventListener("click", function (event) {
        const selectedDate = lunchDateInput.value;
        const name = nameInputLunch.value.trim();

        if (name === "") {
            showPopup("🚨 Oops! Name field is missing!! ", "popup-box-lunch");
            event.preventDefault();
            return;
        }

        const today = new Date();
        const selectedDateObj = new Date(selectedDate);

        if (selectedDateObj.setHours(0, 0, 0, 0) < today.setHours(0, 0, 0, 0)) {
            showPopup("❌ Invalid Date! Choose today or later.", "popup-box-lunch");
            event.preventDefault();
            return;
        }

        if (selectedDateObj.setHours(0, 0, 0, 0) === today.setHours(0, 0, 0, 0)) {
            const currentTime = new Date();
            const cutoffTime = new Date();
            cutoffTime.setHours(11, 30, 0, 0); // 11:30 AM cutoff for lunch

            if (currentTime > cutoffTime) {
                showPopup("⏳ Too Late! Lunch orders are closed.", "popup-box-lunch");
                event.preventDefault();
                return;
            }
        }

        const selectedDay = new Date(selectedDate).getDay();
        if (selectedDay === 0 || selectedDay === 6) {
            showPopup("Weekend mode: ON. Orders mode: OFF. See you on Monday! 😎", "popup-box-lunch");
            event.preventDefault();
            return;





        }

        if (holidayDates[selectedDate]) {
            showPopup(`It's ${holidayDates[selectedDate]}! No orders today - time to relax and celebrate! 🎉`, "popup-box-lunch");
            event.preventDefault();
            return;
        }

        document.getElementById("upi-container-lunch").style.display = "block";
        document.getElementById("upi-container-dinner").style.display = "none";
        popupBoxLunch.style.display = "none";
    });

});





////////-------------DINNER HOLIDAYS--------------////////////////////////////////////////////

        
        
document.addEventListener("DOMContentLoaded", function () {
    const dinnerDateInput = document.getElementById("dinner-date");
    const dinnerEndDateInput = document.getElementById("dinner-order-end-date");
    const endDateContainer = document.getElementById("dinner-order-end-date-container");
    const nameInput = document.getElementById("name-input-dinner");
    const proceedPaymentBtn = document.getElementById("proceed-payment-btn-dinner");
    const popupBoxDinner = document.getElementById("popup-box-dinner");
    const popupMessageDinner = document.getElementById("popup-message-dinner");

    const holidayDates = {
        "2025-01-14": "Uttarayan",
        "2025-01-15": "Uttarayan",
        "2025-02-26": "Maha Shivaratri",
        "2025-03-14": "Holi",
        "2025-06-27": "Rath Yatra",
        "2025-08-09": "Raksha Bandhan",
        "2025-08-15": "Independence Day",
        "2025-08-16": "Janmashtami",
        "2025-10-02": "Dussehra",
        "2025-10-20": "Diwali",
        "2025-10-22": "Diwali New Year",
        "2025-12-25": "Christmas Day"
    };

    function setTodayDate() {
        let today = new Date();
        let formattedDate = today.toISOString().split('T')[0];

        if (dinnerDateInput) {
            dinnerDateInput.value = formattedDate;
            dinnerDateInput.setAttribute("value", formattedDate);
        }
    }

    function disableRestrictedDates(event) {
        let selectedDate = event.target.value;
        let selectedDay = new Date(selectedDate).getDay();

        if (selectedDay === 0 || selectedDay === 6) {
            showPopup("Weekend mode: ON. Orders mode: OFF. See you on Monday! 😎", "popup-box-dinner");
            event.target.value = "";
            return;
        }

        if (holidayDates[selectedDate]) {
            showPopup(`It's ${holidayDates[selectedDate]}! No orders today - time to relax and celebrate! 🎉`, "popup-box-dinner");
            event.target.value = "";
            return;
        }

        document.getElementById("popup-box-dinner").style.display = "none";

        let selectedRadio = document.querySelector('input[name="radio3"]:checked');
        if (!selectedRadio) return;

        if (selectedRadio.value === "Weekly Subscription") {
            calculateWeeklyEndDate(dinnerDateInput, dinnerEndDateInput); // Define this function if used
        } else if (selectedRadio.value === "Monthly Subscription") {
            calculateEndDate(dinnerDateInput, dinnerEndDateInput);      // Define this function if used
        }
    }

    function showPopup(message, popupId) {
        const popupBox = document.getElementById(popupId);
        const popupMessage = popupBox.querySelector("p");

        popupMessage.textContent = message;
        popupBox.style.display = "flex";

        document.getElementById("close-btn-dinner").addEventListener("click", function () {
            popupBox.style.display = "none";
        });
    }

    endDateContainer.style.display = "none";
    setTodayDate();
    dinnerDateInput.addEventListener("change", disableRestrictedDates);

    proceedPaymentBtn.addEventListener("click", function (event) {
        const selectedDate = document.getElementById("dinner-date").value;
        const name = nameInput.value.trim();

        if (name === "") {
            showPopup("🚨 Oops! Name field is missing!! 🔹 Add your name so we can move ahead!", "popup-box-dinner");
            event.preventDefault();
            return;
        }

        const today = new Date();
        const selectedDateObj = new Date(selectedDate);

        if (selectedDateObj.setHours(0, 0, 0, 0) < today.setHours(0, 0, 0, 0)) {
            showPopup("❌ Invalid Date! Choose today or later.", "popup-box-dinner");
            event.preventDefault();
            return;
        }

        if (selectedDateObj.setHours(0, 0, 0, 0) === today.setHours(0, 0, 0, 0)) {
            const currentTime = new Date();
            const cutoffTime = new Date();
            cutoffTime.setHours(17, 30, 0, 0); // 5:30 PM

            if (currentTime > cutoffTime) {
                showPopup("⏳ Too Late! Dinner orders are closed.", "popup-box-dinner");
                event.preventDefault();
                return;
            }
        }

        let selectedDay = new Date(selectedDate).getDay();
        if (selectedDay === 0 || selectedDay === 6) {
            showPopup("Weekend mode: ON. Orders mode: OFF. See you on Monday! 😎", "popup-box-dinner");
            event.preventDefault();
            return;
        }

        if (holidayDates[selectedDate]) {
            showPopup(`It's ${holidayDates[selectedDate]}! No orders today - time to relax and celebrate! 🎉`, "popup-box-dinner");
            event.preventDefault();
            return;
        }

        document.getElementById("upi-container-dinner").style.display = "block";
        document.getElementById("upi-container-lunch").style.display = "none";
        popupBoxDinner.style.display = "none";
    });
});







/////////////////------------------- LUNCH DATE-----------------------///////////////////////////////


// Listen for radio button changes (Weekly or Monthly Subscription)
document.addEventListener("DOMContentLoaded", function () {
    const lunchDateInput = document.getElementById("lunch-date");
    const lunchEndDateInput = document.getElementById("lunch-order-end-date");
    const endDateContainer = document.getElementById("lunch-order-end-date-container");

    // Function to set today's date
    function setTodayDate() {
        let today = new Date().toISOString().split('T')[0];
        if (lunchDateInput) lunchDateInput.value = today;
    }

////////////Function to calculate the upcoming Friday


    function calculateWeeklyEndDate(startDateInput, endDateInput) {
        if (!startDateInput || !endDateInput) return;

        let startDate = new Date(startDateInput.value);
        if (isNaN(startDate)) return;

        let dayOfWeek = startDate.getDay(); // 0 = Sunday, 6 = Saturday
        let weeklyEndDate = new Date(startDate);

        if (dayOfWeek >= 6) { 
            // If selected day is Saturday (6) or Sunday (0), move to next week's Friday
            let daysUntilNextFriday = (12 - dayOfWeek) % 7;
            weeklyEndDate.setDate(weeklyEndDate.getDate() + daysUntilNextFriday);
        } else {
            // If it's Monday (1) to Friday (5), move to this week's Friday
            let daysUntilFriday = 5 - dayOfWeek;
            weeklyEndDate.setDate(weeklyEndDate.getDate() + daysUntilFriday);
        }

        // Format and update the end date field
        endDateInput.value = weeklyEndDate.toISOString().split('T')[0];
        endDateContainer.style.display = "block"; // Show End Date
    }

////////// Function to calculate the last day of the month for Monthly Subscription/////

function calculateEndDate(startDateInput, endDateInput) {
    if (!startDateInput || !endDateInput) return;

    let startDate = new Date(startDateInput.value);
    if (isNaN(startDate)) return;

    let lastDay = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 1); // Get last day of the month

    endDateInput.value = lastDay.toISOString().split('T')[0];

    document.getElementById("lunch-order-end-date-container").style.display = "block"; // Show End Date
}


    // Hide end date on page load because "One-Time Order" is selected by default
    endDateContainer.style.display = "none";

    // Set today's date on page load
    setTodayDate();

    // Update end date when the user selects a new date
    lunchDateInput.addEventListener("change", function () {
        let selectedRadio = document.querySelector('input[name="radio1"]:checked');
        if (!selectedRadio) return;

        if (selectedRadio.value === "Weekly Subscription") {
            calculateWeeklyEndDate(lunchDateInput, lunchEndDateInput);
        } else if (selectedRadio.value === "Monthly Subscription") {
            calculateEndDate(lunchDateInput, lunchEndDateInput);
        }
    });

    // Radio Button Logic: Show or Hide End Date Based on Selection
    document.querySelectorAll('input[name="radio1"]').forEach(radio => {
        radio.addEventListener('change', function (event) {
            let orderType = event.target.value; // Get selected radio button value

            if (orderType === "Monthly Subscription") { 
                calculateEndDate(lunchDateInput, lunchEndDateInput); // Set last day of the month
            } else if (orderType === "Weekly Subscription") { 
                calculateWeeklyEndDate(lunchDateInput, lunchEndDateInput); // Set next Friday
            } else {
                endDateContainer.style.display = "none"; // Hide End Date for One-Time Order
                lunchEndDateInput.value = ""; // Clear End Date
            }
        });
    });
});



//////////////////////////----------------- DINNER DATE-------------------////////////////////////////////



// Listen for radio button changes (Weekly or Monthly Subscription)
document.addEventListener("DOMContentLoaded", function () {
    const dinnerDateInput = document.getElementById("dinner-date");
    const dinnerEndDateInput = document.getElementById("dinner-order-end-date");
    const endDateContainer = document.getElementById("dinner-order-end-date-container");

    // Function to set today's date
    function setTodayDate() {
        let today = new Date().toISOString().split('T')[0];
        if (dinnerDateInput) dinnerDateInput.value = today;
    }

/////////////// Function to calculate the upcoming Friday

    function calculateWeeklyEndDate(startDateInput, endDateInput) {
        if (!startDateInput || !endDateInput) return;

        let startDate = new Date(startDateInput.value);
        if (isNaN(startDate)) return;

        let dayOfWeek = startDate.getDay(); // 0 = Sunday, 6 = Saturday
        let weeklyEndDate = new Date(startDate);

        if (dayOfWeek >= 6) { 
            // If selected day is Saturday (6) or Sunday (0), move to next week's Friday
            let daysUntilNextFriday = (12 - dayOfWeek) % 7;
            weeklyEndDate.setDate(weeklyEndDate.getDate() + daysUntilNextFriday);
        } else {
            // If it's Monday (1) to Friday (5), move to this week's Friday
            let daysUntilFriday = 5 - dayOfWeek;
            weeklyEndDate.setDate(weeklyEndDate.getDate() + daysUntilFriday);
        }

        // Format and update the end date field
        endDateInput.value = weeklyEndDate.toISOString().split('T')[0];
        endDateContainer.style.display = "block"; // Show End Date
    }


////////////////// Function to calculate the last day of the month for Monthly Subscription///


function calculateEndDate(startDateInput, endDateInput) {
    if (!startDateInput || !endDateInput) return;

    let startDate = new Date(startDateInput.value);
    if (isNaN(startDate)) return;

    let lastDay = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 1); // Get last day of the month

    endDateInput.value = lastDay.toISOString().split('T')[0];

    document.getElementById("dinner-order-end-date-container").style.display = "block"; // Show End Date
}


    // Hide end date on page load because "One-Time Order" is selected by default
    endDateContainer.style.display = "none";

    // Set today's date on page load
    setTodayDate();

    // Update end date when the user selects a new date
    dinnerDateInput.addEventListener("change", function () {
        let selectedRadio = document.querySelector('input[name="radio3"]:checked');
        if (!selectedRadio) return;

        if (selectedRadio.value === "Weekly Subscription") {
            calculateWeeklyEndDate(dinnerDateInput, dinnerEndDateInput);
        } else if (selectedRadio.value === "Monthly Subscription") {
            calculateEndDate(dinnerDateInput, dinnerEndDateInput);
        }
    });

    // Radio Button Logic: Show or Hide End Date Based on Selection
    document.querySelectorAll('input[name="radio3"]').forEach(radio => {
        radio.addEventListener('change', function (event) {
            let orderType = event.target.value; // Get selected radio button value

            if (orderType === "Monthly Subscription") { 
                calculateEndDate(dinnerDateInput, dinnerEndDateInput); // Set last day of the month
            } else if (orderType === "Weekly Subscription") { 
                calculateWeeklyEndDate(dinnerDateInput, dinnerEndDateInput); // Set next Friday
            } else {
                endDateContainer.style.display = "none"; // Hide End Date for One-Time Order
                dinnerEndDateInput.value = ""; // Clear End Date
            }
        });
    });
});






//////// roti container/////////////////////////////////////////


    document.addEventListener("DOMContentLoaded", function () {
        // Get the radio buttons
        const fullLunch = document.getElementById("roti-full-lunch");
        const halfLunch = document.getElementById("roti-half-lunch");
        const swaminarayanLunch = document.getElementById("roti-swaminarayan");
        const lunchDinner = document.getElementById("roti-lunch-dinner");

        // Other meal options
        const dalRice = document.getElementById("dal-rice");
        const buttermilk = document.getElementById("bmilk");

        // Get the roti container
        const rotiContainer = document.getElementById("roti-container");
        if (fullLunch.checked) 
        {
            rotiContainer.style.display = "block";
        }


        // Function to toggle the roti container
        function toggleRotiContainer() {
            if (fullLunch.checked || halfLunch.checked || swaminarayanLunch.checked || lunchDinner.checked) {
                rotiContainer.style.display = "block";
            } else {
                rotiContainer.style.display = "none";
            }
           
            
        }

        // Add event listeners
        fullLunch.addEventListener("change", toggleRotiContainer);
        halfLunch.addEventListener("change", toggleRotiContainer);
        swaminarayanLunch.addEventListener("change", toggleRotiContainer);
        dalRice.addEventListener("change", toggleRotiContainer);
        lunchDinner.addEventListener("change", toggleRotiContainer);
        buttermilk.addEventListener("change", toggleRotiContainer);
    });



///////////////-------Togglee forr LUNCHHH and DINNNERRRR---------////////////////////////// 
        
        function checkLunchTime()
        {
            // let now = new Date();
            // let hours = now.getHours();
            // let minutes = now.getMinutes();
            // let day = now.getDay();  // 1 = Monday, 5 = Friday
           
            let lunchMenu = document.getElementById('lunch-menu');
            let dinnerMenu = document.getElementById('dinner-menu');

            // Toggle lunch menu visibility
             if (lunchMenu.style.display === "block") 
                {
                 lunchMenu.style.display = "none";
                } 
            else 
                {
                  lunchMenu.style.display = "block";
                  dinnerMenu.style.display = "none";  // Hide dinner menu if open
                }
        }
        
        
    

        function checkDinnerTime() 
        {
            // let now = new Date();
            // let hours = now.getHours();
            // let minutes = now.getMinutes();
            // let day = now.getDay();  // 0 = Saturday, 6 = Sunday
            let lunchMenu = document.getElementById('lunch-menu');
            let dinnerMenu = document.getElementById('dinner-menu');


            // Toggle dinner menu visibility
            if (dinnerMenu.style.display === "block") {
                  dinnerMenu.style.display = "none";
            } else {
                dinnerMenu.style.display = "block";
                lunchMenu.style.display = "none";  // Hide lunch menu if open
            }
        }
                
                
                
/////Its open Proceed to Pay button open in LUNCH & DINNER SECTION---------------


        //         document.getElementById("proceed-payment-btn-lunch").addEventListener("click", function () {
        //         document.getElementById("upi-container-lunch").style.display = "block";  // Show LUNCH container
        //         document.getElementById("upi-container-dinner").style.display = "none";  // Hide DINNER container
        // });

        //     document.getElementById("proceed-payment-btn-dinner").addEventListener("click", function () {
        //     document.getElementById("upi-container-dinner").style.display = "block"; // Show DINNER container
        //     document.getElementById("upi-container-lunch").style.display = "none";  // Hide LUNCH container
        // });



        //////////////////////copyyyy upi iiddd//////////////////////////////
        function copyUPI(upiId, messageId) {
            var upiText = document.getElementById(upiId).textContent;
            navigator.clipboard.writeText(upiText).then(function () {
                var copyMessage = document.getElementById(messageId);
                copyMessage.style.display = "inline";
                setTimeout(function () {
                    copyMessage.style.display = "none";
                }, 1500);
            });
        }




     //////////////////     payment 200,100,70           ////////////////////////////////////////////////



    //  document.addEventListener("DOMContentLoaded", function () {
    //         const paymentButton = document.getElementById("payment-button");
    //         const proceedButton = document.getElementById("proceed-payment-btn-lunch");
    //         const mealOptions = document.querySelectorAll('input[name="radio2"]');

    //         // Function to update payment button price
    //         function updatePaymentButton() {
    //             const selectedMeal = document.querySelector('input[name="radio2"]:checked');
    //             if (selectedMeal) {
    //                 paymentButton.textContent = `Pay ₹${selectedMeal.value}`;
    //             }
    //         }

    //         // Hide Pay button initially
    //         paymentButton.style.display = "none";

    //         // Listen for meal selection changes
    //         mealOptions.forEach(option => {
    //             option.addEventListener("change", updatePaymentButton);
    //         });

    //         // Show Pay button when "Proceed to Pay" is clicked
    //         proceedButton.addEventListener("click", function () {
    //             updatePaymentButton();
    //             paymentButton.style.display = "block"; // Show button
    //         });
    //     });



       
        
        document.querySelectorAll("select").forEach(select => 
        {
            if (select.previousElementSibling.innerText === "Order Type") 
            {
                select.addEventListener("change", toggleEndDateField);
            }
        });




     
// ------------------Function validationn ++++ order Placed lunch & dinner
          
document.addEventListener("DOMContentLoaded", function () {
    
    function validateInput(inputId, popupMessageId) {
        let input = document.getElementById(inputId);
        let popupMessage = document.getElementById(popupMessageId);
        let value = input.value.trim();

        if (!value) {
            showPopup(popupMessageId, "🛑 Can’t Proceed!! Enter the Correct last 4 digits of your Reference ID..");
            return false;
        } 
        if (!/^\d{4}$/.test(value)) {
            showPopup(popupMessageId, "❌ Invalid Input! Only 4 numeric allowed");
            return false;
        }
        return true;
    }

    function placeOrder(buttonId, inputId, popupMessageId) {
        if (!validateInput(inputId, popupMessageId)) return;
        
        let orderButton = document.getElementById(buttonId);
        orderButton.textContent = "Your order is placed";
        orderButton.classList.add("clicked");
        orderButton.disabled = true;

        setTimeout(() => {
            orderButton.textContent = "Submit Order";
            orderButton.classList.remove("clicked");
            orderButton.disabled = false;
        }, 7000);
    }

    function showPopup(popupMessageId, message) {
        let popupMessage = document.getElementById(popupMessageId);
        let popupBoxId = popupMessageId.includes("dinner") ? "popup-box-dinner" : "popup-box-lunch";
        
        popupMessage.textContent = message;
        document.getElementById(popupBoxId).style.display = "flex";
    }

    function closePopup(popupBoxId) {
        document.getElementById(popupBoxId).style.display = "none";
    }

    document.getElementById("close-btn-lunch").addEventListener("click", () => closePopup("popup-box-lunch"));
    document.getElementById("close-btn-dinner").addEventListener("click", () => closePopup("popup-box-dinner"));

    document.getElementById("order-button").addEventListener("click", () => 
        placeOrder("order-button", "reference-id", "popup-message-lunch")
    );
    
    document.getElementById("order-button-dinner").addEventListener("click", () => 
        placeOrder("order-button-dinner", "reference-id-dinner", "popup-message-dinner")
    );
});







//-------------------------------//Payment linnk----dinnerr-----//////////////////


document.addEventListener("DOMContentLoaded", function () {
    let isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    
    // Function to handle UPI payment link
    function toggleUPIPayment(amount, qrCodeId) {
        let upiLink = `upi://pay?pa=9512039029.eazypay@icici&pn=Payment&am=${amount.toFixed(2)}&cu=INR`;
        
        if (isMobile) {
            window.location.href = upiLink;
        } else {
            let qrCode = document.getElementById(qrCodeId);
            if (qrCode) {
                if (qrCode.style.display === "none" || qrCode.style.display === "") {
                    qrCode.src = "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=" + encodeURIComponent(upiLink);
                    qrCode.style.display = "block";
                } else {
                    qrCode.style.display = "none";
                }
            } else {
                console.error(`QR code element with ID '${qrCodeId}' not found!`);
            }
        }
    }
    
    // Event listener for lunch payment
    const paymentButton = document.getElementById("payment-button");
    if (paymentButton) {
        paymentButton.addEventListener("click", function () {
            let totalAmount = 100; // Replace with actual amount calculation
            toggleUPIPayment(totalAmount, "qr-code");
        });
    } else {
        console.error("Payment button element with ID 'payment-button' not found!");
    }
    
    // Event listener for dinner payment
    const paymentButtonDinner = document.getElementById("payment-button-dinner");
    if (paymentButtonDinner) {
        paymentButtonDinner.addEventListener("click", function () {
            let totalAmount = 150; // Replace with actual amount calculation
            toggleUPIPayment(totalAmount, "qr-code-dinner");
        });
    } else {
        console.error("Payment button element with ID 'payment-button-dinner' not found!");
    }
    
    // Event listener for extra payment button
    const payButton = document.getElementById("pay-button");
    if (payButton) {
        payButton.addEventListener("click", function () {
            let totalAmount = 100; // Replace with actual amount calculation
            toggleUPIPayment(totalAmount, "qr-code");
        });
    } else {
        console.error("Payment button element with ID 'pay-button' not found!");
    }
    
    // Event listener for additional button
    const paymentButton2 = document.getElementById("payment-button2");
    if (paymentButton2) {
        paymentButton2.addEventListener("click", function () {
            alert("Payment button 1 clicked!"); // Modify as needed
        });
    } else {
        console.error("Payment button element with ID 'payment-button2' not found!");
    }
});





function showOrderPlacedPopup() 
    {
        let popup = document.createElement('div');
        popup.classList.add('custom-popup');

        let message = document.createElement('p');
        message.textContent = '🎉 Order Placed! Click below for feedback';

        let feedbackLink = document.createElement('a');
        feedbackLink.href = 'YOUR_GOOGLE_FORMS_LINK_HERE';
        feedbackLink.target = '_blank';
        feedbackLink.textContent = 'Give Feedback';

        let closeButton = document.createElement('button');
        closeButton.textContent = 'Close';
        closeButton.onclick = function() {
            document.body.removeChild(popup);
        };

        popup.appendChild(message);
        popup.appendChild(feedbackLink);
        popup.appendChild(closeButton);
        document.body.appendChild(popup);
    }

    document.addEventListener("DOMContentLoaded", function() {
        function validateAndShowPopup(inputId, popupMessageId, orderButtonId) {
            let input = document.getElementById(inputId);
            let value = input.value;
            let popupMessage = document.getElementById(popupMessageId);

            if (value === "") {
                popupMessage.textContent = "🛑 Can’t Proceed!! Enter the Correct last 4 digits of your Reference ID..";
                document.getElementById(popupMessageId.replace("message", "box")).style.display = "flex";
                return false;
            } 
            else if (!/^\d{4}$/.test(value)) {
                popupMessage.textContent = "❌ Invalid Input! Only 4 numeric allowed";
                document.getElementById(popupMessageId.replace("message", "box")).style.display = "flex";
                return false;
            } 
            else {
                showOrderPlacedPopup();
                return true;
            }
        }

        let orderButton = document.getElementById("order-button");
        if (orderButton) {
            orderButton.addEventListener("click", function(event) {
                event.preventDefault();
                validateAndShowPopup("reference-id", "popup-message-lunch", "order-button");
            });
        }

        let orderButtonDinner = document.getElementById("order-button-dinner");
        if (orderButtonDinner) {
            orderButtonDinner.addEventListener("click", function(event) {
                event.preventDefault();
                validateAndShowPopup("reference-id-dinner", "popup-message-dinner", "order-button-dinner");
            });
        }
    });


    function showOrderPlacedPopup() {
        let popup = document.createElement('div');
        popup.classList.add('custom-popup');

        let message = document.createElement('p');
        message.textContent = '🎉 Order Placed! Click below for feedback';

        let feedbackLink = document.createElement('a');
        feedbackLink.href = 'YOUR_GOOGLE_FORMS_LINK_HERE';
        feedbackLink.target = '_blank';
        feedbackLink.textContent = 'Give Feedback';

        let closeButton = document.createElement('button');
        closeButton.textContent = 'Close';
        closeButton.onclick = function() {
            document.body.removeChild(popup);
        };

        popup.appendChild(message);
        popup.appendChild(feedbackLink);
        popup.appendChild(closeButton);
        document.body.appendChild(popup);
    }

    document.addEventListener("DOMContentLoaded", function() {
        function validateAndShowPopup(inputId, popupMessageId, orderButtonId) {
            let input = document.getElementById(inputId);
            let value = input.value;
            let popupMessage = document.getElementById(popupMessageId);

            if (value === "") {
                popupMessage.textContent = "🛑 Can’t Proceed!! Enter the Correct last 4 digits of your Reference ID..";
                document.getElementById(popupMessageId.replace("message", "box")).style.display = "flex";
                return false;
            } 
            else if (!/^\d{4}$/.test(value)) {
                popupMessage.textContent = "❌ Invalid Input! Only 4 numeric allowed";
                document.getElementById(popupMessageId.replace("message", "box")).style.display = "flex";
                return false;
            } 
            else {
                showOrderPlacedPopup();
                return true;
            }
        }

        let orderButton = document.getElementById("order-button");
        if (orderButton) {
            orderButton.addEventListener("click", function(event) {
                event.preventDefault();
                validateAndShowPopup("reference-id", "popup-message-lunch", "order-button");
            });
        }

        let orderButtonDinner = document.getElementById("order-button-dinner");
        if (orderButtonDinner) {
            orderButtonDinner.addEventListener("click", function(event) {
                event.preventDefault();
                validateAndShowPopup("reference-id-dinner", "popup-message-dinner", "order-button-dinner");
            });
        }
    });



    
        
        window.onload = setTodayDate;