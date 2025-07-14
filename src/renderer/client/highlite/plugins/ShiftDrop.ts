import { Plugin } from "../core/interfaces/highlite/plugin/plugin.class";
import { ContextMenuManager } from "../core/managers/game/contextMenuManager";

export class ShiftDrop extends Plugin {
    pluginName = "ShiftDrop";
    author = "BearWithMe18";

    contextMenuManager: ContextMenuManager = new ContextMenuManager();

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
        const shiftHandler = (e: KeyboardEvent) => {
            if (e.key == "Shift") {
                this.contextMenuManager.SetInventoryActionMenuPosition("Drop", -1);
            } else {
                this.contextMenuManager.RemoveGameWorldActionMenuPosition("Drop");
            }
        };

        document.addEventListener("keydown", shiftHandler);
        document.addEventListener("keyup", shiftHandler);

        this.eventListeners = [
            { element: document, event: "keydown", handler: shiftHandler },
            { element: document, event: "keyup", handler: shiftHandler }
        ];
    }

}