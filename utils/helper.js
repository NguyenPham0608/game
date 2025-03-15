export default class Controls {
    constructor() {
        this.left = false;
        this.right = false;
        this.up = false;
        this.down = false;

        this.#addKeyboardListeners();
    }

    #addKeyboardListeners() {
        window.addEventListener("keydown", (event) => {
            switch (event.key) {
                case "ArrowLeft":
                case "a":
                    this.left = true;
                    break;
                case "ArrowRight":
                case "d":
                    this.right = true;
                    break;
                case "ArrowUp":
                case "w":
                    this.up = true;
                    break;
                case "ArrowDown":
                case "s":
                    this.down = true;
                    break;
            }
        });

        window.addEventListener("keyup", (event) => {
            switch (event.key) {
                case "ArrowLeft":
                case "a":
                    this.left = false;
                    break;
                case "ArrowRight":
                case "d":
                    this.right = false;
                    break;
                case "ArrowUp":
                case "w":
                    this.up = false;
                    break;
                case "ArrowDown":
                case "s":
                    this.down = false;
                    break;
            }
        });
    }
}


