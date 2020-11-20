'use strict'
const Keyboard = {
        elements: {
            main: null,
            keyboardKeys: null,
            keys: [],
        },
        eventHandlers: {
            oninput: null,
            inclosed: null,
        },
        properties: {
            value: "",
            capslock: false,
        },
    

    init(wereAddElement) {
        

        this.elements.main = document.createElement('div');
        this.elements.main.classList.add('keyboard', "keyboard--hidden");

        this.elements.keyboardKeys = document.createElement('div');
        this.elements.keyboardKeys.classList.add('keyboard-keys');

        this.elements.keyboardKeys.append(this._createKeys());
        this.elements.main.append(this.elements.keyboardKeys);
        wereAddElement.append(this.elements.main);

        this.elements.keys.push(this.elements.keyboardKeys.querySelectorAll('.keyboard-keys__key'));

        const inputArea = document.querySelectorAll('.use--keyboard');
        console.log(inputArea);
        inputArea.forEach(elem => {
            elem.addEventListener('focus', () => {
                this.open(elem.value, currentValue => {
                    elem.value = currentValue;
                    
                })
            })
        })

        
    },

    _createKeys() {
        const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
                      "q", "w", "e", "r", "t", "y", "u", "i", "o", "p",
                      "capslock", "a", "s", "d", "f", "g", "h", "j", "k", "l", "enter",
                      "check", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?", "space"];
                       
        const createIcons = (iconName) => {
        return `<i class="material-icons">${iconName}</i>`;
        };
        const fragment = document.createDocumentFragment();
        
        keys.forEach(key => {
            const isKeyLastInRow = ["backspace", "p", "enter", "?"].indexOf(key) !== - 1;
            const keyButton = document.createElement('button');
            keyButton.classList.add('keyboard-keys__key');

            switch(key) {
                case "backspace":
                    keyButton.classList.add('keyboard-keys__key--wide');
                    keyButton.innerHTML = createIcons("backspace");

                    keyButton.addEventListener('click', () => {
                        this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
                        this._triggerEvents("oninput");
                    })
                    
                    
                break;
                case "capslock":
                    keyButton.classList.add('keyboard-keys__key--wide', "CapsLock");
                    keyButton.innerHTML = createIcons('keyboard_capslock');
                    keyButton.addEventListener('click', () => {
                        keyButton.classList.toggle('CapsLock--active');
                        this._triggerCapsLock();
                    })
                break;
                case "enter":
                    keyButton.classList.add('keyboard-keys__key--wide');
                    keyButton.innerHTML = createIcons('keyboard_return');

                    keyButton.addEventListener('click', () => {
                        this.properties.value += "\n"; 
                    })
                    this._triggerEvents("oninput");
                break;
                case "check":
                    keyButton.innerHTML = createIcons('check_circle');

                    keyButton.addEventListener('click', () => {
                       this.close();
                    })

                break;
                case "space":
                    keyButton.classList.add('keyboard-keys__key--space');
                    keyButton.innerHTML = createIcons("space_bar");

                    keyButton.addEventListener('click', () => {
                        this.properties.value += " ";
                    })
                    this._triggerEvents("oninput");
                break;
                default:
                    keyButton.innerHTML = key;

                    keyButton.addEventListener('click', () => {
                        this.properties.value += this.properties.capslock ? key.toUpperCase() : key.toLowerCase();
                        this._triggerEvents("oninput");
                    })
                break;
            }
           
            fragment.append(keyButton);

            if(isKeyLastInRow) {
                const br = document.createElement('br');
                fragment.append(br);
            };
        });

        return fragment
    },

    _triggerEvents(handlerName) {
        if(typeof this.eventHandlers[handlerName] === "function") {
            this.eventHandlers[handlerName](this.properties.value);
        }
        
    },
    _triggerCapsLock() {
        this.properties.capslock = !this.properties.capslock;
        this.elements.keys.forEach(key => {
            if(key.childElementCount === 0) {
               key.textContent = this.properties.capslock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
            }
            
        })

    },

    open(initial, oninput) {
        this.properties.value = initial;
        this.eventHandlers.oninput = oninput;
        this.elements.main.classList.remove('keyboard--hidden');
    },

    close() {
        this.elements.main.classList.add('keyboard--hidden')
    },
    

}
// const area = document.querySelector('.area');
// window.addEventListener('DOMContentLoaded', () => {
//     Keyboard.init(area);
// })
