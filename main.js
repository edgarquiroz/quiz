  function loopForm(form) {
    //Radios + Checboxes
    let radioResults = "";
    let checkboxResults = "";
    for (let i = 0; i < form.elements.length; i++ ) {
      if (form.elements[i].type == "radio") {
        if (form.elements[i].checked == true) {
            radioResults = form.elements[i].value + " ";
            radioAnswer.innerHTML = "Q1: You answered " + radioResults;
        }
    }
        if (form.elements[i].type == "checkbox") {
            if (form.elements[i].checked == true) {
              checkboxResults += form.elements[i].value + " ";
              if (form.elements[i].value == "Vue JS" && "Angular JS" && "Ember"){
                checkboxAnswer.innerHTML = "Q2: Your answer " + checkboxResults + "is correct";
              } else{
                checkboxWrongAnswer.innerHTML = "Q2: Sorry, " + checkboxResults + "is incorrect";
              }
            }
        }
        
    }

    //Palindrome
    let revStr = "";
    let str = document.getElementById("str").value;
    let i = str.length;
    for(let j=i; j>=0; j--) {
    revStr = revStr+str.charAt(j);
    }
    if(str == revStr) {
    palindromeAnswer.innerHTML = "Q3: Your answer is correct, " + revStr + " is a Palindrome";
    } else {
    palindromeWrongAnswer.innerHTML = "Q3: Sorry, " + revStr + "is not a Palindrome";
    }

    //Reverse sentence
    let sent = document.getElementById("sentence").value;
    let rev = document.getElementById("reverse").value;
    let newStr = '';
    for(let i = sent.length -1; i>=0; i--){
        newStr += sent[i];
        console.log(newStr);
    }if(rev == newStr){
      sentenceAnswer.innerHTML = 'Q4. Correct, your sentence ' + rev + ' matched ' + sent + ' in reverse';
    } else{
      sentenceWrongAnswer.innerHTML = 'Q4. Sorry, your sentence ' + rev + ' did not match ' + newStr ;
    }

    //Display restaurants
    fetch ('https://developers.zomato.com/api/v2.1/search?entity_id=302&entity_type=city&apikey=5bb4b231fc0385be4d1e62aa81faa1ce').then(function(response){
    return response.json();
}).then(function(obj){
    console.log(obj.restaurants);
    const html = obj.restaurants.map(user =>{
        let open = user.restaurant.is_delivering_now;
        if(open === 0){
            this.open = 'Closed';
            console.log(this.open)
        } else {this.open = 'Open now';
        }
        document.getElementById("resttitle").innerHTML = '<h2 style="text-align:center;">Select your favorite restaurant in San Diego</h2>';
        return `  <div class="rest-single">
                    <div class="rest-img">
                    <img src="${user.restaurant.thumb}">
                    </div>
                    <div class="rest-cont">
                        <div class="rest-main">
                            <div class="rest-name">
                                <h1>${user.restaurant.name}</h1>
                                <p>${user.restaurant.location.locality}</p>&nbsp;
                            <p> ${user.restaurant.establishment}</p>
                                
                            </div>
                            <div class="rest-rank">
                                <div id="numbers">
                                <span id="ranking">${user.restaurant.user_rating.aggregate_rating}</span><span id="total"> / 5</span>
                                </div>    
                                <span id="votes">${user.restaurant.user_rating.votes} votes</span>
                            </div>
                        </div>
                        <div class="rest-feat">
                        <p>${this.open}</p>&nbsp;|&nbsp;<p>${user.restaurant.cuisines}</p>&nbsp;|&nbsp;<p>Costs $${user.restaurant.average_cost_for_two} for two</p>
                        </div>
                    </div>
                </div>
                `
    }).join('')
    console.log(html);
    document.querySelector('#restaurant-listing').insertAdjacentHTML("afterbegin", html);

}); //end restaurants

} //end loopForm

//prev, next && validations
var currentTab = 0; 
showTab(currentTab); 

function showTab(n) {
  var x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (n == (x.length - 1)) {
    document.getElementById("nextBtn").innerHTML = "Submit";
  } else {
    document.getElementById("nextBtn").innerHTML = "Next";
  }
  fixStepIndicator(n)
}

function nextPrev(n) {
  var x = document.getElementsByClassName("tab");
  if (n == 1 && !validateForm()) 
    return false;
  x[currentTab].style.display = "none";
  currentTab = currentTab + n;
  if (currentTab >= x.length) {
    document.getElementById("regForm").style.display = 'inline';
    loopForm(document.thisForm);
    document.getElementById("maininner").style.display = "none";
    return false;
  }
  showTab(currentTab);
}

function validateForm() {
  var x, y, i, valid = true;
  x = document.getElementsByClassName("tab");
  y = x[currentTab].getElementsByTagName("input");
  for (i = 0; i < y.length; i++) {
    if (y[i].value == "") {
      y[i].className += " invalid";
      valid = false;
    }
  }
  if (valid) {
    document.getElementsByClassName("step")[currentTab].className += " finish";
  }
  return valid;
}

function fixStepIndicator(n) {
  var i, x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  x[n].className += " active";
}

//Zomato Edgar's API key 5bb4b231fc0385be4d1e62aa81faa1ce
//https://developers.zomato.com/api/v2.1/search?entity_id=302&entity_type=city&apikey=5bb4b231fc0385be4d1e62aa81faa1ce


