export class Rect {
    constructor(rect) {
        this.top = rect.top;
        this.bottom = rect.bottom;
        this.left = rect.left;
        this.right = rect.right;

        this.mid = {
            x: (rect.right + rect.left) / 2,
            y: (rect.bottom + rect.top) / 2
        };

        this.height = rect.bottom - rect.top;
        this.width = rect.right - rect.left;
    }
}