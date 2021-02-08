// var script_tag = document.getElementById('index_js');
// var settings = script_tag.getAttribute("leftArmUpDuration");
//console.log(settings)

// fetch('https://young-crag-72283.herokuapp.com/restaurants')
//   .then(response => response.json())
//   .then(data => console.log(data));





// async function getToken() {
// 	const token = await fetch('https://streamlabs.com/api/v2.0/socket/token',
// 	{
// 		mode: 'no-cors',
// 		method: 'GET',
// 		credentials: 'omit',
// 		headers: {
// 		'Content-Type': 'application/x-www-form-urlencode',
// 		'Access-Control-Allow-Origin':'*',
// 		'Access-Control-Allow-Headers':'*'
// 	}})

	

// }
// getToken()

	//const socketToken = ''; //Socket token from /socket/token end point
  
  //Connect to socket
//const streamlabs = io(`https://sockets.streamlabs.com?token=${socketToken}`, {transports: ['websocket']});

// const url = "https://api.quotable.io/random";
// function generateQuote(){
//    fetch(url)
//   .then(function(data) {
//          return data.json();
//     })
//     .then(function(data){    
//     console.log(data.content)
//    })
//  .catch(function(err) {
//     console.log(err); 
//     });
//  }
//  // Repeat generateQuote() every 10 seconds
// setInterval(generateQuote() ,10000);


(function waitFor() {
	if (document.querySelector("#yoda_overhang_accessories") === null) {
		//look for last rendered svg and make sure it exists before executing the code below
		console.log("loading...");
		window.requestAnimationFrame(waitFor);
	} else {
		let handIntervel = 10000;
		function leftHand() {
			let leftHandObject = document.querySelector("#left_hand_object");
			let leftHandObjectOverlay = document.querySelector(
				"#left_hand_object_overlay"
			);
			let leftHandObjects = document.querySelectorAll("#left_hand_object > use");
			let leftHand = document.querySelector("#left_hand");

			let randomLeftHandObjectRefrence = leftHandObjects[1];

			let getRandomLeftHandObject = () => {
				randomLeftHandObjectRefrence =
					leftHandObjects[Math.floor(Math.random() * leftHandObjects.length)];
			};

			leftHandObjects.forEach((object) => {
				object.style.display = "none";
			});

			//document.querySelector("#right_hand").style.display = "none";
			leftHand.addEventListener("animationiteration", () => {
				setTimeout(() => {
					getRandomLeftHandObject();
					leftHandObjectOverlay.style.display = "block";
					randomLeftHandObjectRefrence.style.display = "block";
				}, handIntervel);

				leftHandObjectOverlay.style.display = "none";
				randomLeftHandObjectRefrence.style.display = "none";

				leftHand.setAttribute("style", "animation-play-state:paused");
				setTimeout(() => {
					leftHand.setAttribute("style", "animation-play-state:running");
				}, handIntervel);
			});
		}

		// anime({targets: '#whole',
		//          rotate: 5,
		//        duration: 100,
		//      direction: 'alternate',
		//      loop: true,
		//      easing: 'easeInOutQuad'
		//    })

		function rightHand(withRandomObject) {
			// right hand
			let rightHandObject = document.querySelector("#right_hand_object");
			let rightHandObjectOverlay = document.querySelector(
				"#right_hand_object_overlay"
			);
			let rightHandObjects = document.querySelectorAll("#right_hand_object > use");

			let rightHand = document.querySelector("#right_hand");

			let randomRightHandObjectRefrence = rightHandObjects[1];

			let getRandomRightHandObject = () => {
				randomRightHandObjectRefrence =
					rightHandObjects[Math.floor(Math.random() * rightHandObjects.length)];
			};

			rightHandObjects.forEach((object) => {
				object.style.display = "none";
			});

			function startAnimationIteration() {}
			rightHand.addEventListener("animationiteration", () => {
				setTimeout(() => {
					getRandomRightHandObject();
					rightHandObjectOverlay.style.display = "block";
					randomRightHandObjectRefrence.style.display = "block";
				}, handIntervel);

				rightHandObjectOverlay.style.display = "none";
				randomRightHandObjectRefrence.style.display = "none";

				rightHand.setAttribute("style", "animation-play-state:paused");
				setTimeout(() => {
					rightHand.setAttribute("style", "animation-play-state:running");
				}, handIntervel);
			});
		}

		//handles events and when they're fired
		const events = {
			rightHand: {
				event() {
					rightHand();
				},
				withRandomObject: true,
				frequency: 1000
			},
			leftHand: {
				event() {
					leftHand();
				},
				withRandomObject: true,
				frequency: 1000
			}
		};

		function runEvents() {
			//setTimeout(() => {
			events.rightHand.event();
			// }, events.rightHand.frequency);

			// setTimeout(() => {
			events.leftHand.event();
			//  }, events.leftHand.frequency);
		}

		runEvents();
		// rightHand()
		// leftHand()
		//

		//handles UI

		function toggleMenuCreator(itemGroup) {
			const menu = document.querySelector("#main-form-menu");
			const newForm = document.createElement("form");
			const formHeader = document.createElement("div");
			formHeader.class = "form-header";
			formHeader.innerHTML = `<h2>${itemGroup}</h2>`;
			newForm.id = `${itemGroup}_form`;
			newForm.appendChild(formHeader);
			menu.appendChild(newForm);

			const svgGroup = document.querySelector(`#${itemGroup}`);

			const svgItems = svgGroup.querySelectorAll(":scope > use ");

			Array.from(svgItems).forEach((item) => {
				const checkBox = document.createElement("input");
				const itemName = document.querySelector(item.href.baseVal).id;
				checkBox.id = `${itemName}_checkbox`;
				checkBox.setAttribute("type", "checkbox");

				if (item.style.display == "") {
					checkBox.checked = true;
				} else {
					checkBox.checked = false;
				}
				checkBox.name = itemName;
				checkBox.addEventListener("change", function () {
					if (this.checked) {
						// Checkbox is checked..
						item.style.display = "block";
					} else {
						item.style.display = "none";
					}
				});
				newForm.appendChild(checkBox);

				const checkBoxLabel = document.createElement("label");
				checkBoxLabel.for = item.id;
				checkBoxLabel.innerHTML = itemName;
				newForm.appendChild(checkBoxLabel);
			});
		}

		toggleMenuCreator("face_accessories");
		toggleMenuCreator("headwear");
		toggleMenuCreator("tattoos");
		toggleMenuCreator("yoda_overhang_accessories");
		toggleMenuCreator("mouths");
	}
})();
