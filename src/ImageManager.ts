import { Subscriber } from "./Subscriber";

export class ImageManager {
    private images: NodeListOf<Element>;
    private visibilityObserver: IntersectionObserver;
    private pendingRequests: Subscriber[] = [];
    private processedRequests: Subscriber[] = [];
    private loadMap: boolean[] = [];
    private maxIndexProcessed: number = 0;

    constructor(selector: string) {
        this.onEnterVisibleArea = this.onEnterVisibleArea.bind(this);
        this.loadImage = this.loadImage.bind(this);
        this.processImage = this.processImage.bind(this);
        this.visibilityObserver = new IntersectionObserver(this.onEnterVisibleArea, this.getIntersectionOptions());

        this.images = document.querySelectorAll(selector);
        console.log(this.images.length)
        for (let i = 0; i < this.images.length; i++) {
            this.visibilityObserver.observe(this.images[i]);
        }
    }

    private onEnterVisibleArea(changes: IntersectionObserverEntry[], observer: IntersectionObserver) {
        changes.filter(c => c.isIntersecting)
            .forEach((change, index) => {
                const id = change.target.getAttribute("data-id");
                if (this.pendingRequests.filter(p => p.LazyImageProps.id === id).length === 0) {
                    this.pendingRequests.push(
                        new Subscriber({
                            order: <number>index,
                            id: <string>id,
                            src: <string>change.target.children[0].getAttribute("data-src")
                        }, change.target.getElementsByTagName("img")[0]));
                }
            });

        const toRemoveIDs = changes
            .filter(c => !c.isIntersecting)
            .map(c => c.target.getAttribute("data-id"));

        console.log("REMOVED: ", toRemoveIDs);

        this.pendingRequests = this.pendingRequests.filter(r => toRemoveIDs.filter(t => t === r.LazyImageProps.id).length === 0);

        console.log("PENDING ", this.pendingRequests.map(p => p.LazyImageProps.id));
        this.pendingRequests.forEach(this.loadImage);
    }

    private loadImage(subscriber: Subscriber) {
        setTimeout(() => {
            const img = new Image();
            if (subscriber.LazyImageProps.src) {
                img.src = decodeURI(subscriber.LazyImageProps.src);
                img.onerror = () => {
                    this.processImage(subscriber, false);
                };
                img.onload = () => {
                    this.processImage(subscriber, true);
                };
            } else {
                this.processImage(subscriber, false);
            }
        }, Math.random() * 5000);
    }

    private processImage(subscriber: Subscriber, success: boolean) {
        console.log("---process image --- ", subscriber.LazyImageProps.order);
        this.processedRequests.push(subscriber);

        const sorted = this.processedRequests.sort(r => r.LazyImageProps.order);

        console.log("sorted len: ", sorted.length);

        for (let index = 0; index < sorted.length; index++) {
            if (sorted[index].LazyImageProps.order === this.maxIndexProcessed) {
                sorted[index].Target.src = sorted[index].LazyImageProps.src;
                this.maxIndexProcessed = sorted[index].LazyImageProps.order + 1;
                console.log("MAX INDEX:", this.maxIndexProcessed);
            }
        }
    }

    private getIntersectionOptions() {
        return {
            root: null, //visible for viewport
            rootMargin: '0px',
            threshold: 0 //any part of element is visible
        }
    }
}
