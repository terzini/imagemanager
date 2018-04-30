import { ILazyImageProps } from "./ILazyImageProps";

export class Subscriber {
    public Target: any;
    public LazyImageProps: ILazyImageProps;

    constructor(props: ILazyImageProps, target: any) {
        this.LazyImageProps = props;
        this.Target = target;

        this.onComplete = this.onComplete.bind(this);
    }

    public onComplete(): void {
        this.Target.src = this.LazyImageProps.src;
    }
}