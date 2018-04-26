import {ILazyImageProps} from "./ILazyImageProps";

export class Subscriber{
    private lazyImageProps: ILazyImageProps;
    private target: any;

    constructor( props: ILazyImageProps, target: any){
        this.lazyImageProps = props;
        this.target = target;
    }

    public onLoadComplete(){
        this.target.src = this.lazyImageProps.src;
    }    
}