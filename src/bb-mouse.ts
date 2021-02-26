export class BbMouse {
    static init() {
        window.addEventListener("mousemove", (ev: MouseEvent) => {
            this.mouseX = ev.clientX;
            this.mouseY = ev.clientY;
        })
    }

    static mouseX: number = -1;
    static mouseY: number = -1;

}
