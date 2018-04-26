import { ILazyImageProps } from "./ILazyImageProps";
import { Subscriber } from "./Subscriber";

export class ImageManager {
    private images: NodeListOf<Element>;
    private visibilityObserver: IntersectionObserver;
    private pendingRequests: ILazyImageProps[] = [];
    private processedRequests: any[] = [];
    private loadMap: boolean[] = [];

    constructor(selector: string) {
        this.onEnterVisibleArea = this.onEnterVisibleArea.bind(this);
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
                if (this.pendingRequests.filter(p => p.id === id).length === 0) {
                    this.pendingRequests.push({
                        order: <number>index,
                        id: <string>id,
                        src: <string>change.target.children[0].getAttribute("data-src"),
                        cb: () => this.manageLoad(index, <string>id)
                    });
                }
            });

        const toRemoveIDs = changes
            .filter(c => !c.isIntersecting)
            .map(c => c.target.getAttribute("data-id"));

        console.log("REMOVED: ", toRemoveIDs);

        this.pendingRequests = this.pendingRequests.filter(r => toRemoveIDs.filter(t => t === r.id).length === 0);
        
        console.log("PENDING ", this.pendingRequests.map(p => p.id));
    }

    private manageLoad(order: number, id: string) {
        setTimeout(console.log(order), 1000);
    }

    private getIntersectionOptions() {
        return {
            root: null, //visible for viewport
            rootMargin: '0px',
            threshold: 0 //any part of element is visible
        }
    }
}
