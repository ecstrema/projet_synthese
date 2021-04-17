export class BbMouse {
    static init() {
        window.addEventListener("mousemove", (ev: MouseEvent) => {
            BbMouse.mouseY = ev.clientY;
        })
        window.addEventListener("touchmove", (ev: TouchEvent) => {
            ev.preventDefault();
            BbMouse.mouseY = ev.touches[0].clientY;
        }, {passive: false})
    }

    static mouseY: number = -1;

}
