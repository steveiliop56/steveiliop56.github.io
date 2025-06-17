export class Typewriter {
    private words: string[];
    private element: HTMLElement | null = null;
    public hasElement: boolean = false;

    constructor(words: string[]) {
        this.words = words;
    }

    private type(word: string) {
       for (let i = 0; i < word.length; i++) {
            setTimeout(() => {
                if (this.element) {
                    this.element.innerHTML += word.charAt(i);
                }
            }, i * 100);
        }
    }

    private remove() {
        if (this.element && this.element.innerHTML) {
            for (let i = 0; i < this.element.innerHTML.length; i++) {
                setTimeout(() => {
                    if (this.element) {
                        this.element.innerHTML = this.element.innerHTML.slice(0, -1);
                    }
                }, i * 100);
            }
        }
    }

    public setElement(element: HTMLElement) {
        this.element = element;
        this.hasElement = true;
    }

    public async start() {
        while (true) {
            for (const word of this.words) {
                await new Promise((resolve) => {
                    this.type(word);
                    setTimeout(resolve, word.length * 100 + 1000);
                });

                await new Promise((resolve) => {
                    if (this.element && this.element.innerHTML) {
                        this.remove();
                        setTimeout(resolve, this.element.innerHTML.length * 100);
                    }
                });
            }
        }
    }
}