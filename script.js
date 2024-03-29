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




  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyAAk-eApRh2FsIKfp689_zS5N_jeD07SZ4",
    authDomain: "baby-yoda-1184d.firebaseapp.com",
    projectId: "baby-yoda-1184d",
    storageBucket: "baby-yoda-1184d.appspot.com",
    messagingSenderId: "643303472381",
    appId: "1:643303472381:web:e09c05c780eaaaf0b81294"
  };
  // Initialize Firebase

  
  firebase.initializeApp(firebaseConfig);
  db = firebase.firestore(); //needs ';'


(async function  waitFor() {
	const settings = await db.collection(`baby-yoda`).doc('settings').get().then(  (querySnapshot) => {
		return querySnapshot.data()
	})


	  


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

		function createMenuLabel(itemGroup) {
			const menu = document.querySelector("#main-form-menu");
			const newForm = document.createElement("form");
			const formHeader = document.createElement("div");
			formHeader.class = "form-header";
			formHeader.innerHTML = `<h2>${itemGroup}</h2>`;
			newForm.id = `${itemGroup}_form`;
			newForm.appendChild(formHeader);
			menu.appendChild(newForm);
			return newForm
		}

		function toggleMenuCreator(itemGroup) {
			const newForm = createMenuLabel(itemGroup)
			const svgGroup = document.querySelector(`#${itemGroup}`);

			const svgItems = svgGroup.querySelectorAll(":scope > use ");

			Array.from(svgItems).forEach((item) => {
				const checkBox = document.createElement("input");
				const itemName = document.querySelector(item.href.baseVal).id;
				checkBox.id = `${itemName}_checkbox`;
				checkBox.setAttribute("type", "checkbox");

				
				if(settings[checkBox.id] === true ) {
					checkBox.checked = true;
					item.style.display = 'block'
				} else {
					checkBox.checked = false;
					item.style.display = "none";
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

		function colorMenuForClothes(itemGroup) {
			const newForm = createMenuLabel(itemGroup)
			const colorPickerFill = document.createElement('div')
			colorPickerFill.id = 'colorPickerFill'
			const colorPickerStroke = document.createElement('div')
			colorPickerStroke.id = 'colorPickerStroke'
			newForm.append(colorPickerFill,colorPickerStroke)
			const fillControl = Pickr.create({
				el: '#colorPickerFill',
				theme: 'nano', // or 'monolith', or 'nano'
				appClass:'colorPickerFill',
				default:settings['colorPickerFill'] || '#C99376',
				components: {
			
					// Main components
					preview: true,
					opacity: true,
					hue: true,
			
					// Input / output Options
					interaction: {
						hex: true,
						rgba: true,
						hsla: true,
						hsva: true,
						cmyk: true,
						input: true,
						clear: true,
						save:true
					}
				}
			});

			const strokeControl = Pickr.create({
				el: '#colorPickerStroke',
				theme: 'nano', // or 'monolith', or 'nano'
				appClass:'colorPickerStroke',
				default:settings['colorPickerStroke'] || '#B77B53',
				components: {
			
					// Main components
					preview: true,
					opacity: true,
					hue: true,
			
					// Input / output Options
					interaction: {
						hex: true,
						rgba: true,
						hsla: true,
						hsva: true,
						cmyk: true,
						input: true,
						clear: true,
						save: true
					}
				}
			});


			
			
			const baseShirt = document.querySelector('#clothes')
			const leftSleeve = document.querySelector('#left_sleeve')
			const rightSleeve = document.querySelector('#right_sleeve')
			const frontLeftSleeve = leftSleeve.parentElement.children[2] //hacky, i know lol
			const frontRightSleeve = rightSleeve.parentElement.children[2] 
			fillControl.on('change', (color) => {
				Array.from([...baseShirt.children,...leftSleeve.children,...rightSleeve.children]).forEach(child => {
					child.style.fill = color.toHEXA().toString()
				})
			})
			.on('save', function(color) {
				
				db.doc("baby-yoda/settings").update({colorPickerFill:color.toHEXA().toString()})
			})
			strokeControl.on('change', function(color) {
				Array.from([...baseShirt.children,...leftSleeve.children,...rightSleeve.children,frontLeftSleeve,frontRightSleeve]).forEach(child => {
					child.style.stroke = color.toHEXA().toString()

				})
			})
			.on('save', function(color) {
				db.doc("baby-yoda/settings").update({colorPickerStroke:color.toHEXA().toString()})
			})

			Array.from([...baseShirt.children,...leftSleeve.children,...rightSleeve.children]).forEach(child => {
				child.style.fill = settings['colorPickerFill']

			})

			Array.from([...baseShirt.children,...leftSleeve.children,...rightSleeve.children]).forEach(child => {
				child.style.stroke = settings['colorPickerStroke']

			})
			
		}

		function saveSettingsMenuCreator() {
		
			const newForm = createMenuLabel('Save Settings')
			const saveButton = document.createElement('Button')
			saveButton.type = 'button'
			saveButton.innerHTML = "Save"

			const formMenu = document.querySelector('#main-form-menu')
			const inputs = formMenu.querySelectorAll('input')
			// inputs.push(document.qu)

			saveButton.addEventListener('click', (e) => {
				//needs to get each input each save because a new object wont  be see on the server
				const inputObj = {}
				inputs.forEach(input => {

					if(input.type === 'checkbox') {
						if(input.checked) {
							inputObj[input.id] = true
						} else {
							inputObj[input.id]= false
						}
					}
				})

				db.doc("baby-yoda/settings").set(
					// updatedAt:firebase.firestore.Timestamp.fromDate(new Date()),
					{...inputObj},{merge:true}
				)
				.then((docRef) => {
					console.log("Document written with ID: ", docRef);
				})
				.catch((error) => {
					console.error("Error adding document: ", error);
				});
				
				
			})

			newForm.append(saveButton)
		}
		
		toggleMenuCreator("face_accessories");
		toggleMenuCreator("hair");
		toggleMenuCreator("headwear");
		toggleMenuCreator("tattoos");
		toggleMenuCreator("yoda_overhang_accessories");
		toggleMenuCreator("mouths");
		toggleMenuCreator("left_ear_items");
		toggleMenuCreator("right_ear_items");
		colorMenuForClothes("clothes");
		saveSettingsMenuCreator()

	}
})();

