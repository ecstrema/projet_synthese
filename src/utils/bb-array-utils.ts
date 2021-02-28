export class BbArrayUtils {
    static fillFirstEmpty<T>(ctor: new (...props: any[]) => T, array: T[], ...props: any[]) {
        for (let i = 0; i < array.length; i++) {
            const element = array[i];
            if (!element) {
                const newTarget = new ctor(...props);
                array[i] = newTarget;
                return;
            }
        }
        array.push(new ctor(...props));
    }
}
