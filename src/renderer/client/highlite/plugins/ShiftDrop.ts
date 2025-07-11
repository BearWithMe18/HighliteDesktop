import { Plugin } from "../core/interfaces/highlite/plugin/plugin.class";

export class ShiftDrop extends Plugin {
    pluginName = "ShiftDrop";
    author = "BearWithMe18";

    private isShiftPressed: boolean = false;

    constructor() {
        super();
    }
    init(): void {
        this.log("Initializing ShiftDrop");
    }
    start(): void {
        this.addEventListeners();
    }
    stop(): void {
        this.eventListeners.forEach(({ element, event, handler }) => {
            element.removeEventListener(event, handler);
        });
        this.eventListeners = [];
    }

    private addEventListeners() {
        const keydownHandler = (e: Event) => {
            const keyEvent = e as KeyboardEvent;
            if (keyEvent.key === 'Shift' && !this.isShiftPressed) {
                this.isShiftPressed = true;
            }
        };

        const keyupHandler = (e: Event) => {
            const keyEvent = e as KeyboardEvent;
            if (keyEvent.key === 'Shift' && this.isShiftPressed) {
                this.isShiftPressed = false;
            }
        };

        document.addEventListener('keydown', keydownHandler);
        document.addEventListener('keyup', keyupHandler);

        this.eventListeners = [
            { element: document, event: 'keydown', handler: keydownHandler },
            { element: document, event: 'keyup', handler: keyupHandler }
        ];
    }

}