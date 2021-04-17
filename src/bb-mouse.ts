export class BbMouse {
    static init() {
        window.addEventListener("mousemove", (ev: MouseEvent) => {
            BbMouse.mouseX = ev.clientX;
            BbMouse.mouseY = ev.clientY;
        })
        window.addEventListener("touchmove", (ev: TouchEvent) => {
            ev.preventDefault();
            BbMouse.mouseX = ev.touches[0].clientX;
            BbMouse.mouseY = ev.touches[0].clientY;
        }, {passive: false})
    }

    static mouseX: number = -1;
    static mouseY: number = -1;

}
