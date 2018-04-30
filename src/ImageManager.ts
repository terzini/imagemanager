import { Subscriber } from "./Subscriber";
import { SIGUSR2 } from "constants";
const debounce = require("debounce");

export class ImageManager {
    private visibilityObserver: IntersectionObserver;
    private pendingRequests: Subscriber[] = [];
    private processedRequests: Subscriber[] = [];
    private loadMap: boolean[] = [];

    constructor(selector: string) {
        // this.onEnterVisibleArea = debounce(this.onEnterVisibleArea.bind(this), 200, true);
        this.onEnterVisibleArea = this.onEnterVisibleArea.bind(this);
        this.onEnterVisibleArea = this.onEnterVisibleArea.bind(this);
        this.loadImage = this.loadImage.bind(this);
        this.processImage = this.processImage.bind(this);
        this.calcOrder = this.calcOrder.bind(this);
        this.visibilityObserver = new IntersectionObserver(this.onEnterVisibleArea, this.getIntersectionOptions());

        const images = document.querySelectorAll(selector);
        console.log(images.length)
        for (let i = 0; i < images.length; i++) {
            this.visibilityObserver.observe(images[i]);
        }
    }

    private onEnterVisibleArea(changes: IntersectionObserverEntry[], observer: IntersectionObserver) {
        console.log("----- ON CHANGE VISIBILITY ---- ", changes.map( c => c.target.getAttribute("data-id")))
        changes.filter(c => c.isIntersecting)
            .forEach((change, index) => {
                const id = change.target.getAttribute("data-id");

                if (this.pendingRequests.filter(p => p.LazyImageProps.id === id).length === 0) {
                    this.pendingRequests.push(
                        new Subscriber({
                            id: <string>id,
                            order: 0,
                            pos: this.calcOrder(change.boundingClientRect.top, change.boundingClientRect.left),
                            src: <string>change.target.children[0].getAttribute("data-src")
                        }, change.target.getElementsByTagName("img")[0]));
                }
            });

        const toRemoveIDs = changes
            .filter(c => !c.isIntersecting)
            .map(c => c.target.getAttribute("data-id"));

        console.log("REMOVED: ", toRemoveIDs);

        this.pendingRequests = this.pendingRequests
            .filter(r => toRemoveIDs.filter(t => t === r.LazyImageProps.id).length === 0)
            .sort((r1, r2) => r1.LazyImageProps.pos - r2.LazyImageProps.pos)
            .map((r, i) => { r.LazyImageProps.order = i; return r; });

        console.log("PENDING ", this.pendingRequests);

        this.pendingRequests.forEach(this.loadImage);
        this.processedRequests = [];
    }

    private loadImage(subscriber: Subscriber) {
        const img = new Image();
        if (subscriber.LazyImageProps.src) {
            img.src = decodeURI(subscriber.LazyImageProps.src);
            img.onerror = () => {
                this.processImage(subscriber, false);
            };
            img.onload = () => {
                setTimeout(() => {
                    this.processImage(subscriber, true);
                }, Math.random() * 2000);
            };
        } else {
            this.processImage(subscriber, false);
        }
    }

    private processImage(subscriber: Subscriber, success: boolean) {
        this.processedRequests.push(subscriber);

        for (let index = 0; index < this.processedRequests.length; index++) {
            if (success && this.shouldShow(this.processedRequests[index].LazyImageProps.order, this.processedRequests)) {
                this.processedRequests[index].onComplete();
            }
        }
    }

    private shouldShow(order: number, arr: Subscriber[]) {
        let show = true;
        let i = 0;
        while (show && i <= order) {
            if (arr.filter(elem => elem.LazyImageProps.order === i).length === 0) {
                show = false;
            }
            i++;
        }
        return show;
    }

    private getIntersectionOptions() {
        return {
            root: null, //visible for viewport
            rootMargin: '0px',
            threshold: 0 //any part of element is visible
        }
    }

    private calcOrder(y: number, x: number): number {
        return y * 10000 + x;
    }
}
